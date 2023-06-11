import { ClickableFactory } from "../src/clipio_editor/scripts/ClickableFactory.js";

const { clipboard } = require("electron");

jest.mock("electron", () => ({
  clipboard: {
    readText: jest.fn(),
    writeText: jest.fn(),
  },
}));

describe("ClickableFactory", () => {
  let createElementMock;
  let clickableFactory;

  beforeEach(() => {
    // Mock document.createElement
    createElementMock = jest.fn().mockImplementation((tag) => {
      return {
        className: "",
        textContent: "",
        addEventListener: jest.fn(),
        appendChild: jest.fn(),
        tagName: tag.toUpperCase(),
      };
    });
    global.document.createElement = createElementMock;

    global.window = Object.create(window);
    Object.defineProperty(window, "close", { value: jest.fn() });

    // Create a new instance of ClickableFactory for each test
    clickableFactory = new ClickableFactory();
  });

  it("buildOnclickMethod creates a function that interacts with the clipboard", () => {
    const clickable = {
      run: jest.fn().mockImplementation((text) => text + " modified"),
    };
    clipboard.readText.mockImplementation(() => "original text");

    const onclick = clickableFactory.buildOnclickMethod(clickable);
    onclick();

    expect(clickable.run).toHaveBeenCalledWith("original text");
    expect(clipboard.writeText).toHaveBeenCalledWith("original text modified");
  });

  it("buildClickable assigns an onclick method to the clickable", () => {
    const clickable = {
      run: jest.fn(),
    };
    clickableFactory.buildOnclickMethod = jest
      .fn()
      .mockImplementation(() => "onclick method");

    const result = clickableFactory.buildClickable(clickable);

    expect(result.onClick).toBe("onclick method");
  });

  it("buildHTML creates an element with correct properties and children", () => {
    const clickable = {
      title: "My Clickable",
      onClick: jest.fn(),
    };

    const element = clickableFactory.buildHTML(clickable);

    expect(element.tagName).toBe("DIV");
    expect(element.className).toBe("module");
    expect(element.appendChild).toHaveBeenCalled();

    const titleContainer = createElementMock.mock.results[1].value;
    expect(titleContainer.tagName).toBe("DIV");
    expect(titleContainer.className).toBe("module-title");
    expect(titleContainer.appendChild).toHaveBeenCalled();

    const titleContent = createElementMock.mock.results[2].value;
    expect(titleContent.tagName).toBe("H1");
    expect(titleContent.textContent).toBe("My Clickable");
    expect(titleContent.addEventListener).toHaveBeenCalledWith(
      "click",
      clickable.onClick
    );
  });
});
