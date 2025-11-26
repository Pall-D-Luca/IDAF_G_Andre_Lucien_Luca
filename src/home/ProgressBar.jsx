import React from "react";

export default function ProgressBar({ steps, positionsX, positionsY, currentStep }) {

    const svgWidth = 1500;
    const svgHeight = 500;

    return (
        <svg width={svgWidth} height={svgHeight}>

            {steps.map((step, index) => {

                const cx = positionsX[index];
                const cy = positionsY[index];
                const isActive = index < currentStep;

                return (
                    <g key={index}>

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
                            r="10"
                            fill={isActive ? "blue" : "white"}
                            stroke={isActive ? "blue" : "lightgrey"}
                            strokeWidth="2"
                        />
                    </g>
                );
            })}
        </svg>
    );
}
