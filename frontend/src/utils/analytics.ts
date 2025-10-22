/**
 * Analytics and tracking utilities
 */

interface AnalyticsEvent {
  category: string;
  action: string;
  label?: string;
  value?: number;
}

class Analytics {
  private enabled: boolean;
  private events: AnalyticsEvent[];

  constructor() {
    this.enabled = process.env.NODE_ENV === 'production';
    this.events = [];
  }

  /**
   * Track a page view
   */
  trackPageView(path: string, title?: string): void {
    if (!this.enabled) {
      console.log('[Analytics] Page view:', path, title);
      return;
    }

    // Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('config', 'GA_MEASUREMENT_ID', {
        page_path: path,
        page_title: title
      });
    }
  }

  /**
   * Track a custom event
   */
  trackEvent(event: AnalyticsEvent): void {
    if (!this.enabled) {
      console.log('[Analytics] Event:', event);
      return;
    }

    this.events.push(event);

    // Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value
      });
    }
  }

  /**
   * Track user actions
   */
  trackUserAction(
    action: string,
    category: string = 'User',
    label?: string,
    value?: number
  ): void {
    this.trackEvent({ category, action, label, value });
  }

  /**
   * Track quest events
   */
  trackQuestEvent(
    action: 'accept' | 'complete' | 'abandon',
    questId: string,
    questType?: string
  ): void {
    this.trackEvent({
      category: 'Quest',
      action,
      label: questType || questId
    });
  }

  /**
   * Track combat events
   */
  trackCombatEvent(
    action: 'start' | 'win' | 'lose',
    opponentId?: string
  ): void {
    this.trackEvent({
      category: 'Combat',
      action,
      label: opponentId
    });
  }

  /**
   * Track guild events
   */
  trackGuildEvent(
    action: 'join' | 'leave' | 'create',
    guildId?: string
  ): void {
    this.trackEvent({
      category: 'Guild',
      action,
      label: guildId
    });
  }

  /**
   * Track marketplace transactions
   */
  trackTransaction(
    action: 'buy' | 'sell',
    itemType: string,
    amount: number
  ): void {
    this.trackEvent({
      category: 'Marketplace',
      action,
      label: itemType,
      value: amount
    });
  }

  /**
   * Track errors
   */
  trackError(
    error: Error,
    category: string = 'Error',
    fatal: boolean = false
  ): void {
    this.trackEvent({
      category,
      action: fatal ? 'Fatal Error' : 'Error',
      label: error.message
    });

    // Send to error tracking service
    if (typeof window !== 'undefined' && (window as any).Sentry) {
      (window as any).Sentry.captureException(error);
    }
  }

  /**
   * Track performance metrics
   */
  trackPerformance(metric: string, value: number): void {
    if (!this.enabled) {
      console.log(`[Analytics] Performance - ${metric}:`, value);
      return;
    }

    this.trackEvent({
      category: 'Performance',
      action: metric,
      value: Math.round(value)
    });
  }

  /**
   * Track user timing
   */
  trackTiming(
    category: string,
    variable: string,
    time: number,
    label?: string
  ): void {
    if (!this.enabled) {
      console.log(`[Analytics] Timing - ${category}.${variable}:`, time);
      return;
    }

    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'timing_complete', {
        name: variable,
        value: time,
        event_category: category,
        event_label: label
      });
    }
  }

  /**
   * Set user properties
   */
  setUserProperties(properties: Record<string, any>): void {
    if (!this.enabled) {
      console.log('[Analytics] User properties:', properties);
      return;
    }

    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('set', 'user_properties', properties);
    }
  }

  /**
   * Get tracked events (for debugging)
   */
  getEvents(): AnalyticsEvent[] {
    return this.events;
  }

  /**
   * Clear tracked events
   */
  clearEvents(): void {
    this.events = [];
  }
}

// Singleton instance
export const analytics = new Analytics();

/**
 * React hook for analytics
 */
export function useAnalytics() {
  return {
    trackPageView: analytics.trackPageView.bind(analytics),
    trackEvent: analytics.trackEvent.bind(analytics),
    trackUserAction: analytics.trackUserAction.bind(analytics),
    trackQuestEvent: analytics.trackQuestEvent.bind(analytics),
    trackCombatEvent: analytics.trackCombatEvent.bind(analytics),
    trackGuildEvent: analytics.trackGuildEvent.bind(analytics),
    trackTransaction: analytics.trackTransaction.bind(analytics),
    trackError: analytics.trackError.bind(analytics),
    trackPerformance: analytics.trackPerformance.bind(analytics)
  };
}
