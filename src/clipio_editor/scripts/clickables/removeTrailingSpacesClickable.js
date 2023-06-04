import { Clickable } from "../Clickable.js";

class RemoveTrailingSpacesClickable extends Clickable {
  constructor(run, title) {
    super(run);
    this.title = title;
  }
}

const removeTrailingSpacesClickable = new RemoveTrailingSpacesClickable();

removeTrailingSpacesClickable.title = "Remove trailing spaces";

removeTrailingSpacesClickable.run = (clipboardContent) => {
  console.log('Trimming');
  return clipboardContent.trim();
};

export default removeTrailingSpacesClickable;
