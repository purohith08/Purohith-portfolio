import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const MedicalScanRings: React.FC = () => {
  const outerRingRef = useRef<THREE.Mesh>(null!);
  const innerRingRef = useRef<THREE.Mesh>(null!);
  const scanSweepRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z = time * 0.09;
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.x = -time * 0.12;
      innerRingRef.current.rotation.y = time * 0.06;
    }
    if (scanSweepRef.current) {
      scanSweepRef.current.position.y = Math.sin(time * 0.45) * 1.5;
    }
  });

  return (
    <group>
      {/* Outer Optical Instrument Ring - Warm Copper */}
      <mesh ref={outerRingRef} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[3.6, 0.015, 16, 96]} />
        <meshBasicMaterial color="#B66B49" transparent opacity={0.38} />
      </mesh>

      {/* Secondary Precision Ring - Forest Stone */}
      <mesh ref={innerRingRef} rotation={[-Math.PI / 4, Math.PI / 6, 0]}>
        <torusGeometry args={[3.1, 0.012, 16, 80]} />
        <meshBasicMaterial color="#315B4C" transparent opacity={0.32} />
      </mesh>

      {/* Volumetric Tomographic Scan Plane Sweep */}
      <mesh ref={scanSweepRef} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.3, 3.4, 48]} />
        <meshBasicMaterial
          color="#171916"
          transparent
          opacity={0.035}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};
