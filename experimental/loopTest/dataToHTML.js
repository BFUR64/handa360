// @ts-check

import * as cachedData from "./cachedData.js";

const formTemplate = document.getElementById("form-template");
const questionTemplate = document.getElementById("question-template");
const optionTemplate = document.getElementById("option-template");
const container = document.getElementById("container");

export function printQuestions() {
    if (
        !(formTemplate instanceof HTMLTemplateElement) ||
        !(questionTemplate instanceof HTMLTemplateElement) ||
        !(optionTemplate instanceof HTMLTemplateElement) ||
        !(container instanceof HTMLElement)
    ) return;

    let questions = cachedData.getQuestions();
    if (!questions) return;

    let formTemplateClone = formTemplate.content.cloneNode(true);
    if (!(formTemplateClone instanceof DocumentFragment)) return;

    let formBlock = formTemplateClone.querySelector(".form-block");
    if (!(formBlock instanceof HTMLFormElement)) return;

    let formButton = formTemplateClone.querySelector(".btn-submit");
    if (!formButton) return;

    questions.forEach(question => {

        let questionTemplateClone = questionTemplate.content.cloneNode(true);
        if (!(questionTemplateClone instanceof DocumentFragment)) return;

        let textElement = questionTemplateClone.querySelector(".question-text");
        if (!textElement) return;

        textElement.textContent = question.text;

        let questionSelection = questionTemplateClone.querySelector(".question-block");
        if (!questionSelection) return;

        question.options.forEach(option => {
            let optionTemplateClone = optionTemplate.content.cloneNode(true);
            if (!(optionTemplateClone instanceof DocumentFragment)) return;

            let radioInput = (optionTemplateClone.querySelector("input[type='radio']"));
            if (!(radioInput instanceof HTMLInputElement)) return;

            radioInput.value = option.value;
            radioInput.name = question.name;

            let buttonText = optionTemplateClone.querySelector(".option-button");
            if (!buttonText) return;

            buttonText.textContent = option.text;

            questionSelection.append(optionTemplateClone);
        })

        formButton.before(questionTemplateClone);
    })

    container.append(formBlock);
}