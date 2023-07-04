const { app } = require("electron");
const Event = require("./Event");

class Relaunch extends Event {
  constructor() {
    super();
    this.channel = "relaunch";
    this.listener = (event, args) => {
      app.relaunch();
      app.exit();
    };
  }
}

module.exports = Relaunch;