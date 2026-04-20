import { Nav } from "./ts/ui/navRenderer.tsx";
import { Form } from "./ts/ui/formRenderer.tsx";

import type { Question, Option } from "./ts/ui/formRenderer.tsx";

import "./css/app.css";

const testingOptions: Option[] = [
    {
        id: "Bruh",
        text: "Bruh2"
    }
];

const testing: Question[] = [
    {
        id: "hello_world",
        text: "Hello World",
        selectionType: "single",
        options: testingOptions
    }
];

export function App() {
    return (
        <>
            <div className="app-root">
                <Nav />

                <main className="main-content">
                    <Form questions={testing} />
                </main>
            </div>
        </>
    );
}