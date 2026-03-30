addEventListener("DOMContentLoaded", function() {
    initQuestions();
});

async function initQuestions() {
    let result = await fetch("./questions.json");
    let data = await result.json();

    let html = `<div id=`;

    data.questions.forEach(element => {
        // console.log(`ID: ${element.id}`);
        // console.log(`Text: ${element.text}`);
        // console.log(`First Option: ${element.options[0]}`);
        html += "\"${element.id}\">";
        html += `<p>${element.text}</p`;
        html += `<form method=\"GET\">`;
        html += `<input type=\"radio\" name=\"${element.id}\" value=\"flood\">`;
        html += `<label>flood</label>`;
        html += `</form>`;
        html += `</div>`;
    });

    document.getElementById("body").innerHTML = html
}