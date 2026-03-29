// @ts-check

import * as cachedData from "./cachedData.js";

const questionTemplate = document.getElementById("question-template");
const optionTemplate = document.getElementById("option-template");
const container = document.getElementById("container");

export function printQuestions() {
    if (
        !(questionTemplate instanceof HTMLTemplateElement) ||
        !(optionTemplate instanceof HTMLTemplateElement) ||
        !(container instanceof HTMLElement)
    ) return;

    let questions = cachedData.getQuestions();
    if (!questions) return;

    questions.forEach(question => {

        let qClone = (questionTemplate.content.cloneNode(true));
        if (!(qClone instanceof DocumentFragment)) return;

        let textElement = qClone.querySelector(".question-text");
        if (!textElement) return;

        textElement.textContent = question.text;

        let questionSelection = qClone.querySelector(".question-block");
        if (!questionSelection) return;

        question.options.forEach(option => {
            let oClone = (optionTemplate.content.cloneNode(true));
            if (!(oClone instanceof DocumentFragment)) return;

            let radioInput = (oClone.querySelector("input[type='radio']"));
            if (!(radioInput instanceof HTMLInputElement)) return;

            radioInput.value = option.value;
            radioInput.name = question.name;

            let buttonText = oClone.querySelector(".option-button");
            if (!buttonText) return;

            buttonText.textContent = option.text;

            questionSelection.append(oClone);
        })

        container.append(qClone);
    })
}