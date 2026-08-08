// @ts-check

/**
 * @module app
 *
 * @description
 * Entry point for the application. Initializes:
 * - Navigation event listeners
 * - Cache loading and synchronization
 * - UI rendering for the initial form
 * - Service Worker for offline registering
 *
 * Essentially, this file wires together controllers, services, and UI modules
 * into a working page. Individual modules handle their own data validation,
 * rendering, and normalization.
 */

import * as cacheService from "./js/services/cacheService.js";

import * as navigationController from "./js/controllers/navigationController.js";

import * as appController from "./js/controllers/appController.js";

/** @typedef {import("./js/controllers/formController.js").UserInput} UserInput */

addEventListener("DOMContentLoaded", async function () {
    navigationController.initNavigationListeners();

    syncInBackground();

    appController.initForm();

    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("/handa360/serviceWorker.js")
            .then(() => console.log("Service worker registered"))
            .catch(err => console.log("Service worker registration failed", err));
    }
})

function syncInBackground() {
    cacheService.loadFromStorage();

    attemptSync()
        .then(() => console.log("Sync complete"))
        .catch(() => console.log("Sync failed"))
}

async function attemptSync() {
    for (let retryCount = 0; retryCount < 5; retryCount++) {
        const syncSuccess = await cacheService.syncFromRemote();

        if (syncSuccess) return true;

        console.log("Attempt " + (retryCount + 1) + ": Failed to fetch remote data. Retrying in 5 seconds...")
        await new Promise(r => setTimeout(r, 5000));
    }

    throw new Error("Sync failed");
}