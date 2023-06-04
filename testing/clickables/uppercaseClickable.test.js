import uppercaseClickable from "../../src/clipio_editor/scripts/clickables/uppercaseClickable.js";

describe("UppercaseClickable", () => {
  test("should set the title correctly", () => {
    uppercaseClickable.title = "Uppercase";
    expect(uppercaseClickable.title).toBe("Uppercase");
  });

  test("should convert clipboard content to uppercase", () => {
    const clipboardContent = "Hello, World!";
    const expected = "HELLO, WORLD!";
    const result = uppercaseClickable.run(clipboardContent);
    expect(result).toBe(expected);
  });
});
