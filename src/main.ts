import {app, Menu, BrowserWindow } from "electron"
import * as path from "path";

app.on('ready', async () => {
    const window = new BrowserWindow({
        width: 800,
        height: 600
    })
    await window.loadFile(path.join(__dirname, "index.html"))
})