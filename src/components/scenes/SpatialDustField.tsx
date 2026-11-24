import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface SpatialDustFieldProps {
  scrollProgress?: number;
  reducedMotion?: boolean;
}

// Pure deterministic pseudo-random generator
function deterministicRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

/**
 * 3D Spatial Particle Field inspired by Vadim Carazan's spatial fly-through.
 * 1,200 luminous depth particles distributed through the 3D scroll corridor.
 */
export const SpatialDustField: React.FC<SpatialDustFieldProps> = ({
  scrollProgress = 0,
  reducedMotion = false,
}) => {
  const pointsRef = useRef<THREE.Points>(null!);
  const count = 1200;

  // Generate deterministic 3D coordinates and dual-color attributes
  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const highlight = new THREE.Color('#2A9D8F');
    const secondary = new THREE.Color('#E9ECEF');
    const primary = new THREE.Color('#264653');

    for (let i = 0; i < count; i++) {
      // Deterministically disperse in a deep 3D tunnel corridor
      const rx = deterministicRandom(i * 3 + 1);
      const ry = deterministicRandom(i * 3 + 2);
      const rz = deterministicRandom(i * 3 + 3);
      const rc = deterministicRandom(i * 3 + 4);

      const x = (rx - 0.5) * 26;
      const y = (ry - 0.5) * 18;
      const z = (rz - 0.5) * 36 - 2;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      // Option 2 distribution: 60% Highlight Teal #2A9D8F, 30% Secondary Porcelain #E9ECEF, 10% Primary Slate #264653
      const chosenColor = rc > 0.4 ? highlight : rc > 0.1 ? secondary : primary;
      col[i * 3] = chosenColor.r;
      col[i * 3 + 1] = chosenColor.g;
      col[i * 3 + 2] = chosenColor.b;
    }

    return { positions: pos, colors: col };
  }, [count]);

  const prevScrollRef = useRef(scrollProgress);

  useFrame((state, delta) => {
    if (!pointsRef.current || reducedMotion) return;

    const time = state.clock.getElapsedTime();
    const geom = pointsRef.current.geometry;
    const posAttr = geom.attributes.position as THREE.BufferAttribute;
    const array = posAttr.array as Float32Array;

    // Calculate scroll delta velocity to create dynamic warp stretch
    const scrollDelta = Math.abs(scrollProgress - prevScrollRef.current) * 12;
    prevScrollRef.current = scrollProgress;

    for (let i = 0; i < count; i++) {
      const idx = i * 3;

      // Natural forward drift + scroll velocity push
      const driftSpeed = 0.25 + (i % 5) * 0.15;
      const warpSpeed = scrollDelta * 2.2;
      array[idx + 2] += (driftSpeed + warpSpeed) * delta;

      // Subtle horizontal and vertical wave motion
      array[idx] += Math.sin(time * 0.4 + i) * 0.003;
      array[idx + 1] += Math.cos(time * 0.3 + i) * 0.003;

      // Wrap particles back into depth when they pass the camera
      if (array[idx + 2] > 10) {
        array[idx + 2] = -24;
      }
    }

    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.055}
        vertexColors
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};
