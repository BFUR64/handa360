// @ts-check

import * as cachedDatabase from "../state/cachedDatabase.js";
import navigate from "../utils/navigator.js";

/** @typedef {import("../app.jsx").Answers} Answers */

/**
 * @param {{ answers: Answers }} property
 */
export default function Result ({ answers }) {
    const instructions = cachedDatabase.getInstructions();
    const questions = cachedDatabase.getQuestions();

    if (!instructions || !questions) return;

    /** @type {Object.<string, string[]>} */
    const selectedInstructions = {};

    Object.entries(answers).forEach(([questionId, questionAnswers]) => {
        Object.entries(questionAnswers).forEach(([optionId, answerDetail]) => {
            if (answerDetail.checked) {
                Object.entries(instructions).forEach(([category, instructionDetail]) => {
                    if (category == questionId) {
                        selectedInstructions[answerDetail.text] = instructionDetail[optionId];
                    }
                })
            }
        });
    });

    return (
        <main className="main-result">
            <button type="button" className="btn-generic" onClick={() => navigate("/")}>Return</button>
            <Container selectedInstructions={selectedInstructions}/>
        </main>
    );
}

/**
 * @param {{ selectedInstructions: Object.<string, string[]> }} props
 */
function Container ({ selectedInstructions }) {
    return Object.entries(selectedInstructions).map(([answerText, instructions], index) => (
        <details key={index} className="dropdown">
            <summary>{answerText}</summary>
                <ul>
                    {
                        instructions.map((instruction, index) => (
                            <li key={index}>
                                {instruction}
                            </li>
                        ))
                    }
                </ul>
        </details>
    ));
}
