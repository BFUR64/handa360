// @ts-check

/**
 * @typedef {Object} Question
 * @property {string} id
 * @property {string} text
 * @property {{id: string, text: string}[]} options
 */

/**
 * @typedef {Object<string, string[] | undefined>} HazardInstructions
 */

/**
 * @typedef {Object} Location
 * @property {{ location: string }} condition
 * @property {string[]} information
 */

/** @type {Question[] | undefined} */
let questions;

/** @type {HazardInstructions | undefined} */
let hazardInstructions;

/** @type {Location[] | undefined} */
let locations;

/** @returns {Question[] | undefined} */
export function getQuestions() {
    if (questions == null) return;
    return structuredClone(questions);
}

/** @returns {HazardInstructions | undefined} */
export function getHazardInstructions() {
    if (hazardInstructions == null) return;
    return structuredClone(hazardInstructions);
}

/** @returns {Location[] | undefined} */
export function getLocations() {
    if (locations == null) return;
    return structuredClone(locations);
}

/** @param {Question[]} data */
export function setQuestions(data) {
    questions = data;
}

/** @param {HazardInstructions} data */
export function setHazardInstructions(data) {
    hazardInstructions = data;
}

/** @param {Location[]} data */
export function setLocations(data) {
    locations = data;
}