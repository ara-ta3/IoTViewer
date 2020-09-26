import { app, BrowserWindow } from "electron";

app.on("ready", async () => {
  const window = new BrowserWindow({
    width: 800,
    height: 600,
  });
  await window.loadFile(`__dist/index.html`);
});
