// @ts-check

import * as formRenderer from "../ui/formRenderer.js";

/** @typedef {{ locationSelected: string, hazardSelected: string, specialNeedsSelected: string[]}} UserInput */
/** @typedef {import("../data/cachedData.js").Question} Question */

const container = /** @type {HTMLElement} */ (document.getElementById("container"));

let currentIndex = 0;
let totalQuestions = 0;

/**
 * @param {Question[]} questions
 * @returns {HTMLFormElement}
 */
export function initForm(questions) {
    totalQuestions = questions.length;

    const formFragment = formRenderer.buildFullForm(questions);

    const actionButton = /** @type {HTMLButtonElement} */ (formFragment.querySelector(".btn-submit"));
    const formBlock = /** @type {HTMLFormElement} */ (formFragment.querySelector(".form-block"));

    attachContinueEvent(actionButton);
    attachSubmitEvent(formBlock);

    container.append(formFragment);

    updateView(actionButton);

    return formBlock;
}

/**
 * @param {HTMLButtonElement} actionButton
 */
function updateView(actionButton) {
    const allQuestions = /** @type {NodeListOf<HTMLElement>} */ (document.querySelectorAll(".question-block"));

    allQuestions.forEach(question => {
        const stepIndex = Number(question.dataset.step);
        if (stepIndex == currentIndex) {
            question.classList.remove("hidden");
        }
        else {
            question.classList.add("hidden");
        }
    })

    if (currentIndex === totalQuestions - 1) {
        actionButton.textContent = "Submit";
        actionButton.type = "submit";
    }
    else {
        actionButton.textContent = "Continue";
        actionButton.type = "button";
    }

    window.scrollTo(0, 0);
}

/**
 * @param {HTMLButtonElement} actionButton
 */
function attachContinueEvent(actionButton) {
    actionButton.addEventListener("click", event => {
        if (actionButton.type === "submit") return;

        event.preventDefault();
        currentIndex++;
        updateView(actionButton);
    })
}

/**
 * @param {HTMLFormElement} form
 */
function attachSubmitEvent(form) {
    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const data = extractFormData(form);

        form.dispatchEvent(new CustomEvent("formSubmitted", { detail: data }));
    })
}

/**
 * @param {HTMLFormElement} form
 * @returns {UserInput}
 */
function extractFormData(form) {
    const formData = new FormData(form);

    return {
        locationSelected: String(formData.get("location") || ""),
        hazardSelected: String(formData.get("hazard") || ""),
        specialNeedsSelected: formData.getAll("special_needs").map(String)
    }
}