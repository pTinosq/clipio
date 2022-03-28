const {
    ipcRenderer
} = require('electron')

function add_clickable_module(module_name, module_function) {
    var module = document.createElement("div");
    module.className = "module";
    module.id = "eee";

    var module_title = document.createElement("div");
    module_title.className = "module-title";

    var module_title_h1 = document.createElement("h1");
    module_title_h1.innerHTML = module_name;
    module_title_h1.setAttribute("onclick", "clipboard.writeText(" + module_function + "); close_win();");

    module_title.appendChild(module_title_h1);
    module.appendChild(module_title);

    document.getElementById("modules").appendChild(module);

}



document.addEventListener('DOMContentLoaded', function (event) {

    switch (localStorage.getItem('type')) {
        case 'url':
            break;
        case 'base64':
            add_clickable_module("Base64 to text", "from_base64()");
            break;
        case 'default':
            break;
    }

    document.getElementById("maxi").addEventListener("click", function () {
        ipcRenderer.send('maximize');
    });

    document.getElementById("close").addEventListener("click", function () {
        close_win();
    });

    // ENTER FUNCTIONALITY

    document.getElementById("to_replace").addEventListener("keyup", ({
        key
    }) => {
        if (key === "Enter") {
            replace_module();
        }
    })

    document.getElementById("replace_with").addEventListener("keyup", ({
        key
    }) => {
        if (key === "Enter") {
            replace_module();
        }
    })
});

function close_win() {
    try {
        window.opener.close();
    } catch (error) {
        if (error instanceof TypeError) {
            window.close();
        }
    }
}