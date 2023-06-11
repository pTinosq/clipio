import removeTrailingSpacesClickable from "../../src/clipio_editor/scripts/clickables/removeTrailingSpacesClickable.js";

describe("RemoveTrailingSpacesClickable", () => {
  test("should set the title correctly", () => {
    removeTrailingSpacesClickable.title = "Remove trailing spaces";
    expect(removeTrailingSpacesClickable.title).toBe("Remove trailing spaces");
  });

  test("should remove trailing spaces from clipboard content", () => {
    const clipboardContent = " Hello, World!  ";
    const expected = "Hello, World!";
    const result = removeTrailingSpacesClickable.run(clipboardContent);
    expect(result).toBe(expected);
  });

  test("should handle empty clipboard content", () => {
    const clipboardContent = "";
    const expected = "";
    const result = removeTrailingSpacesClickable.run(clipboardContent);
    expect(result).toBe(expected);
  });

  test("should handle clipboard content with only spaces", () => {
    const clipboardContent = "   ";
    const expected = "";
    const result = removeTrailingSpacesClickable.run(clipboardContent);
    expect(result).toBe(expected);
  });

  test("should handle clipboard content with special characters", () => {
    const clipboardContent = "$PECIAL #CHARACTERS 123!    ";
    const expected = "$PECIAL #CHARACTERS 123!";
    const result = removeTrailingSpacesClickable.run(clipboardContent);
    expect(result).toBe(expected);
  });

  test("should handle null clipboard content", () => {
    const clipboardContent = null;
    const expected = ""; 
    const result = removeTrailingSpacesClickable.run(clipboardContent);
    expect(result).toBe(expected);
  });
});
