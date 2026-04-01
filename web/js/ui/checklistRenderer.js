// @ts-check

const container = /** @type {HTMLElement} */ (document.getElementById("container"));
const checklistTemplate = /** @type {HTMLTemplateElement} */ (document.getElementById("checklist-template"));
const checklistItemTemplate = /** @type {HTMLTemplateElement} */ (document.getElementById("checklist-item-template"));

/** @typedef {import("../data/cachedData.js").HazardInstructions} HazardInstructions */

/**
 * @param {string} hazardSelected
 * @param {HazardInstructions} hazardInstructions
 */
export function render(hazardSelected, hazardInstructions) {
    const checklist = /** @type {DocumentFragment} */ (checklistTemplate.content.cloneNode(true));
    const checklistBlock = /** @type {HTMLElement} */ (checklist.querySelector(".checklist-block"));
    const checklistHeader = /** @type {HTMLElement} */ (checklist.querySelector(".checklist-header"))

    container.innerHTML = "";

    checklistHeader.innerText = "Checklist";

    const instructions = hazardInstructions[hazardSelected];
    if (instructions == null) return;

    instructions.forEach(instruction => {
        const checklistItem = /** @type {DocumentFragment} */ (checklistItemTemplate.content.cloneNode(true));
        const checklistText = /** @type {HTMLElement} */ (checklistItem.querySelector(".checklist-item-text"));

        checklistText.innerText = instruction;
        checklistBlock.append(checklistItem);
    });

    container.append(checklistBlock);
}