/**
 * Client-side caching utilities
 */

interface CacheItem {
  data;
  timestamp;
  expiresAt;
}

class Cache {
  cache;
  defaultTTL;

  constructor(defaultTTL= 5 * 60 * 1000) { // 5 minutes default
    this.cache = new Map();
    this.defaultTTL = defaultTTL;
  }

  set(key, data, ttl? {
    const now = Date.now();
    const expiresAt = now + (ttl || this.defaultTTL);

    this.cache.set(key, {
      data,
      timestamp,
      expiresAt
    });
  }

  get(key){
    const item = this.cache.get(key);

    if (!item) {
      return null;
    }

    // Check if expired
    if (Date.now() > item.expiresAt) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  has(key){
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

  delete(key){
    this.cache.delete(key);
  }

  clear(){
    this.cache.clear();
  }

  // Clean up expired entries
  cleanup(){
    const now = Date.now();
    const keysToDelete: string[] = [];

    this.cache.forEach((item, key) => {
      if (now > item.expiresAt) {
        keysToDelete.push(key);
      }
    });

    keysToDelete.forEach(key => this.cache.delete(key));
  }

  size(){
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
  protected prefix;

  constructor(prefix= 'app_cache_') {
    this.prefix = prefix;
  }

  set(key, data, ttl= 5 * 60 * 1000){
    const item {
      data,
      timestamp),
      expiresAt) + ttl
    };

    try {
      localStorage.setItem(this.prefix + key, JSON.stringify(item));
    } catch (error) {
      console.warn('LocalStorage cache set failed', error);
    }
  }

  get(key){
    try {
      const itemStr = localStorage.getItem(this.prefix + key);
      
      if (!itemStr) {
        return null;
      }

      const item JSON.parse(itemStr);

      // Check if expired
      if (Date.now() > item.expiresAt) {
        this.delete(key);
        return null;
      }

      return item.data;
    } catch (error) {
      console.warn('LocalStorage cache get failed', error);
      return null;
    }
  }

  delete(key){
    try {
      localStorage.removeItem(this.prefix + key);
    } catch (error) {
      console.warn('LocalStorage cache delete failed', error);
    }
  }

  clear(){
    try {
      const keys: string[] = [];
      for (let i = 0; i  localStorage.removeItem(key));
    } catch (error) {
      console.warn('LocalStorage cache clear failed', error);
    }
  }
}

export const localCache = new LocalStorageCache();

/**
 * Session storage cache
 */
export class SessionStorageCache extends LocalStorageCache {
  set(key, data, ttl= 5 * 60 * 1000){
    const item {
      data,
      timestamp),
      expiresAt) + ttl
    };

    try {
      sessionStorage.setItem(this.prefix + key, JSON.stringify(item));
    } catch (error) {
      console.warn('SessionStorage cache set failed', error);
    }
  }

  get(key){
    try {
      const itemStr = sessionStorage.getItem(this.prefix + key);
      
      if (!itemStr) {
        return null;
      }

      const item JSON.parse(itemStr);

      if (Date.now() > item.expiresAt) {
        this.delete(key);
        return null;
      }

      return item.data;
    } catch (error) {
      console.warn('SessionStorage cache get failed', error);
      return null;
    }
  }

  delete(key){
    try {
      sessionStorage.removeItem(this.prefix + key);
    } catch (error) {
      console.warn('SessionStorage cache delete failed', error);
    }
  }
}

export const sessionCache = new SessionStorageCache();
