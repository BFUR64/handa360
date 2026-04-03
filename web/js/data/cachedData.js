// @ts-check

/**
 * This file serves as an in-memory cache for all core data used in the app,
 * including questions, hazard instructions, contacts, and special needs instructions.
 *
 * How it works:
 * - Raw data is passed into the setter functions (setQuestions, setHazardInstructions, etc.)
 * - Each setter normalizes the data using the normalizer service before storing it
 * - The normalized data is then saved in local variables (questions, hazardInstructions, etc.)
 *
 * Purpose of caching:
 * - Avoid repeatedly normalizing or re-fetching the same data
 * - Improve performance by keeping processed data readily available
 * - Ensure all parts of the app use consistent, already-cleaned data
 *
 * Data safety:
 * - Getter functions return a deep copy (structuredClone) instead of the original data
 * - This prevents other parts of the app from accidentally mutating the cached data
 *
 * In short:
 * This module acts as a controlled storage layer where data is cleaned once,
 * stored, and safely accessed throughout the application.
 */

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