import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface SignalWaveformStreamProps {
  opacity?: number;
  channelsCount?: number;
}

export const SignalWaveformStream: React.FC<SignalWaveformStreamProps> = ({
  opacity = 0.5,
  channelsCount = 3,
}) => {
  const channelRefs = useRef<(THREE.BufferGeometry | null)[]>([]);
  const count = 120;

  // Initialize point buffer geometry for each simulated EEG channel
  const channels = useMemo(() => {
    return Array.from({ length: channelsCount }, (_, chIdx) => {
      const pos = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const x = (i / (count - 1) - 0.5) * 9.5;
        pos[i * 3] = x;
        pos[i * 3 + 1] = -2.2 - chIdx * 0.55;
        pos[i * 3 + 2] = chIdx * 0.35;
      }
      return {
        id: chIdx,
        positions: pos,
        color: chIdx === 0 ? '#00F2FE' : chIdx === 1 ? '#0AE4BA' : '#4E80EE',
        freqMult: 1.0 + chIdx * 0.4,
        phaseOffset: chIdx * 1.2,
      };
    });
  }, [channelsCount, count]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    channels.forEach((ch, chIdx) => {
      const geom = channelRefs.current[chIdx];
      if (geom) {
        const posAttr = geom.attributes.position;
        if (posAttr) {
          const array = posAttr.array as Float32Array;
          const baseY = -2.2 - chIdx * 0.55;

          for (let i = 0; i < count; i++) {
            const x = array[i * 3];
            // Distinct physiological biosignal rhythms across channels
            const wave = 
              Math.sin(x * 1.6 * ch.freqMult + time * 2.4 + ch.phaseOffset) * 0.14 +
              Math.cos(x * 2.7 * ch.freqMult - time * 1.5) * 0.08 +
              Math.sin(x * 0.8 + time * 0.9) * 0.12;

            array[i * 3 + 1] = baseY + wave;
          }
          posAttr.needsUpdate = true;
        }
      }
    });
  });

  return (
    <group>
      {channels.map((ch, idx) => (
        <lineSegments key={ch.id}>
          <bufferGeometry
            ref={(el) => {
              channelRefs.current[idx] = el as THREE.BufferGeometry | null;
            }}
          >
            <bufferAttribute
              attach="attributes-position"
              args={[ch.positions, 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color={ch.color}
            transparent
            opacity={opacity * (1.0 - idx * 0.2)}
          />
        </lineSegments>
      ))}
    </group>
  );
};
