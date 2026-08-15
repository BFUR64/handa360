// @ts-check
/// <reference types="vite/client" />

import './css/contact.css';

export default function Contact () {
    return (
        <main className="main-contact">
            <div className="contact-title">
                <h2>Contact Handa360</h2>
            </div>

            <div className="contact-information">
                <h3><a href="https://github.com/BFUR64/handa360">Handa360 GitHub</a></h3>
            </div>

            <div className="contact-information">
                <h3>Terrance Evan I. Clark</h3>
                <h4>(Systems Architect & Lead Logic Developer)</h4>
            </div>
            <ul className="contact-list">
                <li><a href="mailto:iterranceevan@gmail.com">iterranceevan@gmail.com</a></li>
                <li><a href="tel:+639128798083">+63 912 8798 083</a></li>
                <li><a href="https://github.com/BFUR64/">GitHub</a></li>
                <li><a href="https://www.linkedin.com/in/terrance-clark-b586723b5/">LinkedIn</a></li>
                <li><a href="https://discord.com/users/285707454568988673">Discord</a></li>
            </ul>

            <div className="contact-information">
                <h3>Mehlcon D. Casimero</h3>
                <h4>(Fullstack Integration)</h4>
            </div>
            <ul className="contact-list">
                <li><a href="https://github.com/melcone">GitHub</a></li>
            </ul>

            <div className="contact-information">
                <h3>Christine Joy D. Roberto</h3>
                <h4>(Frontend Developer)</h4>
            </div>
            <ul className="contact-list">
                <li><a href="https://github.com/KiksTin">GitHub</a></li>
            </ul>

            <div className="contact-information">
                <h3>Curt Lawrence Z. Macalacad</h3>
                <h4>(Frontend Developer)</h4>
            </div>
            <ul className="contact-list">
                <li><a href="https://github.com/sudo-curtmac">GitHub</a></li>
            </ul>
        </main>
    );
}
