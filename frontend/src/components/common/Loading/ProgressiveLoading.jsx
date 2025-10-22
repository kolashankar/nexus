import React, { useEffect, useState } from 'react';



const defaultStages = [
  'Initializing...',
  'Loading assets...',
  'Connecting to server...',
  'Almost ready...',
];

export const ProgressiveLoading: React.FC = ({
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
        if (Math.abs(diff)  clearInterval(interval);
  }, [progress]);

  return (
    
      
        {/* Progress Circle */}
        
          
            
            
          
          
            {Math.round(displayProgress)}%
          
        

        {/* Stage Info */}
        
          
            {stages.map((_, index) => (
              
            ))}
          
          
            {message || stages[currentStage]}
          
        
      

      {`
        .progressive-loading {
          display, -50%);
          font-size, 255, 255, 0.2);
          transition);
          box-shadow, 130, 246, 0.5);
        }

        .stage-dot.completed {
          background-color, 255, 255, 0.7);
          text-align);
};
