const clipboardListener = require('clipboard-event');
const {
  clipboard
} = require('electron');

function isBase64(string) {
  return /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/.test(string);
}

function isFilePath(string) {
  return /^[a-zA-Z]:[\\\/].*/.test(string.trim());
}

function isValidHttpUrl(string) {
  let url;

  try {
    url = new URL(string.trim());
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

function isValidHexColour(string) {
  return /#[0-9a-fA-F]{3,6}/.test(string);
}

clipboardListener.startListening();
clipboardListener.on('change', () => {
  const text = clipboard.readText();

  localStorage.setItem('clipboard', text);

  if (isValidHttpUrl(text)) {

    const popupWindow = new PopupWindow();
    popupWindow.url = (__dirname, './clipio_popup/popup_url.html');
    popupWindow.width = 150;
    popupWindow.height = 75;


    localStorage.setItem('clipboard', text.trim());

    // URL popup
    window.open(
      (__dirname, './clipio_popup/popup_url.html'),
      '_blank',
      `width=${popup_width},height=${popup_height},x=${globalThis.screen.availWidth - popup_width},y=${globalThis.screen.availHeight - popup_height},frame=false,nodeIntegration=yes,contextIsolation=false,` +
      `transparent=true,alwaysOnTop=true,skipTaskbar=true,titlebar=transparent,resizable=false`
    );

  } else if (isBase64(text)) {
    popup_width = 75;
    popup_height = 75;

    // BASE64 popup
    localStorage.setItem("type", "base64");
    window.open(
      (__dirname, './clipio_popup/popup.html'),
      '_blank',
      `width=${popup_width},height=${popup_height},x=${globalThis.screen.availWidth - popup_width},y=${globalThis.screen.availHeight - popup_height},frame=false,nodeIntegration=yes,contextIsolation=false,` +
      `transparent=true,alwaysOnTop=true,skipTaskbar=true,titlebar=transparent,resizable=false`
    );


  } else if (isValidHexColour(text)) {
    popup_width = 75;
    popup_height = 75;

    // COLOUR popup
    localStorage.setItem("type", "colour");
    window.open(
      (__dirname, './clipio_popup/popup.html'),
      '_blank',
      `width=${popup_width},height=${popup_height},x=${globalThis.screen.availWidth - popup_width},y=${globalThis.screen.availHeight - popup_height},frame=false,nodeIntegration=yes,contextIsolation=false,` +
      `transparent=true,alwaysOnTop=true,skipTaskbar=true,titlebar=transparent,resizable=false`
    );
  } else if (isFilePath(text)) {
    popup_width = 150;
    popup_height = 95;
    localStorage.setItem("type", "fpath");
    localStorage.setItem('clipboard', text.trim());

    // URL popup
    window.open(
      (__dirname, './clipio_popup/popup_fpath.html'),
      '_blank',
      `width=${popup_width},height=${popup_height},x=${globalThis.screen.availWidth - popup_width},y=${globalThis.screen.availHeight - popup_height},frame=false,nodeIntegration=yes,contextIsolation=false,` +
      `transparent=true,alwaysOnTop=true,skipTaskbar=true,titlebar=transparent,resizable=false`
    );

  } else {
    popup_width = 75;
    popup_height = 75;
    localStorage.setItem("type", "default");
    // Text popup
    window.open(
      (__dirname, './clipio_popup/popup.html'),
      '_blank',
      `width=${popup_width},height=${popup_height},x=${globalThis.screen.availWidth - popup_width},y=${globalThis.screen.availHeight - popup_height},frame=false,nodeIntegration=yes,contextIsolation=false,` +
      `transparent=true,alwaysOnTop=true,skipTaskbar=true,titlebar=transparent,resizable=true`
    );

  }

});


// UNIT TESTING
module.exports = {
  isValidHttpUrl,
  clipboardListener,
  isValidHexColour,
  isBase64,
  isFilePath
};