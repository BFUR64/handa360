// @ts-check

/**
 * @module contactlistRenderer
 *
 * @description
 * Renders a list of contacts for a given location into the main container.
 * - Expects normalized Contacts map (location → array of strings)
 * - Each line is rendered with an input field and a "copy" button
 * - Handles copy-to-clipboard logic with fallback for unsupported browsers
 *
 * Assumptions:
 * - The DOM contains templates with ids: contactlist-template, contactlist-item-template
 * - Container element exists with id="container"
 */

const container = /** @type {HTMLElement} */ (document.getElementById("container"));
const contactlistTemplate = /** @type {HTMLTemplateElement} */ (document.getElementById("contactlist-template"));
const contactlistItemTemplate = /** @type {HTMLTemplateElement} */ (document.getElementById("contactlist-item-template"));

/** @typedef {import("../data/cachedData.js").Contacts} Contacts */

/**
 * Renders the contact information for a selected location.
 *
 * @param {string} locationSelected - Location key in the contacts map
 * @param {Contacts} contacts - Map of location → contact lines
 * @returns {HTMLElement} The rendered contact list block
 */
export function render(locationSelected, contacts) {
    const contactlist = /** @type {DocumentFragment} */ (contactlistTemplate.content.cloneNode(true));
    const contactlistBlock = /** @type {HTMLElement} */ (contactlist.querySelector(".contactlist-block"));
    const contactlistHeader = /** @type {HTMLElement} */ (contactlist.querySelector(".contactlist-header"));

    contactlistHeader.innerText = "Contacts";

    const contact = contacts[locationSelected];
    if (contact == null) return contactlistBlock;

    contact.forEach(informationLine => {
        const contactlistItem = /** @type {DocumentFragment} */ (contactlistItemTemplate.content.cloneNode(true));
        const contactlistInput = /** @type {HTMLInputElement} */ (contactlistItem.querySelector(".contactlist-item-input"));
        const copyButton = /** @type {HTMLButtonElement} */ (contactlistItem.querySelector(".contactlist-copy-button"));

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

    return contactlistBlock;
}