const queryForm = document.getElementById("queryForm");

queryForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const answer1 = queryForm.question1.value;
    const answer2 = queryForm.question2.value;

    loadInstructionsToHTML(answer2);
});

function loadInstructionsToHTML(hazardType) {
    // generate a dynamic list based on the `const data` object that relies on the
    // `hazard` variable (see below).
    let output = document.getElementById("output");
    let checklistTemplate = document.getElementById("checklist-template");

fetch("data.json")
    .then(response => response.json())
    .then(data => {
        for (let action = 0; action < data.actions.length; action++) {
            let currentHazard = data.actions[action].condition.hazard;

            if (currentHazard === hazardType) {
                for (let instruction = 0; instruction < data.actions[action].instructions.length; instruction++) {
                    // Lets you duplicate your template and show multiple checklist items.
                    let clone = checklistTemplate.content.cloneNode(true);
                    clone.querySelector("#checklist-item-text").innerText = data.actions[action].instructions[instruction];
                    output.appendChild(clone);
                }
            }
        }
    })
}