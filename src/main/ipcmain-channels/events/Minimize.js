const Event = require("./Event");
const { BrowserWindow } = require("electron");

class Minimize extends Event {
  constructor() {
    super();
    this.channel = "minimize";
    this.listener = (event, args) => {
      const window = BrowserWindow.getFocusedWindow();
      window.minimize();
    };
  }
}

module.exports = Minimize;