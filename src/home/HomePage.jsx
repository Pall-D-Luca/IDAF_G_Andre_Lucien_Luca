import ProgressBar from './ProgressBar.jsx';
import { useState } from "react";

export default function HomePage() {

    // Aktueller Fortschritt
    const [currentStep, setCurrentStep] = useState(2);

    // 4 Punkte
    const steps = ["Start", "Check", "Review", "Finish",'ka', 'ka2', 'ka3'];

    // X-Positionen der Punkte (Pixel von links)
    const positionsX = [
        400,   // Punkt 1
        650,  // Punkt 2
        900,  // Punkt 3
        1050,
        950,
        700,
        450
        // Punkt 4
    ];

    // Y-Positionen der Punkte (Pixel von oben)
    const positionsY = [
        50,   // Punkt 1
        130,   // Punkt 2
        50,   // Punkt 3
        225,
        400,
        350,
        400
    ];

    return (
        <div>
            <h2>Fortschritt: {currentStep} von {steps.length}</h2>

            <ProgressBar
                steps={steps}
                positionsX={positionsX}
                positionsY={positionsY}
                currentStep={currentStep}
            />

            <button onClick={() => setCurrentStep(prev =>
                Math.min(prev + 1, steps.length)
            )}>
                Nächster Schritt
            </button>
        </div>
    );
}


