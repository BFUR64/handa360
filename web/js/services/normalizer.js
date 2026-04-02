// @ts-check

import * as cachedData from "../data/cachedData.js";

/** @typedef {import("../data/cachedData.js").Question} Question */
/** @typedef {import("../data/cachedData.js").HazardInstructions} HazardInstructions */
/** @typedef {import("../data/cachedData.js").Contacts} Contacts */
/** @typedef {import("../data/cachedData.js").SpecialNeedsInstructions} SpecialNeedsInstructions */

/**
 * @param {Question[]} rawQuestions
 * @returns {Question[]}
 */
export function getNormalizedQuestions(rawQuestions) {
    if (!Array.isArray(rawQuestions)) return [];

    return rawQuestions.map(question => ({
        text: typeof question.text === "string" ? question.text : "unknown_text",
        id: typeof question.id === "string" ? normalizeText(question.id) : "unknown_id",
        selection_type: typeof question.selection_type === "string" ? normalizeText(question.selection_type) : "single",

        options: (Array.isArray(question.options) ? question.options : [])
            .filter(option =>
                typeof option.id === "string" && typeof option.text === "string"
            )
            .map(option => ({
                id: normalizeText(option.id), text: option.text
            }))
            .sort((a, b) => a.text.localeCompare(b.text))
    }));
}

/**
 * @param {HazardInstructions} rawHazardInstructions
 * @returns {HazardInstructions}
 */
export function getNormalizedHazardInstructions(rawHazardInstructions) {
    return getNormalizedObjectMap(rawHazardInstructions);
}

/**
 * @param {Contacts} rawContacts
 * @returns {Contacts} */
export function getNormalizedContacts(rawContacts) {
    return getNormalizedObjectMap(rawContacts);
}

/**
 * @param {SpecialNeedsInstructions} specialNeedsInstructions
 * @return {SpecialNeedsInstructions}
 */
export function getNormalizedSpecialNeedsInstructions(specialNeedsInstructions) {
    return getNormalizedObjectMap(specialNeedsInstructions);
}

/**
 * @param {Object<string, string[] | undefined>} objectMap
 * @returns {Object<string, string[] | undefined>} */
export function getNormalizedObjectMap(objectMap) {
    if (!objectMap || typeof objectMap != "object" || Array.isArray(objectMap)) return {};

    return Object.entries(objectMap).reduce((acc, [key, value]) => {
        let normalizedValue = /** @type {string[]} */ ([]);

        if (Array.isArray(value)) {
            normalizedValue = value.map(instruction => typeof instruction === "string" ? instruction : "undefined_instruction");
        }
        else if (value != null) {
            normalizedValue = [String(value)];
        }

        acc[key] = normalizedValue;

        return acc;
    }, /** @type {Contacts} */ ({}));
}

/** @param {string} text */
function normalizeText(text) {
    return text.trim().toLowerCase().replace(/\s+/g, "_");
}