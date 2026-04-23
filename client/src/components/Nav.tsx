import "../assets/css/navigation.css";
import "../assets/css/colors.css";

import favicon from "../assets/icons/favicon.svg";

export default function Nav() {
    return (
        <header className="navbar-container">
            <img src={favicon} loading="lazy" alt="Handa360 Logo" />

            <nav className="navbar">
                <a href="" id="home">Home</a>
                <a href="" id="about">About</a>
                <a href="" id="contact">Contact</a>
            </nav>
        </header>
    )
}