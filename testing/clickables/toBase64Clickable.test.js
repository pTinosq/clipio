import toBase64Clickable from "../../src/clipio_editor/scripts/clickables/toBase64Clickable.js";

describe("ToBase64Clickable", () => {
  test("should set the title correctly", () => {
    toBase64Clickable.title = "To base64";
    expect(toBase64Clickable.title).toBe("To base64");
  });

  test("should convert clipboard content to base64", () => {
    const clipboardContent = "Hello, World!";
    const expected = Buffer.from(clipboardContent, "utf-8").toString("base64");
    const result = toBase64Clickable.run(clipboardContent);
    expect(result).toBe(expected);
  });
});
