// @ts-check

/**
 * @param {string} hazard
 */
async function render(hazard) {
    let hazardInstructionsOutput = document.getElementById("hazard-instructions-output");
    let checklistTemplate = document.getElementById("checklist-template");
    let response = await fetch("data.json");
    let data = await response.json();

    for (let action = 0; action < data.actions.length; action++) {
        let currentHazard = data.actions[action].condition.hazard;

        if (currentHazard === hazard) {
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