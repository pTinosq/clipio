const {
    clipboard
} = require('electron');

document.addEventListener('DOMContentLoaded', () => {
    var clip = localStorage.getItem("clipboard");
    let data_string = `Length: ${clip.length}\nSpaces: ${clip.split(" ").length -1}`;
    document.getElementById("information").innerHTML = data_string;

});

function replace_module() {
    var clip = localStorage.getItem("clipboard");
    clip = clip.replaceAll(document.getElementById("to_replace").value, document.getElementById("replace_with").value);
    localStorage.setItem("clipboard", clip);
    clipboard.writeText(clip);
    close_win();
}

function space_to_underscore_module() {
    var clip = localStorage.getItem("clipboard");

    // editing section
    clip = clip.replaceAll(" ", "_");



    localStorage.setItem("clipboard", clip);
    clipboard.writeText(clip);
    close_win();
}

function trailing_spaces_module() {
    var clip = localStorage.getItem("clipboard");

    // editing section
    clip = clip.trim();



    localStorage.setItem("clipboard", clip);
    clipboard.writeText(clip);
    close_win();
}

function lowercase_module() {
    var clip = localStorage.getItem("clipboard");

    // editing section
    clip = clip.toLowerCase();



    localStorage.setItem("clipboard", clip);
    clipboard.writeText(clip);
    close_win();
}

function uppercase_module() {
    var clip = localStorage.getItem("clipboard");

    // editing section
    clip = clip.toUpperCase();



    localStorage.setItem("clipboard", clip);
    clipboard.writeText(clip);
    close_win();
}

function remove_formatting_module() {
    var clip = localStorage.getItem("clipboard");

    // lol this just works
    clip = clip;



    localStorage.setItem("clipboard", clip);
    clipboard.writeText(clip);
    close_win();
}