import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface SpatialFloorGridProps {
  reducedMotion?: boolean;
}

/**
 * Procedural 3D perspective cyber-medical grid floor with horizon fade
 */
export const SpatialFloorGrid: React.FC<SpatialFloorGridProps> = ({ reducedMotion = false }) => {
  const gridRef = useRef<THREE.GridHelper>(null!);

  useFrame((state) => {
    if (reducedMotion || !gridRef.current) return;
    const time = state.clock.getElapsedTime();
    // Continuous subtle forward movement to simulate travel
    gridRef.current.position.z = (time * 0.4) % 2;
  });

  return (
    <group position={[0, -4.5, -5]}>
      {/* 3D Infinite Grid Helper in Option 2 Palette: #2A9D8F Highlight & #264653 Slate */}
      <primitive
        ref={gridRef}
        object={new THREE.GridHelper(48, 48, '#2A9D8F', '#264653')}
        position={[0, 0, 0]}
      />
      {/* Soft gradient fog plane to blend grid smoothly into deep space */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, -6]}>
        <planeGeometry args={[50, 50]} />
        <meshBasicMaterial
          color="#0B1317"
          transparent
          opacity={0.65}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};
