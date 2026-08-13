// @ts-check
/// <reference types="vite/client" />

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './general.css';
import App from './app.jsx';
import { sync } from "./service/databaseService.js";

const root = /** @type {HTMLElement} */ (document.getElementById('root'));

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

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

await initializeSyncService();
