import { useNavigate } from 'react-router-dom';
import ProgressBar from './ProgressBar.jsx';
import stepsData from './progressbar.json';

export default function HomePage({ unlockedStep }) { // No longer needs setUnlockedStep
    const navigate = useNavigate();
    const { steps } = stepsData; // Get the full steps array

    const handleStepClick = (stepIndex) => {
        const clickedStep = steps[stepIndex];

        // Allow user to start the *next* unlocked step
        if (clickedStep.step === unlockedStep) {
            navigate('/aufgaben', {
                state: { task: clickedStep } // Pass the whole step object
            });
        } else if (clickedStep.step < unlockedStep) {
            alert("Diesen Schritt hast du schon erledigt!");
        } else {
            alert("Diesen Schritt kannst du noch nicht machen!");
        }
    };

    return (
        <div>
            <h2>Freigeschaltete Schritte: {unlockedStep}</h2>
            <ProgressBar
                steps={steps} // Pass the full array
                unlockedStep={unlockedStep}
                onStepClick={handleStepClick}
            />
        </div>
    );
}
