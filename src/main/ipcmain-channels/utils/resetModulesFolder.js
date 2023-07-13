const { app } = require("electron");
const path = require("path");
const fs = require("fs");

function formatDigits(num) {
  return num.toString().padStart(2, "0");
}

function resetModulesFolder() {
  const modulesFolderPath = path.join(app.getPath("userData"), "modules");

  try {
    // Delete modules folder
    fs.rmSync(modulesFolderPath, { recursive: true });
  } catch (error) {
    if (error.code !== "ENOENT") {
      // Throw the error if it's not "folder not found" error
      throw error;
    }
    console.warn("Modules folder doesn't exist, continuing");
  }

  // Create modules folder
  fs.mkdirSync(modulesFolderPath);

  // Create local modules file
  const localModulesPath = path.join(modulesFolderPath, "Local Modules");
  fs.writeFileSync(localModulesPath, JSON.stringify({}));

  // Create a log file to note that the reset took place (with current datetime)
  const now = new Date();
  const year = now.getFullYear();
  const month = formatDigits(now.getMonth() + 1);
  const day = formatDigits(now.getDate());
  const hours = formatDigits(now.getHours());
  const minutes = formatDigits(now.getMinutes());
  const seconds = formatDigits(now.getSeconds());

  const logName = `reset_modules_${year}-${month}-${day}_${hours}${minutes}${seconds}.log`;
  const logPath = path.join(modulesFolderPath, logName);

  const logData = {
    date: now.toISOString(),
    message: "Reset modules folder. Reason: UNKNOWN",
  };

  fs.writeFileSync(logPath, JSON.stringify(logData));
}

module.exports = resetModulesFolder;
