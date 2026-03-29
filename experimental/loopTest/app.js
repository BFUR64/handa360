// @ts-check

import * as cacheController from "./cacheController.js";
import * as cachedData from "./cachedData.js";
import * as dataToHTML from "./dataToHTML.js";

addEventListener("DOMContentLoaded", async function() {
    cacheController.loadFromStorage();
    let syncSuccess = await cacheController.syncFromRemote();

    if (!syncSuccess) {
        // TODO: Add notification system for the user
        console.error("No toast notifications for user. Fix pls");
    }

    dataToHTML.printQuestions();
})

function printCache() {
    console.log(cachedData.getQuestions());
    console.log(cachedData.getActions());
    console.log(cachedData.getLocations());
}