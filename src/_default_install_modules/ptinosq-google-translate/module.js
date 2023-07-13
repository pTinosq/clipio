const { shell } = require("electron");

function run(clipboardContent) {
  if (!clipboardContent) {
    return "";
  }

  // Generate Google Translate URL
  const url = `https://translate.google.com/?sl=auto&tl=en&text=${clipboardContent}&op=translate`;
  shell.openExternal(url);

  return clipboardContent;
}

module.exports = {
  run,
};
