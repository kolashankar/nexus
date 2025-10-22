import React, { useState, useEffect } from 'react';
import { X, ArrowRight, ArrowLeft, CheckCircle, SkipForward } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Progress } from '../ui/progress';

;
  skippable;
}





const TutorialOverlay: React.FC = ({ onClose }) => {
  const [progress, setProgress] = useState(null);
  const [currentStep, setCurrentStep] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTutorialData();
  }, []);

  const fetchTutorialData = async () => {
    try {
      // Fetch progress
      const progressRes = await fetch('/api/tutorial/progress', {
        headers)}`
        }
      });
      const progressData = await progressRes.json();
      setProgress(progressData);

      // Fetch current step if in progress
      if (progressData.status === 'in_progress') {
        const stepRes = await fetch('/api/tutorial/current', {
          headers)}`
          }
        });
        const stepData = await stepRes.json();
        setCurrentStep(stepData);
      }
    } catch (error) {
      console.error('Error fetching tutorial data, error);
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteStep = async () => {
    if (!currentStep) return;

    try {
      await fetch('/api/tutorial/complete', {
        method,
        headers,
          Authorization)}`
        },
        body)
      });

      // Refresh tutorial data
      await fetchTutorialData();
    } catch (error) {
      console.error('Error completing step, error);
    }
  };

  const handleSkipStep = async () => {
    if (!currentStep) return;

    try {
      await fetch('/api/tutorial/skip', {
        method,
        headers,
          Authorization)}`
        },
        body)
      });

      // Refresh tutorial data
      await fetchTutorialData();
    } catch (error) {
      console.error('Error skipping step, error);
    }
  };

  const handleSkipTutorial = async () => {
    try {
      await fetch('/api/tutorial/skip-all', {
        method,
        headers)}`
        }
      });
      onClose();
    } catch (error) {
      console.error('Error skipping tutorial, error);
    }
  };

  if (loading) {
    return (
      
        
          
          Loading tutorial...
        
      
    );
  }

  if (!progress || progress.status === 'not_started') {
    return null;
  }

  if (progress.status === 'completed' || progress.status === 'skipped') {
    return (
      
        
          
          Tutorial Complete!
          
            You've mastered the basics. Your journey in Karma Nexus begins now!
          
          
            Start Playing
          
        
      
    );
  }

  if (!currentStep) {
    return null;
  }

  return (
    
      
        {/* Close button */}
        
          
        

        {/* Progress bar */}
        
          
            Tutorial Progress
            {progress.progress_percent}%
          
          
        

        {/* Step content */}
        
          {currentStep.title}
          {currentStep.description}

          
            Your Task)}
              {currentStep.reward.xp && (
                
                  ⭐
                  {currentStep.reward.xp} XP
                
              )}
              {currentStep.reward.items && currentStep.reward.items.length > 0 && (
                
                  🎁
                  {currentStep.reward.items.join(', ')}
                
              )}
            
          
        

        {/* Actions */}
        
          {currentStep.skippable && (
            
              
              Skip Step
            
          )}
          
            Continue
            
          
        

        {/* Skip tutorial link */}
        
          Skip entire tutorial
        
      
    
  );
};

export default TutorialOverlay;
