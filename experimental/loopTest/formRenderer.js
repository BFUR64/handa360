// @ts-check

import * as normalizer from "./normalizer.js";

const formTemplate = /** @type {HTMLTemplateElement} */ (document.getElementById("form-template"));
const questionTemplate = /** @type {HTMLTemplateElement} */ (document.getElementById("question-template"));
const optionTemplate = /** @type {HTMLTemplateElement} */ (document.getElementById("option-template"));
const container = /** @type {HTMLElement} */ (document.getElementById("container"));

export function render() {
    let questions = normalizer.getNormalizedQuestions();

    let formTemplateClone = /** @type {DocumentFragment} */ (formTemplate.content.cloneNode(true));

    let questionsContainer = formTemplateClone.querySelector(".questions-container");

    if (!questionsContainer) throw new Error("Form template is broken");

    questions.forEach(question => {
        let questionTemplateClone = /** @type {DocumentFragment} */ (questionTemplate.content.cloneNode(true));

        let textElement = questionTemplateClone.querySelector(".question-text");
        let questionSelection = questionTemplateClone.querySelector(".question-block");

        if (!textElement || !questionSelection) throw new Error("Question template is broken");

        textElement.textContent = question.text;

        question.options.forEach(option => {
            let optionTemplateClone = /** @type {DocumentFragment} */ (optionTemplate.content.cloneNode(true));

            let radioInput = /** @type {HTMLInputElement} */ (optionTemplateClone.querySelector("input[type='radio']"));
            let buttonText = optionTemplateClone.querySelector(".option-button");

            if (!radioInput || !buttonText) throw new Error("Option template is broken");

            radioInput.value = option.value;
            radioInput.name = question.name;
            buttonText.textContent = option.text;

            questionSelection.append(optionTemplateClone);
        })

        questionsContainer.append(questionTemplateClone);
    })

    container.append(formTemplateClone);
}