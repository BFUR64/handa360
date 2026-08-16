// @ts-check

import { useEffect, useState } from "react";
import Nav from "./pages/Nav.js";
import Home from "./pages/Home.jsx";
import Result from "./pages/Result.jsx";
import About from "./pages/About.js";
import Contact from "./pages/Contact.js";


/** @typedef {Object.<string, QuestionAnswers>} Answers */

/** @typedef {Object.<string, AnswerDetail>} QuestionAnswers */

/**
 * @typedef {Object} AnswerDetail
 * @property {boolean} checked
 * @property {string} text
*/

export default function App () {
    const [path, setPath] = useState(getRoute());

    /** @type {Answers} */
    const initialAnswers = {}

    const [answers, setAnswers] = useState(initialAnswers);

    useEffect(() => {
        const handlePopState = () => {
            setPath(getRoute());
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
                    <Footer />
                </>
            );

        case "/about":
            return (
                <>
                    <Nav />
                    <About />
                    <Footer />
                </>
            );

        case "/contacts":
            return (
                <>
                    <Nav />
                    <Contact />
                    <Footer />
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

function Footer () {
    return (
        <footer>
            <p>© 2026 Handa360. All rights reserved.</p>
        </footer>
    )
}

function getRoute() {
    const base = import.meta.env.BASE_URL;

    let path = window.location.pathname;

    if (path.startsWith(base)) {
        path = path.slice(base.length);
    }

    return "/" + path.replace(/^\/+|\/+$/g, "");
}
