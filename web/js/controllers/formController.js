// @ts-check

/**
 * @module formController
 *
 * @description
 * Manages the main application form:
 * - Initializes the form based on normalized Question data
 * - Handles multi-step navigation between questions
 * - Attaches submit events and dispatches a custom `formSubmitted` event
 * - Extracts user input in a normalized shape (UserInput)
 *
 * Responsibilities:
 * 1. `initForm(questions)` – renders the full form, wires up events, and returns
 *    the form element.
 * 2. Multi-step navigation – updates visible question block based on `currentIndex`.
 * 3. Form submission – collects input values and emits `formSubmitted`.
 *
 * Assumptions:
 * - Questions are already normalized
 * - DOM contains a container element with id="container"
 */


import * as formRenderer from "../ui/formRenderer.js";

/** @typedef {{ locationSelected: string, hazardSelected: string, specialNeedsSelected: string[]}} UserInput */
/** @typedef {import("../data/cachedData.js").Question} Question */

const container = /** @type {HTMLElement} */ (document.getElementById("container"));

let currentIndex = 0;
let totalQuestions = 0;

/**
 * Initializes the form and sets up multi-step navigation and submit events.
 *
 * @param {Question[]} questions - Normalized questions for the form
 * @returns {HTMLFormElement} The fully initialized form element
 */
export function initForm(questions) {
    currentIndex = 0;
    totalQuestions = questions.length;

    const formFragment = formRenderer.buildFullForm(questions);

    const actionButtons = /** @type {NodeListOf<HTMLButtonElement>} */ (formFragment.querySelectorAll(".btn-submit"));
    const formBlock = /** @type {HTMLFormElement} */ (formFragment.querySelector(".form-block"));

    attachFlowEvent(actionButtons);

    attachSubmitEvent(formBlock);

    container.append(formFragment);

    updateView(actionButtons);

    return formBlock;
}

/**
 * @param {NodeListOf<HTMLButtonElement>} actionButtons
 */
function updateView(actionButtons) {
    const allQuestions = /** @type {NodeListOf<HTMLElement>} */ (document.querySelectorAll(".question-block"));

    allQuestions.forEach(question => {
        const stepIndex = Number(question.dataset.step);
        if (stepIndex === currentIndex) {
            question.classList.remove("hidden");
        }
        else {
            question.classList.add("hidden");
        }
    })

    const [backBtn, nextBtn] = actionButtons;

    backBtn.textContent = "Previous";

    if (currentIndex === totalQuestions - 1) {
        backBtn.classList.remove("not-selectable");

        nextBtn.textContent = "Submit";
        nextBtn.type = "submit";
    }
    else if (currentIndex === 0) {
        backBtn.classList.add("not-selectable");

        nextBtn.textContent = "Next";
        nextBtn.type = "button";
    }
    else {
        backBtn.classList.remove("not-selectable");

        nextBtn.textContent = "Next";
        nextBtn.type = "button";
    }

    window.scrollTo(0, 0);
}

/**
 * @param {NodeListOf<HTMLButtonElement>} actionButtons
 */
function attachFlowEvent(actionButtons) {
    const [backBtn, nextBtn] = actionButtons;

    backBtn.addEventListener("click", event => {
        if (currentIndex > 0) {
            event.preventDefault();
            currentIndex--;
        }

        updateView(actionButtons);
    });

    nextBtn.addEventListener("click", event => {
        if (currentIndex < totalQuestions - 1) {
            event.preventDefault();
            currentIndex++;
        }

        updateView(actionButtons);
    });
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
 * Extracts user input from a form into a normalized shape.
 *
 * @param {HTMLFormElement} form
 * @returns {UserInput} Collected form data
 */
function extractFormData(form) {
    const formData = new FormData(form);

    return {
        locationSelected: String(formData.get("location") || ""),
        hazardSelected: String(formData.get("hazard") || ""),
        specialNeedsSelected: formData.getAll("special_needs").map(String)
    }
}