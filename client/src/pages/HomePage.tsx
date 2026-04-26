import Form from "../components/Form";

import * as cache from "../store/cache";
// import { getQuestions } from '../store/cache';

export default function HomePage() {
    return (
        <Form questions={cache.getQuestions()}/>
    );
}