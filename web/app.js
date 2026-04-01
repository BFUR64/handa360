// @ts-check

import * as toastNotification from "./js/ui/toastNotification.js";

import * as cacheController from "./js/services/cacheController.js";
import * as normalizer from "./js/services/normalizer.js";

import * as formRenderer from "./js/ui/formRenderer.js";
import * as formController from "./js/services/formController.js";

import * as checklistRenderer from "./js/ui/checklistRenderer.js";

import * as informationRenderer from "./js/ui/informationRenderer.js";

/** @typedef {import("./js/services/formController.js").UserInput} UserInput */

addEventListener("DOMContentLoaded", async function () {
    cacheController.loadFromStorage();
    const syncSuccess = await cacheController.syncFromRemote();

    if (!syncSuccess) {
        // TODO: Retry in the background
        toastNotification.showToast("Failed to fetch remote JSON data", "error");
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

        checklistRenderer.render(data.hazardSelected, normalizer.getNormalizedActions());

        informationRenderer.render(data.locationSelected, normalizer.getNormalizedContacts());

        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    })
}