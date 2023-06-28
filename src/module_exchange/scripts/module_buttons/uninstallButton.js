const { ipcRenderer } = require("electron");

export function uninstallModule(uid) {
  const localModules = ipcRenderer.sendSync("get-local-modules");
  delete localModules[uid];
  ipcRenderer.send("set-local-modules", localModules);

  ipcRenderer.send("delete-module", uid);
  window.location.reload();
}
