/**
 * 3D Scene component
 */
import React, { useEffect } from 'react';
import { use3DScene } from '../../../hooks/use3DScene';
import * as THREE from 'three';

const Scene = ({ className = '' }) => {
  const { containerRef, scene, camera, isReady } = use3DScene({
    antialias,
    alpha,
  });

  useEffect(() => {
    if (!scene || !isReady) return;

    // Add a simple cube
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({
      color,
      metalness,
      roughness,
    });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Animate cube
    const animate = () => {
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
    };

    const interval = setInterval(animate, 16);

    return () => {
      clearInterval(interval);
      scene.remove(cube);
      geometry.dispose();
      material.dispose();
    };
  }, [scene, isReady]);

  return <div ref={containerRef} className={`w-full h-full ${className}`} />;
};

export default Scene;
