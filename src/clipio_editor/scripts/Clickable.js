export class Clickable {
  constructor() {
    this.name = "Unknown";
    this.run = () => {};
  }

  setRun(runMethod) {
    this.run = runMethod;
    return this;
  }
}
