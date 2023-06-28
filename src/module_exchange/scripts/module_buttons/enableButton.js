const { ipcRenderer } = require("electron");

export function enableModule(uid) {
  const localModules = ipcRenderer.sendSync("get-local-modules");
  localModules[uid].enabled = true;
  ipcRenderer.send("set-local-modules", localModules);
  
}
