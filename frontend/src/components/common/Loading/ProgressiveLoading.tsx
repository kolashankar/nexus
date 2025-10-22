import React, { useEffect, useState } from 'react';

interface ProgressiveLoadingProps {
  stages?: string[];
  currentStage?: number;
  progress?: number;
  message?: string;
}

const defaultStages = [
  'Initializing...',
  'Loading assets...',
  'Connecting to server...',
  'Almost ready...',
];

export const ProgressiveLoading: React.FC<ProgressiveLoadingProps> = ({
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
        if (Math.abs(diff) < 1) return progress;
        return prev + diff * 0.1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [progress]);

  return (
    <div className="progressive-loading">
      <div className="loading-content">
        {/* Progress Circle */}
        <div className="progress-circle">
          <svg width="120" height="120" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="8"
            />
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="8"
              strokeDasharray={`${2 * Math.PI * 54}`}
              strokeDashoffset={`${2 * Math.PI * 54 * (1 - displayProgress / 100)}`}
              strokeLinecap="round"
              transform="rotate(-90 60 60)"
              style={{ transition: 'stroke-dashoffset 0.3s ease' }}
            />
          </svg>
          <div className="progress-text">
            {Math.round(displayProgress)}%
          </div>
        </div>

        {/* Stage Info */}
        <div className="stage-info">
          <div className="stage-dots">
            {stages.map((_, index) => (
              <div
                key={index}
                className={`stage-dot ${
                  index === currentStage
                    ? 'active'
                    : index < currentStage
                    ? 'completed'
                    : ''
                }`}
              />
            ))}
          </div>
          <div className="stage-message">
            {message || stages[currentStage]}
          </div>
        </div>
      </div>

      <style>{`
        .progressive-loading {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 400px;
          padding: 2rem;
        }

        .loading-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
        }

        .progress-circle {
          position: relative;
        }

        .progress-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 1.5rem;
          font-weight: 600;
          color: #3b82f6;
        }

        .stage-info {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .stage-dots {
          display: flex;
          gap: 0.5rem;
        }

        .stage-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
        }

        .stage-dot.active {
          background-color: #3b82f6;
          transform: scale(1.3);
          box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
        }

        .stage-dot.completed {
          background-color: #10b981;
        }

        .stage-message {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.7);
          text-align: center;
          min-height: 1.5rem;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};
