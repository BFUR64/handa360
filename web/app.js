// @ts-check

import * as toastNotification from "./js/ui/toastNotification.js";

import * as cacheController from "./js/services/cacheController.js";
import * as cachedData from "./js/data/cachedData.js";

import * as formRenderer from "./js/ui/formRenderer.js";
import * as formController from "./js/services/formController.js";

import * as checklistRenderer from "./js/ui/checklistRenderer.js";

import * as informationRenderer from "./js/ui/contactlistRenderer.js";

import * as uiHelper from "./js/ui/uiHelper.js";

/** @typedef {import("./js/services/formController.js").UserInput} UserInput */

addEventListener("DOMContentLoaded", async function () {
    cacheController.loadFromStorage();
    const syncSuccess = await cacheController.syncFromRemote();

    if (!syncSuccess) {
        // TODO: Retry in the background
        toastNotification.showToast("Failed to fetch remote JSON data", "error");
    }

    uiHelper.clearContainer();
    const form = formRenderer.render(cachedData.getQuestions());
    formController.attachDispatchEvent(form);
    addFormSubmittedListener(form);
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

        checklistRenderer.render(cachedData.getHazardInstructions(), data.hazardSelected, "Hazard Instructions");

        informationRenderer.render(data.locationSelected, cachedData.getContacts());

        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    })
}