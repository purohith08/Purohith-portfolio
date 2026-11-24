import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FloatingProjectPrismsProps {
  scrollProgress?: number;
  reducedMotion?: boolean;
}

interface PrismData {
  id: number;
  initialPos: [number, number, number];
  initialRot: [number, number, number];
  scale: [number, number, number];
  color: string;
  wireColor: string;
  rotSpeed: number;
}

/**
 * Floating 3D Geometric Prisms inspired by Vadim Carazan's spatial cards.
 * Hovering kinetic geometric slabs that react magnetically to the cursor and scroll depth.
 */
export const FloatingProjectPrisms: React.FC<FloatingProjectPrismsProps> = ({
  scrollProgress = 0,
  reducedMotion = false,
}) => {
  const groupRef = useRef<THREE.Group>(null!);
  const meshRefs = useRef<(THREE.Group | null)[]>([]);

  // Distinct procedural 3D prisms distributed across scroll depths
  const prisms = useMemo<PrismData[]>(() => [
    {
      id: 1,
      initialPos: [-4.2, 1.2, -1.5],
      initialRot: [0.3, 0.4, 0.1],
      scale: [1.6, 2.2, 0.25],
      color: '#0A1120',
      wireColor: '#00F2FE',
      rotSpeed: 0.35,
    },
    {
      id: 2,
      initialPos: [4.4, -0.8, -3.8],
      initialRot: [-0.2, -0.5, 0.15],
      scale: [1.8, 2.4, 0.3],
      color: '#070D1A',
      wireColor: '#0AE4BA',
      rotSpeed: 0.28,
    },
    {
      id: 3,
      initialPos: [-3.8, -2.6, -6.5],
      initialRot: [0.25, 0.3, -0.2],
      scale: [1.5, 2.0, 0.22],
      color: '#060B14',
      wireColor: '#4E80EE',
      rotSpeed: 0.42,
    },
    {
      id: 4,
      initialPos: [3.9, 2.8, -8.5],
      initialRot: [-0.3, 0.2, 0.1],
      scale: [1.7, 2.3, 0.28],
      color: '#0A1120',
      wireColor: '#00F2FE',
      rotSpeed: 0.3,
    },
    {
      id: 5,
      initialPos: [0, -3.2, -11.0],
      initialRot: [0.1, -0.4, 0.2],
      scale: [2.2, 1.6, 0.26],
      color: '#070D1A',
      wireColor: '#0AE4BA',
      rotSpeed: 0.25,
    },
  ], []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const { pointer, clock } = state;
    const time = clock.getElapsedTime();

    meshRefs.current.forEach((mesh, idx) => {
      if (!mesh) return;
      const data = prisms[idx];

      if (!reducedMotion) {
        // Magnetic cursor tilt: tilts towards mouse coordinates
        const targetRotX = data.initialRot[0] + pointer.y * 0.35 + Math.sin(time * data.rotSpeed + idx) * 0.12;
        const targetRotY = data.initialRot[1] + pointer.x * 0.45 + Math.cos(time * data.rotSpeed + idx) * 0.15;
        const targetRotZ = data.initialRot[2] + Math.sin(time * 0.2 + idx) * 0.08;

        mesh.rotation.x = THREE.MathUtils.lerp(mesh.rotation.x, targetRotX, 0.06);
        mesh.rotation.y = THREE.MathUtils.lerp(mesh.rotation.y, targetRotY, 0.06);
        mesh.rotation.z = THREE.MathUtils.lerp(mesh.rotation.z, targetRotZ, 0.06);

        // Floating vertical levitation
        const floatY = data.initialPos[1] + Math.sin(time * 0.6 + idx * 1.5) * 0.22;
        mesh.position.y = THREE.MathUtils.lerp(mesh.position.y, floatY, 0.08);

        // Dynamic depth parallax with scroll
        const scrollZOffset = scrollProgress * 6.5;
        mesh.position.z = THREE.MathUtils.lerp(mesh.position.z, data.initialPos[2] + scrollZOffset, 0.05);
      }
    });
  });

  return (
    <group ref={groupRef}>
      {prisms.map((p, idx) => (
        <group
          key={p.id}
          ref={(el) => {
            meshRefs.current[idx] = el;
          }}
          position={p.initialPos}
          rotation={p.initialRot}
          scale={p.scale}
        >
          {/* Inner Monolith Body with subtle translucent reflection */}
          <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
              color={p.color}
              metalness={0.85}
              roughness={0.15}
              transparent
              opacity={0.88}
            />
          </mesh>

          {/* Luminous Neon Edge Frame (Vadim Carazan's glowing spatial edge hallmark) */}
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(1.002, 1.002, 1.002)]} />
            <lineBasicMaterial
              color={p.wireColor}
              transparent
              opacity={0.65}
              linewidth={1.5}
            />
          </lineSegments>

          {/* Center glowing core point */}
          <mesh position={[0, 0, 0.51]}>
            <circleGeometry args={[0.08, 16]} />
            <meshBasicMaterial color={p.wireColor} transparent opacity={0.85} />
          </mesh>
        </group>
      ))}
    </group>
  );
};
