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

  document.getElementById("settings").addEventListener("click", function () {
    const settings_width = 770;
    const settings_height = 420;

    window.open(
      "../settings/settings.html",
      "_blank",
      `width=${settings_width},height=${settings_height},frame=true,autoHideMenuBar=true, nodeIntegration=yes,contextIsolation=false,`
    );
  });

  document.getElementById("refresh").addEventListener("click", function () {
    window.location.reload();
  });
});
