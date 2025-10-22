/**
 * Animation Controller for managing character and object animations
 */

import * as THREE from 'three';

export interface AnimationState {
  name: string;
  action: THREE.AnimationAction;
  loop: boolean;
  weight: number;
}

export class AnimationController {
  private mixer: THREE.AnimationMixer;
  private actions: Map<string, THREE.AnimationAction>;
  private currentAction: THREE.AnimationAction | null;
  private previousAction: THREE.AnimationAction | null;

  constructor(model: THREE.Object3D, animations: THREE.AnimationClip[]) {
    this.mixer = new THREE.AnimationMixer(model);
    this.actions = new Map();
    this.currentAction = null;
    this.previousAction = null;

    // Create actions for all animations
    animations.forEach((clip) => {
      const action = this.mixer.clipAction(clip);
      this.actions.set(clip.name, action);
    });
  }

  /**
   * Play an animation
   */
  play(
    name: string,
    options: {
      loop?: boolean;
      fadeIn?: number;
      fadeOut?: number;
      weight?: number;
    } = {}
  ): boolean {
    const action = this.actions.get(name);
    if (!action) {
      console.warn(`Animation "${name}" not found`);
      return false;
    }

    const {
      loop = true,
      fadeIn = 0.2,
      fadeOut = 0.2,
      weight = 1
    } = options;

    // Stop previous action with fade out
    if (this.currentAction && this.currentAction !== action) {
      this.previousAction = this.currentAction;
      this.currentAction.fadeOut(fadeOut);
    }

    // Configure and play new action
    action.reset();
    action.setLoop(
      loop ? THREE.LoopRepeat : THREE.LoopOnce,
      loop ? Infinity : 1
    );
    action.setEffectiveWeight(weight);
    action.fadeIn(fadeIn);
    action.play();

    this.currentAction = action;
    return true;
  }

  /**
   * Stop current animation
   */
  stop(fadeOut: number = 0.2): void {
    if (this.currentAction) {
      this.currentAction.fadeOut(fadeOut);
      this.previousAction = this.currentAction;
      this.currentAction = null;
    }
  }

  /**
   * Pause current animation
   */
  pause(): void {
    if (this.currentAction) {
      this.currentAction.paused = true;
    }
  }

  /**
   * Resume paused animation
   */
  resume(): void {
    if (this.currentAction) {
      this.currentAction.paused = false;
    }
  }

  /**
   * Cross-fade between animations
   */
  crossFade(toName: string, duration: number = 0.3): boolean {
    const toAction = this.actions.get(toName);
    if (!toAction) {
      console.warn(`Animation "${toName}" not found`);
      return false;
    }

    if (this.currentAction && this.currentAction !== toAction) {
      this.currentAction.crossFadeTo(toAction, duration, true);
    }

    toAction.reset();
    toAction.play();
    this.previousAction = this.currentAction;
    this.currentAction = toAction;

    return true;
  }

  /**
   * Set animation speed
   */
  setSpeed(name: string, speed: number): void {
    const action = this.actions.get(name);
    if (action) {
      action.setEffectiveTimeScale(speed);
    }
  }

  /**
   * Get current animation name
   */
  getCurrentAnimation(): string | null {
    if (!this.currentAction) return null;

    for (const [name, action] of this.actions.entries()) {
      if (action === this.currentAction) {
        return name;
      }
    }

    return null;
  }

  /**
   * Check if animation is playing
   */
  isPlaying(name?: string): boolean {
    if (name) {
      const action = this.actions.get(name);
      return action ? action.isRunning() : false;
    }
    return this.currentAction ? this.currentAction.isRunning() : false;
  }

  /**
   * Get all available animation names
   */
  getAnimationNames(): string[] {
    return Array.from(this.actions.keys());
  }

  /**
   * Update mixer (call in animation loop)
   */
  update(deltaTime: number): void {
    this.mixer.update(deltaTime);
  }

  /**
   * Set weight for layered animations
   */
  setWeight(name: string, weight: number): void {
    const action = this.actions.get(name);
    if (action) {
      action.setEffectiveWeight(weight);
    }
  }

  /**
   * Blend multiple animations
   */
  blend(animations: Array<{ name: string; weight: number }>): void {
    animations.forEach(({ name, weight }) => {
      const action = this.actions.get(name);
      if (action) {
        action.setEffectiveWeight(weight);
        if (!action.isRunning()) {
          action.play();
        }
      }
    });
  }

  /**
   * Dispose of resources
   */
  dispose(): void {
    this.mixer.stopAllAction();
    this.actions.clear();
    this.currentAction = null;
    this.previousAction = null;
  }
}
