const clipboardListener = require("clipboard-event");
const { clipboard } = require("electron");
const PopupWindow = require("./PopupWindow.js");

function isFilePath(string) {
  // Check if string is a valid file path
  return /^[a-zA-Z]:[\\\/].*/.test(string.trim());
}

function isValidHttpUrl(string) {
  // https://stackoverflow.com/a/43467144/9700228
  // Check if string is a valid HTTP URL
  let url;
  try {
    url = new URL(string.trim());
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

clipboardListener.startListening();
clipboardListener.on("change", () => {
  const clipboardContent = clipboard.readText();
  const popupWindow = new PopupWindow();

  if (isValidHttpUrl(clipboardContent)) {
    popupWindow.url = (__dirname, "./clipio_popup/popup_url.html");
    popupWindow.width = 150;
    popupWindow.height = 95;
  } else if (isFilePath(clipboardContent)) {
    popupWindow.url = (__dirname, "./clipio_popup/popup_fpath.html");
    popupWindow.width = 150;
    popupWindow.height = 95;
  } else {
    popupWindow.url = (__dirname, "./clipio_popup/popup.html");
    popupWindow.width = 75;
    popupWindow.height = 75;
  }

  popupWindow.open();
});
