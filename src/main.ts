import { app, BrowserWindow } from "electron";

let win: BrowserWindow | null;

async function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
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
