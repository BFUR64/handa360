const queryForm = document.getElementById("queryForm");

queryForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const answer1 = queryForm.question1.value;
    const answer2 = queryForm.question2.value;

    await loadInstructionsToHTML(answer1, answer2);
});

async function loadInstructionsToHTML(specificLocation, hazardType) {
    // generate a dynamic list based on the `const data` object that relies on the
    // `hazard` variable (see below).
    let hazardInstructionsOutput = document.getElementById("hazard-instructions-output");
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

        if (currentLocation === specificLocation) {
            for(let contact = 0; contact < data.locations[location].contacts.length; contact++) {
                let clone = contactlistsTemplate.content.cloneNode(true);
                clone.querySelector(".contactslist-item-text").innerText = data.locations[location].contacts[contact];
                locationContactsOutput.appendChild(clone);
            }
        }
    }

    for (let action = 0; action < data.actions.length; action++) {
        let currentHazard = data.actions[action].condition.hazard;

        if (currentHazard === hazardType) {
            for (let instruction = 0; instruction < data.actions[action].instructions.length; instruction++) {
                // Creates a copy of the template
                let clone = checklistTemplate.content.cloneNode(true);

                // Writes the instructions inside the span tag
                clone.querySelector(".checklist-item-text").innerText = data.actions[action].instructions[instruction];

                // Adds the copy inside the "#hazard-instructions-output" div
                hazardInstructionsOutput.appendChild(clone);

                let addedItem = hazardInstructionsOutput.lastElementChild;
                let checkbox = addedItem.querySelector(".checklist-item-checkbox");

                // removes item after checking its box
                checkbox.addEventListener("change", function () {
                    if (checkbox.checked) {
                        addedItem.remove();
                    }
                });
            }
        }
    }
}