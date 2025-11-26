import { useNavigate } from 'react-router-dom';
import ProgressBar from './ProgressBar.jsx';
import stepsData from './progressbar.json';

export default function HomePage({ unlockedStep, isMobile }) { // Receive isMobile

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
        <div className="page-container">
            <header className="hero text-center">
                <h1>Willkommen zum Crashkurs für Bundesräte</h1>
                <p className="text-light" style={{fontSize: 'var(--font-size-md)'}}>
                    Navigieren Sie durch die Lektionen, um sich auf die Herausforderungen des Amtes vorzubereiten.
                </p>
            </header>

            <div className="card mt-lg">
                <div className="card__header">
                    <h3>Ihr Lernpfad</h3>
                </div>
                <div className="card__body">
                    <ProgressBar
                        steps={steps} // Pass the full array
                        unlockedStep={unlockedStep}
                        onStepClick={handleStepClick}
                        isMobile={isMobile} // Pass isMobile to ProgressBar
                    />
                </div>
                <div className="card__footer">
                    <p>Klicken Sie auf den nächsten freigeschalteten Schritt, um fortzufahren.</p>
                </div>
            </div>
        </div>
    );
}
