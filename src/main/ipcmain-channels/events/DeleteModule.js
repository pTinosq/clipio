const Event = require("./Event");
const path = require("path");
const fs = require("fs");
const { app } = require("electron");

class DeleteModule extends Event {
  constructor() {
    super();
    this.channel = "delete-module";
    this.listener = (event, args) => {
      const uid = args;
      const modulePath = path.join(app.getPath("userData"), "modules", uid);

      fs.rmSync(modulePath, { recursive: true });
    };
  }
}

module.exports = DeleteModule;  

