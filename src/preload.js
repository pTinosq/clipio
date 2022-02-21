const clipboardListener = require('clipboard-event');
const {
  clipboard
} = require('electron');
const path = require('path');

// To start listening
clipboardListener.startListening();
console.log('Listening...');

function isValidHttpUrl(string) {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

clipboardListener.on('change', () => {
  const text = clipboard.readText();

  localStorage.setItem('clipboard', text);
  console.log(isValidHttpUrl(text));
  if (isValidHttpUrl(text)) {
    popup_width = 150;
    popup_height = 75;
    // URL popup
    window.open(
      (__dirname, './popup/popup_url.html'),
      '_blank',
      `width=${popup_width},height=${popup_height},x=${globalThis.screen.availWidth - popup_width},y=${globalThis.screen.availHeight - popup_height},frame=false,nodeIntegration=yes,contextIsolation=false,` +
      `preload=${path.join(__dirname, '/popup/preload_popup.js')},transparent=true,alwaysOnTop=true,skipTaskbar=true,titlebar=transparent,resizable=true`
    );

  } else {
    popup_width = 75;
    popup_height = 75;
    // Text popup
    window.open(
      (__dirname, './popup/popup.html'),
      '_blank',
      `width=${popup_width},height=${popup_height},x=${globalThis.screen.availWidth - popup_width},y=${globalThis.screen.availHeight - popup_height},frame=false,nodeIntegration=yes,contextIsolation=false,` +
      `preload=${path.join(__dirname, '/popup/preload_popup.js')},transparent=true,alwaysOnTop=true,skipTaskbar=true,titlebar=transparent,resizable=true`
    );

  }

});






