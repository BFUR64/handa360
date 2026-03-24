// @ts-check

/**
 * @typedef {Object} QuestionsData
 * @property {string[]} location
 * @property {string[]} hazard
 */

/**
 * @typedef {Object} ActionsData
 * @property {Object} condition
 * @property {string} condition.hazard
 * @property {string[]} instructions
 */

/**
 * @typedef {Object} LocationsData
 * @property {Object} condition
 * @property {string} condition.location
 * @property {string[]} information
 */

/** @type {QuestionsData | undefined} */
let questions;

/** @type {ActionsData | undefined} */
let actions;

/** @type {LocationsData | undefined} */
let locations;

/** @returns {QuestionsData | undefined} */
export function getQuestions() {
    if (questions == null) return;
    return structuredClone(questions);
}

/** @returns {ActionsData | undefined} */
export function getActions() {
    if (actions == null) return;
    return structuredClone(actions);
}

/** @returns {LocationsData | undefined} */
export function getLocations() {
    if (locations == null) return;
    return structuredClone(locations);
}

/** @param {QuestionsData} data */
export function setQuestions(data) {
    questions = data;
}

/** @param {ActionsData} data */
export function setActions(data) {
    actions = data;
}

/** @param {LocationsData} data */
export function setLocations(data) {
    locations = data;
}