import { Clickable } from "../Clickable.js";
const { shell } = require("electron");

class GoogleTranslateClickable extends Clickable {
  constructor(run, title) {
    super(run);
    this.name = title;
  }
}

const googleTranslateClickable = new GoogleTranslateClickable();

googleTranslateClickable.title = "Translate";

googleTranslateClickable.run = (clipboardContent) => {
  if (!clipboardContent) {
    return "";
  }
  const url = `https://translate.google.com/?sl=auto&tl=en&text=${clipboardContent}&op=translate`;
  shell.openExternal(url);

  return clipboardContent;
};

export default googleTranslateClickable;
