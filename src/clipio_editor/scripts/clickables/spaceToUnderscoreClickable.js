import { Clickable } from "../Clickable.js";

class SpaceToUnderscordClickable extends Clickable {
  constructor(run, title) {
    super(run);
    this.title = title;
  }
}

const spaceToUnderscoreClickable = new SpaceToUnderscordClickable();

spaceToUnderscoreClickable.title = "Space To Underscore";

spaceToUnderscoreClickable.run = (clipboardContent) => {
  return clipboardContent.replaceAll(" ", "_");
};

export default spaceToUnderscoreClickable;
