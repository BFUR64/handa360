// @ts-check

import * as cachedDatabase from "../state/cachedDatabase.js";

/**
 * @typedef {Object.<string, Object.<string, boolean>>} Answers
 */

/**
 * @param {{ answers: Answers }} property
 */
export default function Result ({ answers }) {
    const instructions = cachedDatabase.getInstructions();

    if (!instructions) return;

    /** @type {[string[]]} */
    const selectedInstructions = [[]];

    Object.entries(answers).forEach(([questionId, options]) => {
        Object.entries(options).forEach(([optionId, bool]) => {
            if (bool === true) {
                if (questionId === "hazard") {
                    selectedInstructions.push(instructions.hazards[optionId]);
                }

                if (questionId === "special_needs") {
                    selectedInstructions.push(instructions.special_needs[optionId]);
                }

                if (questionId === "location") {
                    selectedInstructions.push(instructions.contacts[optionId]);
                }
            }
        })
    })

    return (
        <main>
            {selectedInstructions.map((instructions, index) => (
                <Container
                    key={index}
                    instructions={instructions}
                />
            ))}
        </main>
    );
}

/**
 * @param {{ instructions: string[] }} props
 */
function Container ({ instructions }) {
    return (
        <section>
            {instructions.map(instruction => (
                <p key={instruction}>
                    {instruction}
                </p>
            ))}
        </section>
    );
}