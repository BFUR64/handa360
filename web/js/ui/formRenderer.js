// @ts-check

/**
 * @module formRenderer
 *
 * @description
 * Builds the form DOM based on normalized Question data.
 * Returns a DocumentFragment that can be appended to a container.
 * Handles:
 * - Creating question blocks for each Question
 * - Creating option inputs (radio or checkbox) and labels
 * - Assigning data-step attributes for multi-step navigation
 *
 * Assumptions:
 * - DOM contains templates with ids: form-template, question-template, option-template
 */

const formTemplate = /** @type {HTMLTemplateElement} */ (document.getElementById("form-template"));
const questionTemplate = /** @type {HTMLTemplateElement} */ (document.getElementById("question-template"));
const optionTemplate = /** @type {HTMLTemplateElement} */ (document.getElementById("option-template"));

/** @typedef {import("../data/cachedData.js").Question} Question */

/**
 * Builds a full form fragment for the given questions.
 *
 * @param {Question[]} questions - Normalized questions
 * @returns {DocumentFragment} Form fragment ready to insert into DOM
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
 * Creates a DocumentFragment for a single question, including its options.
 *
 * @param {Question} question - Normalized question
 * @returns {DocumentFragment} Question fragment ready to append
 */
function renderQuestion(question) {
    const questionFragment = /** @type {DocumentFragment} */ (questionTemplate.content.cloneNode(true));
    const titleElement = /** @type {HTMLElement} */ (questionFragment.querySelector(".question-text"));
    const subtitleElement = /** @type {HTMLElement} */ (questionFragment.querySelector(".subtext"));
    const optionsContainer = /** @type {HTMLElement} */ (questionFragment.querySelector(".options-container"));

    titleElement.textContent = question.text;

    question.options.forEach(option => {
        const optionFragment = /** @type {DocumentFragment} */ (optionTemplate.content.cloneNode(true));

        const input = /** @type {HTMLInputElement} */ (optionFragment.querySelector("input"));
        const buttonText = /** @type {HTMLElement} */ (optionFragment.querySelector(".option-button"));

        const inputType = question.selection_type === "multiple" ? "checkbox" : "radio";

        if (inputType === "checkbox") {
            subtitleElement.textContent = "You May Select Multiple";
        }

        input.value = option.id;
        input.name = question.id;
        input.type = inputType;

        buttonText.textContent = option.text;

        optionsContainer.append(optionFragment);
    })

    return questionFragment;
}