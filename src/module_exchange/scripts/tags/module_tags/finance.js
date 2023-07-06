import { Tag } from "../Tag.js";
import tagColors from "../tagColors.js";

export default class financeTag extends Tag {
  constructor() {
    super("finance", tagColors.Yellow, true);
  }
}
