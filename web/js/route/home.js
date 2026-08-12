// @ts-check

import { initFormUI } from "../ui/formUI.js";

/**
 * @param {HTMLElement} root
 */
export function initHomeRoute(root) {
    root.innerHTML = "";
    initFormUI(root);
}
