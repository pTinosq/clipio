const { ipcRenderer } = require("electron");

export function uninstallModule(uid, reload = true) {
  const localModules = ipcRenderer.sendSync("get-local-modules");
  delete localModules[uid];
  ipcRenderer.send("set-local-modules", localModules);

  ipcRenderer.send("delete-module", uid);

  if (reload) window.location.reload();
}
