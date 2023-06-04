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
});
