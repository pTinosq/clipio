const { ipcRenderer } = require("electron");


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
});
