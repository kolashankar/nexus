import React, { Suspense } from 'react';
import { Spinner } from './Spinner';

interface LazyLoadWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  minLoadTime?: number;
}

export const LazyLoadWrapper: React.FC<LazyLoadWrapperProps> = ({
  children,
  fallback,
  minLoadTime = 0,
}) => {
  const [isReady, setIsReady] = React.useState(minLoadTime === 0);

  React.useEffect(() => {
    if (minLoadTime > 0) {
      const timer = setTimeout(() => {
        setIsReady(true);
      }, minLoadTime);

      return () => clearTimeout(timer);
    }
  }, [minLoadTime]);

  const defaultFallback = (
    <div className="lazy-load-placeholder">
      <Spinner size="large" />
    </div>
  );

  if (!isReady) {
    return <>{fallback || defaultFallback}</>;
  }

  return (
    <Suspense fallback={fallback || defaultFallback}>
      {children}
    </Suspense>
  );
};
