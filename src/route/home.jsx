// @ts-check

import Form from "../components/form.jsx";

/** @typedef {import("../app.jsx").Answers} Answers */

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
