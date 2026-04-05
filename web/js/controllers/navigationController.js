// @ts-check

/**
 * @module navigationController
 *
 * @description
 * Handles navigation between page sections (Home, About, Contact).
 * - Attaches click listeners to navigation buttons
 * - Shows or hides corresponding sections by toggling CSS classes and container display
 *
 * Assumptions:
 * - DOM contains elements with ids: navigate-home, navigate-about, navigate-contact, container, footer, about-section, contact-section
 */

/**
 * Initializes navigation event listeners for page sections.
 * Clicking a nav button will show the associated section and hide others.
 */
export function initNavigationListeners() {
    const navAbout = /** @type {HTMLElement} */ (document.getElementById('navigate-about'));
    const navContact = /** @type {HTMLElement} */ (document.getElementById('navigate-contact'));
    const navHome = /** @type {HTMLElement} */ (document.getElementById('navigate-home'));

    const home = /** @type {HTMLElement} */ (document.getElementById('container'));
    const footer = /** @type {HTMLElement} */ (document.getElementById('footer'));
    const about = /** @type {HTMLElement} */ (document.getElementById('about-section'));
    const contact = /** @type {HTMLElement} */ (document.getElementById('contact-section'));

    navHome.addEventListener('click', function (e) {
        e.preventDefault();
        about.classList.remove('show');
        contact.classList.remove('show');
        footer.classList.remove('show');
        home.style.display = 'flex';
    });

    navAbout.addEventListener('click', function (e) {
        e.preventDefault();
        about.classList.add('show');
        contact.classList.remove('show');
        footer.classList.add('show');
        home.style.display = 'none';
    });

    navContact.addEventListener('click', function (e) {
        e.preventDefault();
        about.classList.remove('show');
        contact.classList.add('show');
        footer.classList.add('show');
        home.style.display = 'none';
    });
}