/**
 * Mobile-specific helper utilities for Karma Nexus
 */

/**
 * Detect if device is mobile
 */
export const isMobile = (): boolean => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

/**
 * Detect if device is iOS
 */
export const isIOS = (): boolean => {
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
};

/**
 * Detect if device is Android
 */
export const isAndroid = (): boolean => {
  return /Android/.test(navigator.userAgent);
};

/**
 * Check if device supports touch
 */
export const hasTouch = (): boolean => {
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    (navigator as any).msMaxTouchPoints > 0
  );
};

/**
 * Get viewport dimensions
 */
export const getViewport = () => {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
};

/**
 * Check if device is in landscape mode
 */
export const isLandscape = (): boolean => {
  return window.innerWidth > window.innerHeight;
};

/**
 * Lock screen orientation (if supported)
 */
export const lockOrientation = async (
  orientation: 'portrait' | 'landscape'
): Promise<boolean> => {
  if ('orientation' in screen && 'lock' in (screen as any).orientation) {
    try {
      await (screen as any).orientation.lock(orientation);
      return true;
    } catch (error) {
      console.warn('Screen orientation lock not supported:', error);
      return false;
    }
  }
  return false;
};

/**
 * Unlock screen orientation
 */
export const unlockOrientation = () => {
  if ('orientation' in screen && 'unlock' in (screen as any).orientation) {
    (screen as any).orientation.unlock();
  }
};

/**
 * Vibrate device (if supported)
 */
export const vibrate = (pattern: number | number[]): boolean => {
  if ('vibrate' in navigator) {
    return navigator.vibrate(pattern);
  }
  return false;
};

/**
 * Haptic feedback patterns
 */
export const haptic = {
  light: () => vibrate(10),
  medium: () => vibrate(20),
  heavy: () => vibrate(30),
  success: () => vibrate([10, 50, 10]),
  error: () => vibrate([30, 50, 30, 50, 30]),
  warning: () => vibrate([20, 100, 20]),
};

/**
 * Prevent body scroll (useful for modals)
 */
export const preventBodyScroll = (prevent: boolean) => {
  if (prevent) {
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
  } else {
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width = '';
  }
};

/**
 * Safe area insets for notched devices
 */
export const getSafeAreaInsets = () => {
  const getInset = (side: string) => {
    const value = getComputedStyle(document.documentElement).getPropertyValue(
      `--safe-area-inset-${side}`
    );
    return value ? parseInt(value, 10) : 0;
  };

  return {
    top: getInset('top'),
    right: getInset('right'),
    bottom: getInset('bottom'),
    left: getInset('left'),
  };
};

/**
 * Touch gesture detector
 */
export class TouchGestureDetector {
  private startX: number = 0;
  private startY: number = 0;
  private startTime: number = 0;
  private element: HTMLElement;

  constructor(element: HTMLElement) {
    this.element = element;
    this.setupListeners();
  }

  private setupListeners() {
    this.element.addEventListener('touchstart', this.handleTouchStart, {
      passive: true,
    });
    this.element.addEventListener('touchend', this.handleTouchEnd, {
      passive: true,
    });
  }

  private handleTouchStart = (event: TouchEvent) => {
    this.startX = event.touches[0].clientX;
    this.startY = event.touches[0].clientY;
    this.startTime = Date.now();
  };

  private handleTouchEnd = (event: TouchEvent) => {
    const endX = event.changedTouches[0].clientX;
    const endY = event.changedTouches[0].clientY;
    const endTime = Date.now();

    const deltaX = endX - this.startX;
    const deltaY = endY - this.startY;
    const duration = endTime - this.startTime;

    const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

    // Tap
    if (distance < 10 && duration < 300) {
      this.onTap?.();
    }

    // Swipe
    if (distance > 50 && duration < 300) {
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe
        if (deltaX > 0) {
          this.onSwipeRight?.();
        } else {
          this.onSwipeLeft?.();
        }
      } else {
        // Vertical swipe
        if (deltaY > 0) {
          this.onSwipeDown?.();
        } else {
          this.onSwipeUp?.();
        }
      }
    }

    // Long press
    if (distance < 10 && duration > 500) {
      this.onLongPress?.();
    }
  };

  public onTap?: () => void;
  public onSwipeLeft?: () => void;
  public onSwipeRight?: () => void;
  public onSwipeUp?: () => void;
  public onSwipeDown?: () => void;
  public onLongPress?: () => void;

  public destroy() {
    this.element.removeEventListener('touchstart', this.handleTouchStart);
    this.element.removeEventListener('touchend', this.handleTouchEnd);
  }
}

/**
 * Pull to refresh handler
 */
export class PullToRefresh {
  private startY: number = 0;
  private pulling: boolean = false;
  private element: HTMLElement;
  private threshold: number = 80;

  constructor(element: HTMLElement, threshold: number = 80) {
    this.element = element;
    this.threshold = threshold;
    this.setupListeners();
  }

  private setupListeners() {
    this.element.addEventListener('touchstart', this.handleTouchStart, {
      passive: true,
    });
    this.element.addEventListener('touchmove', this.handleTouchMove);
    this.element.addEventListener('touchend', this.handleTouchEnd);
  }

  private handleTouchStart = (event: TouchEvent) => {
    if (this.element.scrollTop === 0) {
      this.startY = event.touches[0].clientY;
      this.pulling = true;
    }
  };

  private handleTouchMove = (event: TouchEvent) => {
    if (!this.pulling) return;

    const currentY = event.touches[0].clientY;
    const distance = currentY - this.startY;

    if (distance > 0 && this.element.scrollTop === 0) {
      event.preventDefault();
      this.onPull?.(Math.min(distance, this.threshold));

      if (distance >= this.threshold) {
        this.onThresholdReached?.();
      }
    }
  };

  private handleTouchEnd = () => {
    if (!this.pulling) return;

    this.pulling = false;
    this.onRelease?.();
  };

  public onPull?: (distance: number) => void;
  public onThresholdReached?: () => void;
  public onRelease?: () => void;

  public destroy() {
    this.element.removeEventListener('touchstart', this.handleTouchStart);
    this.element.removeEventListener('touchmove', this.handleTouchMove);
    this.element.removeEventListener('touchend', this.handleTouchEnd);
  }
}

/**
 * Network information (if available)
 */
export const getNetworkInfo = () => {
  const connection =
    (navigator as any).connection ||
    (navigator as any).mozConnection ||
    (navigator as any).webkitConnection;

  if (connection) {
    return {
      type: connection.effectiveType, // '4g', '3g', '2g', 'slow-2g'
      downlink: connection.downlink, // Mbps
      rtt: connection.rtt, // Round-trip time in ms
      saveData: connection.saveData, // User preference
    };
  }

  return null;
};

/**
 * Check if connection is slow
 */
export const isSlowConnection = (): boolean => {
  const info = getNetworkInfo();
  if (!info) return false;

  return info.type === 'slow-2g' || info.type === '2g' || info.saveData;
};

/**
 * Add to home screen prompt
 */
export const promptInstallPWA = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const deferredPrompt = (window as any).deferredPrompt;

    if (deferredPrompt) {
      deferredPrompt.prompt();

      deferredPrompt.userChoice.then((choiceResult: any) => {
        resolve(choiceResult.outcome === 'accepted');
        (window as any).deferredPrompt = null;
      });
    } else {
      resolve(false);
    }
  });
};
