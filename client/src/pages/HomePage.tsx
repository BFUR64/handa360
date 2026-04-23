import Form from "../components/Form";

import type { Question, Option } from "../components/Form";

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

export default function HomePage() {
    return (
        <Form questions={testing}/>
    );
}