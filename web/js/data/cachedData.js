// @ts-check

/**
 * @module cachedData
 *
 * @description
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
 * Represents a normalized question used throughout the application.
 * This is treated as a core data structure and is expected to already
 * be validated and normalized.
 *
 * @typedef {Object} Question
 * @property {string} id - Normalized identifier (lowercase, underscore-separated)
 * @property {string} text - Display text for the question
 * @property {string} selection_type - Normalized selection type (e.g. "single", "multiple")
 * @property {{id: string, text: string}[]} options - Sorted list of valid options
 */

/**
 * Map of hazard categories to their associated instruction steps.
 * Kept as a distinct typedef for semantic clarity, even though it shares
 * the same structure as other instruction maps.
 *
 * @typedef {Object<string, string[] | undefined>} HazardInstructions
 */

/**
 * Map of contact categories (e.g. emergency, medical) to contact details.
 * Separated for readability and intent, despite sharing structure with other maps.
 *
 * @typedef {Object<string, string[] | undefined>} Contacts
 */

/**
 * Map of special needs categories to their corresponding instructions.
 * Uses the same structure as other instruction maps but represents a
 * different domain concept within the application.
 *
 * @typedef {Object<string, string[] | undefined>} SpecialNeedsInstructions
 */

/**
* A dictionary mapping unique item identifiers to their detailed definitions.
 * This acts as the normalized central repository for all possible go-bag items,
 * preventing data duplication across different emergency categories.
 * @typedef {Object<string, ItemId | undefined>} GobagItemIds
 */

/**
 * Represents the display properties and metadata of a single go-bag item.
 * @typedef {Object} ItemId
 * @property {string} text - The human-readable name or description of the item (e.g., "Drinking water", "Flashlight").
 * @property {string} image - The URL or local file path to the visual representation of the item.
 */

/**
 * A mapping of emergency events or user profiles to their respective recommended packing lists.
 * The arrays contain string keys that reference specific entries within the GobagItemIds map.
 * @typedef {Object<string, string[] | undefined>} GobagItems
 */

/** @type {Question[]} */
let questions = [];

/** @type {HazardInstructions} */
let hazardInstructions = {};

/** @type {Contacts} */
let contacts = {};

/** @type {SpecialNeedsInstructions} */
let SpecialNeedsInstructions = {};

/** @type {GobagItemIds} */
let gobagItemIds = {};

/** @type {GobagItems} */
let gobagItems = {};

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

/** @returns {GobagItemIds} */
export function getGobagItemIds() {
    return structuredClone(gobagItemIds);
}

/** @returns {GobagItems} */
export function getGobagItems() {
    return structuredClone(gobagItems);
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

/** @param {GobagItemIds} data */
export function setGobagItemIds(data) {
    // TODO Add the normalizer
    gobagItemIds = data;
}

/** @param {GobagItems} data */
export function setGobagItems(data) {
    // TODO Add the normalizer
    gobagItems = data;
}