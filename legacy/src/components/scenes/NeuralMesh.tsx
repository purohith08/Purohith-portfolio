import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const NeuralMesh: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null!);
  const linesRef = useRef<THREE.LineSegments>(null!);
  const coreRef = useRef<THREE.Group>(null!);

  // Generate procedural architectural neural nodes & geometric coordinates
  const { nodePositions, linePositions } = useMemo(() => {
    const nodeCount = 48;
    const positions: number[] = [];
    const coords: THREE.Vector3[] = [];

    // Distribute nodes in a calm, balanced geometric cluster
    for (let i = 0; i < nodeCount; i++) {
      const radius = 2.0 + (i % 3) * 0.55;
      const theta = (i / nodeCount) * Math.PI * 4;
      const phi = Math.acos(((i * 2) / nodeCount) - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      positions.push(x, y, z);
      coords.push(new THREE.Vector3(x, y, z));
    }

    // Connect close neighbors with precise geometric lines
    const lines: number[] = [];
    for (let i = 0; i < coords.length; i++) {
      for (let j = i + 1; j < coords.length; j++) {
        const dist = coords[i].distanceTo(coords[j]);
        if (dist < 1.65) {
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
      coreRef.current.rotation.y = time * 0.08;
      coreRef.current.rotation.x = Math.sin(time * 0.05) * 0.09;
    }
  });

  return (
    <group ref={coreRef}>
      {/* Bio-potential Electrode Nodes - Tactile Bronze/Copper */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[nodePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.11}
          color="#B66B49"
          transparent
          opacity={0.88}
          sizeAttenuation
        />
      </points>

      {/* Structural Synaptic Geometry - Restrained Charcoal Ink Lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#171916"
          transparent
          opacity={0.32}
        />
      </lineSegments>

      {/* Inner Precision Calibration Gyro Ring */}
      <mesh rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.4, 0.012, 16, 72]} />
        <meshStandardMaterial
          color="#315B4C"
          roughness={0.4}
          metalness={0.6}
          transparent
          opacity={0.65}
        />
      </mesh>

      {/* Central Tactile Spherical Core */}
      <mesh>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshStandardMaterial
          color="#ECE8E0"
          roughness={0.3}
          metalness={0.2}
          wireframe
          transparent
          opacity={0.45}
        />
      </mesh>
    </group>
  );
};
