import { Clickable } from "../Clickable.js";

class SpaceToUnderscoreClickable extends Clickable {
  constructor(run, title) {
    super(run);
    this.title = title;
  }
}

const spaceToUnderscoreClickable = new SpaceToUnderscoreClickable();

spaceToUnderscoreClickable.title = "Space to underscore";

spaceToUnderscoreClickable.run = (clipboardContent) => {
  console.log("Spaces");
  return clipboardContent.replaceAll(" ", "_");
};

export default spaceToUnderscoreClickable;
