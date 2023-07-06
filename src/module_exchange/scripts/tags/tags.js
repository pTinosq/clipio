import conversion from "./module_tags/conversion.js";
import cryptography from "./module_tags/cryptography.js";
import design from "./module_tags/design.js";
import development from "./module_tags/development.js";
import finance from "./module_tags/finance.js";
import formatting from "./module_tags/formatting.js";
import funny from "./module_tags/funny.js";
import web from "./module_tags/web.js";

function getTagByName(name) {
  const tags = [
    new conversion(),
    new cryptography(),
    new design(),
    new development(),
    new finance(),
    new formatting(),
    new funny(),
    new web(),
  ];

  return tags.find((tag) => tag.name === name);
}

export default {
  conversion,
  cryptography,
  design,
  development,
  finance,
  formatting,
  funny,
  web,
  getTagByName,
};
