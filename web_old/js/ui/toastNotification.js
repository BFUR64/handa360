// @ts-check

/**
 * @module toastNotification
 *
 * @description
 * Displays a temporary toast notification in the UI.
 * - Accepts a message string, a type for styling (e.g., "error", "success"), and a duration in milliseconds
 * - Adds the toast element to the container, shows it with CSS classes, and automatically removes it after the duration
 *
 * Assumptions:
 * - The DOM contains a container with id="toast-container"
 * - A toast-template exists with class="toast" inside
 */

/**
 * Shows a toast notification with automatic removal.
 *
 * @param {string} message - Message text to display
 * @param {string} messageType - CSS class for type/styling (e.g., "success", "error")
 * @param {number} [duration=3000] - Time in milliseconds before removing the toast
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