import React, { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { NeuralMesh } from './NeuralMesh';
import { MedicalScanRings } from './MedicalScanRings';
import { SignalWaveformStream } from './SignalWaveformStream';
import { SpatialDustField } from './SpatialDustField';
import { SpatialFloorGrid } from './SpatialFloorGrid';
import { scrollSceneController } from './ScrollSceneController';
import type { SceneScrollProgress } from './types';

interface InstrumentStageProps {
  reducedMotion?: boolean;
}

/**
 * Vadim Carazan-inspired 3D Spatial Fly-Through Instrument Stage.
 * Continuous 3D world with fluid camera banking, depth particle warp,
 * perspective floor grid, and kinetic floating project prisms.
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
    const { camera, pointer } = state;

    if (!reducedMotion) {
      // Dynamic camera parallax with fluid damping
      const targetCamX = sceneState.cameraPos[0] + pointer.x * 0.55;
      const targetCamY = sceneState.cameraPos[1] + pointer.y * 0.4;
      const targetCamZ = sceneState.cameraPos[2];

      camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetCamX, 0.045);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetCamY, 0.045);
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetCamZ, 0.045);

      // Smooth lookAt target
      const targetLook = new THREE.Vector3(...sceneState.cameraLookAt);
      camera.lookAt(targetLook);

      // Vadim Carazan signature camera roll banking on horizontal mouse movement
      const targetRoll = -pointer.x * 0.06;
      camera.rotation.z = THREE.MathUtils.lerp(camera.rotation.z, targetRoll, 0.05);
    } else {
      camera.position.set(0, 0, 7.8);
      camera.lookAt(0, 0, 0);
      camera.rotation.z = 0;
    }
  });

  return (
    <group ref={groupRef}>
      {/* 3D Perspective Floor Grid */}
      <SpatialFloorGrid reducedMotion={reducedMotion} />

      {/* 3D Spatial Luminous Dust Field with Scroll Warp */}
      <SpatialDustField
        scrollProgress={sceneState.scrollProgress}
        reducedMotion={reducedMotion}
      />

      {/* Primary Procedural Biomedical Instruments (Set in stage right for spatial balance) */}
      <Float
        speed={reducedMotion ? 0 : 0.8}
        rotationIntensity={reducedMotion ? 0 : 0.2}
        floatIntensity={reducedMotion ? 0 : 0.3}
        position={[1.6, 0, 0]}
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
        camera={{ position: [0, 0, 7.8], fov: 44 }}
        dpr={[1, 1.75]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
        }}
      >
        {/* Option 2 deep atmospheric lab fog (#0B1317 base) */}
        <fog attach="fog" args={['#0B1317', 6, 28]} />

        {/* Option 2 Palette Cinematic surgical lab lighting */}
        <ambientLight intensity={0.8} color="#16272F" />
        <directionalLight position={[10, 15, 8]} intensity={1.8} color="#E9ECEF" />
        <pointLight position={[-10, -6, -4]} intensity={1.6} color="#2A9D8F" distance={30} />
        <pointLight position={[8, -5, 4]} intensity={1.3} color="#2A9D8F" distance={25} />
        <pointLight position={[0, 8, -10]} intensity={1.1} color="#264653" distance={35} />

        <Suspense fallback={null}>
          <ScientificInstrumentRig reducedMotion={reducedMotion} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default InstrumentStage;
