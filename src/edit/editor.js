const {
    clipboard
} = require('electron');

document.addEventListener('DOMContentLoaded', () => {
    var clip = localStorage.getItem("clipboard");
    let data_string = `Length: ${clip.length}\nSpaces: ${clip.split(" ").length -1}`;
    document.getElementById("information").innerHTML = data_string;

});

function from_base64() {
    var clip = localStorage.getItem("clipboard");

    // editing section
    clip = Buffer.from(clip, 'base64').toString('utf-8');

    localStorage.setItem("clipboard", clip);
    return clip;
}

function to_base64() {
    var clip = localStorage.getItem("clipboard");

    // editing section
    clip = Buffer.from(clip, 'utf-8').toString('base64');

    localStorage.setItem("clipboard", clip);
    return clip;
}

function replace_module() {
    var clip = localStorage.getItem("clipboard");

    // editing section
    clip = clip.replaceAll(document.getElementById("to_replace").value, document.getElementById("replace_with").value);

    localStorage.setItem("clipboard", clip);
    return clip;
}

function space_to_underscore_module() {
    var clip = localStorage.getItem("clipboard");

    // editing section
    clip = clip.replaceAll(" ", "_");

    localStorage.setItem("clipboard", clip);
    return clip;
}

function trailing_spaces_module() {
    var clip = localStorage.getItem("clipboard");

    // editing section
    clip = clip.trim();

    localStorage.setItem("clipboard", clip);
    return clip;
}

function lowercase_module() {
    var clip = localStorage.getItem("clipboard");

    // editing section
    clip = clip.toLowerCase();

    localStorage.setItem("clipboard", clip);
    return clip;
}

function uppercase_module() {
    var clip = localStorage.getItem("clipboard");

    // editing section
    clip = clip.toUpperCase();

    localStorage.setItem("clipboard", clip);
    return clip;
}

function remove_formatting_module() {
    var clip = localStorage.getItem("clipboard");

    // lol this just works
    clip = clip;

    localStorage.setItem("clipboard", clip);
    return clip;
}



// UNIT TESTING
module.exports = {
    clipboard,
    replace_module,
    space_to_underscore_module,
    trailing_spaces_module,
    lowercase_module,
    uppercase_module,
    remove_formatting_module,
    from_base64,
    to_base64
};