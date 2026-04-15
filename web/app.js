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
 * Also handles form submission by:
 * - Clearing previous UI
 * - Rendering hazard and special needs checklists
 * - Rendering contact information
 * - Scrolling the page to top
 *
 * Essentially, this file wires together controllers, services, and UI modules
 * into a working page. Individual modules handle their own data validation,
 * rendering, and normalization.
 */

import * as toastNotification from "./js/ui/toastNotification.js";

import * as cacheService from "./js/services/cacheService.js";
import * as cachedData from "./js/data/cachedData.js";

import * as formController from "./js/controllers/formController.js";

import * as checklistRenderer from "./js/ui/checklistRenderer.js";

import * as informationRenderer from "./js/ui/contactlistRenderer.js";

import * as uiHelper from "./js/ui/uiHelper.js";

import * as navigationController from "./js/controllers/navigationController.js";

/** @typedef {import("./js/controllers/formController.js").UserInput} UserInput */

addEventListener("DOMContentLoaded", async function () {
    navigationController.initNavigationListeners();

    cacheService.loadFromStorage();
    const syncSuccess = await cacheService.syncFromRemote();

    if (!syncSuccess) {
        toastNotification.showToast("Failed to fetch remote JSON data", "error");
    }

    uiHelper.clearContainer();
    const form = formController.initForm(cachedData.getQuestions());
    addFormSubmittedListener(form);

    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("/handa360/serviceWorker.js")
            .then(() => console.log("Service worker registered"))
            .catch(err => console.log("Service worker registration failed", err));
    }
})

/** @param {HTMLElement} form */
function addFormSubmittedListener(form) {
    form.addEventListener("formSubmitted", function (event) {
        const customEvent = /** @type {CustomEvent<UserInput>} */ (event);
        const data = customEvent.detail;

        uiHelper.clearContainer();

        const specialNeedsQuestion = cachedData.getQuestions().find(q => q.id === "special_needs");
        const idToTextMap = Object.fromEntries(specialNeedsQuestion?.options.map(opt => [opt.id, opt.text]) ?? []);


        data.specialNeedsSelected.forEach(specialNeed => {
            const title = idToTextMap[specialNeed];

            checklistRenderer.render(cachedData.getSpecialNeedsInstructions(), specialNeed, title);
        });

        let ids = /** @type {string[]} */ ([]);
        data.specialNeedsSelected.forEach(specialNeed => ids.push(specialNeed));
        ids.push(data.hazardSelected);

        checklistRenderer.render(cachedData.getHazardInstructions(), data.hazardSelected, "Hazard Instructions");

        checklistRenderer.RenderGobag(cachedData.getGobagItemRegistry(), cachedData.getGobagItems(), ids, "Gobag");

        informationRenderer.render(data.locationSelected, cachedData.getContacts());

        console.log(cachedData.getGobagItemRegistry());
        console.log(cachedData.getGobagItems());
        console.log(ids);

        window.scrollTo(0, 0);
    })
}