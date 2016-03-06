"use strict";

const fs         = require("fs");
const path       = require("path");
const homedir    = require("os").homedir();
const mkdirpSync = require("mkdirp").sync;

const storageFile = path.resolve(homedir, ".signoff/signoff.json");

function getLastSignoff() {
    try {
        let fileContents = fs.readFileSync(storageFile);
        return JSON.parse(fileContents);
    } catch (e) {
        return undefined;
    }
}

function saveSignoff(data) {
    mkdirpSync(path.dirname(storageFile));

    let jsonData = JSON.stringify(data);
    try {
        fs.writeFileSync(storageFile, jsonData);
    } catch (e) {
        throw Error(`Couldn't save signoff to [${storageFile}]: ${e.message}`)
    }
}

module.exports = {
    getLastSignoff,
    saveSignoff
};
