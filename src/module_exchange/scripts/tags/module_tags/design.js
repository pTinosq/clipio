import { Tag } from "../Tag.js";
import tagColors from "../tagColors.js";

export default class designTag extends Tag {
  constructor() {
    super("design", tagColors.Green, true);
  }
}
