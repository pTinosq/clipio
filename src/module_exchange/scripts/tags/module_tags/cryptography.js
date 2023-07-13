import { Tag } from "../Tag.js";
import tagColors from "../tagColors.js";

export default class cryptographyTag extends Tag {
  constructor() {
    super("cryptography", tagColors.Teal, true);
  }
}
