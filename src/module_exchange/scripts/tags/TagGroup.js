export default class TagGroup {
  constructor(id) {
    this.id = id;
    this.tags = [];
  }

  addTag(tag) {
    this.tags.push(tag);
  }

  removeTag(tag) {
    const index = this.tags.indexOf(tag);

    if (index > -1) {
      this.tags.splice(index, 1);
    }
  }

  containsTag(tag) {
    return this.tags.map((t) => t.name).includes(tag.name);
  }

  buildHTML() {
    const tagGroupElement = document.createElement("div");
    tagGroupElement.classList.add("tag-group");
    tagGroupElement.id = this.id;

    // Build tag group
    this.tags.forEach((tag) => {
      const tagElement = tag.buildHTML();

      if (tag.removable) {
        tagElement.addEventListener("click", () => {
          this.removeTag(tag);
          this.updateHTML(this.id);
        });
      }
      tagGroupElement.appendChild(tagElement);
    });

    return tagGroupElement;
  }

  updateHTML(id) {
    const tagGroupElement = document.getElementById(id);

    tagGroupElement.innerHTML = "";

    const newTagGroupElement = this.buildHTML();

    tagGroupElement.appendChild(newTagGroupElement);
  }
}
