import React, { useRef, useEffect } from 'react';
import { use3DScene } from '../../hooks/use3DScene';

interface Scene3DProps {
  children?: React.ReactNode;
  onSceneReady?: (sceneManager: any) => void;
  className?: string;
}

/**
 * Base 3D Scene component
 * Provides a canvas and Three.js scene setup
 */
export const Scene3D: React.FC<Scene3DProps> = ({
  children,
  onSceneReady,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
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

  return (
    <div className={`relative w-full h-full ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: 'block' }}
      />
      {children}
    </div>
  );
};
