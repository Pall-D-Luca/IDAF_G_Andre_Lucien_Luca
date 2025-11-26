import { useState } from "react";
import ProgressBar from './ProgressBar.jsx';
import stepsData from './progressbar.json';

export default function HomePage() {
    const [unlockedStep, setUnlockedStep] = useState(1); // nur erster Schritt freigegeben

    const steps = stepsData.steps.map(s => s.name);
    const positionsX = stepsData.steps.map(s => s.x);
    const positionsY = stepsData.steps.map(s => s.y);

    const handleStepClick = (index) => {
        if (index === unlockedStep - 1) {
            // Punkt erfolgreich gelöst
            alert(`Step ${index + 1} erledigt!`);
            setUnlockedStep(prev => Math.min(prev + 1, steps.length));
        } else {
            alert("Diesen Schritt kannst du noch nicht machen!");
        }
    };

    return (
        <div>
            <h2>Freigeschaltete Schritte: {unlockedStep}</h2>

            <ProgressBar
                steps={steps}
                positionsX={positionsX}
                positionsY={positionsY}
                unlockedStep={unlockedStep}
                onStepClick={handleStepClick}
            />
        </div>
    );
}
