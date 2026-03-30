const assessmentForm = document.getElementById('assessmentForm');
const report = document.getElementById('report');

assessmentForm.addEventListener('submit', function(e) {
    e.preventDefault();

    assessmentForm.style.display = 'none';
    report.classList.add('show');

    const selectLocation = document.querySelector('input[name="location"]:checked');
    const selectHazard = document.querySelector('input[name="hazard"]:checked');

    console.log('Location:',selectLocation? selectLocation.value: 'None');
    console.log('Hazard:',selectHazard? selectHazard.value: 'None');
});