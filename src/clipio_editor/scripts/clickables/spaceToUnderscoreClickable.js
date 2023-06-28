import { Clickable } from "../Clickable.js";

class SpaceToUnderscoreClickable extends Clickable {
  constructor(run, title) {
    super(run);
    this.name = title;
  }
}

const spaceToUnderscoreClickable = new SpaceToUnderscoreClickable();

spaceToUnderscoreClickable.title = "Space to underscore";

spaceToUnderscoreClickable.run = (clipboardContent) => {
  if (!clipboardContent) {
    return "";
  }
  return clipboardContent.replaceAll(" ", "_");
};

export default spaceToUnderscoreClickable;
