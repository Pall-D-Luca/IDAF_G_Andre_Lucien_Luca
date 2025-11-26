import React from "react";

export default function ProgressBar({ steps, unlockedStep, onStepClick }) {
    return (
        <svg width={1500} height={500}>
            {steps.map((step, index) => {
                const { name, x, y } = step;
                // A step is active if its number is less than the unlockedStep number
                const isActive = step.step < unlockedStep;
                const isNext = step.step === unlockedStep; // The very next step to be unlocked

                return (
                    <g
                        key={index}
                        onClick={() => onStepClick(index)}
                        style={{ cursor: (isActive || isNext) ? "pointer" : "not-allowed" }}
                    >
                        {index > 0 && (
                            <line
                                x1={steps[index - 1].x}
                                y1={steps[index - 1].y}
                                x2={x}
                                y2={y}
                                stroke={isActive || isNext ? "blue" : "lightgrey"}
                                strokeWidth="4"
                            />
                        )}
                        <circle
                            cx={x}
                            cy={y}
                            r="15"
                            fill={isActive ? "blue" : (isNext ? "lightblue" : "white")} // Different color for next step
                            stroke={isActive || isNext ? "blue" : "lightgrey"}
                            strokeWidth="2"
                        />
                        <text x={x} y={y + 30} textAnchor="middle">{step.name}</text>
                    </g>
                );
            })}
        </svg>
    );
}
