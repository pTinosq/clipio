import { Clickable } from "../../src/clipio_editor/scripts/Clickable.js";

describe("Clickable", () => {
  it("should create an instance with the correct defaults", () => {
    const clickable = new Clickable();
    expect(clickable.title).toBe("Unknown");
    expect(typeof clickable.run).toBe("function");
  });

  it("should update the run method with setRun", () => {
    const clickable = new Clickable();
    const newMethod = () => "new method";
    clickable.setRun(newMethod);
    expect(clickable.run).toBe(newMethod);
  });
});
