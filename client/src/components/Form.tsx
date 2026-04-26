import "../assets/css/form.css";
import "../assets/css/colors.css";

import type { Question } from "../store/cache";

export default function Form({ questions }: {questions: Question[]}) {
    return (
        <>
        <div className="question-form">
            <form className="form">
                <div className="question-list">
                    {questions.map((question) => (
                        <section className="question">
                            <h2 className="prompt">{question.text}</h2>
                            <p className="selection-hint">Select Multiple</p>

                            <div className="options">
                                {question.options.map((option) => (
                                    <label className="option">
                                        <input />
                                        <span className="option-text">{option.text}</span>
                                    </label>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>

                <div className="form-actions">
                    <button type="button" className="form-button">Previous</button>
                    <button type="button" className="form-button">Submit</button>
                </div>
            </form>
        </div>
        </>
    );
}