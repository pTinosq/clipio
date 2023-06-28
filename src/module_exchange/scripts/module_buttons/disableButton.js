const { ipcRenderer } = require("electron");

export function disableModule(uid) {
  const localModules = ipcRenderer.sendSync("get-local-modules");
  localModules[uid].enabled = false;
  ipcRenderer.send("set-local-modules", localModules);
}
