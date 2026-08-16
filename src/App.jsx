// @ts-check

import { useState } from "react";
import Home from "./pages/Home.jsx";
import Result from "./pages/Result.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import { Route, Routes } from "react-router-dom";


/** @typedef {Object.<string, QuestionAnswers>} Answers */

/** @typedef {Object.<string, AnswerDetail>} QuestionAnswers */

/**
 * @typedef {Object} AnswerDetail
 * @property {boolean} checked
 * @property {string} text
*/

export default function App () {
    /** @type {Answers} */
    const initialAnswers = {}

    const [answers, setAnswers] = useState(initialAnswers);

    return (
        <Routes>
            <Route path="/" element={
                <Home answers={answers} setAnswers={setAnswers} />
            }></Route>
            <Route path="/result" element={
                <>
                    <Result answers={answers} />
                    <Footer />
                </>
            }></Route>
            <Route path="/about" element={
                <>
                    <About />
                    <Footer />
                </>
            }></Route>
            <Route path="/contacts" element={
                <>
                    <Contact />
                    <Footer />
                </>
            }></Route>
        </Routes>
    );
}

function Footer () {
    return (
        <footer>
            <p>© 2026 Handa360. All rights reserved.</p>
        </footer>
    )
}
