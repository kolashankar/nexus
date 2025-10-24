import React, { useEffect, useState } from 'react';

const defaultStages = [
  'Initializing...',
  'Loading assets...',
  'Connecting to server...',
  'Almost ready...',
];

export const ProgressiveLoading = ({
  stages = defaultStages,
  currentStage = 0,
  progress = 0,
  message,
}) => {
  const [displayProgress, setDisplayProgress] = useState(0);

  useEffect(() => {
    // Smooth progress animation
    const interval = setInterval(() => {
      setDisplayProgress((prev) => {
        const diff = progress - prev;
        if (Math.abs(diff) < 0.1) return progress;
        return prev + diff * 0.1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [progress]);

  return (
    <div className="progressive-loading flex flex-col items-center justify-center min-h-screen p-8">
      <div className="space-y-6 w-full max-w-md">
        {/* Progress Circle */}
        <div className="relative w-32 h-32 mx-auto">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="8" />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="8"
              strokeDasharray={`${2 * Math.PI * 45}`}
              strokeDashoffset={`${2 * Math.PI * 45 * (1 - displayProgress / 100)}`}
              transform="rotate(-90 50 50)"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold">{Math.round(displayProgress)}%</span>
          </div>
        </div>

        {/* Stage Info */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            {stages.map((_, index) => (
              <div
                key={index}
                className={`stage-dot w-3 h-3 rounded-full ${
                  index <= currentStage ? 'bg-blue-500' 
                }`}
              />
            ))}
          </div>
          <p className="text-center text-muted-foreground">{message || stages[currentStage]}</p>
        </div>
      </div>
    </div>
  );
};
