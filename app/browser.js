"use strict";

/*
    Start, no previous signoff:
    - welcome-message: show info screen with instructions on how to enter-signoff

    No signoff, manual signoff:
    - enter-signoff: show window to input signoff message, close window afterwards

    Existing signoff, day change detected:
    - (show notification?)
    - resume-signoff: show window with last signoff message and "Resume" button (destroys signoff)

    Existing signoff, manual resume:
    - resume-signoff
*/

const ipc = require("electron").ipcRenderer;

function setTitle(text) {
    document.querySelector(".title").innerText = text;
}

function setMessage(text) {
    document.querySelector(".message").innerText = text;
}

ipc.on("welcome-message", (event, message) => {
    setTitle("Welcome to Signoff!");
    setMessage("Have fun working. When you're done, choose \"Sign off\" in the menu bar.");
});

document.querySelector("button").addEventListener("click", function(e) {
    console.log("yo click", ipc);
    ipc.send("quit")
});

console.log(`node v${process.versions.node}`);
console.log(`chrome v${process.versions.chrome}`);
console.log(`electron v${process.versions.electron}`);
