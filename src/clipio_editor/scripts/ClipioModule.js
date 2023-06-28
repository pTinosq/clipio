const path = require("path");
const fs = require("fs");
const { ipcRenderer } = require("electron");

export class ClipioModule {
  constructor(id) {
    this.id = id;
    this.name = "Module";
    this.version = "0.0.1";
    this.author = "Author";
    this.contributors = [];
    this.description = "A module";
    this.path = ipcRenderer.sendSync("get-app-path", id);
    this.data = "";
    this.enabled = true;
    this.succesfullyLoaded = true;
    this.main = "module.js";
  }

  loadManifest() {
    // Load the manifest.json file
    const manifestPath = path.join(this.path, "module-manifest.json");

    if (fs.existsSync(manifestPath)) {
      const manifest = JSON.parse(fs.readFileSync(manifestPath));
      this.name = manifest.name;
      this.version = manifest.version;
      this.author = manifest.author;
      this.contributors = manifest.contributors;
      this.description = manifest.description;
      this.main = manifest.main;
    } else {
      console.error("Manifest file does not exist for module", this.id);
      this.succesfullyLoaded = false;
    }

    return this;
  }

  loadData() {
    const dataPath = path.join(this.path, this.main);

    if (fs.existsSync(dataPath)) {
      const { run } = require(dataPath);
      this.data = run;
    } else {
      console.error("Data file does not exist for module", this.id);
      this.succesfullyLoaded = false;
    }

    return this;
  }
}

module.exports = ClipioModule;
