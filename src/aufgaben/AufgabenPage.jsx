import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

import FlashCard from './FlashCard.jsx';
import MCQ from './multipleChoice.jsx';

// A generic progress bar component, styled to match the others
const ProgressBar = ({ current, total }) => {
    const progress = total > 0 ? ((current + 1) / total) * 100 : 0;
    return (
        <div className="progress-bar">
            <div className="progress-bar__indicator" style={{ width: `${progress}%` }}></div>
        </div>
    );
};

const datasetImporter = (datasetName) => {
    // This map ensures Vite can find all possible dynamic imports at build time
    switch (datasetName) {
        case 'flashcards_set1.json':
            return import('./flashcards_set1.json');
        case 'mcq_set1.json':
            return import('./mcq_set1.json');
        default:
            return Promise.reject(new Error(`Unknown dataset: ${datasetName}`));
    }
};

export default function AufgabenPage({ setUnlockedStep }) {
    const location = useLocation();
    const navigate = useNavigate();

    const [taskData, setTaskData] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    const task = location.state?.task;

    useEffect(() => {
        // Reset state when task changes
        setTaskData(null);
        setCurrentIndex(0);

        if (!task) {
            setLoading(false);
            return;
        }

        setLoading(true);
        datasetImporter(task.dataset)
            .then(module => {
                setTaskData(module.default);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to load task data:", err);
                setLoading(false);
            });

    }, [task]);

    const handleComplete = () => {
        // Update the global unlocked step state.
        setUnlockedStep(prev => Math.max(prev, task.step + 1));
        navigate('/'); // Go back to the homepage
    };

    const goToNext = () => {
        if (taskData && currentIndex < taskData.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            handleComplete();
        }
    };

    const goToPrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
    };
    
    if (loading) {
        return <div className="page-container text-center"><h2>Lade Aufgabe...</h2></div>;
    }

    if (!task || !taskData) {
        return (
            <div className="page-container text-center">
                <div className="card">
                    <div className="card__body">
                        <h2>Keine Aufgabe ausgewählt</h2>
                        <p>Bitte kehren Sie zur Startseite zurück, um eine Aufgabe zu wählen.</p>
                        <Link to="/" className="btn btn--primary mt-lg">Zurück zur Startseite</Link>
                    </div>
                </div>
            </div>
        );
    }

    const currentItem = taskData[currentIndex];

    return (
        <div className="page-container aufgaben-page">
            <header className="page-header text-center">
                <h1>{task.name}</h1>
                <p className="aufgaben-page__progress">Frage {currentIndex + 1} von {taskData.length}</p>
            </header>

            <div className="card">
                <div className="card__body">
                    {task.taskType === 'flashcards' && <FlashCard key={currentItem.id} card={currentItem} />}
                    {task.taskType === 'mcq' && <MCQ key={currentItem.id} question={currentItem.question} options={currentItem.options} correct={currentItem.correct} />}
                </div>

                <div className="card__footer aufgaben-page__controls">
                    <button onClick={goToPrev} disabled={currentIndex === 0} className="btn btn--secondary">
                        Zurück
                    </button>
                    <button onClick={goToNext} className="btn btn--primary">
                        {taskData && currentIndex === taskData.length - 1 ? 'Abschliessen' : 'Weiter'}
                    </button>
                </div>
            </div>
        </div>
    );
}