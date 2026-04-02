// @ts-check

const formTemplate = /** @type {HTMLTemplateElement} */ (document.getElementById("form-template"));
const questionTemplate = /** @type {HTMLTemplateElement} */ (document.getElementById("question-template"));
const optionTemplate = /** @type {HTMLTemplateElement} */ (document.getElementById("option-template"));
const container = /** @type {HTMLElement} */ (document.getElementById("container"));

/** @typedef {import("../data/cachedData.js").Question} Question */

/**
 * @param {Question[]} questions
 * @returns {HTMLElement}
 */
export function render(questions) {
    container.innerHTML = "";

    const formTemplateClone = /** @type {DocumentFragment} */ (formTemplate.content.cloneNode(true));

    const questionsContainer = formTemplateClone.querySelector(".questions-container");

    if (!questionsContainer) throw new Error("Form template is broken");

    questions.forEach(question => {
        const questionTemplateClone = /** @type {DocumentFragment} */ (questionTemplate.content.cloneNode(true));

        const textElement = questionTemplateClone.querySelector(".question-text");
        const questionSelection = questionTemplateClone.querySelector(".question-block");

        if (!textElement || !questionSelection) throw new Error("Question template is broken");

        textElement.textContent = question.text;

        question.options.forEach(option => {
            const optionTemplateClone = /** @type {DocumentFragment} */ (optionTemplate.content.cloneNode(true));

            const input = /** @type {HTMLInputElement} */ (optionTemplateClone.querySelector("input"));
            const buttonText = optionTemplateClone.querySelector(".option-button");

            if (!input || !buttonText) throw new Error("Option template is broken");

            const inputType = question.selection_type === "multiple" ? "checkbox" : "radio";

            input.value = option.id;
            input.name = question.id;
            input.type = inputType;

            buttonText.textContent = option.text;

            questionSelection.append(optionTemplateClone);
        })

        questionsContainer.append(questionTemplateClone);
    })

    container.append(formTemplateClone);

    const form = container.querySelector(".form-block");
    if (!form) throw new Error(".form-block is missing from the template");

    return /** @type {HTMLElement} */ (form);
}