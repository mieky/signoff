"use strict";

const ipc = require("electron").ipcRenderer;

function setTitle(text) {
    document.querySelector(".title").innerText = text;
}

function setMessage(text) {
    document.querySelector(".message").innerText = text;
}

ipc.on("welcome-message", (event, message) => {
    setTitle("Welcome to Signoff!");
    setMessage("Have fun working. When you're done, choose \"Sign off\" in the menu bar. " + message);
});

document.querySelector("button").addEventListener("click", function(e) {
    console.log("yo click");
    ipc.send("quit")
});

console.log(`node v${process.versions.node}`);
console.log(`chrome v${process.versions.chrome}`);
console.log(`electron v${process.versions.electron}`);
