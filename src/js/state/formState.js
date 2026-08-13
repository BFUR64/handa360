
/** @type {Record<string, Record<string, boolean>} */
const formRecord = {}

/**
 * @param {string} index
 * @param {Record<string, boolean>} data
 */
export function setFormRecord(index, data) {
    formRecord[index] = data;
}

export function getFormRecord() {
    return formRecord;
}
