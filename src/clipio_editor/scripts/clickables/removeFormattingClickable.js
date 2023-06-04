import { Clickable } from "../Clickable.js";

class RemoveFormattingClickable extends Clickable {
  constructor(run, title) {
    super(run);
    this.title = title;
  }
}

const removeFormattingClickable = new RemoveFormattingClickable();

removeFormattingClickable.title = "Remove formatting";

removeFormattingClickable.run = (clipboardContent) => {
  // This removes all formatting from the clipboard content
  // Yeah, it's weird, but it works
  return clipboardContent;
};

export default removeFormattingClickable;
