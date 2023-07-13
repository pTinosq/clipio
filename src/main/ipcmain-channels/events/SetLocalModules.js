const Event = require("./Event")
const resetModulesFolder = require("../utils/resetModulesFolder");
const path = require("path");
const fs = require("fs");
const { app } = require("electron");

class SetLocalModules extends Event {
  constructor() {
    super();
    this.channel = "set-local-modules";
    this.listener = (event, args) => {
      const localModulesPath = path.join(
        app.getPath("userData"),
        "modules",
        "Local Modules"
      );

      if (!fs.existsSync(localModulesPath)) {
        resetModulesFolder();
      } else {
        fs.writeFileSync(localModulesPath, JSON.stringify(args));
      }
    };
  }
}

module.exports = SetLocalModules;