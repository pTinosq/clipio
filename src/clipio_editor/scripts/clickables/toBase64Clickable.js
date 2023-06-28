import { Clickable } from "../Clickable.js";

class ToBase64Clickable extends Clickable {
  constructor(run, title) {
    super(run);
    this.name = title;
  }
}

const toBase64Clickable = new ToBase64Clickable();

toBase64Clickable.title = "To base64";

toBase64Clickable.run = (clipboardContent) => {
  if (!clipboardContent) {
    return "";
  }
  return Buffer.from(clipboardContent, "utf-8").toString("base64");
};

export default toBase64Clickable;
