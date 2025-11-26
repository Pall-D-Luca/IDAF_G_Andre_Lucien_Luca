import { useState, useEffect } from 'react';

export default function FlashCard({ card }) {
    const [isFlipped, setIsFlipped] = useState(false);

    // Reset flip state when the card changes, so the new card starts on the front.
    useEffect(() => {
        setIsFlipped(false);
    }, [card]);

    if (!card) {
        return null; // Don't render if there's no card data
    }
    return (
        <div className="flashcard-container" onClick={() => setIsFlipped(!isFlipped)}>
            <div className={`flashcard ${isFlipped ? 'is-flipped' : ''}`}>
                <div
                    className="flashcard-face flashcard-front"
                    dangerouslySetInnerHTML={{ __html: card.front.html }}
                ></div>
                <div
                    className="flashcard-face flashcard-back"
                    dangerouslySetInnerHTML={{ __html: card.back.html }}
                ></div>
            </div>
        </div>
    );
}