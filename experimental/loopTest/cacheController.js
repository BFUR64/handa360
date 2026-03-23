import * as cachedData from "./cachedData.js";

const QUESTIONS_URL = "data/questions.json";
const ACTIONS_URL = "data/actions.json";
const LOCATIONS_URL = "data/locations.json";

const LOCAL_QUESTIONS_KEY = "questions";
const LOCAL_ACTIONS_KEY = "actions";
const LOCAL_LOCATIONS_KEY = "locations";

export function loadFromStorage() {
    try {
        loadQuestionsFromStorage();
        loadActionsFromStorage();
        loadLocationsFromStorage();
    }
    catch (error) {
        console.warn("Local storage cache corrupted, skipping...", error.message);
    }
}

function loadQuestionsFromStorage() {
    let localQuestions = localStorage.getItem(LOCAL_QUESTIONS_KEY);

    if (localQuestions != null) {
        cachedData.setQuestions(JSON.parse(localQuestions));
    }
}

function loadActionsFromStorage() {
    let localActions = localStorage.getItem(LOCAL_ACTIONS_KEY);

    if (localActions != null) {
        cachedData.setActions(JSON.parse(localActions));
    }
}

function loadLocationsFromStorage() {
    let localLocations = localStorage.getItem(LOCAL_LOCATIONS_KEY);

    if (localLocations != null) {
        cachedData.setLocations(JSON.parse(localLocations));
    }
}

export async function syncFromRemote() {
    try {
        await syncQuestionsFromRemote();
        await syncActionsFromRemote();
        await syncLocationsFromRemote();
    }
    catch (error) {
        console.warn("Failed to load from remote, skipping...", error.message);
    }
}

async function syncQuestionsFromRemote() {
    let response = await fetch(QUESTIONS_URL);

    if (!response.ok) {
        throw new Error(`Server said: ${response.status} ${response.statusText}`);
    }

    cachedData.setQuestions(await response.json());

    localStorage.setItem(LOCAL_QUESTIONS_KEY, JSON.stringify(cachedData.questions));
}

async function syncActionsFromRemote() {
    let response = await fetch(ACTIONS_URL);

    if (!response.ok) {
        throw new Error(`Server said: ${response.status} ${response.statusText}`);
    }

    cachedData.setActions(await response.json());

    localStorage.setItem(LOCAL_ACTIONS_KEY, JSON.stringify(cachedData.actions));
}

async function syncLocationsFromRemote() {
    let response = await fetch(LOCATIONS_URL);

    if (!response.ok) {
        throw new Error(`Server said: ${response.status} ${response.statusText}`);
    }

    cachedData.setLocations(await response.json());

    localStorage.setItem(LOCAL_LOCATIONS_KEY, JSON.stringify(cachedData.locations));
}