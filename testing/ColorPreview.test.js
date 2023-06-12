import { ColorPreview } from "../src/clipio_editor/scripts/ColorPreview.js";

describe("ColorPreview", () => {
  let createElementMock;
  let colorPreview;

  beforeEach(() => {
    // Mock document.createElement
    createElementMock = jest.fn().mockImplementation((tag) => {
      return {
        className: "",
        innerHTML: "",
        style: "",
        appendChild: jest.fn(),
        tagName: tag.toUpperCase(),
      };
    });
    global.document.createElement = createElementMock;

    // Create a new instance of ColorPreview for each test
    colorPreview = new ColorPreview();
  });

  it("buildHTML creates correct elements for a single color", () => {
    const colors = ["#ffffff"];

    const elements = colorPreview.buildHTML(colors);

    expect(elements.length).toBe(2);

    const [detectedColor, colorDisplays] = elements;

    expect(detectedColor.tagName).toBe("P");
    expect(detectedColor.innerHTML).toBe("Detected colour: ");

    expect(colorDisplays.tagName).toBe("DIV");
    expect(colorDisplays.appendChild).toHaveBeenCalledTimes(1);

    const colorDisplay = createElementMock.mock.results[2].value;
    expect(colorDisplay.tagName).toBe("DIV");
    expect(colorDisplay.className).toBe("color-display");
    expect(colorDisplay.style).toBe("background: #ffffff");
  });

  it("buildHTML creates correct elements for multiple colors", () => {
    const colors = ["#ffffff", "#000000"];

    const elements = colorPreview.buildHTML(colors);

    expect(elements.length).toBe(2);

    const [detectedColor, colorDisplays] = elements;

    expect(detectedColor.tagName).toBe("P");
    expect(detectedColor.innerHTML).toBe("Detected colours: ");

    expect(colorDisplays.tagName).toBe("DIV");
    expect(colorDisplays.appendChild).toHaveBeenCalledTimes(2);

    const colorDisplay1 = createElementMock.mock.results[2].value;
    expect(colorDisplay1.tagName).toBe("DIV");
    expect(colorDisplay1.className).toBe("color-display");
    expect(colorDisplay1.style).toBe("background: #ffffff");

    const colorDisplay2 = createElementMock.mock.results[3].value;
    expect(colorDisplay2.tagName).toBe("DIV");
    expect(colorDisplay2.className).toBe("color-display");
    expect(colorDisplay2.style).toBe("background: #000000");
  });
});
