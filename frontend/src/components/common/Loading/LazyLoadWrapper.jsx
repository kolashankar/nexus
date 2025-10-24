import React, { Suspense } from 'react';

const Spinner = () => (
  <div className="flex items-center justify-center p-4">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
  </div>
);

export const LazyLoadWrapper = ({ children, fallback, minLoadTime = 0 }) => {
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
    <div className="flex items-center justify-center p-8">
      <Spinner />
    </div>
  );

  if (!isReady) {
    return fallback || defaultFallback;
  }

  return <Suspense fallback={fallback || defaultFallback}>{children}</Suspense>;
};
