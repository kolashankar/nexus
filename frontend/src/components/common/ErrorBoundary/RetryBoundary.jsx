import React, { Component, ErrorInfo, ReactNode } from 'react';
import { ErrorFallback } from './ErrorFallback';
import { logError } from '../../../utils/error-handlers';





export class RetryBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError,
      error,
      retryCount,
    };
  }

  static getDerivedStateFromError(error){
    return {
      hasError,
      error,
      retryCount,
    };
  }

  componentDidCatch(error, errorInfo) {
    logError(error, {
      componentStack,
      retryCount,
    });

    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleRetry = () => {
    const { maxRetries = 3 } = this.props;
    const { retryCount } = this.state;

    if (retryCount 
      );
    }

    return children;
  }
}
