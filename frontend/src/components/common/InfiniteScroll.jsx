import React, { useEffect, useRef, ReactNode } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';



/**
 * Infinite scroll component
 * Automatically loads more content when user scrolls near the bottom
 */
export const InfiniteScroll = ({ 
  children,
  onLoadMore,
  hasMore,
  loading = false,
  threshold = 0.8,
  loader = Loading...
 }) => {
  const loadMoreRef = useRef(null);
  const isIntersecting = useIntersectionObserver(loadMoreRef, {
    threshold,
    rootMargin);

  useEffect(() => {
    if (isIntersecting && hasMore && !loading) {
      onLoadMore();
    }
  }, [isIntersecting, hasMore, loading, onLoadMore]);

  return (
    
      {children}
      {hasMore && (
        
          {loading && loader}
        
      )}
    
  );
};
