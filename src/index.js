const { app, BrowserWindow, ipcMain, Menu, screen, Tray } = require("electron");
const path = require("path");
const Store = require("electron-store");
const AutoLaunch = require("auto-launch");

const store = new Store();
if (!store.has("show")) {
  store.set("show", false);
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minHeight: 200,
    minWidth: 800,
    autoHideMenuBar: true,
    show: store.get("show"),
    title: "Clipio",
    icon: path.join(__dirname, "/img/clipio.png"),
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "/scripts/preload.js"),
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, "index.html"));

  // Open the DevTools.
  if (store.get("show")) {
    mainWindow.webContents.openDevTools();
  }
};

const createPopup = () => {
  // Create the browser window.
  const popup = new BrowserWindow({
    width: 300,
    height: 600,
    minHeight: 600,
    minWidth: 300,
    x: screen.getPrimaryDisplay().workAreaSize.width - 300,
    y: screen.getPrimaryDisplay().workAreaSize.height - 600,
    frame: false,
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });

  // and load the index.html of the app.
  popup.loadFile(path.join(__dirname, "/clipio_editor/editor.html"));
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  let autoLaunch = new AutoLaunch({
    name: "Clipio",
    path: app.getPath("exe"),
  });
  autoLaunch.isEnabled().then((isEnabled) => {
    if (!isEnabled) autoLaunch.enable();
  });

  appIcon = new Tray(path.join(__dirname, "img/clipio.png"));
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Developer mode (takes effect on app load)",
      type: "checkbox",
      click: () => {
        store.set("show", !store.get("show"));
      },
      checked: store.get("show"),
    },
    {
      label: "Item2",
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
  appIcon.on("click", () => {
    createPopup();
  });

  // Call this again for Linux because we modified the context menu
  appIcon.setContextMenu(contextMenu);
  createWindow();

  app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

ipcMain.on("minimize", () => {
  BrowserWindow.getFocusedWindow().minimize();
});

ipcMain.on("relaunch", () => {
  app.relaunch();
  app.exit();
});

ipcMain.on("maximize", () => {
  BrowserWindow.getFocusedWindow().isMaximized()
    ? BrowserWindow.getFocusedWindow().restore()
    : BrowserWindow.getFocusedWindow().maximize();
});

ipcMain.on("get_app_version", (event, arg) => {
  event.returnValue = app.getVersion();
});
