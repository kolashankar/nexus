import React, { useEffect, useRef } from 'react';
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
  loader = <div>Loading...</div>,
}) => {
  const loadMoreRef = useRef(null);
  const isIntersecting = useIntersectionObserver(loadMoreRef, {
    threshold,
    rootMargin,
  });

  useEffect(() => {
    if (isIntersecting && hasMore && !loading) {
      onLoadMore();
    }
  }, [isIntersecting, hasMore, loading, onLoadMore]);

  return (
    <div>
      {children}
      {hasMore && <div ref={loadMoreRef}>{loading && loader}</div>}
    </div>
  );
};
