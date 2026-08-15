// @ts-check
/// <reference types="vite/client" />

import './css/home.css';
import Form from "../components/Form.jsx";

/** @typedef {import("../App.jsx").Answers} Answers */

/**
 * @param {{ answers: Answers, setAnswers: import("react").Dispatch<import("react").SetStateAction<Answers>> }} property
 */
export default function Home ({ answers, setAnswers }) {
    return (
        <main className="main-home">
            <Form answers={answers} setAnswers={setAnswers} />
        </main>
    );
}
