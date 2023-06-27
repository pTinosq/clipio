const { app, BrowserWindow, ipcMain, Menu, screen, Tray } = require("electron");
const path = require("path");
const Store = require("electron-store");
const AutoLaunch = require("auto-launch");
lol
const BASE_DIR = __dirname;
const ICON_PATH = path.join(BASE_DIR, "img/clipio.png");

const store = new Store();
if (!store.has("show")) {
  store.set("show", false);
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
    show: store.get("show"),
    title: "Clipio",
    icon: ICON_PATH,
    webPreferences: {
      ...commonWindowPreferences,
      preload: path.join(BASE_DIR, "/scripts/preload.js"),
    },
  });

  mainWindow.loadFile(path.join(BASE_DIR, "index.html"));

  if (store.get("show")) {
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
      label: "Developer mode",
      type: "checkbox",
      click: () => {
        store.set("show", !store.get("show"));
        app.relaunch();
        app.exit();
      },
      checked: store.get("show"),
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

ipcMain.on("get_app_version", (event) => {
  event.returnValue = app.getVersion();
});
