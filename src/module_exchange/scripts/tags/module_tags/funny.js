import { Tag } from "../Tag.js";
import tagColors from "../tagColors.js";

export default class funnyTag extends Tag {
  constructor() {
    super("funny", tagColors.Red, true);
  }
}
