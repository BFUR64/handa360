// @ts-check

import * as cachedData from "../data/cachedData.js";

/** @typedef {import("../data/cachedData.js").Question} Question */
/** @typedef {import("../data/cachedData.js").HazardInstructions} HazardInstructions */
/** @typedef {import("../data/cachedData.js").Location} Location */

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

/** @returns {Location[]} */
export function getNormalizedLocations() {
    let rawLocations = cachedData.getLocations();

    rawLocations = Array.isArray(rawLocations) ? rawLocations : [];

    return rawLocations.map(location => ({
        condition: location.condition && typeof location.condition === "object"
            ? { location: typeof location.condition.location === "string" ? normalizeText(location.condition.location) : "unknown_location" }
            : { location: "unknown_location" },

        information: (Array.isArray(location.information) ? location.information : [])
            .filter(information => typeof information === "string")
    }));
}

/** @param {string} text */
function normalizeText(text) {
    return text.trim().toLowerCase().replace(/\s+/g, "_");
}