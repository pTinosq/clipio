let $ = require('jquery');
const {
    shell
} = require('electron');

document.addEventListener('DOMContentLoaded', function () {

    var clicked = false;
    setTimeout(() => {
        $('body').fadeOut(2000, function () {
            if (!clicked) {
                window.close();
            } else {

                document.querySelectorAll("img").innerHTML = "";
            }
        });
    }, 1500);


    document.addEventListener('contextmenu', function (event) {
        event.preventDefault();

        clicked = true;
        window.close();


    });

    document.addEventListener('click', function (event) {

        clicked = true;
        editor_width = 300;
        editor_height = 600;

        var w = globalThis.screen.availWidth - editor_width;
        var h = globalThis.screen.availHeight - editor_height;

        if (event.target.id == "clipboard") {

            window.open(
                '../edit/edit.html',
                '_blank',
                `width=${editor_width},height=${editor_height},x=${w},y=${h},frame=false,nodeIntegration=yes,contextIsolation=false,` +
                `alwaysOnTop=true,titlebar=transparent`
            );
        }
        if (event.target.id == "browser") {
            shell.openExternal(localStorage.getItem('clipboard'))
        }


    });
});