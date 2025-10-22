/**
 * Accessibility utilities for Karma Nexus
 */

/**
 * Screen reader announcement helper
 */
export const announceToScreenReader = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;

  document.body.appendChild(announcement);

  // Remove after announcement
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};

/**
 * Focus trap for modals and dialogs
 */
export class FocusTrap {
  private element: HTMLElement;
  private previousFocus: HTMLElement | null;
  private focusableElements: HTMLElement[];

  constructor(element: HTMLElement) {
    this.element = element;
    this.previousFocus = document.activeElement as HTMLElement;
    this.focusableElements = this.getFocusableElements();
  }

  private getFocusableElements(): HTMLElement[] {
    const selectors = [
      'a[href]',
      'button:not([disabled])',
      'textarea:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ];

    return Array.from(
      this.element.querySelectorAll<HTMLElement>(selectors.join(','))
    ).filter((el) => {
      return !el.hasAttribute('disabled') && el.offsetParent !== null;
    });
  }

  activate() {
    this.focusableElements = this.getFocusableElements();

    if (this.focusableElements.length > 0) {
      this.focusableElements[0].focus();
    }

    this.element.addEventListener('keydown', this.handleKeyDown);
  }

  deactivate() {
    this.element.removeEventListener('keydown', this.handleKeyDown);

    if (this.previousFocus) {
      this.previousFocus.focus();
    }
  }

  private handleKeyDown = (event: KeyboardEvent) => {
    if (event.key !== 'Tab') return;

    const firstElement = this.focusableElements[0];
    const lastElement = this.focusableElements[this.focusableElements.length - 1];
    const activeElement = document.activeElement as HTMLElement;

    if (event.shiftKey) {
      // Shift + Tab
      if (activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
    } else {
      // Tab
      if (activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  };
}

/**
 * Keyboard navigation helper
 */
export const createKeyboardNavigation = ({
  onEnter,
  onSpace,
  onEscape,
  onArrowUp,
  onArrowDown,
  onArrowLeft,
  onArrowRight,
}: {
  onEnter?: () => void;
  onSpace?: () => void;
  onEscape?: () => void;
  onArrowUp?: () => void;
  onArrowDown?: () => void;
  onArrowLeft?: () => void;
  onArrowRight?: () => void;
}) => {
  return (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'Enter':
        event.preventDefault();
        onEnter?.();
        break;
      case ' ':
        event.preventDefault();
        onSpace?.();
        break;
      case 'Escape':
        event.preventDefault();
        onEscape?.();
        break;
      case 'ArrowUp':
        event.preventDefault();
        onArrowUp?.();
        break;
      case 'ArrowDown':
        event.preventDefault();
        onArrowDown?.();
        break;
      case 'ArrowLeft':
        event.preventDefault();
        onArrowLeft?.();
        break;
      case 'ArrowRight':
        event.preventDefault();
        onArrowRight?.();
        break;
    }
  };
};

/**
 * ARIA label generators
 */
export const aria = {
  button: (label: string, pressed?: boolean, expanded?: boolean) => ({
    'aria-label': label,
    role: 'button',
    tabIndex: 0,
    ...(pressed !== undefined && { 'aria-pressed': pressed }),
    ...(expanded !== undefined && { 'aria-expanded': expanded }),
  }),

  link: (label: string, current?: boolean) => ({
    'aria-label': label,
    role: 'link',
    ...(current && { 'aria-current': 'page' }),
  }),

  progressBar: (value: number, max: number = 100, label?: string) => ({
    role: 'progressbar',
    'aria-valuenow': value,
    'aria-valuemin': 0,
    'aria-valuemax': max,
    'aria-valuetext': `${Math.round((value / max) * 100)}%`,
    ...(label && { 'aria-label': label }),
  }),

  tab: (label: string, selected: boolean, controls: string) => ({
    role: 'tab',
    'aria-label': label,
    'aria-selected': selected,
    'aria-controls': controls,
    tabIndex: selected ? 0 : -1,
  }),

  tabPanel: (id: string, labelledBy: string, hidden: boolean) => ({
    role: 'tabpanel',
    id,
    'aria-labelledby': labelledBy,
    hidden,
  }),

  dialog: (label: string, describedBy?: string) => ({
    role: 'dialog',
    'aria-label': label,
    'aria-modal': true,
    ...(describedBy && { 'aria-describedby': describedBy }),
  }),

  alert: (type: 'info' | 'warning' | 'error' | 'success') => ({
    role: 'alert',
    'aria-live': type === 'error' ? 'assertive' : 'polite',
    'aria-atomic': true,
  }),

  listbox: (label: string, multiselectable?: boolean) => ({
    role: 'listbox',
    'aria-label': label,
    ...(multiselectable && { 'aria-multiselectable': true }),
  }),

  option: (label: string, selected: boolean, disabled?: boolean) => ({
    role: 'option',
    'aria-label': label,
    'aria-selected': selected,
    ...(disabled && { 'aria-disabled': true }),
  }),
};

/**
 * Skip to content link helper
 */
export const createSkipLink = (targetId: string) => {
  const skipLink = document.createElement('a');
  skipLink.href = `#${targetId}`;
  skipLink.className = 'skip-link';
  skipLink.textContent = 'Skip to main content';

  skipLink.addEventListener('click', (event) => {
    event.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.focus();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });

  return skipLink;
};

/**
 * Check if user prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * High contrast mode detection
 */
export const prefersHighContrast = (): boolean => {
  return window.matchMedia('(prefers-contrast: high)').matches;
};

/**
 * Color blindness helpers
 */
export const colorBlindnessAdjustments = {
  // Ensure text contrast ratio meets WCAG AA standards
  ensureContrast: (foreground: string, background: string): boolean => {
    // This is a simplified check - in production, use a proper contrast ratio calculator
    return true; // Placeholder
  },

  // Add patterns/textures in addition to color
  addPattern: (element: HTMLElement, type: 'stripe' | 'dot' | 'cross') => {
    element.classList.add(`pattern-${type}`);
  },
};

/**
 * Focus management
 */
export const focusManagement = {
  // Save current focus
  saveFocus: (): HTMLElement | null => {
    return document.activeElement as HTMLElement;
  },

  // Restore saved focus
  restoreFocus: (element: HTMLElement | null) => {
    if (element && typeof element.focus === 'function') {
      element.focus();
    }
  },

  // Move focus to first error in form
  focusFirstError: (formElement: HTMLElement) => {
    const firstError = formElement.querySelector(
      '[aria-invalid="true"]'
    ) as HTMLElement;
    if (firstError) {
      firstError.focus();
    }
  },
};

/**
 * Roving tabindex for keyboard navigation in lists
 */
export class RovingTabIndex {
  private items: HTMLElement[];
  private currentIndex: number;

  constructor(items: HTMLElement[], initialIndex: number = 0) {
    this.items = items;
    this.currentIndex = initialIndex;
    this.updateTabIndex();
  }

  private updateTabIndex() {
    this.items.forEach((item, index) => {
      item.tabIndex = index === this.currentIndex ? 0 : -1;
    });
  }

  moveNext() {
    this.currentIndex = (this.currentIndex + 1) % this.items.length;
    this.updateTabIndex();
    this.items[this.currentIndex].focus();
  }

  movePrevious() {
    this.currentIndex =
      (this.currentIndex - 1 + this.items.length) % this.items.length;
    this.updateTabIndex();
    this.items[this.currentIndex].focus();
  }

  moveFirst() {
    this.currentIndex = 0;
    this.updateTabIndex();
    this.items[this.currentIndex].focus();
  }

  moveLast() {
    this.currentIndex = this.items.length - 1;
    this.updateTabIndex();
    this.items[this.currentIndex].focus();
  }
}
