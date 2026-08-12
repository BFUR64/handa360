// @ts-check

/**
 * @typedef {Object} Option
 * @property {string} id - Unique identifier for the option
 * @property {string} text - The option text
 */

/**
 * @typedef {Object} Question
 * @property {string} id - Unique identifier for the question
 * @property {string} text - The question text
 * @property {Option[]} options - Array of available options
 */

/**
 * @typedef {Object} Instructions
 * @property {Object.<string, string[]>} hazards - Instructions grouped by hazard type
 * @property {Object.<string, string[]>} special_needs - Instructions grouped by special needs category
 * @property {Object.<string, string[]>} contacts - Emergency contacts grouped by location
 */

/**
 * @typedef {Object} GoBag
 * @property {Object.<string, string[]>} items - Go-bag items grouped by category/hazard type
 * @property {Object.<string, string>} registry - Registry mapping item IDs to their descriptions
 */

/**
 * @typedef {Object} DisasterPreparednessData
 * @property {number} schemaVersion - Version number of the data schema
 * @property {Question[]} questions - Array of survey questions
 * @property {Instructions} instructions - Instructions for different scenarios
 * @property {GoBag} gobag - Go-bag related data including items and registry
 */

/**
 * @type {DisasterPreparednessData | null}
 */
let database = null;

/**
 * @param {DisasterPreparednessData} data
 */
export function setDatabase(data) {
    database = data;
}

/**
 * @returns {DisasterPreparednessData | null}
 */
export function getDatabase() {
    return database;
}

/**
 * @returns {Question[] | undefined}
 */
export function getQuestions() {
    return database?.questions;
}

/**
 * @returns {Instructions | undefined}
 */
export function getInstructions() {
    return database?.instructions;
}

/**
 * @returns {GoBag | undefined}
 */
export function getGoBag() {
    return database?.gobag;
}
