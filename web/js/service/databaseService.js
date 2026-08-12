// @ts-check

import * as cachedDatabase from "../state/cachedDatabase.js";

/** @typedef {import("../state/cachedDatabase").DisasterPreparednessData} DisasterPreparednessData */

const DATABASE_URL = "/data/database.json";

export async function sync() {
    const response = await fetch(DATABASE_URL);

    if (!response.ok) {
        return response;
    }

    const data = /** @type {DisasterPreparednessData} */ (await response.json());

    cachedDatabase.setDatabase(data);

    return response;
}
