import spaceToUnderscoreClickable from "../../src/clipio_editor/scripts/clickables/spaceToUnderscoreClickable.js";

describe("SpaceToUnderscoreClickable", () => {
  test("should set the title correctly", () => {
    spaceToUnderscoreClickable.title = "Space to underscore";
    expect(spaceToUnderscoreClickable.title).toBe("Space to underscore");
  });

  test("should replace spaces in clipboard content with underscores", () => {
    const clipboardContent = "Hello, World!";
    const expected = "Hello,_World!";
    const result = spaceToUnderscoreClickable.run(clipboardContent);
    expect(result).toBe(expected);
  });
});
