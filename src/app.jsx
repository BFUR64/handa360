// @ts-check

import { useEffect, useState } from "react";
import Nav from "./route/nav.jsx";
import Home from "./route/home.jsx";
import Result from "./route/result.jsx";
import About from "./route/about.jsx";


/** @typedef {Object.<string, QuestionAnswers>} Answers */

/** @typedef {Object.<string, AnswerDetail>} QuestionAnswers */

/**
 * @typedef {Object} AnswerDetail
 * @property {boolean} checked
 * @property {string} text
*/

export default function App () {
    const [path, setPath] = useState(window.location.pathname);

    /** @type {Answers} */
    const initialAnswers = {}

    const [answers, setAnswers] = useState(initialAnswers);

    useEffect(() => {
        const handlePopState = () => {
            setPath(window.location.pathname);
        }

        window.addEventListener("popstate", handlePopState);

        return () => window.removeEventListener("popstate", handlePopState);
    }, [])

    switch (path) {
        case "/":
            return (
                <>
                    <Nav />
                    <Home answers={answers} setAnswers={setAnswers} />
                </>
            );

        case "/result":
            return (
                <>
                    <Nav />
                    <Result answers={answers} />
                </>
            );

        case "/about":
            return (
                <>
                    <Nav />
                    <About />
                </>
            );

        case "/contacts":
            return (
                <>
                    <Nav />
                    <p>Contacts Menu</p>
                </>
            );

        default:
            return (
                <>
                    <Nav />
                    <Home answers={answers} setAnswers={setAnswers} />
                </>
            );
    }
}
