/**
 * Texture Manager for loading and managing textures
 */

import * as THREE from 'three';

export interface TextureOptions {
  wrapS?: THREE.Wrapping;
  wrapT?: THREE.Wrapping;
  repeat?: [number, number];
  encoding?: THREE.TextureEncoding;
  anisotropy?: number;
}

class TextureManager {
  private loader: THREE.TextureLoader;
  private cache: Map<string, THREE.Texture>;
  private loadingPromises: Map<string, Promise<THREE.Texture>>;

  constructor() {
    this.loader = new THREE.TextureLoader();
    this.cache = new Map();
    this.loadingPromises = new Map();
  }

  /**
   * Load a single texture
   */
  async load(
    url: string,
    options: TextureOptions = {}
  ): Promise<THREE.Texture> {
    // Check cache
    if (this.cache.has(url)) {
      return this.cache.get(url)!;
    }

    // Check if already loading
    if (this.loadingPromises.has(url)) {
      return this.loadingPromises.get(url)!;
    }

    // Load new texture
    const loadPromise = new Promise<THREE.Texture>((resolve, reject) => {
      this.loader.load(
        url,
        (texture) => {
          this.applyOptions(texture, options);
          this.cache.set(url, texture);
          this.loadingPromises.delete(url);
          resolve(texture);
        },
        undefined,
        (error) => {
          this.loadingPromises.delete(url);
          reject(error);
        }
      );
    });

    this.loadingPromises.set(url, loadPromise);
    return loadPromise;
  }

  /**
   * Load multiple textures
   */
  async loadMultiple(
    urls: string[],
    options: TextureOptions = {}
  ): Promise<THREE.Texture[]> {
    const promises = urls.map((url) => this.load(url, options));
    return Promise.all(promises);
  }

  /**
   * Apply texture options
   */
  private applyOptions(texture: THREE.Texture, options: TextureOptions): void {
    if (options.wrapS !== undefined) {
      texture.wrapS = options.wrapS;
    }

    if (options.wrapT !== undefined) {
      texture.wrapT = options.wrapT;
    }

    if (options.repeat) {
      texture.repeat.set(options.repeat[0], options.repeat[1]);
    }

    if (options.encoding !== undefined) {
      texture.encoding = options.encoding;
    }

    if (options.anisotropy !== undefined) {
      texture.anisotropy = options.anisotropy;
    }

    texture.needsUpdate = true;
  }

  /**
   * Create a material with texture
   */
  async createMaterial(
    textureUrl: string,
    materialOptions: THREE.MeshStandardMaterialParameters = {}
  ): Promise<THREE.MeshStandardMaterial> {
    const texture = await this.load(textureUrl);
    return new THREE.MeshStandardMaterial({
      map: texture,
      ...materialOptions
    });
  }

  /**
   * Create PBR material with multiple textures
   */
  async createPBRMaterial(textures: {
    diffuse?: string;
    normal?: string;
    roughness?: string;
    metalness?: string;
    ao?: string;
    emissive?: string;
  }): Promise<THREE.MeshStandardMaterial> {
    const material = new THREE.MeshStandardMaterial();

    if (textures.diffuse) {
      material.map = await this.load(textures.diffuse);
    }

    if (textures.normal) {
      material.normalMap = await this.load(textures.normal);
    }

    if (textures.roughness) {
      material.roughnessMap = await this.load(textures.roughness);
    }

    if (textures.metalness) {
      material.metalnessMap = await this.load(textures.metalness);
    }

    if (textures.ao) {
      material.aoMap = await this.load(textures.ao);
    }

    if (textures.emissive) {
      material.emissiveMap = await this.load(textures.emissive);
      material.emissive.set(0xffffff);
    }

    return material;
  }

  /**
   * Get cached texture
   */
  getCached(url: string): THREE.Texture | undefined {
    return this.cache.get(url);
  }

  /**
   * Remove texture from cache
   */
  remove(url: string): void {
    const texture = this.cache.get(url);
    if (texture) {
      texture.dispose();
      this.cache.delete(url);
    }
  }

  /**
   * Clear all cached textures
   */
  clear(): void {
    this.cache.forEach((texture) => texture.dispose());
    this.cache.clear();
  }

  /**
   * Get cache size
   */
  getCacheSize(): number {
    return this.cache.size;
  }
}

// Singleton instance
export const textureManager = new TextureManager();
