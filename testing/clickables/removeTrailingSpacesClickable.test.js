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
});
