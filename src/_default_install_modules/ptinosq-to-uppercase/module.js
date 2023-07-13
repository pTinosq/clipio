function run(clipboardContent) {
  if (!clipboardContent) {
    return "";
  }

  return clipboardContent.toUpperCase();
}

module.exports = {
  run,
};
