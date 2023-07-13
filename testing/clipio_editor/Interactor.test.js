import {
  Interactor,
  InteractorElement,
} from "../../src/clipio_editor/scripts/Interactor.js";

describe("Interactor", () => {
  it("should create an instance with the correct defaults", () => {
    const interactor = new Interactor();
    expect(interactor.titleElements).toEqual([]);
    expect(interactor.contentElements).toEqual([]);
    expect(typeof interactor.run).toBe("function");
  });
});

describe("InteractorElement", () => {
  it("should create an instance with the correct defaults", () => {
    const interactorElement = new InteractorElement();
    expect(interactorElement.element).toBe(null);
    expect(interactorElement.isClickable).toBe(false);
  });
});
