// @ts-check

import { useEffect, useState } from "react";
import { Question } from "../ui/formUI.jsx";
import * as cachedDatabase from "../state/cachedDatabase.js";
import { Events } from "../event.js";

export function Form() {
    const [questions, setQuestions] = useState(
        cachedDatabase.getQuestions()
    );

    const [questionIndex, setQuestionIndex] = useState(0);

    useEffect(() => {
        document.addEventListener(
            Events.DATABASE_CHANGE,
            handleDatabaseChange
        );

        function handleDatabaseChange() {
            setQuestions(cachedDatabase.getQuestions());
        }

        return () => {
            document.removeEventListener(
                Events.DATABASE_CHANGE,
                handleDatabaseChange
            );
        };
    }, []);

    return (
        <form className="form-container">
            <fieldset>
                {questions
                    ? <Question question={questions[questionIndex]} />
                    : <p>Loading...</p>
                }
            </fieldset>

            <div className="form-btn-container">
                <button type="button" className="btn-form" onClick={() => setQuestionIndex(i => Math.max(0, i - 1))}>Previous</button>
                { getButton(questionIndex, setQuestionIndex) }
            </div>
        </form>
    );
}

/**
 * @param {number} questionIndex
 * @param {import("react").Dispatch<import("react").SetStateAction<number>>} setQuestionIndex
 */
function getButton(questionIndex, setQuestionIndex) {
    if (questionIndex < 2) {
        return <button type="button" className="btn-form" onClick={() => setQuestionIndex(i => Math.min(2, i + 1))}>Next</button>;
    }
    else {
        return <button type="button" className="btn-form">Placeholder</button>;
    }
}
