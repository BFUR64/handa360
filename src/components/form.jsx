// @ts-check

import { useEffect, useState } from "react";
import * as cachedDatabase from "../state/cachedDatabase.js";
import { Events } from "../event.js";
import navigate from "../utils/navigator.js";

/** @typedef {import("../state/cachedDatabase.js").Question} Question */
/** @typedef {import("../state/cachedDatabase.js").Option} Option */

/**
 * @typedef {Object.<string, Object.<string, boolean>>} Answers
 */

/**
 * @param {{ answers: Answers, setAnswers: import("react").Dispatch<import("react").SetStateAction<Answers>> }} property
 */
export default function Form ({ answers, setAnswers }) {
    const [questions, setQuestions] = useState(cachedDatabase.getQuestions());
    const [questionIndex, setQuestionIndex] = useState(0);

    useEffect(() => {
        function handleDatabaseChange() {
            setQuestions(cachedDatabase.getQuestions());
        }

        document.addEventListener(Events.DATABASE_CHANGE, handleDatabaseChange);

        return () => document.removeEventListener(Events.DATABASE_CHANGE, handleDatabaseChange);
    }, []);

    useEffect(() => {
        if (!questions) return;

        setAnswers(
            Object.fromEntries(
                questions.map(question =>
                    [
                        question.id,
                        Object.fromEntries(
                            question.options.map(option => [
                                option.id,
                                false
                            ])
                        )
                    ]
                )
            )
        );
    }, [questions, setAnswers]);

    return (
        <form className="form-container">
            <fieldset>
                {questions
                    ? <Question question={questions[questionIndex]} answers={answers} setAnswers={setAnswers} />
                    : <p>Loading...</p>
                }
            </fieldset>

            <div className="form-btn-container">
                { getPreviousButton(questionIndex, setQuestionIndex) }
                { getNextButton(questionIndex, setQuestionIndex) }
            </div>
        </form>
    );
}

/**
 * @param {number} questionIndex
 * @param {import("react").Dispatch<import("react").SetStateAction<number>>} setQuestionIndex
 */
function getPreviousButton(questionIndex, setQuestionIndex) {
    if (questionIndex == 0) {
        return <button disabled type="button" className="btn-form" onClick={() => setQuestionIndex(i => Math.max(0, i - 1))}>Previous</button>
    }
    else {
        return <button type="button" className="btn-form" onClick={() => setQuestionIndex(i => Math.max(0, i - 1))}>Previous</button>
    }
}

/**
 * @param {number} questionIndex
 * @param {import("react").Dispatch<import("react").SetStateAction<number>>} setQuestionIndex
 */
function getNextButton(questionIndex, setQuestionIndex) {
    if (questionIndex < 2) {
        return <button type="button" className="btn-form" onClick={() => setQuestionIndex(i => Math.min(2, i + 1))}>Next</button>;
    }
    else {
        return <button type="button" className="btn-form" onClick={() => navigate("/result")}>Finish</button>;
    }
}

/**
 * @param {{ question: Question, answers: Answers, setAnswers: import("react").Dispatch<import("react").SetStateAction<Answers>> }} property
 */
function Question ({ question, answers, setAnswers }) {
    return (
        <>
            <legend className="form-title">{question.text}</legend>

            {
                question.options.map(option => (
                    <label key={option.id} className="option-container">
                        <input
                            type="checkbox"
                            name={question.id}
                            value={option.id}
                            checked={answers[question.id]?.[option.id] ?? false}
                            onChange={event => {
                                setAnswers(previous => ({
                                    ...previous,
                                    [question.id]: {
                                        ...previous[question.id],
                                        [option.id]: event.target.checked
                                    }
                                }))
                            }}
                        />

                        <span className="btn-option">{option.text}</span>
                    </label>
                ))
            }
        </>
    );
}
