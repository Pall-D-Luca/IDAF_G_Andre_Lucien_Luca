import { useState } from 'react';
import './MultipleChoice.css'; // Import the new CSS

export default function MCQ({ question, options, correct }) {
    const [selected, setSelected] = useState(null);
    const [showAnswer, setShowAnswer] = useState(false);

    const handleClick = (option) => {
        if (!showAnswer) { // Prevent changing selection after answer is shown
            setSelected(option);
            setShowAnswer(true);
        }
    };

    return (
        <div className="mcq-container">
            <p className="mcq-question">{question}</p>
            {options.map(opt => {
                let buttonClass = "mcq-option-button";
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
                        disabled={showAnswer} // Disable buttons after answer is shown
                    >
                        {opt}
                    </button>
                );
            })}
            {showAnswer && <p className="mcq-feedback">{selected === correct ? "Richtig!" : `Falsch! Richtige Antwort: ${correct}`}</p>}
        </div>
    );
}