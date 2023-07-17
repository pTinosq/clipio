const DeleteModule = require("./events/DeleteModule");
const GetAppVersion = require("./events/GetAppVersion");
const GetGithubToken = require("./events/GetGithubToken");
const GetLocalModules = require("./events/GetLocalModules");
const GetModuleManifest = require("./events/GetModuleManifest");
const GetModulePath = require("./events/GetModulePath");
const Maximize = require("./events/Maximize");
const Minimize = require("./events/Minimize");
const Relaunch = require("./events/Relaunch");
const SetGithubToken = require("./events/SetGithubToken");
const SetLocalModules = require("./events/SetLocalModules");
const LaunchSettingsWindow = require("./events/LaunchSettingsWindow");

const { ipcMain } = require("electron");

function loadAll() {
  // Loads all ipcMain listeners
  const events = [
    new DeleteModule(),
    new GetAppVersion(),
    new GetGithubToken(),
    new GetLocalModules(),
    new GetModuleManifest(),
    new GetModulePath(),
    new Maximize(),
    new Minimize(),
    new Relaunch(),
    new SetGithubToken(),
    new SetLocalModules(),
    new LaunchSettingsWindow(),
  ];

  events.forEach((event) => {
    ipcMain.on(event.channel, event.listener);
  });
}

module.exports = {
  loadAll,
};
