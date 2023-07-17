const { ipcRenderer } = require("electron");

function openSettings() {
  ipcRenderer.send("launch-settings-window");
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("maxi").addEventListener("click", function () {
    ipcRenderer.send("maximize");
  });

  document.getElementById("close").addEventListener("click", function () {
    try {
      window.opener.close();
    } catch (error) {
      if (error instanceof TypeError) {
        window.close();
      }
    }
  });

  document.getElementById("settings").addEventListener("click", function () {
    openSettings();
  });

  document.getElementById("refresh").addEventListener("click", function () {
    window.location.reload();
  });

  // Add onclick event to all hint hrefs
  for (
    let i = 0;
    i < document.getElementsByClassName("hint-href-settings").length;
    i++
  ) {
    document.getElementsByClassName("hint-href-settings")[i].onclick = () => {
      openSettings();
    };
  }
});
