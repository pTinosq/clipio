const Event = require("./Event")
const path = require("path");
const fs = require("fs");
const { app } = require("electron");

class GetModuleManifest extends Event {
  constructor() {
    super();
    this.channel = "get-module-manifest";
    this.listener = (event, args) => {
      const localModuleManifestPath = path.join(
        app.getPath("userData"),
        "modules",
        args,
        "module-manifest.json"
      );

      if (fs.lstatSync(localModuleManifestPath).isFile()) {
        const moduleManifest = JSON.parse(
          fs.readFileSync(localModuleManifestPath, { encoding: "utf-8" })
        );

        event.returnValue = moduleManifest;
      } else {
        event.returnValue = {};
      }
    };
  }
}

module.exports = GetModuleManifest;