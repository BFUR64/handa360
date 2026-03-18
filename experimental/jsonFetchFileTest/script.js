addEventListener("DOMContentLoaded", function() {
    init();
});

async function init() {
    let result = await fetch("https://raw.githubusercontent.com/BFUR64/handa360/main/experimental/jsonFetchFileTest/data.json");
    let json = await result.json();

    let currentHobbies = json.hobbies.join(", ");

    document.getElementById("edit").innerHTML = 
        "<h1>" + json.name + "</h1>" +
        "<h2>" + json.age + "</h2>" +
        "<h3>Student: " + json.isStudent + "</h3>" +
        "<h4>Hobbies: " + currentHobbies + "</h4>";
}