const { app, BrowserWindow, Menu, screen, Tray } = require("electron");
const path = require("path");
const Store = require("electron-store");
const AutoLaunch = require("auto-launch");
const ipcMainChannels = require("./main/ipcmain-channels/ipcMainChannels");

const BASE_DIR = __dirname;
const ICON_PATH = path.join(BASE_DIR, "img/clipio.png");
const store = new Store();

// Set default values
store.defaults({
  showDevWindow: false,
});

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
      preload: path.join(BASE_DIR, "/main/scripts/preload.js"),
    },
  });

  mainWindow.loadFile(path.join(BASE_DIR, "/main/index.html"));

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
    width: 1280,
    height: 720,
    minHeight: 200,
    minWidth: 800,
    frame: true,
    autoHideMenuBar: true,
    icon: ICON_PATH,
    webPreferences: commonWindowPreferences,
  });

  settingsWindow.loadFile(path.join(BASE_DIR, "settings/settings.html"));
};

const initializeAutoLaunch = async () => {
  const autoLaunch = new AutoLaunch({
    name: "Clipio",
    path: app.getPath("exe"),
  });

  if (!(await autoLaunch.isEnabled())) {
    await autoLaunch.enable();
  }
};

const createTray = () => {
  const appIcon = new Tray(ICON_PATH);

  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Open Clipio editor",
      type: "normal",
      click: createPopup,
    },
    {
      label: "Open settings",
      type: "normal",
      click: createSettingsWindow,
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
      click: app.quit,
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
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Register all IPCMain events
ipcMainChannels.loadAll();
