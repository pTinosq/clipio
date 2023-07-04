const Event = require("./Event");
const Store = require("electron-store");
const { safeStorage } = require("electron");

class GetGithubToken extends Event {
  constructor() {
    super();
    this.channel = "get-github-token";
    this.listener = (event, args) => {
      const store = new Store();
      const encryptedToken = store.get("githubToken");
      if (!encryptedToken) {
        event.returnValue = false;
        return;
      }

      const tokenBuffer = Buffer.from(encryptedToken, "base64");

      const token = safeStorage.decryptString(tokenBuffer);

      if (!token) {
        event.returnValue = false;
      }

      event.returnValue = token;
    };
  }
}

module.exports = GetGithubToken;