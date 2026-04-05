// @ts-check

/**
 * @module cacheService
 *
 * @description
 * This module manages how data is loaded and stored in the app.
 *
 * It connects three main parts:
 * - Remote JSON files (source of truth)
 * - localStorage (persistent storage between sessions)
 * - cachedData (in-memory cache used by the app)
 *
 * It first attempts to load data from localStorage for faster startup.
 * If local data is missing or corrupted, it can fetch fresh data from
 * remote files and update both the cache and localStorage.
 *
 * It also includes error handling to prevent the app from breaking due
 * to invalid or corrupted stored data by clearing and resetting storage.
 *
 * This improves performance, ensures data persistence, and keeps the
 * application data consistent and up to date.
 */

import * as cachedData from "../data/cachedData.js";

const URL_QUESTIONS = "data/questions.json";
const URL_HAZARD_INSTRUCTIONS = "data/hazard_instructions.json";
const URL_CONTACTS = "data/contacts.json";
const URL_SPECIAL_NEEDS_INSTRUCTIONS = "data/special_needs_instructions.json";

const KEY_QUESTIONS = "questions";
const KEY_HAZARD_INSTRUCTIONS = "hazard_instructions";
const KEY_CONTACTS = "contacts";
const KEY_SPECIAL_NEEDS_INSTRUCTIONS = "special_needs_instructions";

/**
 * @returns {boolean}
 */
export function loadFromStorage() {
    let loadSuccess = true;

    try {
        loadItemFromStorage(KEY_QUESTIONS, cachedData.setQuestions);
        loadItemFromStorage(KEY_HAZARD_INSTRUCTIONS, cachedData.setHazardInstructions);
        loadItemFromStorage(KEY_CONTACTS, cachedData.setContacts);
        loadItemFromStorage(KEY_SPECIAL_NEEDS_INSTRUCTIONS, cachedData.setSpecialNeedsInstructions);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Unknown Error";

        console.warn("Local storage corrupted, wiping...", message);

        localStorage.removeItem(KEY_QUESTIONS);
        localStorage.removeItem(KEY_HAZARD_INSTRUCTIONS);
        localStorage.removeItem(KEY_CONTACTS);

        loadSuccess = false;
    }

    return loadSuccess;
}

/**
 * @template T
 * @param {string} itemKey
 * @param {function(T):void} setterFunction
 */
function loadItemFromStorage(itemKey, setterFunction) {
    const localData = localStorage.getItem(itemKey);

    if (localData != null) {
        setterFunction(JSON.parse(localData));
    }
}

/** @returns {Promise<boolean>} */
export async function syncFromRemote() {
    const results = await Promise.allSettled([
        syncFromUrl(URL_QUESTIONS, cachedData.setQuestions, KEY_QUESTIONS),
        syncFromUrl(URL_HAZARD_INSTRUCTIONS, cachedData.setHazardInstructions, KEY_HAZARD_INSTRUCTIONS),
        syncFromUrl(URL_CONTACTS, cachedData.setContacts, KEY_CONTACTS),
        syncFromUrl(URL_SPECIAL_NEEDS_INSTRUCTIONS, cachedData.setSpecialNeedsInstructions, KEY_SPECIAL_NEEDS_INSTRUCTIONS)
    ]);

    let isPerfectSync = true;

    results.forEach(result => {
        if (result.status === "rejected") {
            console.warn("Sync failed for a file:", result.reason.message);
            isPerfectSync = false;
        }
    });

    return isPerfectSync;
}

/**
 * @template T
 * @param {string} url
 * @param {function(T):void} setterFunction
 * @param {string} key
 */
async function syncFromUrl(url, setterFunction, key) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`${url} failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    setterFunction(data);

    localStorage.setItem(key, JSON.stringify(data));
}