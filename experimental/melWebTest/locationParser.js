const questionBox1 = document.getElementById("questionBox1");

fetch("choices.json")
    .then(response => response.json())
    .then(data => {
        // In the future change to for loop to capitalize?
        data.locations.forEach((location, index) => {
            const label = document.createElement("label");
 
            // Basically types in (wherever you put "<script src="locationParser.js"></script>"):
            // <input type="radio" name="question1" id="location" value=location>location
            const input = document.createElement("input");
            input.type = "radio";
            input.name = "question1";
            input.id = "location";
            input.value = location;
            input.required = true;

            label.textContent = location;

            // Putting input inside the label like so:
            // <label>
            // <input type="radio" name="question1" id="location" value=location>location
            // </label>
            label.prepend(input);

            questionBox1.appendChild(label);
        })
    })