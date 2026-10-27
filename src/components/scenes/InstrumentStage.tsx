import React, { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { NeuralMesh } from './NeuralMesh';
import { MedicalScanRings } from './MedicalScanRings';
import { SignalWaveformStream } from './SignalWaveformStream';
import { scrollSceneController } from './ScrollSceneController';
import type { SceneScrollProgress } from './types';

interface InstrumentStageProps {
  reducedMotion?: boolean;
}

/**
 * Procedural 3D Scientific Instrument Rig synchronized with GSAP ScrollTrigger
 */
const ScientificInstrumentRig: React.FC<{ reducedMotion?: boolean }> = ({ reducedMotion }) => {
  const groupRef = useRef<THREE.Group>(null!);
  const [sceneState, setSceneState] = useState<SceneScrollProgress>(scrollSceneController.state);

  // Subscribe to ScrollSceneController updates
  useEffect(() => {
    const unsubscribe = scrollSceneController.subscribe((updated) => {
      setSceneState({ ...updated });
    });
    return unsubscribe;
  }, []);

  useFrame((state) => {
    // Smooth camera interpolation towards scroll-choreographed target position and lookAt
    const { camera, pointer } = state;

    if (!reducedMotion) {
      // Subtle mouse parallax added to camera
      const targetCamX = sceneState.cameraPos[0] + pointer.x * 0.35;
      const targetCamY = sceneState.cameraPos[1] + pointer.y * 0.25;
      const targetCamZ = sceneState.cameraPos[2];

      camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetCamX, 0.05);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetCamY, 0.05);
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetCamZ, 0.05);

      // Smooth lookAt target
      const targetLook = new THREE.Vector3(...sceneState.cameraLookAt);
      camera.lookAt(targetLook);
    } else {
      camera.position.set(0, 0, 7.8);
      camera.lookAt(0, 0, 0);
    }
  });

  return (
    <group ref={groupRef}>
      <Float
        speed={reducedMotion ? 0 : 0.7}
        rotationIntensity={reducedMotion ? 0 : 0.15}
        floatIntensity={reducedMotion ? 0 : 0.25}
      >
        {/* State A / D / E: Neural Core / Circuit Lattice / Constellation */}
        <NeuralMesh
          opacity={sceneState.coreOpacity}
          latticeProgress={sceneState.latticeProgress}
          constellationSpread={sceneState.constellationSpread}
        />

        {/* State B: Medical Imaging Gantry */}
        <MedicalScanRings
          opacity={sceneState.ringsOpacity}
          stackedPlanes={sceneState.activeState === 'MEDICAL_IMAGING_GANTRY'}
        />
      </Float>

      {/* State C: Biosignal Multi-Channel Oscilloscope Stream */}
      <SignalWaveformStream
        opacity={sceneState.waveformOpacity}
        channelsCount={sceneState.activeState === 'BIOSIGNAL_OSCILLOSCOPE' ? 3 : 1}
      />
    </group>
  );
};

export const InstrumentStage: React.FC<InstrumentStageProps> = ({ reducedMotion = false }) => {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 7.8], fov: 42 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        {/* Crisp surgical lab lighting */}
        <ambientLight intensity={0.65} color="#0A1120" />
        <directionalLight position={[10, 15, 8]} intensity={1.5} color="#FFFFFF" />
        <pointLight position={[-10, -6, -4]} intensity={1.2} color="#00F2FE" />
        <pointLight position={[8, -5, 4]} intensity={0.9} color="#0AE4BA" />

        <Suspense fallback={null}>
          <ScientificInstrumentRig reducedMotion={reducedMotion} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default InstrumentStage;
