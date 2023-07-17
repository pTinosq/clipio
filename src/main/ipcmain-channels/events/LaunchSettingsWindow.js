const { BrowserWindow } = require("electron");
const Event = require("./Event");

class LaunchSettingsWindow extends Event {
  constructor() {
    super();
    this.channel = "launch-settings-window";
    this.listener = (event, args) => {
      const commonWindowPreferences = {
        nodeIntegration: true,
        contextIsolation: false,
        enableRemoteModule: true,
      };

      const settingsWindow = new BrowserWindow({
        width: 800,
        height: 600,
        minHeight: 200,
        minWidth: 800,
        autoHideMenuBar: false,
        show: true,
        webPreferences: {
          ...commonWindowPreferences,
        },
      });

      settingsWindow.loadFile("./src/settings/settings.html");
    };
  }
}

module.exports = LaunchSettingsWindow;
