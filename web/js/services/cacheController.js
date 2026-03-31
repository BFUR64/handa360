// @ts-check

import * as cachedData from "../data/cachedData.js";

const QUESTIONS_URL = "data/questions.json";
const ACTIONS_URL = "data/actions.json";
const LOCATIONS_URL = "data/locations.json";

const LOCAL_QUESTIONS_KEY = "questions";
const LOCAL_ACTIONS_KEY = "actions";
const LOCAL_LOCATIONS_KEY = "locations";

/**
 * @returns {boolean}
 */
export function loadFromStorage() {
    let loadSuccess = true;

    try {
        loadItemFromStorage(LOCAL_QUESTIONS_KEY, cachedData.setQuestions);
        loadItemFromStorage(LOCAL_ACTIONS_KEY, cachedData.setActions);
        loadItemFromStorage(LOCAL_LOCATIONS_KEY, cachedData.setLocations);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Unknown Error";

        console.warn("Local storage corrupted, wiping...", message);

        localStorage.removeItem(LOCAL_QUESTIONS_KEY);
        localStorage.removeItem(LOCAL_ACTIONS_KEY);
        localStorage.removeItem(LOCAL_LOCATIONS_KEY);

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
        syncFromUrl(ACTIONS_URL, cachedData.setActions, LOCAL_ACTIONS_KEY),
        syncFromUrl(LOCATIONS_URL, cachedData.setLocations, LOCAL_LOCATIONS_KEY)
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
        throw new Error(`Server said: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    setterFunction(data);

    localStorage.setItem(key, JSON.stringify(data));
}