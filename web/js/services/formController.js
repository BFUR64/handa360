// @ts-check

/**
 * @typedef {{ locationSelected: string, hazardSelected: string, specialNeedsSelected: string[]}} UserInput
 */

/**
 * @param {HTMLElement} form
 */
export function attachDispatchEvent(form) {
    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const data = extractFormData(form);

        form.dispatchEvent(new CustomEvent("formSubmitted", { detail: data }));
    })
}

/**
 * @param {HTMLElement} form
 * @returns {UserInput}
 */
function extractFormData(form) {
    const locationQuery = form.querySelector("input[name='location']:checked");
    const locationSelected = locationQuery instanceof HTMLInputElement ? locationQuery.value : "";

    const hazardQuery = form.querySelector("input[name='hazard']:checked");
    const hazardSelected = hazardQuery instanceof HTMLInputElement ? hazardQuery.value : "";

    const specialNeedsQuery = form.querySelectorAll("input[name='special_needs']:checked");
    const specialNeedsSelected = Array
                                    .from(specialNeedsQuery)
                                    .map(el => el instanceof HTMLInputElement ? el.value : "");

    return {locationSelected, hazardSelected, specialNeedsSelected};
}