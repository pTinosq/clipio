import { Clickable } from "../Clickable.js";

class LowercaseClickable extends Clickable {
  constructor(run, title) {
    super(run);
    this.title = title;
  }
}

const lowercaseClickable = new LowercaseClickable();

lowercaseClickable.title = "Lowercase";

lowercaseClickable.run = (clipboardContent) => {
  return clipboardContent.toLowerCase();
};

export default lowercaseClickable;
