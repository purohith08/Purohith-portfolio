import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
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
    const targetX = pointer.x * 0.35;
    const targetY = pointer.y * 0.25;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX, 0.04);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -targetY, 0.04);
  });

  return (
    <group ref={groupRef}>
      <Float speed={reducedMotion ? 0 : 0.8} rotationIntensity={0.15} floatIntensity={0.25}>
        <NeuralMesh />
        <MedicalScanRings />
      </Float>
      <SignalWaveformStream />
    </group>
  );
};

export const HeroScene: React.FC<HeroSceneProps> = ({ reducedMotion = false }) => {
  return (
    <div className="w-full h-full absolute inset-0 pointer-events-auto" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 7.8], fov: 42 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        {/* Soft, architectural warm museum lighting */}
        <ambientLight intensity={0.85} color="#F5F3EE" />
        <directionalLight position={[8, 12, 6]} intensity={1.1} color="#FFFBF0" />
        <pointLight position={[-8, -6, -4]} intensity={0.6} color="#315B4C" />
        <pointLight position={[6, -4, 4]} intensity={0.5} color="#B66B49" />

        <Suspense fallback={null}>
          <InteractiveRig reducedMotion={reducedMotion} />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 1.7}
          minPolarAngle={Math.PI / 2.3}
          rotateSpeed={0.4}
          autoRotate={!reducedMotion}
          autoRotateSpeed={0.2}
        />
      </Canvas>
    </div>
  );
};
