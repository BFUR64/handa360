// @ts-check

// TODO Replace with actual behavior
/**
 * @param {HTMLElement} root
 */
export function initHomeRoute(root) {
    let stuff = `
    <form class="form-container">
        <fieldset>
            <legend class="form-title">What's the Hazard?</legend>`;

    for (let i = 0; i < 5; i++ ) {
        stuff += `
            <label class="option-container">
                <input type="checkbox" name="hazard" value="earthquake">
                <span class="btn-option">Earthquake</span>
            </label>`;
    }

    stuff += `
        </fieldset>
        <div class="form-btn-container">
            <button type="button" class="btn-form">Previous</button>
            <button type="button" class="btn-form">Next</button>
        </div>
    </form>`;

    root.innerHTML = stuff;
}
