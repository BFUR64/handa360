const queryForm = document.getElementById("queryForm");
const hazardInstructionsOutput = document.getElementById("hazard-instructions-output");

queryForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const chosenLocation = queryForm.question1.value;
    const chosenHazard = queryForm.question2.value;

    await loadInstructionsToHTML(chosenLocation, chosenHazard);
});

hazardInstructionsOutput.addEventListener("change", function (e) {
    if (e.target.classList.contains("checklist-item-checkbox")) {
        let item = e.target.closest(".checklist-item");

        if (e.target.checked) {
            item.classList.add("completed");
        } else {
            item.classList.remove("completed");
        }
    }
});

async function loadInstructionsToHTML(chosenLocation, chosenHazard) {
    // generate a dynamic list based on the `const data` object that relies on the
    // `hazard` variable (see below).
    let checklistTemplate = document.getElementById("checklist-template");

    let locationContactsOutput = document.getElementById("location-contacts-output");
    let contactlistsTemplate = document.getElementById("contactslist-template");

     // Stops checklist from stacking
    hazardInstructionsOutput.innerHTML = "";
    locationContactsOutput.innerHTML = "";

    let response = await fetch("data.json");

    let data = await response.json();

    for (let location = 0; location < data.locations.length; location++) {
        let currentLocation = data.locations[location].condition.location;

        if (currentLocation === chosenLocation) {
            for(let contact = 0; contact < data.locations[location].contacts.length; contact++) {
                let clone = contactlistsTemplate.content.cloneNode(true);
                clone.querySelector(".contactslist-item-text").innerText = data.locations[location].contacts[contact];
                locationContactsOutput.appendChild(clone);
            }
        }
    }

    for (let action = 0; action < data.actions.length; action++) {
        let currentHazard = data.actions[action].condition.hazard;

        if (currentHazard === chosenHazard) {
            for (let instruction = 0; instruction < data.actions[action].instructions.length; instruction++) {
                // Creates a copy of the template
                let clone = checklistTemplate.content.cloneNode(true);

                // Writes the instructions inside the span tag
                clone.querySelector(".checklist-item-text").innerText = data.actions[action].instructions[instruction];

                // Adds the copy inside the "#hazard-instructions-output" div
                hazardInstructionsOutput.appendChild(clone);
            }
        }
    }
}