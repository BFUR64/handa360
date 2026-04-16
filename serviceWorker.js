// @ts-check
/// <reference lib="webworker" />

/**
 * @module serviceWorker
 *
 * @description
 * Enables offline functionality and asset caching
 *
 */

const CACHE_NAME = "cache-v1.2";

const BASE = "/handa360/";

const ASSETS = [
    BASE,
    BASE + "serviceWorker.js",
    BASE + "manifest.json",
    BASE + "index.html",

    // Assets
    BASE + "assets/images/call.png",
    BASE + "assets/images/email.png",
    BASE + "assets/images/handa360-logo.png",
    BASE + "assets/images/location.png",

    // CSS
    BASE + "web/css/about.css",
    BASE + "web/css/checklist.css",
    BASE + "web/css/colors.css",
    BASE + "web/css/contact.css",
    BASE + "web/css/contactlist.css",
    BASE + "web/css/footer.css",
    BASE + "web/css/form.css",
    BASE + "web/css/general.css",
    BASE + "web/css/header.css",
    BASE + "web/css/mobile.css",
    BASE + "web/css/output.css",
    BASE + "web/css/toast.css",

    BASE + "web/app.js",

    // Controller Modules
    BASE + "web/js/controllers/appController.js",
    BASE + "web/js/controllers/backButtonController.js",
    BASE + "web/js/controllers/formController.js",
    BASE + "web/js/controllers/navigationController.js",
    BASE + "web/js/controllers/outputController.js",


    // Data Modules
    BASE + "web/js/data/cachedData.js",

    // Services Modules
    BASE + "web/js/services/cacheService.js",
    BASE + "web/js/services/normalizer.js",

    // UI Modules
    BASE + "web/js/ui/backButtonRenderer.js",
    BASE + "web/js/ui/checklistRenderer.js",
    BASE + "web/js/ui/contactlistRenderer.js",
    BASE + "web/js/ui/formRenderer.js",
    BASE + "web/js/ui/toastNotification.js",
    BASE + "web/js/ui/uiHelper.js",
];

self.addEventListener("install", async event => {
    if (!(event instanceof ExtendableEvent)) return;

    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(ASSETS);
        })
    );
});

self.addEventListener("activate", event => {
    if (!(event instanceof ExtendableEvent)) return;

    event.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.map(key => {
                if (key != CACHE_NAME) {
                    return caches.delete(key);
                }
            })
        ))
    );
});

self.addEventListener("fetch", event => {
    if (!(event instanceof FetchEvent)) return;

    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }

                return fetch (event.request);
            })
    )
});