let locationDropdownProvince = document.getElementById('location-dropdown-province');
let locationDropdownMunicipality = document.getElementById('location-dropdown-municipality');

let locationOptionsData =[];

fetch('/data/location-options.json')
    .then(response => response.text())
    .then(dataText => {locationOptionsData = dataText; populateProvinceDropdown()})
    .catch(error => console.error('Error loading location options:', error));

function populateProvinceDropdown(){
    locationOptionsData.forEach(province =>{
        const option = document.createElement('option');
        option.value = province;
        option.textContent = province;
        locationDropdownProvince.appendChild(option);
    });
}

function populateMunicipalityDropdown(){
    locationOptionsData.forEach(municipality =>{
        const option = document.createElement('option');
        option.value = municipality;
        option.textContent = municipality;
        locationDropdownMunicipality.appendChild(option);
    });
}