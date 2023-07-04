function resetModulesFolder() {
  // Delete modules folder
  const modulesFolderPath = path.join(app.getPath("userData"), "modules");

  // Try to delete the folder, if it doesn't exist, just continue
  try {
    fs.rmSync(modulesFolderPath, { recursive: true });
  } catch (error) {
    console.warn("modules folder doesn't exist, continuing");
  }

  // Create modules folder
  fs.mkdirSync(modulesFolderPath);

  // Create local modules file
  const localModulesPath = path.join(
    app.getPath("userData"),
    "modules",
    "Local Modules"
  );

  fs.writeFileSync(localModulesPath, JSON.stringify({}));
}
