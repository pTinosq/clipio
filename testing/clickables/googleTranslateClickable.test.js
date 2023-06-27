import googleTranslateClickable from "../../src/clipio_editor/scripts/clickables/googleTranslateClickable";

const { shell } = require("electron");

jest.mock("electron", () => ({
  shell: {
    openExternal: jest.fn(),
  },
}));

describe("GoogleTranslateClickable", () => {
  beforeEach(() => {
    shell.openExternal.mockClear();
  });

  test("should set the title correctly", () => {
    googleTranslateClickable.title = "Translate";
    expect(googleTranslateClickable.title).toBe("Translate");
  });

  test("should open Google Translate URL and return clipboard content", () => {
    const clipboardContent = "Hello";
    const expectedURL =
      "https://translate.google.com/?sl=auto&tl=en&text=Hello&op=translate";

    const result = googleTranslateClickable.run(clipboardContent);

    expect(shell.openExternal).toHaveBeenCalledWith(expectedURL);
    expect(result).toBe(clipboardContent);
  });

  test("should not modify clipboard content", () => {
    const clipboardContent = "Hello";
    const expected = "Hello";

    const result = googleTranslateClickable.run(clipboardContent);

    expect(shell.openExternal).toHaveBeenCalled();
    expect(result).toBe(expected);
  });

  test("should handle empty clipboard content", () => {
    const clipboardContent = "";
    const expected = "";

    const result = googleTranslateClickable.run(clipboardContent);

    expect(shell.openExternal).not.toHaveBeenCalled();
    expect(result).toBe(expected);
  });

  test("should handle clipboard content with only spaces", () => {
    const clipboardContent = "   ";
    const expected = "   ";

    const result = googleTranslateClickable.run(clipboardContent);

    expect(shell.openExternal).toHaveBeenCalled();
    expect(result).toBe(expected);
  });

  test("should handle clipboard content with special characters", () => {
    const clipboardContent = "$PECIAL #CHARACTERS 123!";
    const expected = "$PECIAL #CHARACTERS 123!";

    const result = googleTranslateClickable.run(clipboardContent);

    expect(shell.openExternal).toHaveBeenCalledWith(
      expect.stringContaining(clipboardContent)
    );
    expect(result).toBe(expected);
  });

  test("should handle null clipboard content", () => {
    const clipboardContent = null;
    const expected = "";

    const result = googleTranslateClickable.run(clipboardContent);

    expect(shell.openExternal).not.toHaveBeenCalled();
    expect(result).toBe(expected);
  });

  test("should handle uppercase clipboard content", () => {
    const clipboardContent = "HELLO, WORLD!";
    const expectedURL =
      "https://translate.google.com/?sl=auto&tl=en&text=HELLO, WORLD!&op=translate";

    const result = googleTranslateClickable.run(clipboardContent);

    expect(shell.openExternal).toHaveBeenCalledWith(expectedURL);
    expect(result).toBe(clipboardContent);
  });
});
