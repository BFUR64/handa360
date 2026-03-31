// @ts-check

const container = /** @type {HTMLElement} */ (document.getElementById("container"));
const contactlistTemplate = /** @type {HTMLTemplateElement} */ (document.getElementById("contactlist-template"));
const contactlistItemTemplate = /** @type {HTMLTemplateElement} */ (document.getElementById("contactlist-item-template"));

/** @typedef {import("../data/cachedData.js").Location} Location */

/**
 * @param {string} locationSelected
 * @param {Location[]} locations
 * @return {HTMLElement}
 */
export function render(locationSelected, locations) {
    const contactlist = /** @type {DocumentFragment} */ (contactlistTemplate.content.cloneNode(true));
    const contactlistBlock = /** @type {HTMLElement} */ (contactlist.querySelector(".contactlist-block"));
    const contactlistHeader = /** @type {HTMLElement} */ (contactlist.querySelector(".contactlist-header"))

    locations.forEach(locationsIndex => {
        const currentLocation = locationsIndex.condition.location;

        if (currentLocation === locationSelected) {
            locationsIndex.information.forEach(informationLine => {
                const contactlistItem = /** @type {DocumentFragment} */ (contactlistItemTemplate.content.cloneNode(true));
                const contactlistText = /** @type {HTMLElement} */ (contactlistItem.querySelector(".contactlist-item-text"));

                contactlistHeader.innerText = currentLocation;
                contactlistText.innerText = informationLine;
                contactlistBlock.append(contactlistItem);
            })

            container.append(contactlistBlock);
        }
    })

    return contactlistBlock;
}