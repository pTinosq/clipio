export default class TagGroup {
  constructor(id) {
    this.id = id;
    this.tags = [];
  }

  addTag(tagHTML) {
    tagHTML.addEventListener("click", () => {
      this.removeTag(tagHTML);
    });

    this.tags.push(tagHTML);

    this.buildHTML();
  }

  removeTag(tag) {
    const index = this.tags.indexOf(tag);

    if (index > -1) {
      this.tags.splice(index, 1);
    }

    this.buildHTML();

    return index > -1;
  }

  buildHTML() {
    // Clean existing tag group
    const tagGroupElement = document.getElementById(this.id);
    tagGroupElement.innerHTML = "";

    // Build tag group
    this.tags.forEach((tag) => {
      tagGroupElement.appendChild(tag);
    });

    return tagGroupElement;
  }
}
