// @ts-check
/// <reference types="vite/client" />

import './css/about.css';

export default function About () {
    return (
        <main className="main-about">
            <section id="about-handa360">
                <h2>About Handa360</h2>
                <p>
                    Handa360 is a disaster preparedness web application built to solve a critical information problem: critical disaster information is scattered across multiple government agencies, websites, and manuals. A family preparing for a typhoon, for example, must cross-reference NDRRMC weather guidelines, separate child-safety pamphlets, and manually search for barangay emergency contacts, wasting precious preparation time.
                </p>
                <p>
                    Handa360 consolidates 3+ fragmented disaster resources into one localized action plan. Instead of leaving citizens to compile their own survival manuals, it acts as a rapid Context-Aware Assembly Engine. Users select their location, hazard, and personal limitations, and the app pulls from modular, isolated datasets to instantly generate a single, unified checklist. One screen, zero cross-referencing required.
                </p>
                <p>
                    The project was developed for <strong>UPV KomsaiHack 2026: Risk Ready</strong> by the team <strong>The Vibe Coders 67</strong>.
                </p>

                <ul className="about-list">
                    <li><a href="#about-guide">How to use</a></li>
                    <li><a href="#about-help">How it can help</a></li>
                    <li><a href="#about-why">Why Handa360</a></li>
                </ul>
            </section>

            <section id="about-guide">
                <h2>Step-by-Step Guide in using Handa360</h2>

                <ol className="guide-steps">
                    <li>Select Your Location</li>
                        <p>
                            Choose your city, municipality, or barangay. This step anchors your entire plan with local emergency hotlines, DRRMO contacts, and nearby assistance providers, so you are not stuck with generic national numbers during an actual emergency.
                        </p>
                    <li>Select the Hazard</li>
                        <p>
                            Specify the type of disaster or hazard you want to prepare for, such as typhoon, earthquake, flood, or drought. Each hazard has different preparation protocols, evacuation procedures, and safety measures, so the checklist is built around the specific threat you're facing.
                        </p>
                    <li>Select Your Limitations</li>
                        <p>
                            Indicate any personal circumstances that may affect your ability to respond, such as having a disability, caring for a child or elderly person, medical conditions, or mobility restrictions. The app automatically appends additional preparation steps, recommended actions, and assistance resources tailored to those needs.
                        </p>
                    <li>Get Your Checklist</li>
                        <p>
                            Receive a personalized set of checklists containing preparation tasks, safety recommendations, and contact details for emergency support. Everything is organized into a unified action plan, a go-bag checklist, and local emergency contacts, ready to use immediately.
                        </p>
                </ol>
            </section>

            <section id="about-help">
                <h2>How can Handa360 help?</h2>
                <p>
                    Handa360 removes the burden of manual research and cross-referencing. Instead of visiting multiple agency websites and reading through lengthy PDFs, you answer a few simple prompts and get a personalized preparedness plan in seconds. The app intelligently merges general hazard guidelines with your specific limitations and your local emergency contacts, so you see exactly what to do, what to pack, and who to call, all in one place.
                </p>
                <p>
                    This means your family can prepare faster, with clearer instructions, and you'll have the right local numbers at your fingertips when every second counts. Whether you're preparing for a typhoon in Kalibo or an earthquake in another municipality, Handa360 gives you a plan that fits your reality.
                </p>
            </section>

            <section id="about-why">
                <h2>Why Handa360?</h2>
                <p>
                    Handa360 was designed with real-world constraints in mind. Unlike static disaster guides, it adapts to the user's specific context. Here are the core reasons it stands out:
                </p>
                <ul className="feature-list">
                    <li>
                        <strong>Unified Action Plans:</strong> Combines generic hazard protocols with special-needs protocols and local contacts into one cohesive checklist.
                    </li>
                    <li>
                        <strong>Zero-Code Updates:</strong> The data layer is made of simple text files that local leaders can update without developer support. New hazards, locations, or checklist items can be added by editing JSON files.
                    </li>
                    <li>
                        <strong>Dynamic Local Contacts:</strong> Automatically pulls the exact emergency numbers for the user's selected location, such as barangay hotlines and DRRMOs.
                    </li>
                    <li>
                        <strong>Ultra-Lightweight:</strong> Built with pure HTML, CSS, and JavaScript, with no heavy frameworks or databases. This ensures near-instant load times on low-end mobile devices and works reliably even on 2G networks.
                    </li>
                    <li>
                        <strong>Built for Crisis:</strong> Deployed on GitHub Pages with CDN-backed infrastructure, capable of handling traffic spikes during disasters. The modular architecture also makes it easy to scale and maintain.
                    </li>
                </ul>
            </section>
        </main>
    );
}
