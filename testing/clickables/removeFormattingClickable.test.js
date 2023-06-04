import removeFormattingClickable from "../../src/clipio_editor/scripts/clickables/removeFormattingClickable.js";

describe("RemoveFormattingClickable", () => {
  test("should set the title correctly", () => {
    removeFormattingClickable.title = "Remove formatting";
    expect(removeFormattingClickable.title).toBe("Remove formatting");
  });

  test("should return clipboard content without changes", () => {
    const clipboardContent = "Hello, World!";
    const expected = "Hello, World!";
    const result = removeFormattingClickable.run(clipboardContent);
    expect(result).toBe(expected);
  });

  test("should handle empty clipboard content", () => {
    const clipboardContent = "";
    const expected = "";
    const result = removeFormattingClickable.run(clipboardContent);
    expect(result).toBe(expected);
  });

  test("should handle clipboard content with only spaces", () => {
    const clipboardContent = "   ";
    const expected = "   ";
    const result = removeFormattingClickable.run(clipboardContent);
    expect(result).toBe(expected);
  });

  test("should handle clipboard content with special characters", () => {
    const clipboardContent = "$PECIAL #CHARACTERS 123!";
    const expected = "$PECIAL #CHARACTERS 123!";
    const result = removeFormattingClickable.run(clipboardContent);
    expect(result).toBe(expected);
  });

  test("should handle null clipboard content", () => {
    const clipboardContent = null;
    const expected = ""; 
    const result = removeFormattingClickable.run(clipboardContent);
    expect(result).toBe(expected);
  });
});
