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
    // Gentle mouse parallax interpolation
    const { pointer } = state;
    const targetX = pointer.x * 0.45;
    const targetY = pointer.y * 0.35;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX, 0.05);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -targetY, 0.05);
  });

  return (
    <group ref={groupRef}>
      <Float speed={reducedMotion ? 0 : 1.2} rotationIntensity={0.2} floatIntensity={0.4}>
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
        camera={{ position: [0, 0, 7.5], fov: 45 }}
        dpr={[1, 1.75]} // Cap DPR to 1.75 for reliable high-efficiency 60fps rendering
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} color="#ffffff" />
        <pointLight position={[-10, -10, -5]} intensity={1.5} color="#0df2c9" />
        <pointLight position={[5, -5, 5]} intensity={1.0} color="#38bdf8" />

        <Suspense fallback={null}>
          <InteractiveRig reducedMotion={reducedMotion} />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 1.6}
          minPolarAngle={Math.PI / 2.4}
          rotateSpeed={0.5}
          autoRotate={!reducedMotion}
          autoRotateSpeed={0.3}
        />
      </Canvas>
    </div>
  );
};
