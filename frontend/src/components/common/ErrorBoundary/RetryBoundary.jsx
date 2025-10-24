import React, { Component } from 'react';
import { ErrorFallback } from './ErrorFallback';

export class RetryBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError,
      error,
      retryCount,
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError,
      error,
      retryCount,
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by RetryBoundary, error, errorInfo);

    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleRetry = () => {
    const { maxRetries = 3 } = this.props;
    const { retryCount } = this.state;

    if (retryCount < maxRetries) {
      this.setState({
        hasError,
        error,
        retryCount,
      });
    } else {
      console.error('Max retries reached');
    }
  };

  render() {
    const { hasError, error } = this.state;
    const { children, fallback } = this.props;

    if (hasError) {
      if (fallback) {
        return fallback;
      }

      return <ErrorFallback error={error} resetErrorBoundary={this.handleRetry} />;
    }

    return children;
  }
}
