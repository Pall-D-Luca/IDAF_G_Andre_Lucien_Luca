import { useState, useEffect } from 'react';
import './MultipleChoice.css';

export default function HybridCard({ card }) {
    const [selected, setSelected] = useState(null);
    const [showMCQResult, setShowMCQResult] = useState(false);
    const [showFlashcardAnswer, setShowFlashcardAnswer] = useState(false);

    // Reset component state when the card (question) changes
    useEffect(() => {
        setSelected(null);
        setShowMCQResult(false);
        setShowFlashcardAnswer(false);
    }, [card]);

    const handleOptionClick = (option) => {
        if (!showMCQResult) {
            setSelected(option);
            setShowMCQResult(true);
        }
    };

    if (!card) return null;

    const hasMCQ = card.options && card.options.length > 0;

    return (
        <div>
            {/* Question Content (front of the card) */}
            <div className="mcq-question" dangerouslySetInnerHTML={{ __html: card.front.html }} />

            {/* Answer Area: Switches between MCQ and Flashcard style */}
            {hasMCQ ? (
                // MCQ-style answer
                <div>
                    <div className="mcq-options">
                        {card.options.map(opt => {
                            let buttonClass = "btn mcq-option-btn";
                            if (showMCQResult) {
                                if (opt === card.correct) {
                                    buttonClass += " correct";
                                } else if (opt === selected) {
                                    buttonClass += " incorrect";
                                }
                            }
                            return (
                                <button
                                    key={opt}
                                    onClick={() => handleOptionClick(opt)}
                                    className={buttonClass}
                                    disabled={showMCQResult}
                                >
                                    {opt}
                                </button>
                            );
                        })}
                    </div>
                    {/* Feedback and detailed answer shown after selection */}
                    {showMCQResult && (
                        <div className={`callout ${selected === card.correct ? 'callout--success' : 'callout--error'} mt-lg`}>
                            <strong>{selected === card.correct ? "Richtig!" : "Falsch!"}</strong>
                            <p style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>Die Antwort ist:</p>
                            <div dangerouslySetInnerHTML={{ __html: card.back.html }} />
                        </div>
                    )}
                </div>
            ) : (
                // Flashcard-style answer
                <div style={{ marginTop: '1rem' }}>
                    {!showFlashcardAnswer ? (
                        <button onClick={() => setShowFlashcardAnswer(true)} className="btn btn--secondary">
                            Antwort anzeigen
                        </button>
                    ) : (
                        <div className="callout callout--neutral" dangerouslySetInnerHTML={{ __html: card.back.html }} />
                    )}
                </div>
            )}
        </div>
    );
}
