import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface MedicalScanRingsProps {
  opacity?: number;
  rotationSpeed?: number;
  stackedPlanes?: boolean;
}

export const MedicalScanRings: React.FC<MedicalScanRingsProps> = ({
  opacity = 0.8,
  rotationSpeed = 1.0,
  stackedPlanes = true,
}) => {
  const outerRingRef = useRef<THREE.Mesh>(null!);
  const innerRingRef = useRef<THREE.Mesh>(null!);
  const scanSweepRef = useRef<THREE.Mesh>(null!);
  const planesGroupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z = time * 0.08 * rotationSpeed;
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.x = -time * 0.1 * rotationSpeed;
      innerRingRef.current.rotation.y = time * 0.05 * rotationSpeed;
    }
    if (scanSweepRef.current) {
      scanSweepRef.current.position.y = Math.sin(time * 0.45 * rotationSpeed) * 1.6;
    }
    if (planesGroupRef.current) {
      planesGroupRef.current.rotation.y = time * 0.03 * rotationSpeed;
    }
  });

  return (
    <group>
      {/* Outer Tomographic Gantry Ring - Cyan */}
      <mesh ref={outerRingRef} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[3.8, 0.015, 16, 96]} />
        <meshBasicMaterial color="#00F2FE" transparent opacity={opacity * 0.4} />
      </mesh>

      {/* Secondary CT Slice Ring - Precision Teal */}
      <mesh ref={innerRingRef} rotation={[-Math.PI / 4, Math.PI / 6, 0]}>
        <torusGeometry args={[3.2, 0.012, 16, 80]} />
        <meshBasicMaterial color="#0AE4BA" transparent opacity={opacity * 0.35} />
      </mesh>

      {/* Volumetric Tomographic Scan Plane Sweep */}
      <mesh ref={scanSweepRef} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.3, 3.6, 48]} />
        <meshBasicMaterial
          color="#00F2FE"
          transparent
          opacity={opacity * 0.08}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Stacked Translucent Medical Scan Planes (State B - Imaging Gantry) */}
      {stackedPlanes && (
        <group ref={planesGroupRef}>
          {[-1.0, -0.5, 0, 0.5, 1.0].map((yOffset, i) => (
            <mesh key={i} position={[0, yOffset, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[4.2, 4.2]} />
              <meshBasicMaterial
                color={i % 2 === 0 ? '#00F2FE' : '#0AE4BA'}
                transparent
                opacity={opacity * 0.035}
                wireframe={false}
                side={THREE.DoubleSide}
              />
            </mesh>
          ))}
        </group>
      )}
    </group>
  );
};
