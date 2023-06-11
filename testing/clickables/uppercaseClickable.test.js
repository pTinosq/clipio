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

  test("should handle empty clipboard content", () => {
    const clipboardContent = "";
    const expected = "";
    const result = uppercaseClickable.run(clipboardContent);
    expect(result).toBe(expected);
  });

  test("should handle clipboard content with only spaces", () => {
    const clipboardContent = "   ";
    const expected = "   ";
    const result = uppercaseClickable.run(clipboardContent);
    expect(result).toBe(expected);
  });

  test("should handle clipboard content with special characters", () => {
    const clipboardContent = "$pecial #characters 123!";
    const expected = "$PECIAL #CHARACTERS 123!";
    const result = uppercaseClickable.run(clipboardContent);
    expect(result).toBe(expected);
  });

  test("should handle null clipboard content", () => {
    const clipboardContent = null;
    const expected = "";
    const result = uppercaseClickable.run(clipboardContent);
    expect(result).toBe(expected);
  });

  test("should handle clipboard content that's already uppercase", () => {
    const clipboardContent = "HELLO, WORLD!";
    const expected = "HELLO, WORLD!";
    const result = uppercaseClickable.run(clipboardContent);
    expect(result).toBe(expected);
  });
});
