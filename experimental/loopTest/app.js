import * as cacheController from "./cacheController.js";
import * as cachedData from "./cachedData.js";

addEventListener("DOMContentLoaded", async function() {
    cacheController.loadFromStorage();
    let syncSuccess = await cacheController.syncFromRemote();

    if (!syncSuccess) {
        // TODO: Add notification system for the user
        console.error("No toast notifications for user. Fix pls");
    }

    printCache();
})

function printCache() {
    console.log(cachedData.questions);
    console.log(cachedData.locations);
    console.log(cachedData.actions);
}