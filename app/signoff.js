"use strict";

const storage = require("./storage");

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

function updateState(mainWindowIpc) {
    console.log("Updating state...");

    let lastSignoff = storage.getLastSignoff();
    console.log("Last signoff", lastSignoff);

    mainWindowIpc.send("welcome-message", "huzzah");
}

module.exports = {
    updateState
};
