import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { NeuralMesh } from './NeuralMesh';
import { MedicalScanRings } from './MedicalScanRings';
import { SignalWaveformStream } from './SignalWaveformStream';

interface HeroSceneProps {
  reducedMotion?: boolean;
}

const InteractiveRig: React.FC<{ reducedMotion?: boolean }> = ({ reducedMotion }) => {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (reducedMotion) return;
    const { pointer } = state;
    const targetX = pointer.x * 0.45;
    const targetY = pointer.y * 0.35;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX, 0.05);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -targetY, 0.05);
  });

  return (
    <group ref={groupRef}>
      <Float speed={reducedMotion ? 0 : 0.8} rotationIntensity={0.2} floatIntensity={0.3}>
        <NeuralMesh />
        <MedicalScanRings />
      </Float>
      <SignalWaveformStream />
    </group>
  );
};

export const HeroScene: React.FC<HeroSceneProps> = ({ reducedMotion = false }) => {
  return (
    <div className="w-full h-full absolute inset-0 pointer-events-none" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 7.8], fov: 42 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        {/* Crisp surgical & deep lab lighting */}
        <ambientLight intensity={0.65} color="#0A1120" />
        <directionalLight position={[10, 15, 8]} intensity={1.5} color="#FFFFFF" />
        <pointLight position={[-10, -6, -4]} intensity={1.2} color="#00F2FE" />
        <pointLight position={[8, -5, 4]} intensity={0.9} color="#0AE4BA" />

        <Suspense fallback={null}>
          <InteractiveRig reducedMotion={reducedMotion} />
        </Suspense>
      </Canvas>
    </div>
  );
};
