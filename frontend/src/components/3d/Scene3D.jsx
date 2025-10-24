import React, { useRef, useEffect } from 'react';
import { use3DScene } from '../../hooks/use3DScene';

/**
 * Base 3D Scene component
 * Provides a canvas and Three.js scene setup
 */
export const Scene3D = ({ children, onSceneReady, className = '' }) => {
  const canvasRef = useRef(null);
  const { sceneManager, isReady, startAnimationLoop } = use3DScene(canvasRef);

  useEffect(() => {
    if (isReady && sceneManager && onSceneReady) {
      onSceneReady(sceneManager);
    }
  }, [isReady, sceneManager, onSceneReady]);

  useEffect(() => {
    if (!sceneManager) return;

    startAnimationLoop((deltaTime) => {
      // Default animation loop
      // Children components can override this
    });
  }, [sceneManager, startAnimationLoop]);

  return { children };
};
