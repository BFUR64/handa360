// @ts-check

import * as cacheController from "./js/cacheController.js";
import * as cachedData from "./js/cachedData.js";
import * as formRenderer from "./js/formRenderer.js";

addEventListener("DOMContentLoaded", async function() {
    cacheController.loadFromStorage();
    let syncSuccess = await cacheController.syncFromRemote();

    if (!syncSuccess) {
        // TODO: Add notification system for the user
        console.error("No toast notifications for user. Fix pls");
    }

    formRenderer.render();
})

function printCache() {
    console.log(cachedData.getQuestions());
    console.log(cachedData.getActions());
    console.log(cachedData.getLocations());
}