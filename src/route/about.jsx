// @ts-check
/// <reference types="vite/client" />

import './css/about.css';

export default function About () {
    return (
        <main className="main-about">
            <section>
                <h2>About Handa360</h2>
                <p>
                        Handa360 is a web application that turns general disaster-preparedness
                    instructions into a catered set of actionable items. It consolidates
                    fragmented disaster resources into one localized action plan.
                </p>

                <ol>
                    <li>How to use</li>
                    <li>How it can help</li>
                    <li>Why Handa360</li>
                </ol>
            </section>

            <section>
                <h2>Step-by-Step Guide in using Handa360</h2>

                <ol>
                    <li>Select Your Location</li>
                    <p>Access contact details of organizations and government agencies for assistance.</p>

                    <li>Select the Hazard</li>
                    <p>Specify the type of disaster or hazard you want to prepare for. Each hazard requires different preparation.</p>

                    <li>Select Your Limitations</li>
                    <p>Identify your limitations that may affect your ability to respond to a disaster. Additional preparation, actions, and assistance may be needed.</p>

                    <li>Get Your Checklist</li>
                    <p>It is a tailored set of checklists of preparations, actions, recommendations, and contact details for emergency support that are relevant to your situation.</p>
                </ol>
            </section>

            <section>
                <h2>How can Handa360 help?</h2>
                <p>
                        Select the options that best describe your situation and get personalized preparedness recommendations.
                    By selecting from the given options, you can get a tailored set of checklists task, recommendations,
                    and contact details of organizations and government agencies that you can contact for assistance or
                    emergency support that are relevant to your situation. With the following responses, you can prepare
                    yourself and your family for any disaster that may occur.
                </p>
            </section>

            <section>
                <h2>Why Handa360?</h2>
                <p>
                    Handa360 is a web application that turns general disaster-preparedness instructions into a catered set of
                    actionable items.
                </p>
            </section>
        </main>
    );
}
