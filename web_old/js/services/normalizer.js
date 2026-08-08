// @ts-check

/**
 * @module normalizer
 *
 * @description
 * This module exists as a defensive normalization layer between raw external data
 * (e.g. cachedData.js) and the rest of the application.
 *
 * Its primary purpose is to enforce predictable structure, types, and formatting
 * before data is consumed elsewhere. Instead of forcing every component or consumer
 * to perform repetitive validation and sanitization, this module centralizes that logic.
 *
 * In particular, it:
 * - Ensures required fields exist and fall back to safe defaults when missing
 * - Normalizes identifiers and enum-like values into a consistent format
 * - Filters out malformed or incomplete entries
 * - Converts loosely-typed or inconsistent data into stable, expected shapes
 * - Prevents runtime errors caused by unexpected nulls, types, or structures
 *
 * This is used by cachedData.js (e.g. `setQuestions`, `setHazardInstructions`) to
 * guarantee that all stored data is already normalized, allowing the rest of the
 * application to operate under the assumption that the data is clean and reliable.
 *
 * Design philosophy:
 * - Fail soft (fallbacks instead of crashes)
 * - Normalize early (at ingestion, not at usage)
 * - Centralize data hygiene to reduce duplication and hidden bugs
 *
 * Without this layer, every consumer would need to defensively check data,
 * increasing complexity, duplication, and the likelihood of subtle inconsistencies.
 */

/** @typedef {import("../data/cachedData.js").Question} Question */
/** @typedef {import("../data/cachedData.js").HazardInstructions} HazardInstructions */
/** @typedef {import("../data/cachedData.js").Contacts} Contacts */
/** @typedef {import("../data/cachedData.js").SpecialNeedsInstructions} SpecialNeedsInstructions */
/** @typedef {import("../data/cachedData.js").GobagItemRegistry} GobagItemRegistry */
/** @typedef {import("../data/cachedData.js").GobagItems} GobagItems */

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
 * @param {GobagItemRegistry} gobagitemRegistry
 * @returns {GobagItemRegistry}
 */
export function getNormalizedGobagItemRegistry(gobagitemRegistry) {
    if (!gobagitemRegistry || typeof gobagitemRegistry != "object" || Array.isArray(gobagitemRegistry)) return {};


    return Object.entries(gobagitemRegistry).reduce((acc, [id, item]) => {
        if (item && typeof item === "object") {
            acc[id] = {
                text: typeof item.text === "string" ? item.text : "unknown_text",
                image: typeof item.image === "string" ? item.image : "unknown_image"
            }
        }

        return acc;
    }, /** @type {GobagItemRegistry} */ ({}))
}

/**
 * @param {GobagItems} gobagItems
 * @returns {GobagItems}
 */
export function getNormalizedGobagItems(gobagItems) {
    return getNormalizedObjectMap(gobagItems);
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