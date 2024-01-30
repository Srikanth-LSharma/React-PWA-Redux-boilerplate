import { Workbox } from "workbox-window";

export default function registerServiceWorker() {
    if (process.env.NODE_ENV !== 'production') return;
    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
        const wb = new Workbox('sw.js');

        wb.addEventListener('install', event => {
            if (event.isUpdate) {
                // eslint-disable-next-line no-restricted-globals
                if (confirm('New app update is available, click ok to refresh')) {
                    window.location.reload();
                }
            }
        })
        wb.register();
    }
}
