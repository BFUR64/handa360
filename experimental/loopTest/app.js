import * as cacheController from "./cacheController.js";
import * as cachedData from "./cachedData.js";

addEventListener("DOMContentLoaded", async function() {
    await cacheController.loadFromStorage();
    await cacheController.syncFromRemote();
    printCache();
})

function printCache() {
    console.log(cachedData.questions);
    console.log(cachedData.locations);
    console.log(cachedData.actions);
}