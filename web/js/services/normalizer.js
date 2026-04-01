// @ts-check

import * as cachedData from "../data/cachedData.js";

/** @typedef {import("../data/cachedData.js").Question} Question */
/** @typedef {import("../data/cachedData.js").Action} Action */
/** @typedef {import("../data/cachedData.js").Location} Location */

/** @returns {Question[]} */
export function getNormalizedQuestions() {
    let rawQuestions = cachedData.getQuestions();

    rawQuestions = Array.isArray(rawQuestions) ? rawQuestions : [];

    return rawQuestions.map(question => ({
        text: typeof question.text === "string" ? question.text : "unknown_text",
        name: typeof question.name === "string" ? normalizeText(question.name) : "unknown_name",

        options: (Array.isArray(question.options) ? question.options : [])
            .filter(option =>
                typeof option.value === "string" && typeof option.text === "string"
            )
            .map(option => ({
                value: normalizeText(option.value), text: option.text
            }))
            .sort((a, b) => a.text.localeCompare(b.text))
    }));
}

/** @returns {Action[]} */
export function getNormalizedActions() {
    let rawActions = cachedData.getActions();

    rawActions = Array.isArray(rawActions) ? rawActions : [];

    return rawActions.map(action => ({
        condition: action.condition && typeof action.condition === "object"
            ? { hazard: typeof action.condition.hazard === "string" ? normalizeText(action.condition.hazard) : "unknown_hazard" }
            : { hazard: "unknown_hazard" },

        instructions: (Array.isArray(action.instructions) ? action.instructions : [])
            .filter(instruction => typeof instruction === "string")
    }));
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