import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from "./components/Layout";
import Form from "./components/Form";

import type { Question, Option } from "./components/Form";

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

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Form questions={testing} />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;