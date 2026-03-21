const queryForm = document.getElementById("queryForm");

queryForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const answer1 = queryForm.question1.value;
    const answer2 = queryForm.question2.value;

    console.log("Answer 1:", answer1);
    console.log("Answer 2:", answer2);
    
    alert(`You chose: ${answer1} and ${answer2}`);
});