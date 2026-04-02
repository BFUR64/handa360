// @ts-check

import * as cachedData from "../data/cachedData.js";

/** @typedef {import("../data/cachedData.js").Question} Question */
/** @typedef {import("../data/cachedData.js").HazardInstructions} HazardInstructions */
/** @typedef {import("../data/cachedData.js").Contacts} Contacts */

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
    if (!rawHazardInstructions || typeof rawHazardInstructions != "object" || Array.isArray(rawHazardInstructions)) return {};

    return Object.entries(rawHazardInstructions).reduce((acc, [key, value]) => {
        let normalizedValue = /** @type {string[]} */ ([]);

        if (Array.isArray(value)) {
            normalizedValue = value.map(instruction => typeof instruction === "string" ? instruction : "undefined_instruction");
        }
        else if (value != null) {
            normalizedValue = [String(value)];
        }

        acc[key] = normalizedValue;

        return acc;
    }, /** @type {HazardInstructions} */ ({}));
}

/**
 * @param {Contacts} rawContacts
 * @returns {Contacts} */
export function getNormalizedContacts(rawContacts) {
    if (!rawContacts || typeof rawContacts != "object" || Array.isArray(rawContacts)) return {};

    return Object.entries(rawContacts).reduce((acc, [key, value]) => {
        let normalizedValue = /** @type {string[]} */ ([]);

        if (Array.isArray(value)) {
            normalizedValue = value.map(instruction => typeof instruction === "string" ? instruction : "undefined_contact");
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