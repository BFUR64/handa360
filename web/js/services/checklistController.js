// @ts-check

/**
 * @param {HTMLElement} checklistBlock
 */
export function addCheckedListener(checklistBlock) {
    checklistBlock.addEventListener("change", function (e) {
        if (!(e.target instanceof HTMLElement)) return;

        if (e.target.classList.contains("checklist-item-checkbox")) {
            let checklistItemCheckbox = /** @type {HTMLInputElement} */ (e.target);
            let checklistItem = /** @type {HTMLElement} */ (checklistItemCheckbox.closest(".checklist-item"));

            if (checklistItemCheckbox.checked) {
                checklistItem.classList.add("completed");
            } else {
                checklistItem.classList.remove("completed");
            }
        }
    });
}