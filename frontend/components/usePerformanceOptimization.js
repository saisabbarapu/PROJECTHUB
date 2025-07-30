import { useEffect, useRef, useCallback, useState } from 'react';

// Debounce hook for performance optimization
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Throttle hook for performance optimization
export const useThrottle = (callback, delay) => {
  const lastCall = useRef(0);
  const lastCallTimer = useRef(null);

  return useCallback((...args) => {
    const now = Date.now();
    
    if (now - lastCall.current >= delay) {
      callback(...args);
      lastCall.current = now;
    } else {
      clearTimeout(lastCallTimer.current);
      lastCallTimer.current = setTimeout(() => {
        callback(...args);
        lastCall.current = Date.now();
      }, delay - (now - lastCall.current));
    }
  }, [callback, delay]);
};

// Intersection Observer hook for lazy loading and animations
export const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        setHasIntersected(true);
      } else {
        setIsIntersecting(false);
      }
    }, {
      threshold: options.threshold || 0.1,
      rootMargin: options.rootMargin || '0px',
      ...options
    });

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [options]);

  return [elementRef, isIntersecting, hasIntersected];
};

// Performance monitoring hook
export const usePerformanceMonitor = (componentName) => {
  const renderCount = useRef(0);
  const lastRenderTime = useRef(performance.now());

  useEffect(() => {
    renderCount.current += 1;
    const currentTime = performance.now();
    const timeSinceLastRender = currentTime - lastRenderTime.current;
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`${componentName} rendered ${renderCount.current} times. Time since last render: ${timeSinceLastRender.toFixed(2)}ms`);
    }
    
    lastRenderTime.current = currentTime;
  });

  return renderCount.current;
};

// Memory optimization hook for large lists
export const useVirtualization = (items, itemHeight, containerHeight, overscan = 5) => {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef(null);

  const visibleRange = useMemo(() => {
    const start = Math.floor(scrollTop / itemHeight);
    const end = Math.min(
      start + Math.ceil(containerHeight / itemHeight) + overscan,
      items.length
    );
    return { start: Math.max(0, start - overscan), end };
  }, [scrollTop, itemHeight, containerHeight, overscan, items.length]);

  const handleScroll = useCallback((e) => {
    setScrollTop(e.target.scrollTop);
  }, []);

  const visibleItems = useMemo(() => {
    return items.slice(visibleRange.start, visibleRange.end).map((item, index) => ({
      ...item,
      index: visibleRange.start + index,
      style: {
        position: 'absolute',
        top: (visibleRange.start + index) * itemHeight,
        height: itemHeight,
        width: '100%'
      }
    }));
  }, [items, visibleRange, itemHeight]);

  const totalHeight = items.length * itemHeight;

  return {
    containerRef,
    handleScroll,
    visibleItems,
    totalHeight,
    visibleRange
  };
};

// Image optimization hook
export const useImageOptimization = (src, options = {}) => {
  const [imageState, setImageState] = useState({
    src: null,
    loading: true,
    error: false,
    loaded: false
  });

  const {
    placeholder = '/placeholder-image.jpg',
    lazy = true,
    onLoad,
    onError
  } = options;

  useEffect(() => {
    if (!src) {
      setImageState({
        src: placeholder,
        loading: false,
        error: false,
        loaded: false
      });
      return;
    }

    setImageState(prev => ({ ...prev, loading: true, error: false }));

    const img = new Image();
    
    img.onload = () => {
      setImageState({
        src: img.src,
        loading: false,
        error: false,
        loaded: true
      });
      onLoad?.(img);
    };

    img.onerror = () => {
      setImageState({
        src: placeholder,
        loading: false,
        error: true,
        loaded: false
      });
      onError?.(new Error(`Failed to load image: ${src}`));
    };

    img.src = src;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, placeholder, onLoad, onError]);

  return imageState;
};

// Batch state updates hook
export const useBatchUpdates = () => {
  const batchRef = useRef([]);
  const timeoutRef = useRef(null);

  const batchUpdate = useCallback((updater) => {
    batchRef.current.push(updater);
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      const updates = [...batchRef.current];
      batchRef.current = [];
      
      // Apply all updates in a single batch
      updates.forEach(update => update());
    }, 16); // ~60fps
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return batchUpdate;
};

// Main performance optimization hook
export const usePerformanceOptimization = (options = {}) => {
  const {
    debounceDelay = 300,
    throttleDelay = 100,
    intersectionThreshold = 0.1,
    enableMonitoring = process.env.NODE_ENV === 'development'
  } = options;

  const [elementRef, isIntersecting, hasIntersected] = useIntersectionObserver({
    threshold: intersectionThreshold
  });

  const renderCount = enableMonitoring ? usePerformanceMonitor('Component') : 0;

  return {
    elementRef,
    isIntersecting,
    hasIntersected,
    renderCount,
    debounceDelay,
    throttleDelay
  };
}; 