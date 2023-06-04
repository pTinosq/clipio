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

  test("should handle empty clipboard content", () => {
    const clipboardContent = "";
    const expected = "";
    const result = lowercaseClickable.run(clipboardContent);
    expect(result).toBe(expected);
  });

  test("should handle clipboard content with only spaces", () => {
    const clipboardContent = "   ";
    const expected = "   ";
    const result = lowercaseClickable.run(clipboardContent);
    expect(result).toBe(expected);
  });

  test("should handle clipboard content with special characters", () => {
    const clipboardContent = "$PECIAL #CHARACTERS 123!";
    const expected = "$pecial #characters 123!";
    const result = lowercaseClickable.run(clipboardContent);
    expect(result).toBe(expected);
  });

  test("should handle null clipboard content", () => {
    const clipboardContent = null;
    const expected = ""; 
    const result = lowercaseClickable.run(clipboardContent);
    expect(result).toBe(expected);
  });

  test("should handle uppercase clipboard content", () => {
    const clipboardContent = "HELLO, WORLD!";
    const expected = "hello, world!";
    const result = lowercaseClickable.run(clipboardContent);
    expect(result).toBe(expected);
  });
});
