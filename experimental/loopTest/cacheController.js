import * as cachedData from "./cachedData.js";

const QUESTIONS_URL = "data/questions.json";
const ACTIONS_URL = "data/actions.json";
const LOCATIONS_URL = "data/locations.json";

const LOCAL_QUESTIONS_KEY = "questions";
const LOCAL_ACTIONS_KEY = "actions";
const LOCAL_LOCATIONS_KEY = "locations";

export function loadFromStorage() {
    try {
        loadItemFromStorage(LOCAL_QUESTIONS_KEY, cachedData.setQuestions);
        loadItemFromStorage(LOCAL_ACTIONS_KEY, cachedData.setActions);
        loadItemFromStorage(LOCAL_LOCATIONS_KEY, cachedData.setLocations);
    }
    catch (error) {
        console.warn("Local storage cache corrupted, skipping...", error.message);
    }
}

function loadItemFromStorage(itemKey, setterFunction) {
    let localData = localStorage.getItem(itemKey);

    if (localData != null) {
        setterFunction(JSON.parse(localData));
    }
}

export async function syncFromRemote() {
    let results = await Promise.allSettled([
        syncFromUrl(QUESTIONS_URL, cachedData.setQuestions, LOCAL_QUESTIONS_KEY),
        syncFromUrl(ACTIONS_URL, cachedData.setActions, LOCAL_ACTIONS_KEY),
        syncFromUrl(LOCATIONS_URL, cachedData.setLocations, LOCAL_LOCATIONS_KEY)
    ]);

    results.forEach(result => {
        if (result.status === "rejected") {
            console.log("Sync failed for the file:", result.reason.message);
        }
    });
}

async function syncFromUrl(url, setterFunction, key) {
    let response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Server said: ${response.status} ${response.statusText}`);
    }

    let data = await response.json();

    setterFunction(data);

    localStorage.setItem(key, JSON.stringify(data));
}