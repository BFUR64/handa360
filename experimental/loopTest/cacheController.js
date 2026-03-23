import * as cachedData from "./cachedData";

const QUESTIONS_URL = "questions.json";
const DATA_URL = "data.json";

const LOCAL_QUESTIONS_KEY = "questions.json";
const LOCAL_DATA_KEY = "data.json"

function loadFromStorage() {
    try {
        loadQuestionsFromStorage();
        loadDataFromStorage();
    }
    catch (error) {
        console.warn("Local storage cache corrupted, skipping...", error.message);
    }
}

function loadQuestionsFromStorage() {
    let localQuestions = localStorage.getItem(LOCAL_QUESTIONS_KEY);

    if (localQuestions != null) {
        cachedData.questions = JSON.parse(localQuestions);
    }
}

function loadDataFromStorage() {
    let localData = localStorage.getItem(LOCAL_DATA_KEY);

    if (localData != null) {
        localData = JSON.parse(localData);

        cachedData.actions = localData.actions;
        cachedData.locations = localData.locations;
    }
}

async function syncFromRemote() {
    try {
        await syncQuestionsFromRemote();
        await syncDataFromRemote();
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

    cachedData.questions = await response.json();

    localStorage.setItem(LOCAL_QUESTIONS_KEY, JSON.stringify(cachedData.questions));
}

async function syncDataFromRemote() {
    let response = await fetch(DATA_URL);

    if (!response.ok) {
        throw new Error(`Server said: ${response.status} ${response.statusText}`);
    }

    let remoteData = await response.json();

    cachedData.actions = remoteData.actions;
    cachedData.locations = remoteData.locations;

    localStorage.setItem(LOCAL_DATA_KEY, JSON.stringify(remoteData));
}
