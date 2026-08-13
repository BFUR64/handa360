// @ts-check

import { initFormController } from "../controller/formController.js";

/**
 * @param {HTMLElement} root
 */
export function initHomeRoute(root) {
    root.innerHTML = "";
    initFormController(root);
}
