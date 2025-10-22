/**
 * Scene Manager for managing Three.js scenes
 */

import * as THREE from 'three';

export interface SceneConfig {
  background?: THREE.Color | THREE.Texture | null;
  fog?: {
    color: THREE.Color;
    near: number;
    far: number;
  };
  ambient?: {
    color: THREE.Color;
    intensity: number;
  };
  directional?: {
    color: THREE.Color;
    intensity: number;
    position: THREE.Vector3;
  };
}

export class SceneManager {
  public scene: THREE.Scene;
  public camera: THREE.PerspectiveCamera;
  public renderer: THREE.WebGLRenderer;
  private lights: Map<string, THREE.Light>;
  private objects: Map<string, THREE.Object3D>;

  constructor(canvas: HTMLCanvasElement, config?: SceneConfig) {
    // Initialize scene
    this.scene = new THREE.Scene();

    // Initialize camera
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 2, 5);

    // Initialize renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1;

    // Initialize collections
    this.lights = new Map();
    this.objects = new Map();

    // Apply configuration
    if (config) {
      this.applyConfig(config);
    } else {
      this.setupDefaultLighting();
    }

    // Setup resize handler
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  /**
   * Apply scene configuration
   */
  private applyConfig(config: SceneConfig): void {
    if (config.background) {
      this.scene.background = config.background;
    }

    if (config.fog) {
      this.scene.fog = new THREE.Fog(
        config.fog.color,
        config.fog.near,
        config.fog.far
      );
    }

    if (config.ambient) {
      this.addAmbientLight('ambient', config.ambient.color, config.ambient.intensity);
    }

    if (config.directional) {
      this.addDirectionalLight(
        'directional',
        config.directional.color,
        config.directional.intensity,
        config.directional.position
      );
    }
  }

  /**
   * Setup default lighting
   */
  private setupDefaultLighting(): void {
    // Ambient light
    this.addAmbientLight('ambient', new THREE.Color(0xffffff), 0.4);

    // Directional light (sun)
    this.addDirectionalLight(
      'sun',
      new THREE.Color(0xffffff),
      0.8,
      new THREE.Vector3(5, 10, 5)
    );
  }

  /**
   * Add ambient light
   */
  addAmbientLight(
    name: string,
    color: THREE.Color,
    intensity: number
  ): THREE.AmbientLight {
    const light = new THREE.AmbientLight(color, intensity);
    this.lights.set(name, light);
    this.scene.add(light);
    return light;
  }

  /**
   * Add directional light
   */
  addDirectionalLight(
    name: string,
    color: THREE.Color,
    intensity: number,
    position: THREE.Vector3
  ): THREE.DirectionalLight {
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.copy(position);
    light.castShadow = true;
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;
    light.shadow.camera.near = 0.5;
    light.shadow.camera.far = 50;

    this.lights.set(name, light);
    this.scene.add(light);
    return light;
  }

  /**
   * Add point light
   */
  addPointLight(
    name: string,
    color: THREE.Color,
    intensity: number,
    position: THREE.Vector3,
    distance: number = 0
  ): THREE.PointLight {
    const light = new THREE.PointLight(color, intensity, distance);
    light.position.copy(position);
    light.castShadow = true;

    this.lights.set(name, light);
    this.scene.add(light);
    return light;
  }

  /**
   * Add object to scene
   */
  addObject(name: string, object: THREE.Object3D): void {
    this.objects.set(name, object);
    this.scene.add(object);
  }

  /**
   * Remove object from scene
   */
  removeObject(name: string): void {
    const object = this.objects.get(name);
    if (object) {
      this.scene.remove(object);
      this.objects.delete(name);
    }
  }

  /**
   * Get object by name
   */
  getObject(name: string): THREE.Object3D | undefined {
    return this.objects.get(name);
  }

  /**
   * Get light by name
   */
  getLight(name: string): THREE.Light | undefined {
    return this.lights.get(name);
  }

  /**
   * Handle window resize
   */
  private handleResize(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  /**
   * Render scene
   */
  render(): void {
    this.renderer.render(this.scene, this.camera);
  }

  /**
   * Set camera position
   */
  setCameraPosition(x: number, y: number, z: number): void {
    this.camera.position.set(x, y, z);
  }

  /**
   * Look at target
   */
  lookAt(target: THREE.Vector3): void {
    this.camera.lookAt(target);
  }

  /**
   * Dispose of resources
   */
  dispose(): void {
    window.removeEventListener('resize', this.handleResize.bind(this));
    
    // Dispose renderer
    this.renderer.dispose();

    // Clear scene
    this.scene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.geometry.dispose();
        if (Array.isArray(object.material)) {
          object.material.forEach((mat) => mat.dispose());
        } else {
          object.material.dispose();
        }
      }
    });

    this.lights.clear();
    this.objects.clear();
  }
}
