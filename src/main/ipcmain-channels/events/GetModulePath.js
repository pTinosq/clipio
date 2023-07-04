const Event = require("./Event");
const path = require("path");
const { app } = require("electron");

class GetModulePath extends Event {
  constructor() {
    super();
    this.channel = "get-module-path";
    this.listener = (event, args) => {
      const uid = args;
      event.returnValue = path.join(app.getPath("userData"), "modules", uid);
    };
  }
}

module.exports = GetModulePath;
