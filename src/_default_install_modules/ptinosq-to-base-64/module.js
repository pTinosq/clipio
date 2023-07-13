function run(clipboardContent) {
  if (!clipboardContent) {
    return "";
  }

  return Buffer.from(clipboardContent, "utf-8").toString("base64");
}

module.exports = {
  run,
};
