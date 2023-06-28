import { Clickable } from "../Clickable.js";

class LowercaseClickable extends Clickable {
  constructor(run, title) {
    super(run);
    this.name = title;
  }
}

const lowercaseClickable = new LowercaseClickable();

lowercaseClickable.title = "Lowercase";

lowercaseClickable.run = (clipboardContent) => {
  if (!clipboardContent) {
    return "";
  }
  return clipboardContent.toLowerCase();
};

export default lowercaseClickable;
