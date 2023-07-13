import { DevInfo, DevInfoItem } from "../src/main/scripts/DevInfo.js";

// Mock document.createElement and document.getElementById
beforeAll(() => {
  document.createElement = jest.fn((tag) => {
    return { tagName: tag, appendChild: jest.fn(), innerHTML: "" };
  });

  document.getElementById = jest.fn((id) => {
    return { innerHTML: "" };
  });
});

describe("DevInfo", () => {
  it("should be able to create a new instance", () => {
    const devInfo = new DevInfo("test");
    expect(devInfo).toBeInstanceOf(DevInfo);
    expect(devInfo.title).toBe("test");
  });

  it("should be able to add new DevInfoItem to content", () => {
    const devInfo = new DevInfo("test");
    const devInfoItem = new DevInfoItem("title", "value");
    devInfo.content.push(devInfoItem);

    expect(devInfo.content.length).toBe(1);
    expect(devInfo.content[0]).toBeInstanceOf(DevInfoItem);
  });

  it("should be able to build HTML", () => {
    const devInfo = new DevInfo("test");
    const html = devInfo.buildHTML();

    expect(html).toBeDefined();
    expect(html.tagName).toBe("div");
  });

  it("should be able to call tick method", () => {
    const devInfo = new DevInfo("test");
    const devInfoItem = new DevInfoItem("title", "value");
    devInfoItem.isLive = true;
    devInfoItem.run = jest.fn(() => "new value");
    devInfoItem.update = jest.fn();
    devInfo.content.push(devInfoItem);

    devInfo.tick();

    expect(devInfoItem.run).toHaveBeenCalled();
    expect(devInfoItem.update).toHaveBeenCalled();
  });
});

describe("DevInfoItem", () => {
  it("should be able to create a new instance", () => {
    const devInfoItem = new DevInfoItem("title", "value");
    expect(devInfoItem).toBeInstanceOf(DevInfoItem);
    expect(devInfoItem.title).toBe("title");
    expect(devInfoItem.value).toBe("value");
  });

  it("should be able to build HTML", () => {
    const devInfoItem = new DevInfoItem("title", "value");
    const html = devInfoItem.buildHTML();

    expect(html).toBeDefined();
    expect(html.tagName).toBe("li");
  });

  it("should be able to update HTML", () => {
    const devInfoItem = new DevInfoItem("title", "value");
    devInfoItem.id = "test";
    devInfoItem.update();

    expect(document.getElementById).toHaveBeenCalledWith("test");
  });
});
