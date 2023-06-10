class PopupWindow {
  constructor() {
    this.url = "";
    this.target = "_blank";
    this.width = 150;
    this.height = 75;
    this.x = globalThis.screen.availWidth - this.width;
    this.y = globalThis.screen.availHeight - this.height;
    this.frame = false;
    this.nodeIntegration = true;
    this.contextIsolation = false;
    this.transparent = true;
    this.alwaysOnTop = true;
    this.skipTaskbar = true;
    this.titlebar = "transparent";
    this.resizable = false;
  }

  buildURL(url) {
    this.url = url;
    return url;
  }

    buildTarget(target) {
    this.target = target;
    return this;
    }

    buildFeatures(features) {

}
