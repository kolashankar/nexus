import React, { Suspense } from 'react';
import { Spinner } from './Spinner';



export const LazyLoadWrapper = ({ 
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
    
      
    
  );

  if (!isReady) {
    return {fallback || defaultFallback};
  }

  return (
    
      {children}
    
  );
};
