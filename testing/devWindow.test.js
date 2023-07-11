const { ipcRenderer, clipboard } = require("electron");
const Store = require("electron-store");
const { DevInfo, DevInfoItem } = require("../src/main/scripts/DevInfo.js");

jest.mock("electron", () => ({
  ipcRenderer: { sendSync: jest.fn() },
  clipboard: { readText: jest.fn() },
}));

jest.mock("electron-store");

beforeAll(() => {
  global.process = {
    versions: { electron: "12.0.0" },
    platform: "darwin",
    arch: "x64",
    pid: 12345,
    uptime: jest.fn(),
    memoryUsage: jest.fn(),
  };

  document.createElement = jest.fn().mockImplementation((tag) => ({
    tagName: tag,
    appendChild: jest.fn(),
    innerHTML: "",
  }));

  document.getElementById = jest
    .fn()
    .mockReturnValue({ appendChild: jest.fn() });
  document.addEventListener = jest.fn((_, cb) => cb());
});

describe("DOMContentLoaded event", () => {
  it("should create DevInfo and DevInfoItem instances and call their methods", () => {
    ipcRenderer.sendSync.mockReturnValue("1.0.0");
    clipboard.readText.mockReturnValue("clipboard text");
    process.uptime.mockReturnValue(123456.789);
    process.memoryUsage.mockReturnValue({ rss: 123456789 });

    require("../src/main/scripts/devWindow.js"); // replace with the path to your file

    expect(ipcRenderer.sendSync).toHaveBeenCalledWith("get-app-version");
    expect(clipboard.readText).toHaveBeenCalledTimes(1);
    expect(process.uptime).toHaveBeenCalled();
    expect(process.memoryUsage).toHaveBeenCalled();
    expect(document.getElementById).toHaveBeenCalledWith("main");
  });
});
