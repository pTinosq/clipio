const { ipcRenderer, clipboard } = require("electron");
const Store = require("electron-store");
const store = new Store();

function truncate(str, n) {
  return `<span class='boxed'>${
    str.length > n ? `${str.substr(0, n - 1)}&hellip;` : str
  }</span>`;
}

function disableDevWindow() {
  store.set("show", false);
}

function hideDevWindow() {
  ipcRenderer.send("minimize");
}

function createListItem(value, parentSelector) {
  const listItem = document.createElement("li");
  listItem.innerHTML = value;
  document.querySelector(parentSelector).appendChild(listItem);
  return listItem;
}

function createListItemPair(
  key,
  value,
  parentSelector,
  blink = false,
  id = null
) {
  const listItem = createListItem(`${key}: ${value}`, parentSelector);
  listItem.id = id;
  if (blink) {
    listItem.className = "blink";
  }
  return listItem;
}

function updatePerformance(uptime, ramList) {
  setInterval(() => {
    uptime.innerHTML = `Uptime: ${(
      Math.round(process.uptime() * 100) / 100
    ).toFixed(2)}s`;

    const ramUsed = process.memoryUsage();
    ramList.forEach((listItem) => {
      const key = listItem.innerHTML.split(":")[0];
      listItem.innerHTML = `${key}: ${(
        Math.round((ramUsed[key] / 1024 / 1024) * 100) / 100
      ).toFixed(2)} MB`;
    });
  }, 1000);
}

function handleClipboardChanges(clipio) {
  setInterval(() => {
    const currentClipboard = localStorage.getItem("clipboard_CURRENT");
    if (clipboard.readText() !== currentClipboard) {
      clipio.className = "blink";
      clipio.innerHTML = `Clipio clipboard: ${truncate(
        clipboard.readText(),
        60
      )}`;
      localStorage.setItem("clipboard_CURRENT", clipboard.readText());
    } else {
      clipio.className = "";
    }
  }, 1000);
}

document.addEventListener("DOMContentLoaded", () => {
  // VERSIONS
  createListItemPair(
    "Clipio",
    ipcRenderer.sendSync("get_app_version"),
    "#versions"
  );
  Object.entries(process.versions).forEach(([key, value]) =>
    createListItemPair(key, value, "#versions")
  );

  // DETAILS
  createListItemPair("Platform", process.platform, "#details");
  createListItemPair("Architecture", process.arch, "#details");
  createListItemPair("PID", process.pid, "#details");
  const clipio = createListItemPair(
    "Clipio clipboard",
    truncate(clipboard.readText(), 60),
    "#details",
    false,
    "clipio_details"
  );
  localStorage.setItem("clipboard_CURRENT", clipboard.readText());

  // PERFORMANCE
  const uptime = createListItemPair(
    "Uptime",
    `${(Math.round(process.uptime() * 100) / 100).toFixed(2)}s`,
    "#performance",
    true
  );

  const ramUsed = process.memoryUsage();
  const ramList = Object.keys(ramUsed).map((key) =>
    createListItemPair(
      key,
      `${(Math.round((ramUsed[key] / 1024 / 1024) * 100) / 100).toFixed(2)} MB`,
      "#performance",
      true
    )
  );

  // LIVE UPDATES
  updatePerformance(uptime, ramList);
  handleClipboardChanges(clipio);
});

// UNIT TESTING
module.exports = {
  truncate,
  createListItem,
  createListItemPair,
};
