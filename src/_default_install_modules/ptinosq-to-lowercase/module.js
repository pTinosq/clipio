function run(clipboardContent) {
  if (!clipboardContent) {
    return "";
  }

  return clipboardContent.toLowerCase();
}

module.exports = {
  run,
};
