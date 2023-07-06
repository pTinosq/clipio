import Default from "./tag_colors/Default.js";

class Tag {
  constructor(name, color = Default, removable = false) {
    this.name = name;
    this.color = color;
    this.removable = removable;
  }

  buildHTML() {
    const tagElement = document.createElement("span");
    tagElement.classList.add("tag");
    tagElement.style.color = this.color.textColor;
    tagElement.style.backgroundColor = this.color.backgroundColor;
    tagElement.innerHTML = this.name;

    // Tag cross
    if (this.removable) {
      const tagRemove = document.createElement("span");
      tagRemove.innerHTML = "x";
      tagRemove.classList.add("tag-remove");
      tagElement.appendChild(tagRemove);
    }
    return tagElement;
  }
}

export { Tag };
