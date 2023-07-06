import { Tag } from "../Tag.js";
import tagColors from "../tagColors.js";

export default class developmentTag extends Tag {
  constructor() {
    super("development", tagColors.Blue, true);
  }
}
