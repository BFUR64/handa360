// @ts-check

/**
 * @param {HTMLElement} checklistBlock
 */
export function addCheckedListener(checklistBlock) {
    checklistBlock.addEventListener("change", function (event) {
        if (!(event.target instanceof HTMLInputElement)) return;

        const checkBox = event.target;
        const checklistItem = /** @type {HTMLElement} */ (checkBox.closest(".checklist-item"));

        if (checkBox.checked) {
            checklistItem.classList.add("completed");
        } else {
            checklistItem.classList.remove("completed");
        }
    });
}