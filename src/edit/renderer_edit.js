const {
    ipcRenderer
} = require('electron')

document.addEventListener('DOMContentLoaded', function (event) {

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
    window.opener.close();
}