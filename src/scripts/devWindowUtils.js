const { ipcRenderer } = require("electron");
const { app } = require("electron");
const Store = require("electron-store");

function disable_dev_window() {
  const store = new Store();
  store.set("showDevWindow", false);
  ipcRenderer.send("relaunch");
}

function hide_dev_window() {
  ipcRenderer.send("minimize");
}
