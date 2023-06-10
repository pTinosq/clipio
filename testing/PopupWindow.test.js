import { PopupWindow } from "../src/scripts/PopupWindow.js";

describe("PopupWindow", () => {
  let popupWindow;

  beforeAll(() => {
    global.screen = { availWidth: 800, availHeight: 600 };
  });

  beforeEach(() => {
    popupWindow = new PopupWindow();
    global.window = Object.create(window);
    global.window.open = jest.fn();
    global.screen = { availWidth: 800, availHeight: 600 };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("initializes with the correct properties", () => {
    expect(popupWindow.url).toBe("");
    expect(popupWindow.target).toBe("_blank");
    expect(popupWindow.width).toBe(75);
    expect(popupWindow.height).toBe(75);
    expect(popupWindow.frame).toBe(false);
    expect(popupWindow.nodeIntegration).toBe(true);
    expect(popupWindow.contextIsolation).toBe(false);
    expect(popupWindow.transparent).toBe(true);
    expect(popupWindow.alwaysOnTop).toBe(true);
    expect(popupWindow.skipTaskbar).toBe(true);
    expect(popupWindow.titlebar).toBe("transparent");
    expect(popupWindow.resizable).toBe(false);
  });

  it("builds the correct features string", () => {
    const features = popupWindow.buildFeatures();
    // x and y are negative since availWidth and availHeight are equal to zero
    const expectedFeatures =
      "width=75,height=75,x=-75,y=-75,frame=false,nodeIntegration=true,contextIsolation=false,transparent=true,alwaysOnTop=true,skipTaskbar=true,titlebar=transparent,resizable=false";

    expect(features).toBe(expectedFeatures);
  });

  it("opens the window with correct parameters when open is called", () => {
    popupWindow.url = "http://test.url";
    popupWindow.open();

    expect(window.open).toHaveBeenCalledWith(
      popupWindow.url,
      popupWindow.target,
      popupWindow.buildFeatures()
    );
  });
});
