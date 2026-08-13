// @ts-check

/** @typedef {import("../state/cachedDatabase.js").Question} Question */

/**
 * @param {{ question: Question }} property
 */
export function Question ({ question }) {
    return (
        <>
            <legend className="form-title">{question.text}</legend>

            {
                question.options.map(option => (
                    <label className="option-container">
                        <input type="checkbox" name={question.id} value={option.id} />
                        <span className="btn-option">{option.text}</span>
                    </label>
                ))
            }
        </>
    );
}
