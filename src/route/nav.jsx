// @ts-check

import navigate from "../utils/navigator.js";

export default function Nav () {
    return (
        <header>
            <img data-src="/handa360-logo.png" loading="lazy" decoding="async" alt="Handa360" />
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
