import { useEffect, useState, RefObject } from 'react';

/**
 * Hook to observe element intersection with viewport
 */
export function useIntersectionObserver(
  elementRef,
  options?: IntersectionObserverInit
){
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        root,
        rootMargin,
        threshold,
        ...options
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
      observer.disconnect();
    };
  }, [elementRef, options]);

  return isIntersecting;
}
