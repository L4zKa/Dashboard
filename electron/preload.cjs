const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("api", {
  // später kannst du hier sichere Funktionen zwischen Node & React austauschen
});
