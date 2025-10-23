import React, { useRef, useState, useEffect, ReactNode } from 'react';

interface VirtualListProps {
  items, index) => ReactNode;
  overscan?;
}

/**
 * Virtual list component for rendering large lists efficiently
 * Only renders items that are currently visible in the viewport
 */
export function VirtualList({
  items,
  itemHeight,
  containerHeight,
  renderItem,
  overscan = 3
}: VirtualListProps) {
  const containerRef = useRef(null);
  const [scrollTop, setScrollTop] = useState(0);

  // Calculate visible range
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const endIndex = Math.min(
    items.length - 1,
    Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
  );

  const visibleItems = items.slice(startIndex, endIndex + 1);
  const totalHeight = items.length * itemHeight;
  const offsetY = startIndex * itemHeight;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      setScrollTop(container.scrollTop);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    
      
        
          {visibleItems.map((item, idx) => (
            
              {renderItem(item, startIndex + idx)}
            
          ))}
        
      
    
  );
}
