const Event = require("./Event");
const { app } = require("electron");

class GetAppVersion extends Event {
  constructor() {
    super();
    this.channel = "get-app-version";
    this.listener = (event, args) => {
      event.returnValue = app.getVersion();
    };
  }
}

module.exports = GetAppVersion;
