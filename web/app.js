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
 *
 * Essentially, this file wires together controllers, services, and UI modules
 * into a working page. Individual modules handle their own data validation,
 * rendering, and normalization.
 */

import * as toastNotification from "./js/ui/toastNotification.js";

import * as cacheService from "./js/services/cacheService.js";

import * as navigationController from "./js/controllers/navigationController.js";

import * as appController from "./js/controllers/appController.js";

import * as listController from "./js/controllers/listController.js";

/** @typedef {import("./js/controllers/formController.js").UserInput} UserInput */

addEventListener("DOMContentLoaded", async function () {
    navigationController.initNavigationListeners();

    cacheService.loadFromStorage();
    const syncSuccess = await cacheService.syncFromRemote();

    if (!syncSuccess) {
        toastNotification.showToast("Failed to fetch remote JSON data", "error");
    }

    appController.initForm();
    listController.initListListeners();

    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("/handa360/serviceWorker.js")
            .then(() => console.log("Service worker registered"))
            .catch(err => console.log("Service worker registration failed", err));
    }
})