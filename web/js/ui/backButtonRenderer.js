const container = /** @type {HTMLElement} */ (document.getElementById("container"));
const backButtonTemplate = /** @type {HTMLTemplateElement} */ (document.getElementById("back-button-template"));


/**
 * @returns {HTMLButtonElement}
 */
export function constructBackButton() {
    const backButtonClone = /** @type {DocumentFragment} */ (backButtonTemplate.content.cloneNode(true));

    const backButton = /** @type {HTMLButtonElement} */ (backButtonClone.querySelector(".back-button-submit"));

    backButton.textContent = "Back to Main Menu";

    container.append(backButtonClone);

    return backButton;
}