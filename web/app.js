// @ts-check

import * as cacheController from "./js/services/cacheController.js";
import * as normalizer from "./js/services/normalizer.js";

import * as formRenderer from "./js/ui/formRenderer.js";
import * as formController from "./js/services/formController.js";

import * as checklistRenderer from "./js/ui/checklistRenderer.js";
import * as checklistController from "./js/services/checklistController.js";

import * as informationRender from "./js/ui/informationRenderer.js";

/** @typedef {import("./js/services/formController.js").UserInput} UserInput */

addEventListener("DOMContentLoaded", async function () {
    cacheController.loadFromStorage();
    const syncSuccess = await cacheController.syncFromRemote();

    if (!syncSuccess) {
        // TODO: Add notification system for the user
        // TODO: Retry in the background
        console.error("No toast notifications for user. Fix pls");
    }

    const form = formRenderer.render(normalizer.getNormalizedQuestions());
    formController.attachDispatchEvent(form);
    addFormSubmittedListener(form);
})

/** @param {HTMLElement} form */
function addFormSubmittedListener(form) {
    form.addEventListener("formSubmitted", function (event) {
        const customEvent = /** @type {CustomEvent<UserInput>} */ (event);
        const data = customEvent.detail;

        // TODO Add the checkListRenderer and InformationRenderer after this line
        let checklistBlock = checklistRenderer.render(data.hazardSelected, normalizer.getNormalizedActions());
        checklistController.addCheckedListener(checklistBlock);
        /*informationRender.render(data.locationSelected, normalizer.getNormalizedLocations());*/
    })
}