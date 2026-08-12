// @ts-check

import { Events } from "../event.js";
import * as formState from "../state/formState.js";

/**
 * @param {HTMLButtonElement} previousButton
 * @param {HTMLButtonElement} nextButton
 */
export function initFormButtons(previousButton, nextButton) {
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
    });

    document.addEventListener(Events.FORMSTATE_CHANGE, () => {
        if (formState.getFormStep() == formState.getMaxStep()) {
            nextButton.textContent = "Finish";
        }
        else {
            nextButton.textContent = "Next";
        }
    })

    formState.setFormStep(1);
}
