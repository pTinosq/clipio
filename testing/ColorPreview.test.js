import { ColorPreview } from "../src/clipio_editor/scripts/ColorPreview.js";

describe("ColorPreview", () => {
  let createElementMock;
  let colorPreview;

  beforeEach(() => {
    // Mock document.createElement
    createElementMock = jest.fn().mockImplementation((tag) => {
      return {
        innerHTML: "",
        className: "",
        style: "",
        tagName: tag.toUpperCase(),
      };
    });
    global.document.createElement = createElementMock;

    // Create a new instance of ColorPreview for each test
    colorPreview = new ColorPreview();
  });

  it("buildHTML creates elements with correct properties", () => {
    const color = "#ff0000";
    const elements = colorPreview.buildHTML(color);

    // Check that two elements were returned
    expect(elements.length).toBe(2);

    // Check the properties of the first element
    const detectedColor = elements[0];
    expect(detectedColor.tagName).toBe("P");
    expect(detectedColor.innerHTML).toBe("Detected colour: ");

    // Check the properties of the second element
    const colorDisplay = elements[1];
    expect(colorDisplay.tagName).toBe("DIV");
    expect(colorDisplay.className).toBe("color-display");
    expect(colorDisplay.style).toBe(`background: ${color}`);
  });
});
