// @ts-check

import navigate from "../utils/navigator";

export default function Result () {
    return (
        <>
            <p>Return to home</p>
            <button onClick={() => navigate("/")}>Click me!</button>
        </>
    );
}
