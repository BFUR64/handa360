// @ts-check

/**
 * @param {string} message
 * @param {string} messageType
 * @param {*} duration
 */
export function showToast(message, messageType, duration = 3000) {
    const toastContainer = /** @type {HTMLElement} */ (document.getElementById("toast-container"));

    const toastTemplate = /** @type {HTMLTemplateElement} */ (document.getElementById("toast-template"));
    const toastTemplateClone = /** @type {DocumentFragment} */ (toastTemplate.content.cloneNode(true));

    const toastText = /** @type {HTMLElement} */ (toastTemplateClone.querySelector(".toast"));

    toastText.innerHTML = message;

    requestAnimationFrame(() => {
        toastText.classList.add("show", messageType);
    })

    setTimeout(() => {
        toastText.classList.remove("show");
        toastText.addEventListener("transitionend", () => toastText.remove());
    }, duration);

    toastContainer.append(toastTemplateClone);
}