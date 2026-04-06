// @ts-check
/// <reference lib="webworker" />

const CACHE_NAME = "cache-v1";

const BASE = "/";

const ASSETS = [
    BASE,
    BASE + "index.html",

    BASE + "assets/images/call.png",
    BASE + "assets/images/email.png",
    BASE + "assets/images/handa360-logo.png",
    BASE + "assets/images/location.png",
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
    BASE + "web/css/toast.css",

    BASE + "web/app.js",
    BASE + "web/js/controllers/formController.js",
    BASE + "web/js/controllers/navigationController.js",

    BASE + "web/js/data/cachedData.js",
    BASE + "web/js/services/cacheService.js",
    BASE + "web/js/services/normalizer.js",
    BASE + "web/js/services/serviceWorker.js",

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
        fetch(event.request)
            .then(async response => {
                const cache = await caches.open(CACHE_NAME);
                cache.put(event.request, response.clone());
                return response;
            })
            .catch(async () => {
                const cached = await caches.match(event.request);
                if (cached) return cached;
                return new Response("Offline", { status: 503, statusText: "Service Unavailable" });
        })
    );
});