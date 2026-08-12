// @ts-check

import { initAboutRoute } from "./route/about.js";
import { initContactsRoute } from "./route/contacts.js";
import { initHomeRoute } from "./route/home.js";

// ----- Root Element -----
const root = /** @type {HTMLElement} */ (document.querySelector("#root"));

// ----- Initialize Nav Menu -----
const homeBtn = /** @type {HTMLButtonElement} */ (document.querySelector("#nav-home"));
const aboutBtn = /** @type {HTMLButtonElement} */ (document.querySelector("#nav-about"));
const contactsBtn = /** @type {HTMLButtonElement} */ (document.querySelector("#nav-contacts"));

function initializeNav () {
    homeBtn.addEventListener('click', () => {
        initHomeRoute(root);
    });

    aboutBtn.addEventListener('click', () => {
        initAboutRoute(root);
    });

    contactsBtn.addEventListener('click', () => {
        initContactsRoute(root);
    });
}

initializeNav();
initHomeRoute(root);
