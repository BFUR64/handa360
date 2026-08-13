// @ts-check

import * as cachedDatabase from "../state/cachedDatabase.js";

/** @typedef {import("../state/cachedDatabase.js").DisasterPreparednessData} DisasterPreparednessData */

const DATABASE_URL = "https://raw.githubusercontent.com/BFUR64/handa360/refs/heads/v1-dev/data/database.json";

export async function sync() {
    const response = await fetch(DATABASE_URL);

    if (!response.ok) {
        return response;
    }

    const data = /** @type {DisasterPreparednessData} */ (await response.json());

    cachedDatabase.setDatabase(data);

    return response;
}
