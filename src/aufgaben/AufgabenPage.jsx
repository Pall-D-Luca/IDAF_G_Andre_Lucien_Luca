import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

import FlashCard from './FlashCard.jsx';
import MCQ from './multipleChoice.jsx';

// A generic progress bar component, styled to match the others
const ProgressBar = ({ current, total }) => {
    const progress = total > 0 ? ((current + 1) / total) * 100 : 0;
    return (
        <div className="progress-bar-container" style={{width: '400px', margin: '1rem auto', backgroundColor: '#e0e0e0'}}>
            <div className="progress-bar" style={{ height: '10px', backgroundColor: '#646cff', width: `${progress}%`, borderRadius: '5px' }}></div>
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
        return <div>Lade Aufgabe...</div>;
    }

    if (!task || !taskData) {
        return (
            <div>
                <h2>Keine Aufgabe ausgewählt</h2>
                <p><Link to="/">Zurück zur Startseite</Link></p>
            </div>
        );
    }

    const currentItem = taskData[currentIndex];

    return (
        <div>
            <h1>{task.name}</h1>
            <ProgressBar current={currentIndex} total={taskData.length} />

            {task.taskType === 'flashcards' && <FlashCard key={currentItem.id} card={currentItem} />}
            {task.taskType === 'mcq' && <MCQ key={currentItem.id} question={currentItem.question} options={currentItem.options} correct={currentItem.correct} />}

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                <button onClick={goToPrev} disabled={currentIndex === 0}>Zurück</button>
                <button onClick={goToNext} style={{ marginLeft: '1rem' }}>
                    {taskData && currentIndex === taskData.length - 1 ? 'Abschliessen' : 'Weiter'}
                </button>
            </div>
        </div>
    );
}