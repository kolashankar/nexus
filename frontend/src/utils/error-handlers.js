/**
 * Error handling utilities for Karma Nexus
 */

export class GameError extends Error {
  constructor(message, code, statusCode, data) {
    super(message);
    this.name = 'GameError';
    this.code = code;
    this.statusCode = statusCode;
    this.data = data;
  }
}

export class NetworkError extends GameError {
  constructor(message = 'Network connection failed', data) {
    super(message, 'NETWORK_ERROR', 0, data);
    this.name = 'NetworkError';
  }
}

export class AuthenticationError extends GameError {
  constructor(message = 'Authentication failed', data) {
    super(message, 'AUTH_ERROR', 401, data);
    this.name = 'AuthenticationError';
  }
}

export class ValidationError extends GameError {
  constructor(message = 'Validation failed', data) {
    super(message, 'VALIDATION_ERROR', 400, data);
    this.name = 'ValidationError';
  }
}

export class NotFoundError extends GameError {
  constructor(message = 'Resource not found', data) {
    super(message, 'NOT_FOUND', 404, data);
    this.name = 'NotFoundError';
  }
}

export class ServerError extends GameError {
  constructor(message = 'Server error occurred', data) {
    super(message, 'SERVER_ERROR', 500, data);
    this.name = 'ServerError';
  }
}

/**
 * Handle API errors and transform them into appropriate error types
 */
export const handleApiError = (error) => {
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
export const formatErrorMessage = (error)=> {
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
export const logError = (error, context?  => {
  console.error('[Karma Nexus Error]', {
    name,
    message,
    stack,
    context,
    timestamp).toISOString(),
  });

  // TODO, Sentry)
  // if (process.env.NODE_ENV === 'production') {
  //   Sentry.captureException(error, { contexts);
  // }
};

/**
 * Retry helper for failed operations
 */
export const retryOperation = async (
  operation) => Promise,
  maxRetries= 3,
  delayMs= 1000
)=> {
  let lastError;

  for (let attempt = 1; attempt  setTimeout(resolve, delayMs * attempt));
      }
    }
  }

  throw lastError!;
};

/**
 * Safe async wrapper that catches errors
 */
export const safeAsync = async (
  operation) => Promise,
  fallback? 
)=> {
  try {
    return await operation();
  } catch (error) {
    logError(error);
    return fallback;
  }
};

/**
 * Error recovery strategies
 */
export const errorRecovery = {
  // Retry with exponential backoff
  retryExponential) => Promise,
    maxRetries= 3
  )=> {
    return retryOperation(operation, maxRetries, 1000);
  },

  // Fallback to cached data
  useCached)=> {
    try {
      const cached = localStorage.getItem(cacheKey);
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  },

  // Graceful degradation
  gracefulFallback) => T, fallback) => T)=> {
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
    logError(new Error(`Unhandled promise rejection), {
      promise,
    });
  });

  // Handle global errors
  window.addEventListener('error', (event) => {
    logError(event.error || new Error(event.message), {
      filename,
      lineno,
      colno,
    });
  });
};
