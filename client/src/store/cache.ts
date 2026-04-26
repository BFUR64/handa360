export interface Question {
    id: string,
    text: string,
    selectionType: string,
    options: Option[]
}

export interface Option {
    id: string,
    text: string
}

const option: Option[] = [
    {
        id: "Bruh",
        text: "Bruh2"
    },
    {
        id: "Bruh",
        text: "Bruh2"
    },
    {
        id: "Bruh",
        text: "Bruh2"
    },
    {
        id: "Bruh",
        text: "Bruh2"
    },
    {
        id: "Bruh",
        text: "Bruh2"
    },
    {
        id: "Bruh",
        text: "Bruh2"
    },
    {
        id: "Bruh",
        text: "Bruh2"
    },
    {
        id: "Bruh",
        text: "Bruh2"
    },
    {
        id: "Bruh",
        text: "Bruh2"
    },
    {
        id: "Bruh",
        text: "Bruh2"
    },
    {
        id: "Bruh",
        text: "Bruh2"
    },
    {
        id: "Bruh",
        text: "Bruh2"
    },
    {
        id: "Bruh",
        text: "Bruh2"
    },
    {
        id: "Bruh",
        text: "Bruh2"
    },
    {
        id: "Bruh",
        text: "Bruh2"
    },
    {
        id: "Bruh",
        text: "Bruh2"
    },
    {
        id: "Bruh",
        text: "Bruh2"
    },
    {
        id: "Bruh",
        text: "Bruh2"
    },
    {
        id: "Bruh",
        text: "Bruh2"
    },
    {
        id: "Bruh",
        text: "Bruh2"
    },

];

const questions: Question[] = [
    {
        id: "hello_world",
        text: "Hello World",
        selectionType: "single",
        options: option
    }
];

export function getQuestions() {
    return structuredClone(questions);
}