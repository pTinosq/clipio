import spaceToUnderscoreClickable from "./clickables/spaceToUnderscoreClickable.js";
import { ClickableFactory } from "./ClickableFactory.js";

document.addEventListener("DOMContentLoaded", () => {
  // Build HTML for editor

  const clickableFactory = new ClickableFactory();
  clickableFactory.clickable = spaceToUnderscoreClickable;
  const clickableHTML = clickableFactory.buildHTML();

  // Append to HTML
  const modules = document.getElementById("modules");
  modules.appendChild(clickableHTML);
});
