// @ts-check

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
        home.style.display = 'block';
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