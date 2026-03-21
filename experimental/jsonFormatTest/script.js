const data = {
    actions: [
        {
            condition: { hazard: "typhoon" },
            instructions: [
                "Get inside a strong building",
                "Stay away from windows and glass",
                "Move to safest area (interior room, lower floor not prone to flooding)",
                "Charge phone and all power banks",
                "Turn on radio / check official updates"
            ]
        },
        {
            condition: { hazard: "flood" },
            instructions: [
                "Move to higher ground or upper floor",
                "Stay away from rising water",
                "Turn off electricity (if safe to do so)",
                "Monitor official alerts"
            ]
        },
        {
            condition: { hazard: "earthquake" },
            instructions: [
                "DROP to the ground",
                "COVER under sturdy furniture",
                "HOLD ON until shaking stops",
                "Stay away from glass and heavy objects"
            ]
        },
        {
            condition: { hazard: "landslide" },
            instructions: [
                "Move away from slopes and hillsides",
                "Go to higher, stable ground",
                "Stay alert for rumbling/cracking sounds"
            ]
        }
    ],

    locations: [
        {
            condition: { location: "kalibo" },
            information: [
                "Police - 09xxxx",
                "Fire Station - 09xxxx",
                "Emergency - 09xxxx"
            ]
        },
        {
            condition: { location: "manila" },
            information: [
                "Police - 09xxxx",
                "Fire Station - 09xxxx",
                "Emergency - 09xxxx"
            ]
        },
        {
            condition: { location: "iloilo" },
            information: [
                "Police - 09xxxx",
                "Fire Station - 09xxxx",
                "Emergency - 09xxxx"
            ]
        }
    ]
};

addEventListener("DOMContentLoaded", function() {
    init();
});

function init() {
    loadInstructionsToHTML("flood");
}

function loadInstructionsToHTML(hazardType) {
    // generate a dynamic list based on the `const data` object that relies on the
    // `hazard` variable (see below).

    let output = document.getElementById("output");
    let template = document.getElementById("checklist-template");

    for (let action = 0; action < data.actions.length; action++) {
        if (data.actions[action].condition.hazard === hazardType) {
            for (let instruction = 0; instruction < data.actions[action].instructions.length; instruction++) {
                let clone = template.content.cloneNode(true);
                clone.querySelector("#checklist-item-text").innerText = data.actions[action].instructions[instruction];
                output.appendChild(clone);
            }
        }
    }
}