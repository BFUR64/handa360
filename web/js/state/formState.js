// @ts-check

import { Events } from "../event.js";

const MAX_STEP = 3;
const MIN_STEP = 1;

let formStep = 1;

/**
 * @param {number} value
 */
export function setFormStep(value) {
    formStep = value;

    document.dispatchEvent(new Event(Events.FORMSTATE_CHANGE));
}

/**
 * @param {number} value
 */
export function increaseFormStep(value) {
    if (formStep + value > MAX_STEP) {
        formStep = MAX_STEP;
    }
    else {
        formStep += value;
    }

    document.dispatchEvent(new Event(Events.FORMSTATE_CHANGE));
}

/**
 * @param {number} value
 */
export function decreaseFormStep(value) {
    if (formStep - value < MIN_STEP) {
        formStep = MIN_STEP;
    }
    else {
        formStep -= value;
    }

    document.dispatchEvent(new Event(Events.FORMSTATE_CHANGE));
}

export function getFormStep() {
    return formStep;
}

export function getMaxStep() {
    return MAX_STEP;
}

export function getMinStep() {
    return MIN_STEP;
}
