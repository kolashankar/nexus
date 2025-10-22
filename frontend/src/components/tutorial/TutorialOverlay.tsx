import React, { useState, useEffect } from 'react';
import { X, ArrowRight, ArrowLeft, CheckCircle, SkipForward } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Progress } from '../ui/progress';

interface TutorialStep {
  step_id: string;
  title: string;
  description: string;
  task: string;
  reward: {
    credits?: number;
    xp?: number;
    items?: string[];
  };
  skippable: boolean;
}

interface TutorialProgress {
  status: string;
  current_step: string | null;
  completed_steps: string[];
  progress_percent: number;
}

interface TutorialOverlayProps {
  onClose: () => void;
}

const TutorialOverlay: React.FC<TutorialOverlayProps> = ({ onClose }) => {
  const [progress, setProgress] = useState<TutorialProgress | null>(null);
  const [currentStep, setCurrentStep] = useState<TutorialStep | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTutorialData();
  }, []);

  const fetchTutorialData = async () => {
    try {
      // Fetch progress
      const progressRes = await fetch('/api/tutorial/progress', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const progressData = await progressRes.json();
      setProgress(progressData);

      // Fetch current step if in progress
      if (progressData.status === 'in_progress') {
        const stepRes = await fetch('/api/tutorial/current', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        const stepData = await stepRes.json();
        setCurrentStep(stepData);
      }
    } catch (error) {
      console.error('Error fetching tutorial data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteStep = async () => {
    if (!currentStep) return;

    try {
      await fetch('/api/tutorial/complete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ step_id: currentStep.step_id })
      });

      // Refresh tutorial data
      await fetchTutorialData();
    } catch (error) {
      console.error('Error completing step:', error);
    }
  };

  const handleSkipStep = async () => {
    if (!currentStep) return;

    try {
      await fetch('/api/tutorial/skip', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ step_id: currentStep.step_id })
      });

      // Refresh tutorial data
      await fetchTutorialData();
    } catch (error) {
      console.error('Error skipping step:', error);
    }
  };

  const handleSkipTutorial = async () => {
    try {
      await fetch('/api/tutorial/skip-all', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      onClose();
    } catch (error) {
      console.error('Error skipping tutorial:', error);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <Card className="p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" />
          <p className="mt-4 text-center">Loading tutorial...</p>
        </Card>
      </div>
    );
  }

  if (!progress || progress.status === 'not_started') {
    return null;
  }

  if (progress.status === 'completed' || progress.status === 'skipped') {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <Card className="max-w-md w-full p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Tutorial Complete!</h2>
          <p className="text-muted-foreground mb-6">
            You've mastered the basics. Your journey in Karma Nexus begins now!
          </p>
          <Button onClick={onClose} className="w-full">
            Start Playing
          </Button>
        </Card>
      </div>
    );
  }

  if (!currentStep) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="max-w-2xl w-full p-6 relative">
        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4"
          onClick={handleSkipTutorial}
        >
          <X className="h-4 w-4" />
        </Button>

        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Tutorial Progress</span>
            <span className="text-sm font-medium">{progress.progress_percent}%</span>
          </div>
          <Progress value={progress.progress_percent} className="h-2" />
        </div>

        {/* Step content */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">{currentStep.title}</h2>
          <p className="text-muted-foreground mb-4">{currentStep.description}</p>

          <div className="bg-secondary/20 p-4 rounded-lg mb-4">
            <h3 className="font-semibold mb-2">Your Task:</h3>
            <p>{currentStep.task}</p>
          </div>

          {/* Rewards */}
          <div className="bg-accent/20 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Rewards:</h3>
            <div className="flex gap-4 flex-wrap">
              {currentStep.reward.credits && (
                <div className="flex items-center gap-2">
                  <span className="text-yellow-500">💰</span>
                  <span>{currentStep.reward.credits} Credits</span>
                </div>
              )}
              {currentStep.reward.xp && (
                <div className="flex items-center gap-2">
                  <span className="text-blue-500">⭐</span>
                  <span>{currentStep.reward.xp} XP</span>
                </div>
              )}
              {currentStep.reward.items && currentStep.reward.items.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-purple-500">🎁</span>
                  <span>{currentStep.reward.items.join(', ')}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          {currentStep.skippable && (
            <Button
              variant="outline"
              onClick={handleSkipStep}
              className="flex-1"
            >
              <SkipForward className="w-4 h-4 mr-2" />
              Skip Step
            </Button>
          )}
          <Button
            onClick={handleCompleteStep}
            className="flex-1"
          >
            Continue
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Skip tutorial link */}
        <button
          onClick={handleSkipTutorial}
          className="w-full text-center text-sm text-muted-foreground hover:text-foreground mt-4"
        >
          Skip entire tutorial
        </button>
      </Card>
    </div>
  );
};

export default TutorialOverlay;
