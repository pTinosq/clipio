import toBase64Clickable from "../../src/clipio_editor/scripts/clickables/toBase64Clickable.js";

describe("ToBase64Clickable", () => {
  test("should set the title correctly", () => {
    toBase64Clickable.title = "To base64";
    expect(toBase64Clickable.title).toBe("To base64");
  });

  test("should convert clipboard content to base64", () => {
    const clipboardContent = "Hello, World!";
    const expected = "SGVsbG8sIFdvcmxkIQ==";
    const result = toBase64Clickable.run(clipboardContent);
    expect(result).toBe(expected);
  });

  test("should handle empty clipboard content", () => {
    const clipboardContent = "";
    const expected = "";
    const result = toBase64Clickable.run(clipboardContent);
    expect(result).toBe(expected);
  });

  test("should handle clipboard content with only spaces", () => {
    const clipboardContent = "   ";
    const expected = "ICAg";
    const result = toBase64Clickable.run(clipboardContent);
    expect(result).toBe(expected);
  });

  test("should handle clipboard content with special characters", () => {
    const clipboardContent = "$PECIAL #CHARACTERS 123!";
    const expected = "JFBFQ0lBTCAjQ0hBUkFDVEVSUyAxMjMh";
    const result = toBase64Clickable.run(clipboardContent);
    expect(result).toBe(expected);
  });

  test("should handle null clipboard content", () => {
    const clipboardContent = null;
    const expected = "";
    const result = toBase64Clickable.run(clipboardContent);
    expect(result).toBe(expected);
  });
});
