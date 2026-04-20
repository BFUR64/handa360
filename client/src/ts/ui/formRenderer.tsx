import "../../css/form.css";

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

export function Form({ questions }: {questions: Question[]}) {
    return (
        <>
        <div className="question-form">
            <form className="form">
                <div className="question-list">
                    <section className="question">
                        <h2 className="prompt">What's the Hazard?</h2>
                        <p className="selection-hint">Select Multiple</p>
                        <div className="options">
                            {
                                [...Array(100)].map((_, i) => (
                                    <label className="option">
                                        <input />
                                        <span className="option-text">Option {i}</span>
                                    </label>
                                ))
                            }
                        </div>
                    </section>
                    {/* <section className="question">
                        <h2 className="prompt">What's the Location?</h2>
                        <div className="options">
                            <p className="selection-hint">Select Multiple</p>
                            <label className="option">
                                <input />
                                <span className="option-text">Option</span>
                            </label>
                            <label className="option">
                                <input />
                                <span className="option-text">Option</span>
                            </label>
                            <label className="option">
                                <input />
                                <span className="option-text">Option</span>
                            </label>
                            <label className="option">
                                <input />
                                <span className="option-text">Option</span>
                            </label>
                        </div>
                    </section> */}
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