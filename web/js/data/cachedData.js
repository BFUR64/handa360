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
 * @typedef {Object<string, string[] | undefined>} Contacts
 */

/** @type {Question[] | undefined} */
let questions;

/** @type {HazardInstructions | undefined} */
let hazardInstructions;

/** @type {Contacts | undefined} */
let contacts;

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

/** @returns {Contacts | undefined} */
export function getContacts() {
    if (contacts == null) return;
    return structuredClone(contacts);
}

/** @param {Question[]} data */
export function setQuestions(data) {
    questions = data;
}

/** @param {HazardInstructions} data */
export function setHazardInstructions(data) {
    hazardInstructions = data;
}

/** @param {Contacts} data */
export function setContacts(data) {
    contacts = data;
}