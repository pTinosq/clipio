export class Clickable {
  constructor() {
    this.title = "Unknown";
    this.run = () => {};
  }

  setRun(runMethod) {
    this.run = runMethod;
    return this;
  }
}
