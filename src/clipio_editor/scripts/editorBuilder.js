import spaceToUnderscoreClickable from "./clickables/spaceToUnderscoreClickable.js";
import removeTrailingSpacesClickable from "./clickables/removeTrailingSpacesClickable.js";
import uppercaseClickable from "./clickables/uppercaseClickable.js";
import lowercaseClickable from "./clickables/lowercaseClickable.js";
import removeFormattingClickable from "./clickables/removeFormattingClickable.js";
import toBase64Clickable from "./clickables/toBase64Clickable.js";
import { ClickableFactory } from "./ClickableFactory.js";
import { ColorPreview } from "./ColorPreview.js";

const { clipboard } = require("electron");

const clickables = [
  spaceToUnderscoreClickable,
  removeTrailingSpacesClickable,
  uppercaseClickable,
  lowercaseClickable,
  removeFormattingClickable,
  toBase64Clickable,
];

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
    const color = clipboardContent.match(/#[0-9a-fA-F]{3,6}/)[0];
    const colorPreview = new ColorPreview();
    colorPreview.buildHTML(color);
    // The colour is #f2f
    // The colour is #00d9f0
  }

  // Add modules
  const clickableFactory = new ClickableFactory();
  const modules = document.getElementById("modules");

  for (let i = 0; i < clickables.length; i++) {
    // Build the clickable
    const builtClickable = clickableFactory.buildClickable(clickables[i]);

    modules.appendChild(clickableFactory.buildHTML(builtClickable));
  }
});
