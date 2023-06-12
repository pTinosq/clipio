import { InteractorFactory } from "../src/clipio_editor/scripts/InteractorFactory.js";

const { clipboard } = require("electron");

jest.mock("electron", () => ({
  clipboard: {
    readText: jest.fn(),
    writeText: jest.fn(),
  },
}));

describe("InteractorFactory", () => {
  let createElementMock;
  let interactorFactory;

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

    // Create a new instance of InteractorFactory for each test
    interactorFactory = new InteractorFactory();
  });

  it("buildOnclickMethod creates a function that interacts with the clipboard", () => {
    const interactor = {
      run: jest.fn().mockImplementation((text) => text + " modified"),
      titleElements: [],
      contentElements: [],
    };
    clipboard.readText.mockImplementation(() => "original text");

    const onclick = interactorFactory.buildOnclickMethod(interactor);
    const mockEvent = { shiftKey: false };
    onclick(mockEvent);

    expect(interactor.run).toHaveBeenCalledWith("original text");
    expect(clipboard.writeText).toHaveBeenCalledWith("original text modified");
  });

  it("buildOnclickMethod does not close the window if event.shiftKey is true", () => {
    const clickable = {
      run: jest.fn(),
    };
    const onclick = interactorFactory.buildOnclickMethod(clickable);

    const mockEvent = { shiftKey: true };
    window.close = jest.fn(); // Mock window.close
    onclick(mockEvent);

    expect(window.close).not.toHaveBeenCalled(); // Assert that window.close was not called
  });

  it("buildInteractor assigns an onclick method to the interactor", () => {
    const interactor = {
      run: jest.fn(),
      titleElements: [],
      contentElements: [],
    };
    interactorFactory.buildOnclickMethod = jest
      .fn()
      .mockImplementation(() => "onclick method");

    const result = interactorFactory.buildInteractor(interactor);

    expect(result.onClick).toBe("onclick method");
  });

  it("buildHTML creates an element with correct properties and children", () => {
    const interactor = {
      titleElements: [],
      contentElements: [],
      onClick: jest.fn(),
    };

    const element = interactorFactory.buildHTML(interactor);

    expect(element.tagName).toBe("DIV");
    expect(element.className).toBe("module");
    expect(element.appendChild).toHaveBeenCalled();

    const titleContainer = createElementMock.mock.results[1].value;
    expect(titleContainer.tagName).toBe("DIV");
    expect(titleContainer.className).toBe("module-title");

    const contentContainer = createElementMock.mock.results[2].value;
    expect(contentContainer.tagName).toBe("DIV");
    expect(contentContainer.className).toBe("module-content");
  });
});
