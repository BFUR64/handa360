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
    // remove old contact lists (important)

    const contactlist = /** @type {DocumentFragment} */ (contactlistTemplate.content.cloneNode(true));
    const contactlistBlock = /** @type {HTMLElement} */ (contactlist.querySelector(".contactlist-block"));
    const contactlistHeader = /** @type {HTMLElement} */ (contactlist.querySelector(".contactlist-header"));

    contactlistHeader.innerText = "Contacts";

    locations.forEach(locationsIndex => {
        const currentLocation = locationsIndex.condition.location;

        if (currentLocation === locationSelected) {
            locationsIndex.information.forEach(informationLine => {
                const contactlistItem = /** @type {DocumentFragment} */ (
                    contactlistItemTemplate.content.cloneNode(true)
                );

                const contactlistInput = /** @type {HTMLInputElement} */ (
                    contactlistItem.querySelector(".contactlist-item-input")
                );

                const copyButton = /** @type {HTMLButtonElement} */ (
                    contactlistItem.querySelector(".contactlist-copy-button")
                );

                // set value
                contactlistInput.value = informationLine;

                // simple copy logic (with fallback)
                copyButton.addEventListener("click", function () {
                    if (navigator.clipboard) {
                        navigator.clipboard.writeText(informationLine);
                    } else {
                        const temp = document.createElement("textarea");
                        temp.value = informationLine;
                        document.body.appendChild(temp);
                        temp.select();
                        document.execCommand("copy");
                        document.body.removeChild(temp);
                    }

                    // small feedback
                    copyButton.innerText = "Copied!";
                    setTimeout(() => copyButton.innerText = "Copy", 1000);
                });

                contactlistBlock.append(contactlistItem);
            });

            container.append(contactlistBlock);
        }
    });

    return contactlistBlock;
}