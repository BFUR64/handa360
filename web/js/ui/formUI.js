// @ts-check

import { Events } from "../event.js";
import { getQuestions } from "../state/cachedDatabase.js";

/** @typedef {import("../state/cachedDatabase").Question} Question */

/**
 * @param {HTMLElement} root
 */
export function initFormUI(root) {
    const questions = getQuestions();

    if (!questions) {
        document.addEventListener(Events.DATABASE_CHANGE, () => {
            initFormUI(root);
        });

        return;
    }

    generateForm(root, questions);
}

/**
 * @param {HTMLElement} root
 * @param {Question[]} questions
 */
function generateForm(root, questions) {
    const form = document.createElement("form");
    form.className = "form-container";

    const fieldset = document.createElement("fieldset");
    form.append(fieldset);

    const legend = document.createElement("legend");
    legend.textContent = questions[0].text;
    legend.className = "form-title";
    fieldset.append(legend);

    questions[0].options.forEach(option => {
        const label = document.createElement("label");
        label.className = "option-container";
        fieldset.append(label);

        const input = document.createElement("input");
        input.type = "checkbox";
        input.name = questions[0].id;
        input.value = option.id;
        label.append(input);

        const span = document.createElement("span");
        span.className = "btn-option";
        span.textContent = option.text;
        label.append(span);
    });

    generateFormButtons(form);

    root.append(form);

}

/**
 * @param {HTMLElement} form
 */
function generateFormButtons(form) {
    const div = document.createElement("div");
    div.className = "form-btn-container";
    form.append(div);

    const button1 = document.createElement("button");
    button1.textContent = "Previous";
    button1.type = "button";
    button1.className = "btn-form";
    div.append(button1);

    const button2 = document.createElement("button");
    button2.textContent = "Next";
    button2.type = "button";
    button2.className = "btn-form";
    div.append(button2);
}
