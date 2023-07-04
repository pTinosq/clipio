const Event = require("./Event");
const { BrowserWindow } = require("electron");

class Maximize extends Event {
  constructor() {
    super();
    this.channel = "maximize";
    this.listener = (event, args) => {
      const focusedWindow = BrowserWindow.getFocusedWindow();
      if (focusedWindow.isMaximized()) {
        focusedWindow.restore();
      } else {
        focusedWindow.maximize();
      }
    };
  }
}

module.exports = Maximize;