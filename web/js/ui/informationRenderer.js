// @ts-check

const container = /** @type {HTMLElement} */ (document.getElementById("container"));
const contactlistTemplate = /** @type {HTMLTemplateElement} */ (document.getElementById("contactlist-template"));
const contactlistItemTemplate = /** @type {HTMLTemplateElement} */ (document.getElementById("contactlist-item-template"));

/** @typedef {import("../data/cachedData.js").Location} Location */

/**
 * @param {string} locaionSelected
 * @param {Location[]} locations
 * @return {HTMLElement}
 */
export function render(locaionSelected, locations) {
    const contactlist = /** @type {DocumentFragment} */ (contactlistTemplate.content.cloneNode(true));
    const contactlistBlock = /** @type {HTMLElement} */ (contactlist.querySelector(".contactlist-block"));

    locations.forEach(locationsIndex => {
        const currentLocation = locationsIndex.condition.location;

        if (currentLocation === locaionSelected) {
            locationsIndex.information.forEach(informationLine => {
                const contactlistItem = /** @type {DocumentFragment} */ (contactlistItemTemplate.content.cloneNode(true));
                const contactlistText = /** @type {HTMLElement} */ (contactlistItem.querySelector(".contactlist-item-text"));

                contactlistText.innerText = informationLine;
                contactlistBlock.append(contactlistItem);
            })

            container.append(contactlistBlock);
        }
    })

    return contactlistBlock;
}