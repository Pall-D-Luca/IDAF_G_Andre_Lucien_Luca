import { useState, useEffect } from 'react';
import './MultipleChoice.css'; 

export default function MCQ({ question, options, correct }) {
    const [selected, setSelected] = useState(null);
    const [showAnswer, setShowAnswer] = useState(false);

    // Reset state when the question changes
    useEffect(() => {
        setSelected(null);
        setShowAnswer(false);
    }, [question]);

    const handleClick = (option) => {
        if (!showAnswer) {
            setSelected(option);
            setShowAnswer(true);
        }
    };

    return (
        <div>
            <div className="mcq-question" dangerouslySetInnerHTML={{ __html: question }} />
            <div className="mcq-options">
                {options.map(opt => {
                    let buttonClass = "btn mcq-option-btn";
                    if (showAnswer) {
                        if (opt === correct) {
                            buttonClass += " correct";
                        } else if (opt === selected) {
                            buttonClass += " incorrect";
                        }
                    }
                    return (
                        <button
                            key={opt}
                            onClick={() => handleClick(opt)}
                            className={buttonClass}
                            disabled={showAnswer}
                        >
                            {opt}
                        </button>
                    );
                })}
            </div>
            {showAnswer && (
                <div className={`callout ${selected === correct ? 'callout--success' : 'callout--error'} mt-lg`}>
                    <strong>{selected === correct ? "Richtig!" : "Falsch!"}</strong>
                    {selected !== correct && <p>Die korrekte Antwort lautet: {correct}</p>}
                </div>
            )}
        </div>
    );
}