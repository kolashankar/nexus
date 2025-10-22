/**
 * Client-side caching utilities
 */

interface CacheItem<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

class Cache {
  private cache: Map<string, CacheItem<any>>;
  private defaultTTL: number;

  constructor(defaultTTL: number = 5 * 60 * 1000) { // 5 minutes default
    this.cache = new Map();
    this.defaultTTL = defaultTTL;
  }

  set<T>(key: string, data: T, ttl?: number): void {
    const now = Date.now();
    const expiresAt = now + (ttl || this.defaultTTL);

    this.cache.set(key, {
      data,
      timestamp: now,
      expiresAt
    });
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key);

    if (!item) {
      return null;
    }

    // Check if expired
    if (Date.now() > item.expiresAt) {
      this.cache.delete(key);
      return null;
    }

    return item.data as T;
  }

  has(key: string): boolean {
    const item = this.cache.get(key);
    
    if (!item) {
      return false;
    }

    // Check if expired
    if (Date.now() > item.expiresAt) {
      this.cache.delete(key);
      return false;
    }

    return true;
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  // Clean up expired entries
  cleanup(): void {
    const now = Date.now();
    const keysToDelete: string[] = [];

    this.cache.forEach((item, key) => {
      if (now > item.expiresAt) {
        keysToDelete.push(key);
      }
    });

    keysToDelete.forEach(key => this.cache.delete(key));
  }

  size(): number {
    this.cleanup(); // Clean before counting
    return this.cache.size;
  }
}

// Singleton instance
export const cache = new Cache();

/**
 * Local storage cache with expiration
 */
export class LocalStorageCache {
  private prefix: string;

  constructor(prefix: string = 'app_cache_') {
    this.prefix = prefix;
  }

  set<T>(key: string, data: T, ttl: number = 5 * 60 * 1000): void {
    const item: CacheItem<T> = {
      data,
      timestamp: Date.now(),
      expiresAt: Date.now() + ttl
    };

    try {
      localStorage.setItem(this.prefix + key, JSON.stringify(item));
    } catch (error) {
      console.warn('LocalStorage cache set failed:', error);
    }
  }

  get<T>(key: string): T | null {
    try {
      const itemStr = localStorage.getItem(this.prefix + key);
      
      if (!itemStr) {
        return null;
      }

      const item: CacheItem<T> = JSON.parse(itemStr);

      // Check if expired
      if (Date.now() > item.expiresAt) {
        this.delete(key);
        return null;
      }

      return item.data;
    } catch (error) {
      console.warn('LocalStorage cache get failed:', error);
      return null;
    }
  }

  delete(key: string): void {
    try {
      localStorage.removeItem(this.prefix + key);
    } catch (error) {
      console.warn('LocalStorage cache delete failed:', error);
    }
  }

  clear(): void {
    try {
      const keys: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith(this.prefix)) {
          keys.push(key);
        }
      }
      keys.forEach(key => localStorage.removeItem(key));
    } catch (error) {
      console.warn('LocalStorage cache clear failed:', error);
    }
  }
}

export const localCache = new LocalStorageCache();

/**
 * Session storage cache
 */
export class SessionStorageCache extends LocalStorageCache {
  set<T>(key: string, data: T, ttl: number = 5 * 60 * 1000): void {
    const item: CacheItem<T> = {
      data,
      timestamp: Date.now(),
      expiresAt: Date.now() + ttl
    };

    try {
      sessionStorage.setItem(this.prefix + key, JSON.stringify(item));
    } catch (error) {
      console.warn('SessionStorage cache set failed:', error);
    }
  }

  get<T>(key: string): T | null {
    try {
      const itemStr = sessionStorage.getItem(this.prefix + key);
      
      if (!itemStr) {
        return null;
      }

      const item: CacheItem<T> = JSON.parse(itemStr);

      if (Date.now() > item.expiresAt) {
        this.delete(key);
        return null;
      }

      return item.data;
    } catch (error) {
      console.warn('SessionStorage cache get failed:', error);
      return null;
    }
  }

  delete(key: string): void {
    try {
      sessionStorage.removeItem(this.prefix + key);
    } catch (error) {
      console.warn('SessionStorage cache delete failed:', error);
    }
  }
}

export const sessionCache = new SessionStorageCache();
