// electron/preload.js
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  onDisplayInfo: (callback) => ipcRenderer.on("display-info", callback),
});
