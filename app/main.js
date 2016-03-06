"use strict";

const electron = require("electron");
const path     = require("path");
const MenuItem = require("menu-item");

// Module to control application life.
const app = electron.app;
// const ipc = electron.ipcMain;
const ipc = require("ipc");

const Tray = electron.Tray;
const Menu = electron.Menu;

// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

let tray;

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        titleBarStyle: "hidden",
        frame: false,
        resizable: false
    });

    // and load the index.html of the app.
    mainWindow.loadURL("file://" + __dirname + "/index.html");

    mainWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on("closed", function() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });

    mainWindow.webContents.on("did-finish-load", () => {
        mainWindow.webContents.send("welcome-message", "huzzah");
    });
}

function showTray() {
    tray = new Tray(path.resolve(__dirname, "../media/menubar-icon.png"));
    tray.setPressedImage(path.resolve(__dirname, "../media/menubar-icon.png"));

    let menu = Menu.buildFromTemplate([
        { label: "Resume", type: "radio" },
        { label: "Sign off", type: "radio" }
    ]);
    menu.append(new MenuItem({
        label: "Quit",
        click: app.quit,
        accelerator: "Command+Q"
    }));

    tray.setToolTip("Signoff");
    tray.setContextMenu(menu);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
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
