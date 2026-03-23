/**
 * @typedef {Object} QuestionsData
 * @property {String[]} location
 * @property {String[]} hazard
 */

/**
 * @typedef {Object} ActionsData
 * @property {Object} condition
 * @property {string} condition.hazard
 * @property {string[]} instructions
 */

/**
 * @typedef {Object} LocationsData
 * @property {Object} condition
 * @property {string} condition.location
 * @property {string[]} information
 */

let questions = null;
let actions = null;
let locations = null;

/**
 * 
 * @returns {QuestionsData | null}
 */
export function getQuestions() {
    if (questions == null) return null;
    return structuredClone(questions);
}

/**
 * 
 * @returns {ActionsData | null}
 */
export function getActions() {
    if (actions == null) return null;
    return structuredClone(actions);
}

/**
 * 
 * @returns {LocationsData | null}
 */
export function getLocations() {
    if (locations == null) return null;
    return structuredClone(locations);
}

/**
 * 
 * @param {QuestionsData} data 
 */
export function setQuestions(data) {
    questions = data;
}

/**
 * 
 * @param {ActionsData} data 
 */
export function setActions(data) {
    actions = data;
}

/**
 * 
 * @param {LocationsData} data 
 */
export function setLocations(data) {
    locations = data;
}