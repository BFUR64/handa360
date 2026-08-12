// @ts-check

import { initFormButtons } from "../ui/formUI.js";

/**
 * @param {HTMLElement} root
 */
export function initFormController(root) {
    const form = document.createElement("form");
    form.className = "form-container";
    root.append(form);

    const fieldset = document.createElement("fieldset");
    form.append(fieldset);

    const legend = document.createElement("legend");
    legend.textContent = "Loading...";
    legend.className = "form-title";
    fieldset.append(legend);

    const { previousButton, nextButton } = generateFormButtons(form);

    initFormButtons(previousButton, nextButton);
}

/**
 * @param {HTMLElement} form
 * @returns {{previousButton: HTMLButtonElement, nextButton: HTMLButtonElement}}
 */
function generateFormButtons(form) {
    const div = document.createElement("div");
    div.className = "form-btn-container";
    form.append(div);

    const previousButton = document.createElement("button");
    previousButton.textContent = "Previous";
    previousButton.type = "button";
    previousButton.className = "btn-form";
    div.append(previousButton);

    const nextButton = document.createElement("button");
    nextButton.textContent = "Next";
    nextButton.type = "button";
    nextButton.className = "btn-form";
    div.append(nextButton);

    return { previousButton: previousButton, nextButton: nextButton };
}
