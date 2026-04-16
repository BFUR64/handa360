// @ts-check

import * as uiHelper from "../ui/uiHelper.js";

import * as cachedData from "../data/cachedData.js";

import * as formController from "./formController.js";

import * as outputController from "./outputController.js";

import * as listController from "../controllers/listController.js";

/** @typedef {import("../controllers/formController.js").UserInput} UserInput */

export function initForm() {
    uiHelper.clearContainer();
    const form = formController.initForm(cachedData.getQuestions());
    addFormSubmittedListener(form);
}

/** @param {HTMLElement} form */
function addFormSubmittedListener(form) {
    form.addEventListener("formSubmitted", function (event) {
        const customEvent = /** @type {CustomEvent<UserInput>} */ (event);

        outputController.initOutput(customEvent, () => {
            initForm();
        });

        listController.initListListeners();
    })
}