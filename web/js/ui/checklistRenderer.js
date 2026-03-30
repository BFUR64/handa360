// @ts-check

const container = /** @type {HTMLElement} */ (document.getElementById("container"));
const checklistTemplate = /** @type {HTMLTemplateElement} */ (document.getElementById("checklist-template"));
const checklistItemTemplate = /** @type {HTMLTemplateElement} */ (document.getElementById("checklist-item-template"));

/** @typedef {import("../data/cachedData.js").Action} Action */

/**
 * @param {string} hazard
 * @param {Action[]} actions
 * @return {HTMLElement}
 */
export function render(hazard, actions) {
    const checklist = /** @type {DocumentFragment} */ (checklistTemplate.content.cloneNode(true));
    const checklistBlock = /** @type {HTMLElement} */ (checklist.querySelector(".checklist-block"));

    container.innerHTML = "";

    actions.forEach(action => {
        const currentHazard = action.condition.hazard;

        if (currentHazard === hazard) {
            action.instructions.forEach(instruction => {
                const checklistItem = /** @type {DocumentFragment} */ (checklistItemTemplate.content.cloneNode(true));
                const checklistText = /** @type {HTMLElement} */ (checklistItem.querySelector(".checklist-item-text"));

                checklistText.innerText = instruction;
                checklistBlock.append(checklistItem);
            })

            container.append(checklistBlock);
        }
    })

    return checklistBlock;
}