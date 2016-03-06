"use strict";

const electron = require("electron");
const path     = require("path");
const MenuItem = require("menu-item");
const signoff  = require("./signoff");

const app           = electron.app;
const ipc           = electron.ipcMain;
const Tray          = electron.Tray;
const Menu          = electron.Menu;
const BrowserWindow = electron.BrowserWindow;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

let tray;

app.on("ready", () => {
    showTray();
    createWindow();
});

app.on("activate", function() {
    // On OS X it"s common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});

ipc.on("quit", app.quit);

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 600,
        height: 400,
        titleBarStyle: "hidden",
        frame: false,
        resizable: false
    });

    mainWindow.loadURL("file://" + __dirname + "/index.html");

    mainWindow.on("closed", function() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });

    // Let the app determine and broadcast its state to the UI
    mainWindow.webContents.on("did-finish-load",
        () => signoff.updateState(mainWindow.webContents));
}

function showTray() {
    tray = new Tray(path.resolve(__dirname, "../media/menubar-icon.png"));
    tray.setPressedImage(path.resolve(__dirname, "../media/menubar-icon.png"));

    let menu = Menu.buildFromTemplate([
        { label: "Resume", type: "radio" },
        { label: "Sign off", type: "radio" }
    ]);

    menu.append(new MenuItem({
        type: "separator"
    }));

    menu.append(new MenuItem({
        label: "Quit",
        click: app.quit,
        accelerator: "Command+Q"
    }));

    tray.setToolTip("Signoff");
    tray.setContextMenu(menu);
}
