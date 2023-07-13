let $ = require("jquery");
const { clipboard, shell } = require("electron");

document.addEventListener("DOMContentLoaded", function () {
  // After 1500ms begin fading out the popup window
  let clicked = false;

  setTimeout(() => {
    $("body").fadeOut(2000, function () {
      if (!clicked) {
        window.close();
      } else {
        document.querySelectorAll("img").innerHTML = "";
      }
    });
  }, 1500);

  // Right click to close the popup window
  document.addEventListener("contextmenu", function (event) {
    event.preventDefault();
    clicked = true;

    window.close();
  });

  // Left click to open the editor
  document.addEventListener("click", function (event) {
    clicked = true;
    editor_width = 300;
    editor_height = 600;

    var w = globalThis.screen.availWidth - editor_width;
    var h = globalThis.screen.availHeight - editor_height;

    if (event.target.id == "clipboard") {
      window.open(
        "../clipio_editor/editor.html",
        "_blank",
        `width=${editor_width},height=${editor_height},x=${w},y=${h},frame=false,nodeIntegration=yes,contextIsolation=false,` +
          `alwaysOnTop=true,titlebar=transparent,minHeight=300,minWidth=225`
      );
    }

    if (event.target.id == "browser") {
      shell.openExternal(clipboard.readText());

      window.close();
    }

    if (event.target.id == "folder") {
      shell.openPath(clipboard.readText());

      window.close();
    }
  });
});

// Helper functions
function fadeOut() {
  $("body").fadeOut(2000, function () {
    if (!clicked) {
      window.close();
    } else {
      document.querySelectorAll("img").innerHTML = "";
    }
  });
}

function openEditor() {
  window.open(
    "../clipio_editor/editor.html",
    "_blank",
    `width=${editor_width},height=${editor_height},x=${w},y=${h},frame=false,nodeIntegration=yes,contextIsolation=false,` +
      `alwaysOnTop=true,titlebar=transparent,minHeight=300,minWidth=225`
  );
}

function openBrowser() {
  shell.openExternal(clipboard.readText());

  window.close();
}

function openFolder() {
  shell.openPath(clipboard.readText());

  window.close();
}
