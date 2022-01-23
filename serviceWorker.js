 importScripts("https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js");

workbox.setConfig({ debug: true });

const {
    routing: { registerRoute, setCatchHandler },
    strategies: { CacheFirst, NetworkFirst, StaleWhileRevalidate },
    cacheableResponse: { CacheableResponse, CacheableResponsePlugin },
    expiration: { ExpirationPlugin, CacheExpiration },
    precaching: { matchPrecache, precacheAndRoute },
} = workbox;

precacheAndRoute([{ url: "/offline.html", revision: null }]);

// Cache page navigations (html) with a Network First strategy
registerRoute(
    ({ request }) => request.mode === "navigate",
    new NetworkFirst({
        cacheName: "pages",
        plugins: [
            new CacheableResponsePlugin({
                statuses: [200],
            }),
        ],
    })
);

// Cache Google Fonts
registerRoute(
    ({ url }) =>
        url.origin === "https://fonts.googleapis.com" ||
        url.origin === "https://fonts.gstatic.com",
    new StaleWhileRevalidate({
        cacheName: "pwa-google-fonts",
        plugins: [new ExpirationPlugin({ maxEntries: 20 })],
    })
);

// Cache Images
registerRoute(
    ({ request }) => request.destination === "image",
    new CacheFirst({
        cacheName: "pwa-images",
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200],
            }),
            new ExpirationPlugin({
                maxEntries: 60,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
            }),
        ],
    })
);

// Cache CSS, JS, Manifest, and Web Worker
registerRoute(
    ({ request }) =>
        request.destination === "script" ||
        request.destination === "style" ||
        request.destination === "manifest" ||
        request.destination === "worker",
    new StaleWhileRevalidate({
        cacheName: "pwa-static-assets",
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200],
            }),
            new ExpirationPlugin({
                maxEntries: 32,
                maxAgeSeconds: 24 * 60 * 60, // 24 hours
            }),
        ],
    })
);

// Catch routing errors, like if the user is offline
setCatchHandler(async ({ event }) => {
    // Return the precached offline page if a document is being requested
    if (event.request.destination === "document") {
        return matchPrecache("/offline.html");
    }

    return Response.error();
});

