import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

import FlashCard from './FlashCard.jsx';
import MCQ from './multipleChoice.jsx';
import HybridCard from './HybridCard.jsx';
import stepsData from '../home/progressbar.json';

const datasetImporter = (datasetName) => {
    // This map ensures Vite can find all possible dynamic imports at build time
    switch (datasetName) {
        case 'data/set1.json':
            return import('./data/set1.json');
        case 'data/set2.json':
            return import('./data/set2.json');
        case 'data/set3.json':
            return import('./data/set3.json');
        case 'data/set4.json':
            return import('./data/set4.json');
        case 'data/set5.json':
            return import('./data/set5.json');
        case 'data/set6.json':
            return import('./data/set6.json');
        case 'data/set7.json':
            return import('./data/set7.json');
        case 'data/set8.json':
            return import('./data/set8.json');
        default:
            return Promise.reject(new Error(`Unknown dataset: ${datasetName}`));
    }
};


export default function AufgabenPage({ unlockedStep, setUnlockedStep }) {
    const location = useLocation();
    const navigate = useNavigate();

    const [activeTask, setActiveTask] = useState(location.state?.task || null);
    const [taskData, setTaskData] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(!!location.state?.task);

    useEffect(() => {
        setTaskData(null);
        setCurrentIndex(0);

        if (!activeTask) {
            setLoading(false);
            return;
        }

        setLoading(true);
        datasetImporter(activeTask.dataset)
            .then(module => {
                setTaskData(module.default);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to load task data:", err);
                setLoading(false);
            });

    }, [activeTask]);

    const handleComplete = () => {
        // Only unlock the next step if the user completes the correct one in their learning path
        if (activeTask && unlockedStep && activeTask.step === unlockedStep) {
            setUnlockedStep(prev => Math.max(prev, activeTask.step + 1));
        }
        
        // If the user came from the homepage, navigate back. Otherwise, go to task selection.
        if (location.state?.task) {
            navigate('/');
        } else {
            setActiveTask(null); // Return to the selection screen
        }
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

    if (!activeTask) {
        return (
            <div className="page-container text-center">
                <div className="card">
                    <div className="card__header">
                        <h3>Wählen Sie eine Aufgabe aus</h3>
                    </div>
                    <div className="card__body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {stepsData.steps.map(step => {
                            const isSolved = step.step < unlockedStep;
                            return (
                                <button
                                    key={step.step}
                                    onClick={() => setActiveTask(step)}
                                    className={`btn btn--secondary ${isSolved ? 'btn--solved' : ''}`}
                                >
                                    {step.name}
                                </button>
                            );
                        })}
                    </div>
                     <div className="card__footer">
                        <p>Wählen Sie eine beliebige Aufgabe zum Üben aus. Grün markierte Aufgaben wurden im Lernpfad bereits abgeschlossen.</p>
                     </div>
                </div>
            </div>
        );
    }
    
    if (!taskData) {
        // This can happen briefly between activeTask being set and data loading.
        return <div className="page-container text-center"><h2>Lade Aufgabendaten...</h2></div>;
    }

    const currentItem = taskData[currentIndex];

    return (
        <div className="page-container aufgaben-page">
            <header className="page-header text-center">
                <h1>{activeTask.name}</h1>
                <p className="aufgaben-page__progress">Frage {currentIndex + 1} von {taskData.length}</p>
            </header>

            <div className="card">
                <div className="card__body">
                    {currentItem.type === 'flashcard' && <FlashCard key={currentItem.id} card={currentItem} />}
                    {currentItem.type === 'mcq' && <MCQ key={currentItem.id} question={currentItem.question} options={currentItem.options} correct={currentItem.correct} />}
                    {currentItem.type === 'hybrid' && <HybridCard key={currentItem.id} card={currentItem} />}
                </div>

                <div className="card__footer aufgaben-page__controls">
                    <button onClick={goToPrev} disabled={currentIndex === 0} className="btn btn--secondary">
                        Zurück
                    </button>
                    
                    {/* Show 'Back to Selection' button if not on a formal learning path step */}
                    {!location.state?.task && (
                         <button onClick={() => setActiveTask(null)} className="btn btn--secondary">
                            Zurück zur Auswahl
                         </button>
                    )}

                    <button onClick={goToNext} className="btn btn--primary">
                        {taskData && currentIndex === taskData.length - 1 ? 'Abschliessen' : 'Weiter'}
                    </button>
                </div>
            </div>
        </div>
    );
}