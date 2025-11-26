import { useState } from 'react';
import FC from './FlashCard.jsx'
import deck from './data.json';
import MCQ from './multipleChoice.jsx';

export default function AufgabenPage() {
    const flashcards = deck.filter(d => d.type === 'flashcard');
    const mcqs = deck.filter(d => d.type === 'mcq');

    const [mcqIndex, setMcqIndex] = useState(0);

    const goToNextMcq = () => {
        setMcqIndex(prevIndex => (prevIndex + 1) % mcqs.length);
    };

    const goToPrevMcq = () => {
        setMcqIndex(prevIndex => (prevIndex - 1 + mcqs.length) % mcqs.length);
    };

    const currentMcq = mcqs.length > 0 ? mcqs[mcqIndex] : null;

    return (
        <div>
            <h1>AufgabenPage</h1>

            {/* Flashcards */}
            <FC flashcards={flashcards}/>

            <hr />

            {/* MCQs */}
            <h2>Multiple Choice ({mcqs.length > 0 ? mcqIndex + 1 : 0} / {mcqs.length})</h2>
            {currentMcq ? (
                <div>
                    <MCQ
                        key={currentMcq.id}
                        question={currentMcq.question}
                        options={currentMcq.options}
                        correct={currentMcq.correct}
                    />
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                        <button onClick={goToPrevMcq}>Zurück</button>
                        <button onClick={goToNextMcq} style={{ marginLeft: '1rem' }}>Weiter</button>
                    </div>
                </div>
            ) : (
                <p>Keine MCQs zum Anzeigen.</p>
            )}
        </div>
    );
}
