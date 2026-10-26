import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const SignalWaveformStream: React.FC = () => {
  const lineGeometryRef = useRef<THREE.BufferGeometry>(null!);
  const count = 100;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const x = (i / (count - 1) - 0.5) * 8.5;
      pos[i * 3] = x;
      pos[i * 3 + 1] = -2.7;
      pos[i * 3 + 2] = 0;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (lineGeometryRef.current) {
      const posAttr = lineGeometryRef.current.attributes.position;
      if (posAttr) {
        const array = posAttr.array as Float32Array;
        for (let i = 0; i < count; i++) {
          const x = array[i * 3];
          // Restrained physiological pulse trace
          const wave = 
            Math.sin(x * 1.5 + time * 2.2) * 0.12 +
            Math.cos(x * 2.8 - time * 1.4) * 0.08 +
            Math.sin(x * 0.7 + time * 0.8) * 0.16;

          array[i * 3 + 1] = -2.5 + wave;
        }
        posAttr.needsUpdate = true;
      }
    }
  });

  return (
    <lineSegments>
      <bufferGeometry ref={lineGeometryRef}>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#315B4C" transparent opacity={0.45} />
    </lineSegments>
  );
};
