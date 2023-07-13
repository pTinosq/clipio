import { Tag } from "../Tag.js";
import tagColors from "../tagColors.js";

export default class formattingTag extends Tag {
  constructor() {
    super("formatting", tagColors.Purple, true);
  }
}
