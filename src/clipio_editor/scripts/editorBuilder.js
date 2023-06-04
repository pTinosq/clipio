import spaceToUnderscoreClickable from "./clickables/spaceToUnderscoreClickable.js";
import removeTrailingSpacesClickable from "./clickables/removeTrailingSpacesClickable.js";
import { ClickableFactory } from "./ClickableFactory.js";

const clickables = [spaceToUnderscoreClickable, removeTrailingSpacesClickable];

document.addEventListener("DOMContentLoaded", () => {
  const clickableFactory = new ClickableFactory();
  const modules = document.getElementById("modules");

  for (let i = 0; i < clickables.length; i++) {
    // Build the clickable
    const builtClickable = clickableFactory.buildClickable(clickables[i]);

    modules.appendChild(clickableFactory.buildHTML(builtClickable));
  }
});
