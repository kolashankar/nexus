/**
 * Performance optimization utilities
 */

/**
 * Debounce function - delays execution until after a specified time has passed
 * since the last invocation
 */
export function debounce any>(
  func,
  wait)=> void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args) {
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
export function throttle any>(
  func,
  limit)=> void {
  let inThrottle: boolean = false;

  return function executedFunction(...args) {
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
export function memoize any>(
  func){
  const cache = new Map>();

  return ((...args)=> {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key)!;
    }

    const result = func(...args);
    cache.set(key, result);
    return result;
  });
}

/**
 * Lazy load component
 */
export function lazyLoadComponent>(
  importFunc) => Promise
) {
  return React.lazy(importFunc);
}

/**
 * Request idle callback wrapper with fallback
 */
export function requestIdleCallback(
  callback,
  options?: IdleRequestOptions
){
  if ('requestIdleCallback' in window) {
    return window.requestIdleCallback(callback, options);
  }
  // Fallback for browsers that don't support requestIdleCallback
  return setTimeout(() => {
    const start = Date.now();
    callback({
      didTimeout,
      timeRemaining) => Math.max(0, 50 - (Date.now() - start))
    });
  }, 1);
}

/**
 * Cancel idle callback wrapper
 */
export function cancelIdleCallback(id){
  if ('cancelIdleCallback' in window) {
    window.cancelIdleCallback(id);
  } else {
    clearTimeout(id);
  }
}

/**
 * Batch multiple state updates
 */
export function batchUpdates(
  updates){
  // In React 18, batching is automatic, but this can be useful for older versions
  updates.forEach(update => update());
}

/**
 * Measure component render time
 */
export function measureRenderTime(
  componentName,
  callback) => void
){
  const start = performance.now();
  callback();
  const end = performance.now();
  console.log(`${componentName} render time).toFixed(2)}ms`);
}

/**
 * Create intersection observer for lazy loading
 */
export function createIntersectionObserver(
  callback,
  options?: IntersectionObserverInit
){
  return new IntersectionObserver(callback, {
    root,
    rootMargin,
    threshold,
    ...options
  });
}

/**
 * Prefetch data
 */
export async function prefetchData(
  url,
  options?: RequestInit
){
  try {
    const response = await fetch(url, {
      ...options,
      priority);
    // Cache the response
    await response.json();
  } catch (error) {
    console.warn('Prefetch failed, error);
  }
}

import React from 'react';
