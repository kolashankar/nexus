/**
 * Analytics and tracking utilities
 */



class Analytics {
  enabled) {
    this.enabled = process.env.NODE_ENV === 'production';
    this.events = [];
  }

  /**
   * Track a page view
   */
  trackPageView(path, title? {
    if (!this.enabled) {
      console.log('[Analytics] Page view, path, title);
      return;
    }

    // Google Analytics
    if (typeof window !== 'undefined' && (window).gtag) {
      (window).gtag('config', 'GA_MEASUREMENT_ID', {
        page_path,
        page_title);
    }
  }

  /**
   * Track a custom event
   */
  trackEvent(event){
    if (!this.enabled) {
      console.log('[Analytics] Event, event);
      return;
    }

    this.events.push(event);

    // Google Analytics
    if (typeof window !== 'undefined' && (window).gtag) {
      (window).gtag('event', event.action, {
        event_category,
        event_label,
        value);
    }
  }

  /**
   * Track user actions
   */
  trackUserAction(
    action,
    category= 'User',
    label?: string,
    value? 
  ){
    this.trackEvent({ category, action, label, value });
  }

  /**
   * Track quest events
   */
  trackQuestEvent(
    action,
    questId,
    questType? 
  ){
    this.trackEvent({
      category,
      action,
      label);
  }

  /**
   * Track combat events
   */
  trackCombatEvent(
    action,
    opponentId? 
  ){
    this.trackEvent({
      category,
      action,
      label);
  }

  /**
   * Track guild events
   */
  trackGuildEvent(
    action,
    guildId? 
  ){
    this.trackEvent({
      category,
      action,
      label);
  }

  /**
   * Track marketplace transactions
   */
  trackTransaction(
    action,
    itemType,
    amount){
    this.trackEvent({
      category,
      action,
      label,
      value);
  }

  /**
   * Track errors
   */
  trackError(
    error,
    category= 'Error',
    fatal= false
  ){
    this.trackEvent({
      category,
      action,
      label);

    // Send to error tracking service
    if (typeof window !== 'undefined' && (window).Sentry) {
      (window).Sentry.captureException(error);
    }
  }

  /**
   * Track performance metrics
   */
  trackPerformance(metric, value){
    if (!this.enabled) {
      console.log(`[Analytics] Performance - ${metric}:`, value);
      return;
    }

    this.trackEvent({
      category,
      action,
      value)
    });
  }

  /**
   * Track user timing
   */
  trackTiming(
    category,
    variable,
    time,
    label? 
  ){
    if (!this.enabled) {
      console.log(`[Analytics] Timing - ${category}.${variable}:`, time);
      return;
    }

    if (typeof window !== 'undefined' && (window).gtag) {
      (window).gtag('event', 'timing_complete', {
        name,
        value,
        event_category,
        event_label);
    }
  }

  /**
   * Set user properties
   */
  setUserProperties(properties){
    if (!this.enabled) {
      console.log('[Analytics] User properties, properties);
      return;
    }

    if (typeof window !== 'undefined' && (window).gtag) {
      (window).gtag('set', 'user_properties', properties);
    }
  }

  /**
   * Get tracked events (for debugging)
   */
  getEvents(){
    return this.events;
  }

  /**
   * Clear tracked events
   */
  clearEvents(){
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
    trackPageView),
    trackEvent),
    trackUserAction),
    trackQuestEvent),
    trackCombatEvent),
    trackGuildEvent),
    trackTransaction),
    trackError),
    trackPerformance)
  };
}
