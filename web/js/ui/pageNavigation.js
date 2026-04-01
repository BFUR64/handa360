const navAbout = document.getElementById('navigate-about');
const navContact = document.getElementById('navigate-contact');
const navHome = document.getElementById('navigate-home');

const home = document.getElementById('container');
const footer = document.getElementById('footer');
const about = document.getElementById('about-section');
const contact = document.getElementById('contact-section');

navHome.addEventListener('click', function(e) {
    e.preventDefault();
    about.classList.remove('show');
    contact.classList.remove('show');
    footer.classList.remove('show');
    home.style.display = 'block';
});
navAbout.addEventListener('click', function(e) {
    e.preventDefault();
    about.classList.add('show');
    contact.classList.remove('show');
    footer.classList.add('show');
    home.style.display = 'none';
});
navContact.addEventListener('click', function(e) {
    e.preventDefault();
    about.classList.remove('show');
    contact.classList.add('show');
    footer.classList.add('show');
    home.style.display = 'none';
});