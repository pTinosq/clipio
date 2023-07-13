class PopupWindow {
  constructor() {
    this.url = "";
    this.target = "_blank";
    this.width = 75;
    this.height = 75;
    this.frame = false;
    this.nodeIntegration = true;
    this.contextIsolation = false;
    this.transparent = true;
    this.alwaysOnTop = true;
    this.skipTaskbar = true;
    this.titlebar = "transparent";
    this.resizable = false;
  }

  buildFeatures() {
    const widthString = `width=${this.width}`;
    const heightString = `height=${this.height}`;
    const xString = `x=${globalThis.screen.availWidth - this.width}`;
    const yString = `y=${globalThis.screen.availHeight - this.height}`;
    const frameString = `frame=${this.frame}`;
    const nodeIntegrationString = `nodeIntegration=${this.nodeIntegration}`;
    const contextIsolationString = `contextIsolation=${this.contextIsolation}`;
    const transparentString = `transparent=${this.transparent}`;
    const alwaysOnTopString = `alwaysOnTop=${this.alwaysOnTop}`;
    const skipTaskbarString = `skipTaskbar=${this.skipTaskbar}`;
    const titlebarString = `titlebar=${this.titlebar}`;
    const resizableString = `resizable=${this.resizable}`;

    return `${widthString},${heightString},${xString},${yString},${frameString},${nodeIntegrationString},${contextIsolationString},${transparentString},${alwaysOnTopString},${skipTaskbarString},${titlebarString},${resizableString}`;
  }

  open() {
    window.open(this.url, this.target, this.buildFeatures());
  }
}

module.exports = {
  PopupWindow,
};