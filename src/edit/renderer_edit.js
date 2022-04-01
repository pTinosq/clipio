const {
    ipcRenderer
} = require('electron')

function getHexColour(string) {
    try {
        return string.match(/#[0-9a-fA-F]{3,6}/)[0];
    } catch (e) {
        return false;
    }
}

function add_clickable_module(module_name, module_function) {
    var module = document.createElement("div");
    module.className = "module";
    var module_title = document.createElement("div");
    module_title.className = "module-title";

    var module_title_h1 = document.createElement("h1");
    module_title_h1.innerHTML = module_name;
    module_title_h1.setAttribute("onclick", "clipboard.writeText(" + module_function + "); close_win();");

    module_title.appendChild(module_title_h1);
    module.appendChild(module_title);

    document.getElementById("modules").appendChild(module);

}

function add_detected_colour() {
    var detected_colour = document.createElement("p");
    detected_colour.id = "detected-colour";
    detected_colour.innerHTML = "Detected colour:"


    var colour_display = document.createElement("div");
    colour_display.className = "colour-display";
    colour_display.style = `background: ${getHexColour(localStorage.getItem("clipboard"))}`;

    var colour_display_p = document.createElement("p");
    colour_display_p.innerHTML = getHexColour(localStorage.getItem("clipboard"));

    colour_display.appendChild(colour_display_p);

    if (getHexColour(localStorage.getItem("clipboard")) !== false) {
        document.getElementById("information-content").appendChild(detected_colour);
        document.getElementById("information-content").appendChild(colour_display);
    }
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
        case 'colour':
            add_detected_colour();
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

// UNIT TESTING
module.exports = {
    getHexColour
};