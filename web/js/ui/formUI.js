// @ts-check

import { Events } from "../event.js";
import * as formState from "../state/formState.js";
import * as cachedDatabase from "../state/cachedDatabase.js";

/** @typedef {import("../state/cachedDatabase.js").Question} Question */

/**
 * @param {HTMLButtonElement} previousButton
 * @param {HTMLButtonElement} nextButton
 * @param {HTMLElement} fieldset
 * @param {HTMLElement} legend
 */
export function initFormUI(previousButton, nextButton, fieldset, legend) {
    initFormButtons(previousButton, nextButton);
    initFormContent(fieldset, legend);

    formState.setFormStep(1);
}

/**
 * @param {HTMLButtonElement} previousButton
 * @param {HTMLButtonElement} nextButton
 */
function initFormButtons(previousButton, nextButton) {
    previousButton.addEventListener('click', () => {
        formState.decreaseFormStep(1);
    });

    // TODO Replace with behavior for finishing
    nextButton.addEventListener('click', () => {
        if (formState.getFormStep() == formState.getMaxStep()) {
            nextButton.textContent = "Placeholder";
            return;
        }

        formState.increaseFormStep(1);
    })

    document.addEventListener(Events.FORMSTATE_CHANGE, () => {
        if (formState.getFormStep() == formState.getMinStep()) {
            previousButton.disabled = true;
        }
        else {
            previousButton.disabled = false;
        }

        if (formState.getFormStep() == formState.getMaxStep()) {
            nextButton.textContent = "Finish";
        }
        else {
            nextButton.textContent = "Next";
        }
    });
}

/**
 * @param {HTMLElement} fieldset
 * @param {HTMLElement} legend
 */
function initFormContent(fieldset, legend) {
    document.addEventListener(Events.FORMSTATE_CHANGE, () => {
        const questions = cachedDatabase.getQuestions()
        const formStepZeroed = formState.getFormStep() - 1;

        if (!questions) {
            console.log("Questions unavailable");
            document.addEventListener(Events.DATABASE_CHANGE, () => {
                console.log("Database Change! Init form content...");
                initFormContent(fieldset, legend);
            }, { once: true });
            return;
        }

        const question = questions[formStepZeroed];

        changeFormContent(question, fieldset, legend);
    });

    const questions = cachedDatabase.getQuestions()
    const formStepZeroed = formState.getFormStep() - 1;

    if (questions) {
        const question = questions[formStepZeroed];
        changeFormContent(question, fieldset, legend);
    }
}

/**
 * @param {Question} question
 * @param {HTMLElement} fieldset
 * @param {HTMLElement} legend
 */
function changeFormContent(question, fieldset, legend) {
    const children = fieldset.children;
    for (let i = children.length - 1; i >= 0; i--) {
        if (children[i] !== legend) {
            children[i].remove();
        }
    }

    legend.textContent = question.text;

    question.options.forEach(option => {
        const label = document.createElement("label");
        label.className = "option-container";
        fieldset.append(label);

        const input = document.createElement("input");
        input.type = "checkbox";
        input.name = question.id;
        input.value = option.id;
        label.append(input);

        const span = document.createElement("span");
        span.className = "btn-option";
        span.textContent = option.text;
        label.append(span);
    });
}
