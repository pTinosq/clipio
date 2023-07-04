const Event = require("./Event");
const { safeStorage } = require("electron");

const Store = require("electron-store");

class SetGithubToken extends Event {
  constructor() {
    super();
    this.channel = "set-github-token";
    this.listener = (event, args) => {
      const store = new Store();
      const token = args;
      if (!token) {
        event.returnValue = false;
        return;
      }

      const encryptedToken = safeStorage.encryptString(token);
      store.set("githubToken", encryptedToken);
      event.returnValue = true;
    };
  }
}

module.exports = SetGithubToken;