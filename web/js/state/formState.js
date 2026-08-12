// @ts-check

const MAX_STEP = 3;
const MIN_STEP = 1;

let formStep = 1;

/**
 * @param {number} value
 */
export function setFormStep(value) {
    formStep = value;
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
