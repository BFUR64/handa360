// @ts-check

import * as normalizer from "../services/normalizer.js";

/**
 * @typedef {Object} Question
 * @property {string} id
 * @property {string} text
 * @property {string} selection_type
 * @property {{id: string, text: string}[]} options
 */

/**
 * @typedef {Object<string, string[] | undefined>} HazardInstructions
 */

/**
 * @typedef {Object<string, string[] | undefined>} Contacts
 */

/**
 * @typedef {Object<string, string[] | undefined>} SpecialNeedsInstructions
 */

/** @type {Question[]} */
let questions = [];

/** @type {HazardInstructions} */
let hazardInstructions = {};

/** @type {Contacts} */
let contacts = {};

/** @type {SpecialNeedsInstructions} */
let SpecialNeedsInstructions = {};

/** @returns {Question[]} */
export function getQuestions() {
    return structuredClone(questions);
}

/** @returns {HazardInstructions} */
export function getHazardInstructions() {
    return structuredClone(hazardInstructions);
}

/** @returns {Contacts} */
export function getContacts() {
    return structuredClone(contacts);
}

/** @returns {SpecialNeedsInstructions} */
export function getSpecialNeedsInstructions() {
    return structuredClone(SpecialNeedsInstructions);
}

/** @param {Question[]} data */
export function setQuestions(data) {
    questions = normalizer.getNormalizedQuestions(data);
}

/** @param {HazardInstructions} data */
export function setHazardInstructions(data) {
    hazardInstructions = normalizer.getNormalizedHazardInstructions(data);
}

/** @param {Contacts} data */
export function setContacts(data) {
    contacts = normalizer.getNormalizedContacts(data);
}

/** @param {SpecialNeedsInstructions} data */
export function setSpecialNeedsInstructions(data) {
    SpecialNeedsInstructions = normalizer.getNormalizedSpecialNeedsInstructions(data);
}