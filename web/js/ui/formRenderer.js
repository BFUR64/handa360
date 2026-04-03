// @ts-check

const formTemplate = /** @type {HTMLTemplateElement} */ (document.getElementById("form-template"));
const questionTemplate = /** @type {HTMLTemplateElement} */ (document.getElementById("question-template"));
const optionTemplate = /** @type {HTMLTemplateElement} */ (document.getElementById("option-template"));

/** @typedef {import("../data/cachedData.js").Question} Question */

/**
 * @param {Question[]} questions
 * @returns {DocumentFragment}
 */
export function buildFullForm(questions) {
    const formFragment = /** @type {DocumentFragment} */ (formTemplate.content.cloneNode(true));
    const questionsContainer = /** @type {HTMLElement} */ (formFragment.querySelector(".questions-container"));

    questions.forEach((question, index) => {
        const questionFragment = renderQuestion(question);

        const questionBlock = /** @type {HTMLElement} */ (questionFragment.querySelector(".question-block"));

        questionBlock.dataset.step = String(index);

        questionsContainer.append(questionFragment);
    })

    return formFragment;
}

/**
 * @param {Question} question
 * @returns {DocumentFragment}
 */
function renderQuestion(question) {
    const questionFragment = /** @type {DocumentFragment} */ (questionTemplate.content.cloneNode(true));
    const titleElement = /** @type {HTMLElement} */ (questionFragment.querySelector(".question-text"));
    const optionsContainer = /** @type {HTMLElement} */ (questionFragment.querySelector(".options-container"));

    titleElement.textContent = question.text;

    question.options.forEach(option => {
        const optionFragment = /** @type {DocumentFragment} */ (optionTemplate.content.cloneNode(true));

        const input = /** @type {HTMLInputElement} */ (optionFragment.querySelector("input"));
        const buttonText = /** @type {HTMLElement} */ (optionFragment.querySelector(".option-button"));

        const inputType = question.selection_type === "multiple" ? "checkbox" : "radio";

        input.value = option.id;
        input.name = question.id;
        input.type = inputType;

        buttonText.textContent = option.text;

        optionsContainer.append(optionFragment);
    })

    return questionFragment;
}