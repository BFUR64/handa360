let questions = null;
let actions = null;
let locations = null;

export function getQuestions() {
    if (questions == null) return null;
    return structuredClone(questions);
}

export function getActions() {
    if (actions == null) return null;
    return structuredClone(actions);
}

export function getLocations() {
    if (locations == null) return null;
    return structuredClone(locations);
}

export function setQuestions(data) {
    questions = data;
}

export function setActions(data) {
    actions = data;
}

export function setLocations(data) {
    locations = data;
}