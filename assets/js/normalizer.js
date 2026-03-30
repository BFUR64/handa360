// @ts-check

import * as cachedData from "./cachedData.js";

/** @typedef {import("./cachedData.js").Question} Question */
/** @typedef {import("./cachedData.js").Action} Action */
/** @typedef {import("./cachedData.js").Location} Location */

/** @returns {Question[]} */
export function getNormalizedQuestions() {
    let rawQuestions = cachedData.getQuestions();

    rawQuestions = Array.isArray(rawQuestions) ? rawQuestions : [];

    return rawQuestions.map(question => ({
        text: typeof question.text === "string" ? question.text : "UNKNOWN_TEXT",
        name: typeof question.name === "string" ? question.name : "UNKNOWN_NAME",

        options: (Array.isArray(question.options) ? question.options : [])
            .filter(option => typeof option.value === "string" && typeof option.text === "string")
            .map(option => ({ value: option.value, text: option.text}))
    }));
}

/** @returns {Action[]} */
export function getNormalizedActions() {
    let rawActions = cachedData.getActions();

    rawActions = Array.isArray(rawActions) ? rawActions : [];

    return rawActions.map(action => ({
        condition: action.condition && typeof action.condition === "object"
            ? { hazard: typeof action.condition.hazard === "string" ? action.condition.hazard : "UNKNOWN_HAZARD" }
            : { hazard: "UNKNOWN_HAZARD" },

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
            ? { location: typeof location.condition.location === "string" ? location.condition.location : "UNKNOWN_LOCATION" }
            : { location: "UNKNOWN_LOCATION" },

        information: (Array.isArray(location.information) ? location.information : [])
            .filter(information => typeof information === "string")
    }));
}