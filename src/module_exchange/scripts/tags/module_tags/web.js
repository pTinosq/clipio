import { Tag } from "../Tag.js";
import tagColors from "../tagColors.js";

export default class webTag extends Tag {
  constructor() {
    super("web", tagColors.Purple, true);
  }
}
