/**
 * Performance optimization utilities
 */

/**
 * Debounce function - delays execution until after a specified time has passed
 * since the last invocation
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function - ensures function is called at most once per specified time
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false;

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Memoize function results
 */
export function memoize<T extends (...args: any[]) => any>(
  func: T
): T {
  const cache = new Map<string, ReturnType<T>>();

  return ((...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key)!;
    }

    const result = func(...args);
    cache.set(key, result);
    return result;
  }) as T;
}

/**
 * Lazy load component
 */
export function lazyLoadComponent<T extends React.ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>
) {
  return React.lazy(importFunc);
}

/**
 * Request idle callback wrapper with fallback
 */
export function requestIdleCallback(
  callback: IdleRequestCallback,
  options?: IdleRequestOptions
): number {
  if ('requestIdleCallback' in window) {
    return window.requestIdleCallback(callback, options);
  }
  // Fallback for browsers that don't support requestIdleCallback
  return setTimeout(() => {
    const start = Date.now();
    callback({
      didTimeout: false,
      timeRemaining: () => Math.max(0, 50 - (Date.now() - start))
    });
  }, 1) as unknown as number;
}

/**
 * Cancel idle callback wrapper
 */
export function cancelIdleCallback(id: number): void {
  if ('cancelIdleCallback' in window) {
    window.cancelIdleCallback(id);
  } else {
    clearTimeout(id);
  }
}

/**
 * Batch multiple state updates
 */
export function batchUpdates<T>(
  updates: Array<() => void>
): void {
  // In React 18, batching is automatic, but this can be useful for older versions
  updates.forEach(update => update());
}

/**
 * Measure component render time
 */
export function measureRenderTime(
  componentName: string,
  callback: () => void
): void {
  const start = performance.now();
  callback();
  const end = performance.now();
  console.log(`${componentName} render time: ${(end - start).toFixed(2)}ms`);
}

/**
 * Create intersection observer for lazy loading
 */
export function createIntersectionObserver(
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
): IntersectionObserver {
  return new IntersectionObserver(callback, {
    root: null,
    rootMargin: '50px',
    threshold: 0.1,
    ...options
  });
}

/**
 * Prefetch data
 */
export async function prefetchData(
  url: string,
  options?: RequestInit
): Promise<void> {
  try {
    const response = await fetch(url, {
      ...options,
      priority: 'low' as any // Hint to browser for lower priority
    });
    // Cache the response
    await response.json();
  } catch (error) {
    console.warn('Prefetch failed:', error);
  }
}

import React from 'react';
