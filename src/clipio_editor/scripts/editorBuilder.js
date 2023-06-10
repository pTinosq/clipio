import { ColorPreview } from "./ColorPreview.js";
import { ClickableFactory } from "./ClickableFactory.js";
import { InteractorFactory } from "./InteractorFactory.js";

// CLICKABLES
import spaceToUnderscoreClickable from "./clickables/spaceToUnderscoreClickable.js";
import removeTrailingSpacesClickable from "./clickables/removeTrailingSpacesClickable.js";
import uppercaseClickable from "./clickables/uppercaseClickable.js";
import lowercaseClickable from "./clickables/lowercaseClickable.js";
import removeFormattingClickable from "./clickables/removeFormattingClickable.js";
import toBase64Clickable from "./clickables/toBase64Clickable.js";

// INTERACTORS
import textReplaceInteractor from "./interactors/textReplaceInteractor.js";

const { clipboard } = require("electron");

// TODO: Implement REPLACE functionality

const clickables = [
  spaceToUnderscoreClickable,
  removeTrailingSpacesClickable,
  uppercaseClickable,
  lowercaseClickable,
  removeFormattingClickable,
  toBase64Clickable,
];

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
    const color = clipboardContent.match(/#[0-9a-fA-F]{3,6}/)[0];
    const colorPreview = new ColorPreview();
    let infoContentElements = colorPreview.buildHTML(color);

    for (let i = 0; i < infoContentElements.length; i++) {
      informationContent.appendChild(infoContentElements[i]);
    }
  }

  // Add interactors
  const interactorFactory = new InteractorFactory();
  const modules = document.getElementById("modules");

  for (let i = 0; i < interactors.length; i++) {
    // Build the interactor
    const builtInteractor = interactorFactory.buildInteractor(interactors[i]);

    modules.appendChild(interactorFactory.buildHTML(builtInteractor));
  }

  // Add clickables
  const clickableFactory = new ClickableFactory();

  for (let i = 0; i < clickables.length; i++) {
    // Build the clickable
    const builtClickable = clickableFactory.buildClickable(clickables[i]);

    modules.appendChild(clickableFactory.buildHTML(builtClickable));
  }
});
