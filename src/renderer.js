const {
    ipcRenderer
} = require('electron');
const Store = require('electron-store');
store = new Store();

function t(str, n) {
    return "<span class='boxed'>" + ((str.length > n) ? str.substr(0, n - 1) + '&hellip;' : str) + "</span>";
};

function disable_dev_window(e) {
    store.set('show', false);

}

function hide_dev_window() {
    ipcRenderer.send('minimize')
}

function create_li(value, parent) {
    var x = document.createElement("li");
    x.innerHTML = value;
    document.getElementById(parent).appendChild(x);

}

function create_li_pair(key, value, parent, blink = false, id = null) {
    var x = document.createElement("li");
    x.innerHTML = key + ": " + value;
    x.id = id;
    if (blink) {
        x.className = "blink";
    }
    document.getElementById(parent).appendChild(x);
    return x;

}

document.addEventListener('DOMContentLoaded', () => {

    /*
    VERSIONS
    */
    create_li_pair("Clipdit", ipcRenderer.sendSync('get_app_version'), "versions");
    for (var key in process.versions) {
        create_li_pair(key, process.versions[key], "versions");
    }

    /*
    DETAILS
    */

    create_li_pair("Platform", process.platform, "details");
    create_li_pair("Architecture", process.arch, "details");
    create_li_pair("PID", process.pid, "details");
    var clipdit = create_li_pair("Clipdit clipboard", t(localStorage.getItem("clipboard"), 60), "details", false, "clipdit_details");
    localStorage.setItem("clipboard_CURRENT", localStorage.getItem("clipboard"));

    /*
    PERFORMANCE
    */

    var uptime = create_li_pair("Uptime", (Math.round(process.uptime() * 100) / 100).toFixed(2) + "s", "performance", true);

    const ram_used = process.memoryUsage();
    var ram_lists = [];
    for (let key in ram_used) {
        var x = create_li_pair(key, (Math.round(ram_used[key] / 1024 / 1024 * 100) / 100).toFixed(2) + " MB", "performance", true);
        ram_lists.push(x);
    }


    /*

    LIVE UPDATES

    */

    setInterval(function () {
        uptime.innerHTML = "Uptime: " + (Math.round(process.uptime() * 100) / 100).toFixed(2) + "s";
        for (let i = 0; i < ram_lists.length; i++) {
            var ram_used = process.memoryUsage();
            ram_lists[i].innerHTML = ram_lists[i].innerHTML.split(":")[0] + ": " + (Math.round(ram_used[ram_lists[i].innerHTML.split(":")[0]] / 1024 / 1024 * 100) / 100).toFixed(2) + " MB";
        }

        if (localStorage.getItem("clipboard") != localStorage.getItem("clipboard_CURRENT")) {
            clipdit.className = "blink";
            clipdit.innerHTML = "Clipdit clipboard: " + t(localStorage.getItem("clipboard"), 60);
            localStorage.setItem("clipboard_CURRENT", localStorage.getItem("clipboard"));
        } else {
            clipdit.className = "";
        }

    }, 1000);



});