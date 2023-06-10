import textReplaceInteractor from "../../src/clipio_editor/scripts/interactors/textReplaceInteractor.js";

// Mock document.getElementById
const getElementByIdMock = jest.fn();

beforeAll(() => {
  global.document.getElementById = getElementByIdMock;
});

beforeEach(() => {
  // Reset mock before each test
  getElementByIdMock.mockReset();
});

describe("textReplaceInteractor", () => {
  it("should replace text correctly", () => {
    getElementByIdMock
      .mockReturnValueOnce({ value: "foo" }) // replaceValue input
      .mockReturnValueOnce({ value: "bar" }); // replaceWith input

    const result = textReplaceInteractor.run("foo baz foo");

    expect(result).toBe("bar baz bar");
  });

  it("should handle empty replace value", () => {
    getElementByIdMock
      .mockReturnValueOnce({ value: "" }) // replaceValue input
      .mockReturnValueOnce({ value: "bar" }); // replaceWith input

    const result = textReplaceInteractor.run("foo baz foo");

    expect(result).toBe("foo baz foo"); // No change
  });

  it("should replace with empty string if replaceWith is empty", () => {
    getElementByIdMock
      .mockReturnValueOnce({ value: "foo" }) // replaceValue input
      .mockReturnValueOnce({ value: "" }); // replaceWith input

    const result = textReplaceInteractor.run("foo baz foo");

    expect(result).toBe(" baz "); // 'foo' removed
  });
});
