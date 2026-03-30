// @ts-check

import * as cacheController from "./js/services/cacheController.js";
import * as normalizer from "./js/services/normalizer.js";
import * as formRenderer from "./js/ui/formRenderer.js";

addEventListener("DOMContentLoaded", async function() {
    cacheController.loadFromStorage();
    let syncSuccess = await cacheController.syncFromRemote();

    if (!syncSuccess) {
        // TODO: Add notification system for the user
        console.error("No toast notifications for user. Fix pls");
    }

    formRenderer.render(normalizer.getNormalizedQuestions());
})
