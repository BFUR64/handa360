// @ts-check
/// <reference types="vite/client" />

import { useNavigate } from 'react-router-dom';
import './css/nav.css';
import { useEffect, useState } from 'react';
import { IconBulb, IconMoon } from '@tabler/icons-react';

export default function Nav () {
    const navigate = useNavigate();

    const [menuOpen, setMenuOpen] = useState(false);

    const [theme, setTheme] = useState(() => localStorage.getItem("theme"));

    useEffect(() => {
        if (theme == null) return;

        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(theme);

        localStorage.setItem("theme", theme);
    }, [theme]);

    /**
     * @param {string} path
     */
    function navigateAndClose(path) {
        navigate(path);
        setMenuOpen(false);
    }

    return (
        <header>
            <img data-src="handa360-logo.webp" loading="lazy" decoding="async" alt="Handa360" />
            <nav>
                {
                    theme === "light"
                        ? <button className="btn-theme" onClick={() => setTheme("dark")}><IconMoon /></button>
                        : <button className="btn-theme" onClick={() => setTheme("light")}><IconBulb /></button>
                }
                <button
                    className="btn-generic"
                    aria-label="Toggle navigation"
                    aria-expanded={menuOpen}
                    onClick={() => setMenuOpen(!menuOpen)}
                >☰</button>
                <button className={
                    menuOpen ? "nav-overlay nav-open" : "nav-overlay"}
                    aria-label="Close navigation"
                    onClick={() => setMenuOpen(false)}
                ></button>
                <ul className={menuOpen ? "nav-list nav-open" : "nav-list"}>
                    <li><button type="button" onClick={() => navigateAndClose("/")}>Home</button></li>
                    <li><button type="button" onClick={() => navigateAndClose("/about")}>About</button></li>
                    <li><button type="button" onClick={() => navigateAndClose("/contacts")}>Contacts</button></li>
                </ul>
            </nav>
        </header>
    );
}