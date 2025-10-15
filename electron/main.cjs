const { app, BrowserWindow, screen } = require("electron");
const path = require("path");

let windows = [];

function createWindowsOnAllDisplays() {
  const displays = screen.getAllDisplays();

  // Close any existing windows
  windows.forEach((win) => win.close());
  windows = [];

  displays.forEach((display) => {
    const win = new BrowserWindow({
      x: display.bounds.x,
      y: display.bounds.y,
      width: display.bounds.width,
      height: display.bounds.height,
      fullscreen: false,
      transparent: true,
      backgroundColor: "#00000000",
      frame: false,
      resizable: false,
      alwaysOnTop: false,
      skipTaskbar: true,
      focusable: false,
      hasShadow: false,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      },
    });

    win.setAlwaysOnTop(false, "normal");
    win.setVisibleOnAllWorkspaces(true);

    if (app.isPackaged) {
      win.loadFile(path.join(__dirname, "../dist/index.html"));
    } else {
      win.loadURL("http://localhost:5173");
      win.webContents.openDevTools({ mode: "detach" });
    }

    windows.push(win);
  });
}

app.whenReady().then(() => {
  createWindowsOnAllDisplays();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0)
      createWindowsOnAllDisplays();
  });

  // Optional: Re-create windows if displays change (e.g., monitor plugged/unplugged)
  screen.on("display-added", createWindowsOnAllDisplays);
  screen.on("display-removed", createWindowsOnAllDisplays);
  screen.on("display-metrics-changed", createWindowsOnAllDisplays);
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
