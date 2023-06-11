const { ipcRenderer, clipboard } = require("electron");
import { DevInfo, DevInfoItem } from "./DevInfo.js";

function boxed(str, n) {
  return `<span class='boxed'>${
    str.length > n ? `${str.substr(0, n - 1)}&hellip;` : str
  }</span>`;
}

function createDevInfoItem(key, value, id, runFunc) {
  const item = new DevInfoItem(key, value);
  item.isLive = true;
  item.id = id;
  item.class = "blink";
  item.run = runFunc;
  return item;
}

document.addEventListener("DOMContentLoaded", () => {
  // Versions
  const versionsDevInfo = new DevInfo("Versions");

  versionsDevInfo.content.push(
    new DevInfoItem("Clipio", ipcRenderer.sendSync("get_app_version"))
  );

  for (const [key, value] of Object.entries(process.versions)) {
    versionsDevInfo.content.push(new DevInfoItem(key, value));
  }

  document.getElementById("main").appendChild(versionsDevInfo.buildHTML());

  // Details
  const detailsDevInfo = new DevInfo("Details");

  detailsDevInfo.content.push(new DevInfoItem("Platform", process.platform));
  detailsDevInfo.content.push(new DevInfoItem("Architecture", process.arch));
  detailsDevInfo.content.push(new DevInfoItem("PID", process.pid));

  const clipioClipboard = createDevInfoItem(
    "Clipio clipboard",
    boxed(clipboard.readText(), 60),
    "clipio_details",
    () => boxed(clipboard.readText(), 60)
  );

  detailsDevInfo.content.push(clipioClipboard);

  document.getElementById("main").appendChild(detailsDevInfo.buildHTML());

  // Performance
  const performanceDevInfo = new DevInfo("Performance");

  const uptime = createDevInfoItem(
    "Uptime",
    `${(Math.round(process.uptime() * 100) / 100).toFixed(2)}s`,
    "uptime",
    () => `${(Math.round(process.uptime() * 100) / 100).toFixed(2)}s`
  );

  performanceDevInfo.content.push(uptime);

  const ramUsed = process.memoryUsage();
  for (const key of Object.keys(ramUsed)) {
    const valueInMb = `${(
      Math.round((ramUsed[key] / 1024 / 1024) * 100) / 100
    ).toFixed(2)} MB`;
    const element = createDevInfoItem(
      key,
      valueInMb,
      `ram_${key}`,
      () => valueInMb
    );

    performanceDevInfo.content.push(element);
  }

  document.getElementById("main").appendChild(performanceDevInfo.buildHTML());

  // Live updates
  setInterval(() => {
    versionsDevInfo.tick();
    detailsDevInfo.tick();
    performanceDevInfo.tick();
  }, 1000);
});
