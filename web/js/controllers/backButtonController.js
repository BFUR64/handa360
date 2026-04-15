// @ts-check

/**
 * @param {HTMLButtonElement} button
 * @param {function} onBackClicked
*/
export function addBackListener(button, onBackClicked) {
    button.addEventListener("click", event => {
        event.preventDefault();

        onBackClicked();
    })
}