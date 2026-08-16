// @ts-check
/// <reference types="vite/client" />

import { useEffect, useState } from 'react';
import './css/home.css';
import * as cachedDatabase from "../state/cachedDatabase.js";
import { Events } from '../event.js';
import { useNavigate } from 'react-router-dom';

/** @typedef {import("../state/cachedDatabase.js").Question} Question */
/** @typedef {import("../state/cachedDatabase.js").Option} Option */

/** @typedef {import("../App.jsx").Answers} Answers */

/**
 * @param {{ answers: Answers, setAnswers: import("react").Dispatch<import("react").SetStateAction<Answers>> }} property
 */
export default function Home ({ answers, setAnswers }) {
    const [questions, setQuestions] = useState(cachedDatabase.getQuestions());
    const [questionIndex, setQuestionIndex] = useState(0);
    const navigate = useNavigate();

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
                                {
                                    checked: false,
                                    text: option.text
                                }
                            ])
                        )
                    ]
                )
            )
        );
    }, [questions, setAnswers]);

    return (
        <main className="main-home">
            <form className="form-container">
                <fieldset>
                    {questions
                        ? <Question question={questions[questionIndex]} answers={answers} setAnswers={setAnswers} />
                        : <p>Loading...</p>
                    }
                </fieldset>

                <div className="form-btn-container">
                    { getPreviousButton(questionIndex, setQuestionIndex) }
                    { getNextButton(questionIndex, setQuestionIndex, navigate) }
                </div>
            </form>
        </main>
    );
}


/**
 * @param {number} questionIndex
 * @param {import("react").Dispatch<import("react").SetStateAction<number>>} setQuestionIndex
 */
function getPreviousButton(questionIndex, setQuestionIndex) {
    if (questionIndex == 0) {
        return <button disabled type="button" className="btn-generic" onClick={() => setQuestionIndex(i => Math.max(0, i - 1))}>Previous</button>
    }
    else {
        return <button type="button" className="btn-generic" onClick={() => setQuestionIndex(i => Math.max(0, i - 1))}>Previous</button>
    }
}

/**
 * @param {number} questionIndex
 * @param {import("react").Dispatch<import("react").SetStateAction<number>>} setQuestionIndex
 * @param {import('react-router-dom').NavigateFunction} navigate
 */
function getNextButton(questionIndex, setQuestionIndex, navigate) {
    if (questionIndex < 2) {
        return <button type="button" className="btn-generic" onClick={() => setQuestionIndex(i => Math.min(2, i + 1))}>Next</button>;
    }
    else {
        return <button type="button" className="btn-generic" onClick={() => navigate("/result")}>Finish</button>;
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
                            checked={answers?.[question.id]?.[option.id].checked ?? false}
                            onChange={event => {
                                setAnswers(previous => ({
                                    ...previous,
                                    [question.id]: {
                                        ...previous[question.id],
                                        [option.id]: {
                                            checked: event.target.checked,
                                            text: option.text
                                        }
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
