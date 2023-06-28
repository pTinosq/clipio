import { Clickable } from "../Clickable.js";

class RemoveTrailingSpacesClickable extends Clickable {
  constructor(run, title) {
    super(run);
    this.name = title;
  }
}

const removeTrailingSpacesClickable = new RemoveTrailingSpacesClickable();

removeTrailingSpacesClickable.title = "Remove trailing spaces";

removeTrailingSpacesClickable.run = (clipboardContent) => {
  if (!clipboardContent) {
    return "";
  }
  return clipboardContent.trim();
};

export default removeTrailingSpacesClickable;
