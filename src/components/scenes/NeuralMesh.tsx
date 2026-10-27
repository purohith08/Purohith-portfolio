import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface NeuralMeshProps {
  opacity?: number;
  latticeProgress?: number;
  constellationSpread?: number;
}

export const NeuralMesh: React.FC<NeuralMeshProps> = ({
  opacity = 1.0,
  latticeProgress = 0,
  constellationSpread = 0,
}) => {
  const pointsRef = useRef<THREE.Points>(null!);
  const linesRef = useRef<THREE.LineSegments>(null!);
  const coreRef = useRef<THREE.Group>(null!);

  // Generate base procedural neural coordinates and alternative circuit lattice coordinates
  const { sphericalPositions, latticePositions, linePositions } = useMemo(() => {
    const nodeCount = 56;
    const spherePos: THREE.Vector3[] = [];
    const latPos: THREE.Vector3[] = [];

    // Spherical cluster (State A & B)
    for (let i = 0; i < nodeCount; i++) {
      const radius = 2.1 + (i % 3) * 0.45;
      const theta = (i / nodeCount) * Math.PI * 4;
      const phi = Math.acos(((i * 2) / nodeCount) - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      spherePos.push(new THREE.Vector3(x, y, z));

      // Grid/Circuit planar lattice layout (State D & E)
      const col = i % 8;
      const row = Math.floor(i / 8);
      const latX = (col - 3.5) * 0.9;
      const latY = (row - 3.5) * 0.7;
      const latZ = Math.sin(col * 0.8 + row * 0.5) * 0.6;
      latPos.push(new THREE.Vector3(latX, latY, latZ));
    }

    // Dynamic line segments based on proximity
    const lines: number[] = [];
    for (let i = 0; i < spherePos.length; i++) {
      for (let j = i + 1; j < spherePos.length; j++) {
        const dist = spherePos[i].distanceTo(spherePos[j]);
        if (dist < 1.7) {
          lines.push(spherePos[i].x, spherePos[i].y, spherePos[i].z);
          lines.push(spherePos[j].x, spherePos[j].y, spherePos[j].z);
        }
      }
    }

    return {
      sphericalPositions: spherePos,
      latticePositions: latPos,
      linePositions: new Float32Array(lines),
      coords: spherePos,
    };
  }, []);

  // Float array for dynamic point positions
  const currentPositions = useMemo(() => {
    const arr = new Float32Array(sphericalPositions.length * 3);
    for (let i = 0; i < sphericalPositions.length; i++) {
      arr[i * 3] = sphericalPositions[i].x;
      arr[i * 3 + 1] = sphericalPositions[i].y;
      arr[i * 3 + 2] = sphericalPositions[i].z;
    }
    return arr;
  }, [sphericalPositions]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (coreRef.current) {
      coreRef.current.rotation.y = time * 0.06;
      coreRef.current.rotation.x = Math.sin(time * 0.04) * 0.07;
    }

    // Morph positions between Spherical core -> Circuit Lattice -> Spread Constellation
    if (pointsRef.current && pointsRef.current.geometry) {
      const posAttr = pointsRef.current.geometry.attributes.position;
      if (posAttr) {
        const array = posAttr.array as Float32Array;
        const count = sphericalPositions.length;

        for (let i = 0; i < count; i++) {
          const s = sphericalPositions[i];
          const l = latticePositions[i];

          // Blend spherical -> lattice based on latticeProgress
          const xBlend = THREE.MathUtils.lerp(s.x, l.x, latticeProgress);
          const yBlend = THREE.MathUtils.lerp(s.y, l.y, latticeProgress);
          const zBlend = THREE.MathUtils.lerp(s.z, l.z, latticeProgress);

          // Apply constellation expansion
          const spreadFactor = 1.0 + constellationSpread * 0.8;
          array[i * 3] = xBlend * spreadFactor;
          array[i * 3 + 1] = yBlend * spreadFactor;
          array[i * 3 + 2] = zBlend * spreadFactor;
        }

        posAttr.needsUpdate = true;
      }
    }
  });

  return (
    <group ref={coreRef}>
      {/* Bio-potential Electrode Nodes - Laser Cyan */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[currentPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.13}
          color="#00F2FE"
          transparent
          opacity={opacity * 0.9}
          sizeAttenuation
        />
      </points>

      {/* Structural Synaptic & Circuit Geometry */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#0AE4BA"
          transparent
          opacity={opacity * (0.2 + latticeProgress * 0.25)}
        />
      </lineSegments>

      {/* Inner Precision Gyro Ring */}
      <mesh rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.5, 0.015, 16, 72]} />
        <meshStandardMaterial
          color="#00F2FE"
          roughness={0.3}
          metalness={0.8}
          transparent
          opacity={opacity * (1 - latticeProgress * 0.6) * 0.7}
        />
      </mesh>

      {/* Central Spherical Biosignal Core */}
      <mesh>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial
          color="#0F1A2E"
          emissive="#00F2FE"
          emissiveIntensity={0.25}
          roughness={0.2}
          metalness={0.9}
          wireframe
          transparent
          opacity={opacity * (1 - latticeProgress * 0.8) * 0.6}
        />
      </mesh>
    </group>
  );
};
