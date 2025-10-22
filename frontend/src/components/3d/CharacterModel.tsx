import React, { useEffect, useState } from 'react';
import { Model3D } from './Model3D';
import { MODEL_PATHS } from '../../services/3d/ModelPaths';

interface CharacterModelProps {
  gender: 'male' | 'female';
  bodyType?: 'base' | 'athletic' | 'heavy';
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
  animation?: string;
  sceneManager?: any;
  onLoad?: (model: any) => void;
}

/**
 * Character Model component
 * Specialized component for player characters
 */
export const CharacterModel: React.FC<CharacterModelProps> = ({
  gender,
  bodyType = 'base',
  position,
  rotation,
  scale = [1, 1, 1],
  animation = 'idle',
  sceneManager,
  onLoad
}) => {
  const [modelUrl, setModelUrl] = useState<string>('');

  useEffect(() => {
    // Get character model path
    const path = MODEL_PATHS.characters[gender][bodyType];
    setModelUrl(path);
  }, [gender, bodyType]);

  if (!modelUrl) return null;

  return (
    <Model3D
      modelUrl={modelUrl}
      position={position}
      rotation={rotation}
      scale={scale}
      initialAnimation={animation}
      autoPlay={true}
      sceneManager={sceneManager}
      onLoad={onLoad}
    />
  );
};
