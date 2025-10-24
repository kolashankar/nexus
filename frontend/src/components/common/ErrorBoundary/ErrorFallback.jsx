import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from '../../ui/button';

export const ErrorFallback = ({ error, resetErrorBoundary }) => {
  const goHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="error-fallback flex items-center justify-center min-h-screen p-4">
      <div className="error-content max-w-2xl w-full bg-white dark
        <div className="flex flex-col items-center text-center">
          <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
        </div>

        <h1 className="text-3xl font-bold mb-4 text-center">Oops! Something went wrong</h1>

        <p className="text-muted-foreground mb-6 text-center">
          We encountered an unexpected error. Don't worry, your progress is saved.
        </p>

        {process.env.NODE_ENV === 'development' && (
          <div className="mb-6 p-4 bg-gray-100 dark
            <h3 className="font-semibold mb-2">Error Details (Development Only)</h3>
            <pre className="text-xs overflow-auto">
              {error.message}
              {error.stack && `\n\n${error.stack}`}
            </pre>
          </div>
        )}

        <div className="flex gap-4 justify-center">
          <Button onClick={resetErrorBoundary}>
            <RefreshCw className="mr-2" />
            Try Again
          </Button>
          <Button onClick={goHome} variant="outline">
            <Home className="mr-2" />
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
};
