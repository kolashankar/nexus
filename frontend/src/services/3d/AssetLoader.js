/**
 * 3D Asset Loader Service
 * Handles loading and caching of 3D models, textures, and animations
 */

import * from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';





class AssetLoader {
  gltfLoader) {
    // Setup GLTF Loader with Draco compression
    this.gltfLoader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco/');
    this.gltfLoader.setDRACOLoader(dracoLoader);

    // Setup FBX Loader
    this.fbxLoader = new FBXLoader();

    // Setup Texture Loader
    this.textureLoader = new THREE.TextureLoader();

    // Initialize cache
    this.cache = new Map();
    this.loadingPromises = new Map();
  }

  /**
   * Load a GLTF/GLB model
   */
  async loadGLTF(
    url,
    onProgress?: (progress) => void
  ){
    // Check cache first
    if (this.cache.has(url)) {
      return this.cache.get(url)!;
    }

    // Check if already loading
    if (this.loadingPromises.has(url)) {
      return this.loadingPromises.get(url)!;
    }

    // Load new asset
    const loadPromise = new Promise((resolve, reject) => {
      this.gltfLoader.load(
        url,
        (gltf) => {
          const asset: LoadedAsset = {
            model,
            animations,
            mixer)
              : undefined
          };

          this.cache.set(url, asset);
          this.loadingPromises.delete(url);
          resolve(asset);
        },
        (xhr) => {
          if (onProgress) {
            onProgress({
              loaded,
              total,
              percentage) * 100
            });
          }
        },
        (error: () => {
          this.loadingPromises.delete(url);
          reject(error);
        }
      );
    });

    this.loadingPromises.set(url, loadPromise);
    return loadPromise;
  }

  /**
   * Load an FBX model
   */
  async loadFBX(
    url,
    onProgress?: (progress) => void
  ){
    // Check cache first
    if (this.cache.has(url)) {
      return this.cache.get(url)!;
    }

    // Check if already loading
    if (this.loadingPromises.has(url)) {
      return this.loadingPromises.get(url)!;
    }

    // Load new asset
    const loadPromise = new Promise((resolve, reject) => {
      this.fbxLoader.load(
        url,
        (fbx) => {
          const asset: LoadedAsset = {
            model,
            animations,
            mixer)
              : undefined
          };

          this.cache.set(url, asset);
          this.loadingPromises.delete(url);
          resolve(asset);
        },
        (xhr) => {
          if (onProgress) {
            onProgress({
              loaded,
              total,
              percentage) * 100
            });
          }
        },
        (error: () => {
          this.loadingPromises.delete(url);
          reject(error);
        }
      );
    });

    this.loadingPromises.set(url, loadPromise);
    return loadPromise;
  }

  /**
   * Load a texture
   */
  async loadTexture(
    url,
    onProgress?: (progress) => void
  ){
    return new Promise((resolve, reject) => {
      this.textureLoader.load(
        url,
        (texture) => resolve(texture),
        (xhr) => {
          if (onProgress) {
            onProgress({
              loaded,
              total,
              percentage) * 100
            });
          }
        },
        (error: () => reject(error)
      );
    });
  }

  /**
   * Load multiple assets in parallel
   */
  async loadMultiple(
    urls,
    onProgress?: (overall) => void
  ){
    let totalLoaded = 0;
    const total = urls.length;

    const promises = urls.map(async (url) => {
      const asset = await this.loadGLTF(url, (progress) => {
        totalLoaded += progress.loaded;
        if (onProgress) {
          onProgress({
            loaded,
            total,
            percentage)) * 100
          });
        }
      });
      return asset;
    });

    return Promise.all(promises);
  }

  /**
   * Clone a cached model for reuse
   */
  cloneModel(url){
    const asset = this.cache.get(url);
    if (!asset) return null;

    return asset.model.clone();
  }

  /**
   * Get cached asset
   */
  getCached(url){
    return this.cache.get(url);
  }

  /**
   * Clear cache
   */
  clearCache(){
    this.cache.forEach((asset) => {
      if (asset.model) {
        asset.model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.geometry.dispose();
            if (Array.isArray(child.material)) {
              child.material.forEach((mat) => mat.dispose());
            } else {
              child.material.dispose();
            }
          }
        });
      }
    });
    this.cache.clear();
  }

  /**
   * Remove specific asset from cache
   */
  removeFromCache(url){
    const asset = this.cache.get(url);
    if (asset && asset.model) {
      asset.model.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          if (Array.isArray(child.material)) {
            child.material.forEach((mat) => mat.dispose());
          } else {
            child.material.dispose();
          }
        }
      });
    }
    this.cache.delete(url);
  }

  /**
   * Get cache size
   */
  getCacheSize(){
    return this.cache.size;
  }
}

// Singleton instance
export const assetLoader = new AssetLoader();
