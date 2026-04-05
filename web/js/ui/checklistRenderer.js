// @ts-check

/**
 * @module checklistRenderer
 *
 * @description
 * Renders a checklist block into the main container.
 * - Takes a map of instructions (key → array of strings)
 * - Renders the instructions for a specific key under a title
 * - Uses HTML templates for consistent structure
 *
 * Assumptions:
 * - The DOM contains templates with ids: checklist-template, checklist-item-template
 * - Container element exists with id="container"
 */

const container = /** @type {HTMLElement} */ (document.getElementById("container"));
const checklistTemplate = /** @type {HTMLTemplateElement} */ (document.getElementById("checklist-template"));
const checklistItemTemplate = /** @type {HTMLTemplateElement} */ (document.getElementById("checklist-item-template"));

/** @typedef {import("../data/cachedData.js").HazardInstructions} HazardInstructions */

/**
 * Renders a checklist for a given key from the instruction map.
 *
 * @param {Object<string, string[] | undefined>} objectMap - Map of instruction lists
 * @param {string} key - Key to select from the object map
 * @param {string} title - Title to display above the checklist
 */
export function render(objectMap, key, title) {
    const checklist = /** @type {DocumentFragment} */ (checklistTemplate.content.cloneNode(true));
    const checklistBlock = /** @type {HTMLElement} */ (checklist.querySelector(".checklist-block"));
    const checklistHeader = /** @type {HTMLElement} */ (checklist.querySelector(".checklist-header"))

    checklistHeader.innerText = title;

    const instructions = objectMap[key];
    if (instructions == null) return;

    instructions.forEach(instruction => {
        const checklistItem = /** @type {DocumentFragment} */ (checklistItemTemplate.content.cloneNode(true));
        const checklistText = /** @type {HTMLElement} */ (checklistItem.querySelector(".checklist-item-text"));

        checklistText.innerText = instruction;
        checklistBlock.append(checklistItem);
    });

    container.append(checklistBlock);
}