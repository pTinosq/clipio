import { ColorPreview } from "./ColorPreview.js";
import { ClickableFactory } from "./ClickableFactory.js";
import { InteractorFactory } from "./InteractorFactory.js";
import { ClipioModule } from "./ClipioModule.js";
import { Clickable } from "./Clickable.js";

// INTERACTORS
import textReplaceInteractor from "./interactors/textReplaceInteractor.js";

const { clipboard } = require("electron");
const { ipcRenderer } = require("electron");

// TODO: Implement REPLACE functionality

const interactors = [textReplaceInteractor];

document.addEventListener("DOMContentLoaded", () => {
  // Add information
  const clipboardContent = clipboard.readText();
  let data_string = `Length: ${clipboardContent.length}\nSpaces: ${
    clipboardContent.split(" ").length - 1
  }`;
  document.getElementById("information").innerHTML = data_string;

  // Detect if color exists and add color preview if so
  if (/#[0-9a-fA-F]{3,6}/.test(clipboardContent)) {
    // Extract color from string
    const informationContent = document.getElementById("information-content");
    const colors = clipboardContent.match(/#[0-9a-fA-F]{3,6}/g);
    const colorPreview = new ColorPreview();
    let infoContentElements = colorPreview.buildHTML(colors);

    for (let i = 0; i < infoContentElements.length; i++) {
      informationContent.appendChild(infoContentElements[i]);
    }
  }

  // Add interactors
  const interactorFactory = new InteractorFactory();
  const buildZone = document.getElementById("build-zone");
  // Prevent text selection when shift clicking
  buildZone.onselectstart = function () {
    return false;
  };

  for (let i = 0; i < interactors.length; i++) {
    // Build the interactor
    const builtInteractor = interactorFactory.buildInteractor(interactors[i]);

    buildZone.appendChild(interactorFactory.buildHTML(builtInteractor));
  }

  // Fetch installed module data
  // Load installed-module-data.json file
  const moduleName = "example-test-module";

  let module = new ClipioModule(moduleName);
  module = module.loadManifest();
  module = module.loadData();

  // Create clickable from module
  const clickable = new Clickable();
  clickable.title = module.name;
  clickable.run = module.data;

  // Add module to build zone
  const clickableFactory = new ClickableFactory();

  const builtClickable = clickableFactory.buildClickable(clickable);
  buildZone.appendChild(clickableFactory.buildHTML(builtClickable));
});
