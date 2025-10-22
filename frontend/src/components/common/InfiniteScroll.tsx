import React, { useEffect, useRef, ReactNode } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

interface InfiniteScrollProps {
  children: ReactNode;
  onLoadMore: () => void;
  hasMore: boolean;
  loading?: boolean;
  threshold?: number;
  loader?: ReactNode;
}

/**
 * Infinite scroll component
 * Automatically loads more content when user scrolls near the bottom
 */
export const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  children,
  onLoadMore,
  hasMore,
  loading = false,
  threshold = 0.8,
  loader = <div className="text-center py-4">Loading...</div>
}) => {
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const isIntersecting = useIntersectionObserver(loadMoreRef, {
    threshold,
    rootMargin: '100px'
  });

  useEffect(() => {
    if (isIntersecting && hasMore && !loading) {
      onLoadMore();
    }
  }, [isIntersecting, hasMore, loading, onLoadMore]);

  return (
    <div>
      {children}
      {hasMore && (
        <div ref={loadMoreRef} className="load-more-trigger">
          {loading && loader}
        </div>
      )}
    </div>
  );
};
