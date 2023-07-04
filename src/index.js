const {
  app,
  BrowserWindow,
  ipcMain,
  Menu,
  screen,
  Tray,
  safeStorage,
} = require("electron");
const path = require("path");
const Store = require("electron-store");
const AutoLaunch = require("auto-launch");
const fs = require("fs");
const BASE_DIR = __dirname;
const ICON_PATH = path.join(BASE_DIR, "img/clipio.png");

const store = new Store();

// Set default values
if (!store.has("showDevWindow")) {
  store.set("showDevWindow", false);
}

const commonWindowPreferences = {
  nodeIntegration: true,
  contextIsolation: false,
  enableRemoteModule: true,
};

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minHeight: 200,
    minWidth: 800,
    autoHideMenuBar: true,
    show: store.get("showDevWindow"),
    title: "Clipio",
    icon: ICON_PATH,
    webPreferences: {
      ...commonWindowPreferences,
      preload: path.join(BASE_DIR, "/scripts/preload.js"),
    },
  });

  mainWindow.loadFile(path.join(BASE_DIR, "index.html"));

  if (store.get("showDevWindow")) {
    mainWindow.webContents.openDevTools();
  }
};

const createPopup = () => {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  const popup = new BrowserWindow({
    width: 300,
    height: 600,
    minHeight: 600,
    minWidth: 300,
    x: width - 300,
    y: height - 600,
    frame: false,
    alwaysOnTop: true,
    webPreferences: commonWindowPreferences,
  });

  popup.loadFile(path.join(BASE_DIR, "/clipio_editor/editor.html"));
};

const createSettingsWindow = () => {
  const settingsWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minHeight: 200,
    minWidth: 800,
    frame: true,
    autoHideMenuBar: true,
    icon: ICON_PATH,
    webPreferences: {
      ...commonWindowPreferences,
      preload: path.join(BASE_DIR, "/scripts/preload.js"),
    },
  });

  settingsWindow.loadFile(path.join(BASE_DIR, "settings/settings.html"));
};

const initializeAutoLaunch = async () => {
  const autoLaunch = new AutoLaunch({
    name: "Clipio",
    path: app.getPath("exe"),
  });

  if (!(await autoLaunch.isEnabled())) {
    autoLaunch.enable();
  }
};

const createTray = () => {
  const appIcon = new Tray(ICON_PATH);

  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Open Clipio editor",
      type: "normal",
      click: () => {
        createPopup();
      },
    },
    {
      label: "Open settings",
      type: "normal",
      click: () => {
        createSettingsWindow();
      },
    },
    {
      label: "Developer mode",
      type: "checkbox",
      click: () => {
        store.set("showDevWindow", !store.get("showDevWindow"));
        app.relaunch();
        app.exit();
      },
      checked: store.get("showDevWindow"),
    },
    {
      type: "separator",
    },
    {
      label: "Exit",
      accelerator: "CmdOrCtrl+Q",
      type: "normal",
      click: () => {
        app.quit();
      },
    },
  ]);

  appIcon.setToolTip("Clipio");
  appIcon.on("click", createPopup);
  appIcon.setContextMenu(contextMenu); // Call this again for Linux because we modified the context menu
};

app.whenReady().then(async () => {
  await initializeAutoLaunch();
  createTray();
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

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

ipcMain.on("minimize", () => {
  BrowserWindow.getFocusedWindow().minimize();
});

ipcMain.on("relaunch", () => {
  app.relaunch();
  app.exit();
});

ipcMain.on("maximize", () => {
  const focusedWindow = BrowserWindow.getFocusedWindow();
  if (focusedWindow.isMaximized()) {
    focusedWindow.restore();
  } else {
    focusedWindow.maximize();
  }
});

ipcMain.on("get-app-version", (event) => {
  event.returnValue = app.getVersion();
});

ipcMain.on("relaunch", () => {
  app.relaunch();
  app.exit();
});

ipcMain.on("get-app-path", (event, uid) => {
  event.returnValue = path.join(app.getPath("userData"), "modules", uid);
});

ipcMain.on("get-github-token", (event) => {
  const encryptedToken = store.get("githubToken");
  if (!encryptedToken) {
    event.returnValue = false;
    return;
  }

  const tokenBuffer = Buffer.from(encryptedToken, "base64");

  const token = safeStorage.decryptString(tokenBuffer);

  if (!token) {
    event.returnValue = false;
  }

  event.returnValue = token;
});

ipcMain.on("set-github-token", (event, token) => {
  if (!token) {
    event.returnValue = false;
    return;
  }

  const encryptedToken = safeStorage.encryptString(token);
  store.set("githubToken", encryptedToken);
  event.returnValue = true;
});

ipcMain.on("get-local-modules", (event) => {
  const localModulesPath = path.join(
    app.getPath("userData"),
    "modules",
    "Local Modules"
  );

  if (!fs.existsSync(localModulesPath)) {
    resetModulesFolder();
    event.returnValue = {};
  } else {
    // Read local modules file
    const localModules = JSON.parse(
      fs.readFileSync(localModulesPath, { encoding: "utf-8" })
    );

    event.returnValue = localModules;
  }
});

ipcMain.on("set-local-modules", (event, localModules) => {
  const localModulesPath = path.join(
    app.getPath("userData"),
    "modules",
    "Local Modules"
  );
  fs.writeFileSync(localModulesPath, JSON.stringify(localModules));
});

ipcMain.on("get-module-manifest", (event, uid) => {
  const localModuleManifestPath = path.join(
    app.getPath("userData"),
    "modules",
    uid,
    "module-manifest.json"
  );

  if (fs.lstatSync(localModuleManifestPath).isFile()) {
    const moduleManifest = JSON.parse(
      fs.readFileSync(localModuleManifestPath, { encoding: "utf-8" })
    );

    event.returnValue = moduleManifest;
  } else {
    event.returnValue = {};
  }
});

ipcMain.on("delete-module", (event, uid) => {
  const modulePath = path.join(app.getPath("userData"), "modules", uid);

  fs.rmSync(modulePath, { recursive: true });
});
