import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from '../../ui/button';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  const goHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="error-fallback">
      <div className="error-content">
        <div className="error-icon">
          <AlertTriangle size={64} className="text-red-500" />
        </div>

        <h1 className="error-title">Oops! Something went wrong</h1>

        <p className="error-message">
          We encountered an unexpected error. Don't worry, your progress is
          saved.
        </p>

        {process.env.NODE_ENV === 'development' && (
          <details className="error-details">
            <summary>Error Details (Development Only)</summary>
            <pre className="error-stack">
              {error.message}
              {error.stack && `\n\n${error.stack}`}
            </pre>
          </details>
        )}

        <div className="error-actions">
          <Button onClick={resetErrorBoundary} variant="default">
            <RefreshCw size={16} />
            Try Again
          </Button>
          <Button onClick={goHome} variant="outline">
            <Home size={16} />
            Go Home
          </Button>
        </div>
      </div>

      <style>{`
        .error-fallback {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: 2rem;
          background: linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%);
        }

        .error-content {
          max-width: 600px;
          text-align: center;
          background: rgba(255, 255, 255, 0.05);
          padding: 3rem;
          border-radius: 12px;
          backdrop-filter: blur(10px);
        }

        .error-icon {
          margin-bottom: 2rem;
          animation: shake 0.5s ease-in-out;
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }

        .error-title {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: #fff;
        }

        .error-message {
          font-size: 1.125rem;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 2rem;
          line-height: 1.6;
        }

        .error-details {
          margin: 2rem 0;
          text-align: left;
        }

        .error-details summary {
          cursor: pointer;
          font-weight: 600;
          color: #3b82f6;
          margin-bottom: 1rem;
        }

        .error-stack {
          background: rgba(0, 0, 0, 0.5);
          padding: 1rem;
          border-radius: 4px;
          overflow-x: auto;
          font-family: 'Courier New', monospace;
          font-size: 0.875rem;
          color: #ef4444;
          white-space: pre-wrap;
          word-wrap: break-word;
        }

        .error-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
        }

        .error-actions button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
      `}</style>
    </div>
  );
};
