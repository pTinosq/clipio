import { Clickable } from "../Clickable.js";

class UppercaseClickable extends Clickable {
  constructor(run, title) {
    super(run);
    this.name = title;
  }
}

const uppercaseClickable = new UppercaseClickable();

uppercaseClickable.title = "Uppercase";

uppercaseClickable.run = (clipboardContent) => {
  if (!clipboardContent) {
    return "";
  }
  return clipboardContent.toUpperCase();
};

export default uppercaseClickable;
