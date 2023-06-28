export class DevInfo {
  constructor(title) {
    this.name = title;
    this.content = [];
  }

  buildHTML() {
    const devInfoContainer = document.createElement("div");
    devInfoContainer.className = "dev-info-container";

    const titleElement = document.createElement("h2");
    titleElement.innerHTML = this.title;

    devInfoContainer.appendChild(titleElement);

    let devInfoList = document.createElement("ul");
    devInfoList.className = "dev-info-list";

    for (let i = 0; i < this.content.length; i++) {
      const element = this.content[i].buildHTML();
      devInfoList.appendChild(element);
    }

    devInfoContainer.appendChild(devInfoList);

    return devInfoContainer;
  }

  tick() {
    for (let i = 0; i < this.content.length; i++) {
      let element = this.content[i];
      if (element.isLive) {
        element.value = element.run();
        element.update();
      }
    }
  }
}

export class DevInfoItem {
  constructor(title, value) {
    this.name = title;
    this.value = value;
    this.isLive = false;
    this.id = null;
    this.class = null;
    this.run = () => {};
  }

  buildHTML() {
    let devInfoItem = document.createElement("li");
    if (this.id) devInfoItem.id = this.id;
    if (this.class) devInfoItem.className = this.class;

    devInfoItem.innerHTML = `${this.title}: ${this.value}`;
    return devInfoItem;
  }

  update() {
    document.getElementById(this.id).innerHTML = `${this.title}: ${this.value}`;
  }
}
