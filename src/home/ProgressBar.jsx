import React from "react";

export default function ProgressBar({ steps, positionsX, positionsY, unlockedStep, onStepClick }) {
    return (
        <svg width={1500} height={500}>
            {steps.map((step, index) => {
                const cx = positionsX[index];
                const cy = positionsY[index];
                const isActive = index < unlockedStep;

                return (
                    <g
                        key={index}
                        onClick={() => onStepClick(index)}
                        style={{ cursor: isActive ? "pointer" : "not-allowed" }}
                    >
                        {index > 0 && (
                            <line
                                x1={positionsX[index - 1]}
                                y1={positionsY[index - 1]}
                                x2={cx}
                                y2={cy}
                                stroke={isActive ? "blue" : "lightgrey"}
                                strokeWidth="4"
                            />
                        )}
                        <circle
                            cx={cx}
                            cy={cy}
                            r="15"
                            fill={isActive ? "blue" : "white"}
                            stroke={isActive ? "blue" : "lightgrey"}
                            strokeWidth="2"
                        />
                        <text x={cx} y={cy + 30} textAnchor="middle">{step}</text>
                    </g>
                );
            })}
        </svg>
    );
}
