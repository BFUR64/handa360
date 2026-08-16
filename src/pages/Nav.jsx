// @ts-check
/// <reference types="vite/client" />

import { useNavigate } from 'react-router-dom';
import './css/nav.css';

export default function Nav () {
    const navigate = useNavigate();

    return (
        <header>
            <img data-src="handa360-logo.webp" loading="lazy" decoding="async" alt="Handa360" />
            <nav>
                <ul className="nav-list">
                    <li><button type="button" onClick={() => navigate("/")}>Home</button></li>
                    <li><button type="button" onClick={() => navigate("/about")}>About</button></li>
                    <li><button type="button" onClick={() => navigate("/contacts")}>Contacts</button></li>
                </ul>
            </nav>
        </header>
    );
}
