/**
 * service-worker.js
 * Service Worker pour fonctionnement offline et cache
 */

const CACHE_NAME = 'out-of-dysarthria-v1.0.0';
const urlsToCache = [
    '/',
    '/index.html',
    '/css/reset.css',
    '/css/variables.css',
    '/css/layout.css',
    '/css/components.css',
    '/js/parcours.js',
    '/js/storage.js',
    '/js/timer.js',
    '/js/ui.js',
    '/js/app.js',
    '/manifest.json'
];

/**
 * Installation du Service Worker
 * Met en cache tous les fichiers statiques
 */
self.addEventListener('install', (event) => {
    console.log('[Service Worker] Installation...');

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[Service Worker] Mise en cache des fichiers');
                return cache.addAll(urlsToCache);
            })
            .then(() => {
                console.log('[Service Worker] Installation terminée');
                // Force l'activation immédiate
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error('[Service Worker] Erreur lors de la mise en cache:', error);
            })
    );
});

/**
 * Activation du Service Worker
 * Nettoie les anciens caches
 */
self.addEventListener('activate', (event) => {
    console.log('[Service Worker] Activation...');

    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheName !== CACHE_NAME) {
                            console.log('[Service Worker] Suppression ancien cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('[Service Worker] Activation terminée');
                // Prendre le contrôle de toutes les pages immédiatement
                return self.clients.claim();
            })
    );
});

/**
 * Interception des requêtes réseau
 * Stratégie: Cache First, falling back to Network
 */
self.addEventListener('fetch', (event) => {
    // Ignorer les requêtes non-GET
    if (event.request.method !== 'GET') {
        return;
    }

    // Ignorer les requêtes vers d'autres domaines
    if (!event.request.url.startsWith(self.location.origin)) {
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                // Si la ressource est en cache, la retourner
                if (cachedResponse) {
                    return cachedResponse;
                }

                // Sinon, faire une requête réseau
                return fetch(event.request)
                    .then((response) => {
                        // Vérifier si la réponse est valide
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // Cloner la réponse (car elle ne peut être consommée qu'une fois)
                        const responseToCache = response.clone();

                        // Mettre à jour le cache avec la nouvelle réponse
                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    })
                    .catch((error) => {
                        console.error('[Service Worker] Erreur réseau:', error);

                        // Si c'est la page principale, retourner une page offline
                        if (event.request.mode === 'navigate') {
                            return caches.match('/index.html');
                        }

                        // Pour les autres ressources, laisser l'erreur se propager
                        throw error;
                    });
            })
    );
});

/**
 * Gestion des messages depuis l'application
 */
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }

    if (event.data && event.data.type === 'CACHE_URLS') {
        event.waitUntil(
            caches.open(CACHE_NAME)
                .then((cache) => {
                    return cache.addAll(event.data.urls);
                })
        );
    }

    if (event.data && event.data.type === 'CLEAR_CACHE') {
        event.waitUntil(
            caches.keys()
                .then((cacheNames) => {
                    return Promise.all(
                        cacheNames.map((cacheName) => {
                            return caches.delete(cacheName);
                        })
                    );
                })
        );
    }
});

/**
 * Gestion de la synchronisation en arrière-plan (pour V2.0+)
 */
self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-sessions') {
        event.waitUntil(
            // Logique de synchronisation des sessions
            // Pour V1.0, juste un placeholder
            Promise.resolve()
        );
    }
});

console.log('[Service Worker] Chargé et prêt');
