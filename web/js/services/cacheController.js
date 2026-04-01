// @ts-check

import * as cachedData from "../data/cachedData.js";

const QUESTIONS_URL = "data/questions.json";
const HAZARD_INSTRUCTIONS_URL = "data/hazard_instructions.json";
const CONTACTS_URL = "data/contacts.json";

const LOCAL_QUESTIONS_KEY = "questions";
const LOCAL_HAZARD_INSTRUCTIONS_KEY = "hazard_instructions";
const LOCAL_CONTACTS_KEY = "contacts";

/**
 * @returns {boolean}
 */
export function loadFromStorage() {
    let loadSuccess = true;

    try {
        loadItemFromStorage(LOCAL_QUESTIONS_KEY, cachedData.setQuestions);
        loadItemFromStorage(LOCAL_HAZARD_INSTRUCTIONS_KEY, cachedData.setHazardInstructions);
        loadItemFromStorage(LOCAL_CONTACTS_KEY, cachedData.setContacts);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Unknown Error";

        console.warn("Local storage corrupted, wiping...", message);

        localStorage.removeItem(LOCAL_QUESTIONS_KEY);
        localStorage.removeItem(LOCAL_HAZARD_INSTRUCTIONS_KEY);
        localStorage.removeItem(LOCAL_CONTACTS_KEY);

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
        syncFromUrl(QUESTIONS_URL, cachedData.setQuestions, LOCAL_QUESTIONS_KEY),
        syncFromUrl(HAZARD_INSTRUCTIONS_URL, cachedData.setHazardInstructions, LOCAL_HAZARD_INSTRUCTIONS_KEY),
        syncFromUrl(CONTACTS_URL, cachedData.setContacts, LOCAL_CONTACTS_KEY)
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