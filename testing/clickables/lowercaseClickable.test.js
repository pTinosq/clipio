import lowercaseClickable from "../../src/clipio_editor/scripts/clickables/lowercaseClickable.js";

describe("LowercaseClickable", () => {
  test("should set the title correctly", () => {
    lowercaseClickable.title = "Lowercase";
    expect(lowercaseClickable.title).toBe("Lowercase");
  });

  test("should return lowercase clipboard content", () => {
    const clipboardContent = "Hello, World!";
    const expected = "hello, world!";
    const result = lowercaseClickable.run(clipboardContent);
    expect(result).toBe(expected);
  });
});
