// @ts-check
/// <reference types="vite/client" />

import './css/result.css';
import * as cachedDatabase from "../state/cachedDatabase.js";
import { useNavigate } from 'react-router-dom';

/** @typedef {import("../App.jsx").Answers} Answers */

/**
 * @param {{ answers: Answers }} property
 */
export default function Result ({ answers }) {
    const instructions = cachedDatabase.getInstructions();
    const navigate = useNavigate();

    /** @type {Object.<string, string[]>} */
    const selectedInstructions = {};

    /** @type {string[]} */
    const idsSelected = [];

    if (instructions) {
        Object.entries(answers).forEach(([questionId, questionAnswers]) => {
            Object.entries(questionAnswers).forEach(([optionId, answerDetail]) => {
                if (answerDetail.checked) {
                    idsSelected.push(optionId);

                    Object.entries(instructions).forEach(([category, instructionDetail]) => {
                        if (category == questionId) {
                            selectedInstructions[answerDetail.text] = instructionDetail[optionId];
                        }
                    })
                }
            });
        });
    }

    return (
        <main className="main-result">
            <button type="button" className="btn-generic" onClick={() => navigate("/")}>Return</button>
            <Instruction selectedInstructions={selectedInstructions}/>
            <GoBag idsSelected={idsSelected}></GoBag>
        </main>
    );
}

/**
 * @param {{ selectedInstructions: Object.<string, string[]> }} props
 */
function Instruction ({ selectedInstructions }) {
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

/**
 * @param {{ idsSelected: string[] }} props
 */
function GoBag ({ idsSelected }) {
    const gobagDatabase = cachedDatabase.getGoBag();

    if (!gobagDatabase) return;

    const gobagItems = gobagDatabase.items;
    const gobagRegistry = gobagDatabase.registry;

    let gobagItemSet = new Set();

    idsSelected.forEach(id => {
        const gobagItem = gobagItems[id];

        gobagItem?.forEach(item => {
            gobagItemSet.add(item);
        })
    })

    const gobag = [...gobagItemSet];

    if (gobag.length === 0) return;

    return (
        <details className="dropdown">
            <summary>Gobag</summary>
            <ul>
                {
                    gobag.map((item, index) => {
                        const itemSelected = gobagRegistry[item];

                        return <li key={index}>
                            {itemSelected}
                        </li>
                    })
                }
            </ul>
        </details>
    )
}
