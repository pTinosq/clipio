import spaceToUnderscoreClickable from "./clickables/spaceToUnderscoreClickable.js";
import removeTrailingSpacesClickable from "./clickables/removeTrailingSpacesClickable.js";
import uppercaseClickable from "./clickables/uppercaseClickable.js";
import lowercaseClickable from "./clickables/lowercaseClickable.js";
import removeFormattingClickable from "./clickables/removeFormattingClickable.js";
import { ClickableFactory } from "./ClickableFactory.js";

const clickables = [
  spaceToUnderscoreClickable,
  removeTrailingSpacesClickable,
  uppercaseClickable,
  lowercaseClickable,
  removeFormattingClickable,
];

document.addEventListener("DOMContentLoaded", () => {
  const clickableFactory = new ClickableFactory();
  const modules = document.getElementById("modules");

  for (let i = 0; i < clickables.length; i++) {
    // Build the clickable
    const builtClickable = clickableFactory.buildClickable(clickables[i]);

    modules.appendChild(clickableFactory.buildHTML(builtClickable));
  }
});
