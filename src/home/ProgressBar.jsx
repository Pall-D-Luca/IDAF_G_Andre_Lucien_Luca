import React from "react";

export default function ProgressBar({ steps, unlockedStep, onStepClick, isMobile }) { // Receive isMobile
    // Define scaling factors for mobile
    const elementScaleFactor = isMobile ? 1.5 : 1;
    const strokeWidth = 4 * elementScaleFactor;

    return (
        <svg
            viewBox={isMobile ? "0 0 400 1050" : "0 0 1500 500"} // Adjusted mobile viewBox height
            style={{ width: '100%', maxWidth: '1500px', height: 'auto' }}
        >
            {/* Layer 1: All the lines (drawn first, so they are in the back) */}
            <g className="progress-bar-lines">
                {steps.map((step, index) => {
                    if (index === 0) return null; // No line before the first step

                    const prevStep = steps[index - 1];
                    const x1 = isMobile ? prevStep.mobile_x : prevStep.x;
                    const y1 = isMobile ? prevStep.mobile_y : prevStep.y;
                    const x2 = isMobile ? step.mobile_x : step.x;
                    const y2 = isMobile ? step.mobile_y : step.y;

                    const isLineActive = step.step <= unlockedStep;

                    return (
                        <line
                            key={`line-${index}`}
                            x1={x1}
                            y1={y1}
                            x2={x2}
                            y2={y2}
                            stroke={isLineActive ? "blue" : "lightgrey"}
                            strokeWidth={strokeWidth}
                        />
                    );
                })}
            </g>

            {/* Layer 2: All the step groups (circles + text) drawn on top of lines */}
            <g className="progress-bar-steps">
                {steps.map((step, index) => {
                    const { name } = step;
                    const displayX = isMobile ? step.mobile_x : step.x;
                    const displayY = isMobile ? step.mobile_y : step.y;

                    const circleRadius = 15 * elementScaleFactor;
                    const textYOffset = isMobile ? 10 * elementScaleFactor : 50 * elementScaleFactor;
                    const textXOffset = isMobile ? 30 * elementScaleFactor : 0;
                    const textAnchor = isMobile ? "start" : "middle";
                    const fontSize = isMobile ? '1.8em' : '1em';

                    const isActive = step.step < unlockedStep;
                    const isNext = step.step === unlockedStep;

                    return (
                        <g
                            key={`step-${index}`}
                            onClick={() => onStepClick(index)}
                            style={{ cursor: (isActive || isNext) ? "pointer" : "not-allowed" }}
                        >
                            <circle
                                cx={displayX}
                                cy={displayY}
                                r={circleRadius}
                                fill={isActive ? "blue" : (isNext ? "lightblue" : "white")}
                                stroke={isActive || isNext ? "blue" : "lightgrey"}
                                strokeWidth={strokeWidth / 2}
                            />
                            <text
                                x={displayX + textXOffset}
                                y={displayY + textYOffset}
                                textAnchor={textAnchor}
                                style={{ fontSize: fontSize }}
                            >
                                {name}
                            </text>
                        </g>
                    );
                })}
            </g>
        </svg>
    );
}

