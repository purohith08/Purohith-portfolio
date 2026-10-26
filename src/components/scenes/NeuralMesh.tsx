import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const NeuralMesh: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null!);
  const linesRef = useRef<THREE.LineSegments>(null!);
  const coreRef = useRef<THREE.Group>(null!);

  // Generate procedural neural node positions
  const { nodePositions, linePositions } = useMemo(() => {
    const nodeCount = 55;
    const positions: number[] = [];
    const coords: THREE.Vector3[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const radius = 2.2 + Math.random() * 1.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      positions.push(x, y, z);
      coords.push(new THREE.Vector3(x, y, z));
    }

    const lines: number[] = [];
    for (let i = 0; i < coords.length; i++) {
      for (let j = i + 1; j < coords.length; j++) {
        const dist = coords[i].distanceTo(coords[j]);
        if (dist < 1.7) {
          lines.push(coords[i].x, coords[i].y, coords[i].z);
          lines.push(coords[j].x, coords[j].y, coords[j].z);
        }
      }
    }

    return {
      nodePositions: new Float32Array(positions),
      linePositions: new Float32Array(lines),
    };
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (coreRef.current) {
      coreRef.current.rotation.y = time * 0.12;
      coreRef.current.rotation.x = Math.sin(time * 0.08) * 0.15;
    }
  });

  return (
    <group ref={coreRef}>
      {/* Neural Nodes / Bio-potential Electrodes */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[nodePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.12}
          color="#0df2c9"
          transparent
          opacity={0.85}
          sizeAttenuation
        />
      </points>

      {/* Synaptic Interconnections / Neural Tracts */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.25}
        />
      </lineSegments>

      {/* Central Core Glow Sphere */}
      <mesh>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial
          color="#0df2c9"
          emissive="#0a5247"
          roughness={0.2}
          metalness={0.8}
          wireframe
          transparent
          opacity={0.4}
        />
      </mesh>
    </group>
  );
};
