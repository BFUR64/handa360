// @ts-check

/**
 * @typedef {Object} Question
 * @property {string} text
 * @property {string} name
 * @property {{value: string, text: string}[]} options
 */

/**
 * @typedef {Object} Action
 * @property {{ hazard: string }} condition
 * @property {string[]} instructions
 */

/**
 * @typedef {Object} Location
 * @property {{ location: string }} condition
 * @property {string[]} information
 */

/** @type {Question[] | undefined} */
let questions;

/** @type {Action[] | undefined} */
let actions;

/** @type {Location[] | undefined} */
let locations;

/** @returns {Question[] | undefined} */
export function getQuestions() {
    if (questions == null) return;
    return structuredClone(questions);
}

/** @returns {Action[] | undefined} */
export function getActions() {
    if (actions == null) return;
    return structuredClone(actions);
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

/** @param {Action[]} data */
export function setActions(data) {
    actions = data;
}

/** @param {Location[]} data */
export function setLocations(data) {
    locations = data;
}