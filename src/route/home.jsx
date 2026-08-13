// @ts-check

import Form from "../components/form.jsx";

/**
 * @typedef {Object.<string, Object.<string, boolean>>} Answers
 */

/**
 * @param {{ answers: Answers, setAnswers: import("react").Dispatch<import("react").SetStateAction<Answers>> }} property
 */
export default function Home ({ answers, setAnswers }) {
    return (<Form answers={answers} setAnswers={setAnswers} />);
}
