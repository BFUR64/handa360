const questionBox2 = document.getElementById("questionBox2");

fetch("choices.json")
    .then(response => response.json())
    .then(data => {
        // In the future change to for loop to capitalize?
        data.hazards.forEach((hazard, index) => {
            const label = document.createElement("label");

            // Basically types in (wherever you put "<script src="hazardParser.js"></script>"):
            // <input type="radio" name="question1" id="hazard" value=hazard>hazard
            const input = document.createElement("input");
            input.type = "radio";
            input.name = "question2";
            input.id = "hazard";
            input.value = hazard;
            input.required = true;

            label.textContent = hazard;

            // Putting input inside the label like so:
            // <label>
            // <input type="radio" name="question1" id="hazard" value=hazard>hazard
            // </label>
            label.prepend(input);

            questionBox2.appendChild(label);
        })
    })