import Default from "./tag_colors/Default.js";

export default class Tag {
  constructor(name, color = Default) {
    this.name = name;
    this.color = color;
  }

  buildHTML() {
    const tagElement = document.createElement("div");
    tagElement.classList.add("tag");
    tagElement.style.color = this.color.textColor;
    tagElement.style.backgroundColor = this.color.backgroundColor;

    // Tag text
    const tagText = document.createElement("span");
    tagText.innerHTML = this.name;
    tagElement.appendChild(tagText);

    // Tag cross
    const tagRemove = document.createElement("span");
    tagRemove.innerHTML = "x";
    tagRemove.classList.add("tag-remove");
    tagElement.appendChild(tagRemove);

    return tagElement;
  }
}
