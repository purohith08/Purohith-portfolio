import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const MedicalScanRings: React.FC = () => {
  const outerRingRef = useRef<THREE.Mesh>(null!);
  const innerRingRef = useRef<THREE.Mesh>(null!);
  const verticalPlaneRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z = time * 0.15;
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.x = -time * 0.2;
      innerRingRef.current.rotation.y = time * 0.1;
    }
    if (verticalPlaneRef.current) {
      // Periodic axial slice sweep
      verticalPlaneRef.current.position.y = Math.sin(time * 0.6) * 1.8;
    }
  });

  return (
    <group>
      {/* Outer Optical/Gantry Calibrating Ring */}
      <mesh ref={outerRingRef} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[3.8, 0.02, 16, 100]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.35} />
      </mesh>

      {/* Secondary Tilted Sensor Ring */}
      <mesh ref={innerRingRef} rotation={[-Math.PI / 4, Math.PI / 6, 0]}>
        <torusGeometry args={[3.2, 0.015, 16, 80]} />
        <meshBasicMaterial color="#0df2c9" transparent opacity={0.4} />
      </mesh>

      {/* Axial CT/MRI Volumetric Scan Plane Sweep */}
      <mesh ref={verticalPlaneRef} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.2, 3.5, 48]} />
        <meshBasicMaterial
          color="#0df2c9"
          transparent
          opacity={0.06}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};
