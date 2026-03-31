// @ts-check

const container = /** @type {HTMLElement} */ (document.getElementById("container"));
const checklistTemplate = /** @type {HTMLTemplateElement} */ (document.getElementById("checklist-template"));
const checklistItemTemplate = /** @type {HTMLTemplateElement} */ (document.getElementById("checklist-item-template"));

/** @typedef {import("../data/cachedData.js").Action} Action */

/**
 * @param {string} hazardSelected
 * @param {Action[]} actions
 * @return {HTMLElement}
 */
export function render(hazardSelected, actions) {
    const checklist = /** @type {DocumentFragment} */ (checklistTemplate.content.cloneNode(true));
    const checklistBlock = /** @type {HTMLElement} */ (checklist.querySelector(".checklist-block"));
    const checklistHeader = /** @type {HTMLElement} */ (checklist.querySelector(".checklist-header"))

    container.innerHTML = "";

    actions.forEach(action => {
        const currentHazard = action.condition.hazard;

        if (currentHazard === hazardSelected) {
            action.instructions.forEach(instruction => {
                const checklistItem = /** @type {DocumentFragment} */ (checklistItemTemplate.content.cloneNode(true));
                const checklistText = /** @type {HTMLElement} */ (checklistItem.querySelector(".checklist-item-text"));

                checklistHeader.innerText = hazardSelected;
                checklistText.innerText = instruction;
                checklistBlock.append(checklistItem);
            })

            container.append(checklistBlock);
        }
    })

    return checklistBlock;
}