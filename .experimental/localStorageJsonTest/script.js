let questionsData;
let actionsData;
let locationsData;

addEventListener("DOMContentLoaded", async function() {
    loadCache();
    await syncCache();

    test();
})

function test() {
    console.log("questionsData:", questionsData);
    console.log("actionsData:", actionsData);
    console.log("locationsData:", locationsData);
}

function loadCache() {
    try {
        let data = loadFromStorage("questions.json");

        if (data != null) {
            questionsData = JSON.parse(data);
        }

        data = loadFromStorage("data.json");

        if (data != null) {
            let parsedData = JSON.parse(data);

            actionsData = parsedData.actions;
            locationsData = parsedData.locations;
        }
    }
    catch (error) {
        console.warn("Local storage cache corrupted, skipping...", error.message);
    }
}

async function syncCache() {
    try {
        let response = await fetch("questions.json");

        if (!response.ok) {
            throw new Error(`Server said: ${response.status} ${response.statusText} for questions.json`);
        }

        questionsData = await response.json();
        saveToStorage("questions.json", questionsData);

        response = await fetch("data.json");

        if (!response.ok) {
            throw new Error(`Server said: ${response.status} ${response.statusText} for data.json`);
        }

        let data = await response.json();

        actionsData = data.actions;
        locationsData = data.locations;

        saveToStorage("data.json", data);
    }
    catch (error) {
        console.warn("Failed to load remote data, skipping...", error.message);
    }
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function loadFromStorage(key) {
    return localStorage.getItem(key);
}