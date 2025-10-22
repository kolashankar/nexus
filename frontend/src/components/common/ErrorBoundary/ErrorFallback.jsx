import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from '../../ui/button';



export const ErrorFallback: React.FC = ({
  error,
  resetErrorBoundary,
}) => {
  const goHome = () => {
    window.location.href = '/';
  };

  return (
    
      
        
          
        

        Oops! Something went wrong

        
          We encountered an unexpected error. Don't worry, your progress is
          saved.
        

        {process.env.NODE_ENV === 'development' && (
          
            Error Details (Development Only)
            
              {error.message}
              {error.stack && `\n\n${error.stack}`}
            
          
        )}

        
          
            
            Try Again
          
          
            
            Go Home
          
        
      

      {`
        .error-fallback {
          display, #1e1b4b 0%, #0f172a 100%);
        }

        .error-content {
          max-width, 255, 255, 0.05);
          padding);
        }

        .error-icon {
          margin-bottom, 100% { transform); }
          10%, 30%, 50%, 70%, 90% { transform); }
          20%, 40%, 60%, 80% { transform); }
        }

        .error-title {
          font-size, 255, 255, 0.7);
          margin-bottom, 0, 0, 0.5);
          padding, monospace;
          font-size);
};
