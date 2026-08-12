// @ts-check

import { initAboutRoute } from "./route/about.js";
import { initContactsRoute } from "./route/contacts.js";
import { initHomeRoute } from "./route/home.js";
import { sync } from "./service/databaseService.js";

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

async function initializeSyncService() {
    const maxRetries = 5;

    let response = new Response(null, { status: 500 });

    // TODO Throw toast noficiation it is syncing
    for (let attempt = 0; attempt < maxRetries && !response.ok; attempt++) {
        try {
            await new Promise(r => setTimeout(r, 3000 * attempt));
            response = await sync();
        }
        catch (err) {
            const error = /** @type {Error} */ (err);
            console.warn('Sync attempt failed:', error);
        }
    }

    if (!response.ok) {
        // TODO: Show toast "Sync failed after 5 attempts"
        console.error("Sync failed.");
    }
}

initializeNav();
initHomeRoute(root);
await initializeSyncService();

// ----- Lazy Logo Loading -----
const img = /** @type {HTMLImageElement | null} */ (document.querySelector('header img[data-src]'));

if (img?.dataset?.src) {
    img.src = img.dataset.src;
}
