import React from "react";

export default function ProgressBar({ steps, unlockedStep, onStepClick, isMobile }) { // Receive isMobile
    // Define scaling factors for mobile
    const elementScaleFactor = isMobile ? 1.5 : 1; // Increase size of elements by 50% on mobile
    

    return (
        <svg 
            viewBox={isMobile ? "0 0 400 700" : "0 0 1500 500"}
            style={{ width: '100%', maxWidth: '1500px', height: 'auto' }}
        >
            {steps.map((step, index) => {
                const { name, x, y, mobile_x, mobile_y } = step;
                // Apply scale factor to coordinates
                const displayX = isMobile ? mobile_x : x;
                const displayY = isMobile ? mobile_y : y;
                
                const circleRadius = 15 * elementScaleFactor;
                const strokeWidth = 4 * elementScaleFactor;
                const textYOffset = isMobile ? 10 * elementScaleFactor : 50 * elementScaleFactor; // Smaller vertical offset for mobile, larger for desktop
                const textXOffset = isMobile ? 30 * elementScaleFactor : 0; // Horizontal offset for mobile
                const textAnchor = isMobile ? "start" : "middle"; // Align text to start for mobile, middle for desktop
                const fontSize = isMobile ? '1.8em' : '1em'; 
                
                const isActive = step.step < unlockedStep;
                const isNext = step.step === unlockedStep;

                return (
                    <g
                        key={index}
                        onClick={() => onStepClick(index)}
                        style={{ cursor: (isActive || isNext) ? "pointer" : "not-allowed" }}
                    >
                        {index > 0 && (
                            <line
                                x1={isMobile ? steps[index - 1].mobile_x : steps[index - 1].x}
                                y1={isMobile ? steps[index - 1].mobile_y : steps[index - 1].y}
                                x2={displayX}
                                y2={displayY}
                                stroke={isActive || isNext ? "blue" : "lightgrey"}
                                strokeWidth={strokeWidth}
                            />
                        )}
                        <circle
                            cx={displayX}
                            cy={displayY}
                            r={circleRadius}
                            fill={isActive ? "blue" : (isNext ? "lightblue" : "lightgrey")}
                            stroke={isActive || isNext ? "blue" : "lightgrey"}
                            strokeWidth={strokeWidth / 2} 
                        />
                        <text 
                            x={displayX + textXOffset} 
                            y={displayY + textYOffset} 
                            textAnchor={textAnchor} 
                            style={{ fontSize: fontSize }}
                        >
                            {step.name}
                        </text>
                    </g>
                );
            })}
        </svg>
    );
}
