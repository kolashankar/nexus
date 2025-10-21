import { useRef, useEffect } from 'react';
import { useGameStore } from '../store';

export const use3DScene = () => {
  const { scene, updatePlayerPosition } = useGameStore();
  const sceneRef = useRef();

  const movePlayer = (x, y, z) => {
    updatePlayerPosition({ x, y, z });
  };

  const resetCamera = () => {
    // Reset camera to default position
    if (sceneRef.current) {
      // Camera reset logic here
    }
  };

  return {
    sceneRef,
    scene,
    movePlayer,
    resetCamera,
    playerPosition: scene.playerPosition,
    cameraPosition: scene.cameraPosition,
    nearbyPlayers: scene.nearbyPlayers,
  };
};
