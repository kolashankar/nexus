/**
 * Error handling utilities for Karma Nexus
 */

export class GameError extends Error {
  public code: string;
  public statusCode?: number;
  public data?: any;

  constructor(message: string, code: string, statusCode?: number, data?: any) {
    super(message);
    this.name = 'GameError';
    this.code = code;
    this.statusCode = statusCode;
    this.data = data;
  }
}

export class NetworkError extends GameError {
  constructor(message: string = 'Network connection failed', data?: any) {
    super(message, 'NETWORK_ERROR', 0, data);
    this.name = 'NetworkError';
  }
}

export class AuthenticationError extends GameError {
  constructor(message: string = 'Authentication failed', data?: any) {
    super(message, 'AUTH_ERROR', 401, data);
    this.name = 'AuthenticationError';
  }
}

export class ValidationError extends GameError {
  constructor(message: string = 'Validation failed', data?: any) {
    super(message, 'VALIDATION_ERROR', 400, data);
    this.name = 'ValidationError';
  }
}

export class NotFoundError extends GameError {
  constructor(message: string = 'Resource not found', data?: any) {
    super(message, 'NOT_FOUND', 404, data);
    this.name = 'NotFoundError';
  }
}

export class ServerError extends GameError {
  constructor(message: string = 'Server error occurred', data?: any) {
    super(message, 'SERVER_ERROR', 500, data);
    this.name = 'ServerError';
  }
}

/**
 * Handle API errors and transform them into appropriate error types
 */
export const handleApiError = (error: any): GameError => {
  // Network errors
  if (!error.response) {
    return new NetworkError('Unable to connect to server. Please check your connection.');
  }

  const { status, data } = error.response;

  // Authentication errors
  if (status === 401) {
    return new AuthenticationError(data?.detail || 'Authentication required');
  }

  // Validation errors
  if (status === 400) {
    return new ValidationError(data?.detail || 'Invalid request data', data);
  }

  // Not found errors
  if (status === 404) {
    return new NotFoundError(data?.detail || 'Resource not found');
  }

  // Server errors
  if (status >= 500) {
    return new ServerError(data?.detail || 'An unexpected server error occurred');
  }

  // Generic error
  return new GameError(
    data?.detail || 'An error occurred',
    'UNKNOWN_ERROR',
    status,
    data
  );
};

/**
 * Format error message for display to user
 */
export const formatErrorMessage = (error: Error | GameError): string => {
  if (error instanceof GameError) {
    return error.message;
  }

  // Development mode - show full error
  if (process.env.NODE_ENV === 'development') {
    return error.message;
  }

  // Production - generic message
  return 'An unexpected error occurred. Please try again.';
};

/**
 * Log error to console (and potentially to monitoring service)
 */
export const logError = (error: Error, context?: Record<string, any>) => {
  console.error('[Karma Nexus Error]', {
    name: error.name,
    message: error.message,
    stack: error.stack,
    context,
    timestamp: new Date().toISOString(),
  });

  // TODO: Send to error monitoring service (e.g., Sentry)
  // if (process.env.NODE_ENV === 'production') {
  //   Sentry.captureException(error, { contexts: { custom: context } });
  // }
};

/**
 * Retry helper for failed operations
 */
export const retryOperation = async <T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delayMs: number = 1000
): Promise<T> => {
  let lastError: Error;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error as Error;
      logError(lastError, { attempt, maxRetries });

      if (attempt < maxRetries) {
        await new Promise((resolve) => setTimeout(resolve, delayMs * attempt));
      }
    }
  }

  throw lastError!;
};

/**
 * Safe async wrapper that catches errors
 */
export const safeAsync = async <T>(
  operation: () => Promise<T>,
  fallback?: T
): Promise<T | undefined> => {
  try {
    return await operation();
  } catch (error) {
    logError(error as Error);
    return fallback;
  }
};

/**
 * Error recovery strategies
 */
export const errorRecovery = {
  // Retry with exponential backoff
  retryExponential: async <T>(
    operation: () => Promise<T>,
    maxRetries: number = 3
  ): Promise<T> => {
    return retryOperation(operation, maxRetries, 1000);
  },

  // Fallback to cached data
  useCached: <T>(cacheKey: string): T | null => {
    try {
      const cached = localStorage.getItem(cacheKey);
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  },

  // Graceful degradation
  gracefulFallback: <T>(primary: () => T, fallback: () => T): T => {
    try {
      return primary();
    } catch {
      return fallback();
    }
  },
};

/**
 * Global error handler setup
 */
export const setupGlobalErrorHandler = () => {
  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    logError(new Error(`Unhandled promise rejection: ${event.reason}`), {
      promise: event.promise,
    });
  });

  // Handle global errors
  window.addEventListener('error', (event) => {
    logError(event.error || new Error(event.message), {
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
    });
  });
};
