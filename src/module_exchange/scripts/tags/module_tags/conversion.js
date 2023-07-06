import { Tag } from "../Tag.js";
import tagColors from "../tagColors.js";

export default class conversionTag extends Tag {
  constructor() {
    super("conversion", tagColors.Grey, true);
  }
}
