const assessmentForm = document.getElementById('assessmentForm');
const navAbout = document.getElementById('nav-about');
const navContact = document.getElementById('nav-contact');
const navHome = document.getElementById('nav-home');

const report = document.getElementById('report');
const about = document.getElementById('about');
const contact = document.getElementById('contact');

assessmentForm.addEventListener('submit', function(e) {
    e.preventDefault();

    assessmentForm.style.display = 'none';
    report.classList.add('show');

    const selectLocation = document.querySelector('input[name="location"]:checked');
    const selectHazard = document.querySelector('input[name="hazard"]:checked');

    console.log('Location:',selectLocation? selectLocation.value: 'None');
    console.log('Hazard:',selectHazard? selectHazard.value: 'None');
});

navAbout.addEventListener('click', function() {
    assessmentForm.style.display = 'none';
    report.classList.remove('show');
    about.classList.add('show');
    contact.classList.remove('show');
});
navContact.addEventListener('click', function() {
    assessmentForm.style.display = 'none';
    report.classList.remove('show');
    about.classList.remove('show');
    contact.classList.add('show');
});
navHome.addEventListener('click', function() {
    assessmentForm.style.display = 'flex';
    report.classList.remove('show');
    about.classList.remove('show');
    contact.classList.remove('show');
});