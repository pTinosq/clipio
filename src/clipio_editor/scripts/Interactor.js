export class Interactor {
  constructor() {
    this.titleElements = [];
    this.contentElements = [];
    this.run = () => {};
  }
}

export class InteractorElement {
  constructor() {
    this.element = document.createElement("div");
    this.isClickable = false;
  }
}
