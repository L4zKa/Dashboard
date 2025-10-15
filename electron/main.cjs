const { app, BrowserWindow, screen } = require("electron");
const path = require("path");

let windows = [];

function createWindowsOnAllDisplays() {
  const displays = screen.getAllDisplays();

  windows.forEach((win) => win.close());
  windows = [];

  displays.forEach((display, i) => {
    const win = new BrowserWindow({
      x: display.bounds.x,
      y: display.bounds.y,
      width: display.bounds.width,
      height: display.bounds.height,
      transparent: true,
      frame: false,
      skipTaskbar: true,
      focusable: false,
      webPreferences: {
        preload: path.join(__dirname, "preload.cjs"), // ✅ use preload, no nodeIntegration
        contextIsolation: true,
        nodeIntegration: false,
      },
    });

    if (app.isPackaged) {
      win.loadFile(path.join(__dirname, "../dist/index.html"));
    } else {
      win.loadURL("http://localhost:5173");
      win.webContents.openDevTools({ mode: "detach" });
    }

    win.webContents.on("did-finish-load", () => {
      win.webContents.send("display-info", {
        index: i,
        allDisplays: displays,
        currentDisplay: display,
      });
    });

    windows.push(win);
  });
}

app.whenReady().then(() => createWindowsOnAllDisplays());
