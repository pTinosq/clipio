export class Interactor {
  constructor() {
    this.titleElements = [];
    this.contentElements = [];
    this.run = () => {};
  }
}

export class InteractorElement {
  constructor() {
    this.element = null;
    this.isClickable = false;
  }
}
