/**
 * React hook for loading and managing 3D models
 */

import { useState, useEffect } from 'react';
import { assetLoader, LoadedAsset } from '../services/3d/AssetLoader';
import { AnimationController } from '../services/3d/AnimationController';

export function use3DModel(modelUrl: string | null) {
  const [asset, setAsset] = useState<LoadedAsset | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [progress, setProgress] = useState(0);
  const [animationController, setAnimationController] = useState<AnimationController | null>(null);

  useEffect(() => {
    if (!modelUrl) {
      setAsset(null);
      setAnimationController(null);
      return;
    }

    let cancelled = false;

    const loadModel = async () => {
      try {
        setLoading(true);
        setError(null);

        const loadedAsset = await assetLoader.loadGLTF(modelUrl, (prog) => {
          setProgress(prog.percentage);
        });

        if (cancelled) return;

        setAsset(loadedAsset);

        // Create animation controller if animations exist
        if (loadedAsset.animations && loadedAsset.animations.length > 0) {
          const controller = new AnimationController(
            loadedAsset.model,
            loadedAsset.animations
          );
          setAnimationController(controller);
        }

        setLoading(false);
      } catch (err) {
        if (cancelled) return;
        setError(err as Error);
        setLoading(false);
      }
    };

    loadModel();

    return () => {
      cancelled = true;
    };
  }, [modelUrl]);

  return {
    asset,
    loading,
    error,
    progress,
    animationController
  };
}
