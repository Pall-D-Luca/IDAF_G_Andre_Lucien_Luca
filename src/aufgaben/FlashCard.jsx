import { useState } from 'react';
import './FlashCard.css'; // Import the new CSS

const ProgressBar = ({ current, total }) => {
    const progress = total > 0 ? ((current + 1) / total) * 100 : 0;
    return (
        <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
    );
};

export default function FlashCard({ flashcards }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    if (!flashcards || flashcards.length === 0) {
        return <div>Keine Flashcards zum Anzeigen.</div>;
    }

    const currentCard = flashcards[currentIndex];

    const goToNext = () => {
        setIsFlipped(false);
        setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
        }, 150);
    };

    const goToPrev = () => {
        setIsFlipped(false);
        setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
        }, 150);
    };

    const flipCard = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div>
            <h2>Flashcards ({currentIndex + 1} / {flashcards.length})</h2>
            <ProgressBar current={currentIndex} total={flashcards.length} />

            <div className="flashcard-container" onClick={flipCard}>
                <div className={`flashcard ${isFlipped ? 'is-flipped' : ''}`}>
                    <div
                        className="flashcard-face flashcard-front"
                        dangerouslySetInnerHTML={{ __html: currentCard.front.html }}
                    ></div>
                    <div
                        className="flashcard-face flashcard-back"
                        dangerouslySetInnerHTML={{ __html: currentCard.back.html }}
                    ></div>
                </div>
            </div>

            <div className="flashcard-navigation">
                <button onClick={(e) => { e.stopPropagation(); goToPrev(); }}>Zurück</button>
                <button onClick={(e) => { e.stopPropagation(); goToNext(); }}>Weiter</button>
            </div>
        </div>
    );
}
