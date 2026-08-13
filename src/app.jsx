// @ts-check

import { useEffect, useState } from "react";
import Nav from "./route/nav.jsx";
import Home from "./route/home.jsx";

export default function App () {
    const [path, setPath] = useState(window.location.pathname);

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
                    <main>
                        <Home />
                    </main>
                </>
            );

        case "/about":
            return (
                <>
                    <Nav />
                    <main>
                        <p>About Menu</p>
                    </main>
                </>
            );

        case "/contacts":
            return (
                <>
                    <Nav />
                    <main>
                        <p>Contacts Menu</p>
                    </main>
                </>
            );

        default:
            return (
                <>
                    <Nav />
                    <main>
                        <Home />
                    </main>
                </>
            );
    }
}
