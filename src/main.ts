import { app, BrowserWindow } from "electron";
import * as Config from "electron-store";

const config = new Config({
  defaults: {
    bounds: {
      width: 800,
      height: 600,
    },
  },
});
let win: BrowserWindow | null;

async function createWindow() {
  const { width, height } = config.get("bounds");
  win = new BrowserWindow({
    width: width,
    height: height,
  });
  await win.loadFile(`__dist/index.html`);

  win.on("closed", () => {
    win = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (win === null) {
    createWindow().catch(console.error);
  }
});
