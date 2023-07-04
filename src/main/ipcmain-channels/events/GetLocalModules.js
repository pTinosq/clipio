const Event = require("./Event")
const resetModulesFolder = require("../utils/resetModulesFolder");
const path = require("path");
const fs = require("fs");
const { app } = require("electron");

class GetLocalModules extends Event {
  constructor() {
    super();
    this.channel = "get-local-modules";
    this.listener = (event, args) => {
      const localModulesPath = path.join(
        app.getPath("userData"),
        "modules",
        "Local Modules"
      );

      if (!fs.existsSync(localModulesPath)) {
        resetModulesFolder();
        event.returnValue = {};
      } else {
        // Read local modules file
        const localModules = JSON.parse(
          fs.readFileSync(localModulesPath, { encoding: "utf-8" })
        );

        event.returnValue = localModules;
      }
    };
  }
}

module.exports = GetLocalModules;