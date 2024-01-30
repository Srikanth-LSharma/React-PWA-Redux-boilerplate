/* eslint-disable no-restricted-globals */
import { precacheAndRoute } from 'workbox-precaching';
import { clientsClaim } from 'workbox-core';

precacheAndRoute(self.__WB_MANIFEST);

if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {

    // import { PrecacheRoute } from 'workbox-precaching';
    // This clientsClaim() should be at the top level
    // of your service worker, not inside of, e.g.,
    // an event handler.
    clientsClaim();

    self.skipWaiting();
}