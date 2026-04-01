// @ts-check

import * as cachedData from "../data/cachedData.js";

/** @typedef {import("../data/cachedData.js").Question} Question */
/** @typedef {import("../data/cachedData.js").HazardInstructions} HazardInstructions */
/** @typedef {import("../data/cachedData.js").Contacts} Contacts */

/** @returns {Question[]} */
export function getNormalizedQuestions() {
    let rawQuestions = cachedData.getQuestions();

    rawQuestions = Array.isArray(rawQuestions) ? rawQuestions : [];

    return rawQuestions.map(question => ({
        text: typeof question.text === "string" ? question.text : "unknown_text",
        id: typeof question.id === "string" ? normalizeText(question.id) : "unknown_id",

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

/** @returns {HazardInstructions} */
export function getNormalizedActions() {
    let rawHazardInstructions = cachedData.getHazardInstructions();

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

/** @returns {Contacts} */
export function getNormalizedContacts() {
    let rawContacts = cachedData.getContacts();

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