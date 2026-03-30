// @ts-check

/** @typedef {import("../data/cachedData.js").Action} Action */

/**
 * @param {string} hazard
 * @param {Action[]} actions
 * @return {HTMLElement}
 */
export function render(hazard, actions) {
    let container = /** @type {HTMLElement} */ (document.getElementById("container"));
    let checklistTemplate = /** @type {HTMLTemplateElement} */ (document.getElementById("checklist-template"));
    let checklistItemTemplate = /** @type {HTMLTemplateElement} */ (document.getElementById("checklist-item-template"));

    let checklist = /** @type {DocumentFragment} */ (checklistTemplate.content.cloneNode(true));
    let checklistBlock = /** @type {HTMLElement} */ (checklist.querySelector(".checklist-block"));

    container.innerHTML = "";

    actions.forEach(action => {
        let currentHazard = action.condition.hazard;

        if (currentHazard === hazard) {
            action.instructions.forEach(instruction => {
                let checklistItem = /** @type {DocumentFragment} */ (checklistItemTemplate.content.cloneNode(true));
                let checklistText = /** @type {HTMLElement} */ (checklistItem.querySelector(".checklist-item-text"));

                checklistText.innerText = instruction;
                checklistBlock.append(checklistItem);
            })

            container.append(checklistBlock);
        }
    })
    return checklistBlock;
}