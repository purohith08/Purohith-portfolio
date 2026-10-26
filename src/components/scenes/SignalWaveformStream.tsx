import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const SignalWaveformStream: React.FC = () => {
  const lineGeometryRef = useRef<THREE.BufferGeometry>(null!);
  const count = 120;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const x = (i / (count - 1) - 0.5) * 9;
      pos[i * 3] = x;
      pos[i * 3 + 1] = -2.8;
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
          const wave = 
            Math.sin(x * 1.8 + time * 3.5) * 0.18 +
            Math.cos(x * 3.2 - time * 2.0) * 0.12 +
            Math.sin(x * 0.8 + time * 1.2) * 0.25;

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
      <lineBasicMaterial color="#0df2c9" transparent opacity={0.65} />
    </lineSegments>
  );
};
