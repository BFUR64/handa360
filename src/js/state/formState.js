
/** @type {Record<number, Record<string, boolean>} */
const formRecord = {}

/**
 * @param {number} index
 * @param {Record<string, boolean} data
 */
export function setFormRecord(index, data) {
    formRecord[index] = data;
}

export function getFormRecord() {
    return formRecord;
}
