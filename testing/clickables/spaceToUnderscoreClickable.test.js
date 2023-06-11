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

  test("should handle empty clipboard content", () => {
    const clipboardContent = "";
    const expected = "";
    const result = spaceToUnderscoreClickable.run(clipboardContent);
    expect(result).toBe(expected);
  });

  test("should handle clipboard content with only spaces", () => {
    const clipboardContent = "   ";
    const expected = "___";
    const result = spaceToUnderscoreClickable.run(clipboardContent);
    expect(result).toBe(expected);
  });

  test("should handle clipboard content with special characters", () => {
    const clipboardContent = "$PECIAL #CHARACTERS 123!";
    const expected = "$PECIAL_#CHARACTERS_123!";
    const result = spaceToUnderscoreClickable.run(clipboardContent);
    expect(result).toBe(expected);
  });

  test("should handle null clipboard content", () => {
    const clipboardContent = null;
    const expected = ""; 
    const result = spaceToUnderscoreClickable.run(clipboardContent);
    expect(result).toBe(expected);
  });

  test("should replace multiple consecutive spaces with underscores", () => {
    const clipboardContent = "Hello,    World!";
    const expected = "Hello,____World!";
    const result = spaceToUnderscoreClickable.run(clipboardContent);
    expect(result).toBe(expected);
  });
});
