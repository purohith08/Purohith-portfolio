import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CharacterControllerProps {
  position: [number, number, number];
  onPositionChange: (pos: THREE.Vector3) => void;
  keys: {
    forward: boolean;
    backward: boolean;
    left: boolean;
    right: boolean;
  };
}

export const BiomedicalExplorerAvatar: React.FC<CharacterControllerProps> = ({
  position,
  onPositionChange,
  keys,
}) => {
  const avatarGroupRef = useRef<THREE.Group>(null!);
  const posRef = useRef(new THREE.Vector3(...position));
  const velocity = useRef(new THREE.Vector3());
  const rotationY = useRef(0);

  useFrame((state, delta) => {
    if (!avatarGroupRef.current) return;

    const moveSpeed = 4.8;
    const direction = new THREE.Vector3();

    if (keys.forward) direction.z -= 1;
    if (keys.backward) direction.z += 1;
    if (keys.left) direction.x -= 1;
    if (keys.right) direction.x += 1;

    if (direction.lengthSq() > 0) {
      direction.normalize();
      
      // Calculate target rotation angle based on movement direction
      const targetAngle = Math.atan2(direction.x, direction.z) + Math.PI;
      rotationY.current = THREE.MathUtils.lerp(rotationY.current, targetAngle, 0.15);

      // Apply movement delta
      velocity.current.x = direction.x * moveSpeed * delta;
      velocity.current.z = direction.z * moveSpeed * delta;

      posRef.current.add(velocity.current);

      // Boundaries inside exploration laboratory
      posRef.current.x = THREE.MathUtils.clamp(posRef.current.x, -16, 16);
      posRef.current.z = THREE.MathUtils.clamp(posRef.current.z, -16, 16);
    } else {
      velocity.current.set(0, 0, 0);
    }

    // Walking hover oscillation
    const walkingBounce = direction.lengthSq() > 0 
      ? Math.sin(state.clock.getElapsedTime() * 12) * 0.08 
      : Math.sin(state.clock.getElapsedTime() * 2) * 0.03;

    avatarGroupRef.current.position.set(posRef.current.x, 0.75 + walkingBounce, posRef.current.z);
    avatarGroupRef.current.rotation.y = rotationY.current;

    onPositionChange(posRef.current);
  });

  return (
    <group ref={avatarGroupRef} position={position}>
      {/* Head / Neuro-Optic Sensor Helm */}
      <mesh position={[0, 0.55, 0]}>
        <sphereGeometry args={[0.22, 24, 24]} />
        <meshStandardMaterial color="#171916" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* Visor Display - Forest/Cyan Holographic Glint */}
      <mesh position={[0, 0.55, 0.16]}>
        <boxGeometry args={[0.24, 0.08, 0.1]} />
        <meshBasicMaterial color="#315B4C" />
      </mesh>

      {/* Torso / Biomedical Telemetry Exosuit */}
      <mesh position={[0, 0.15, 0]}>
        <capsuleGeometry args={[0.18, 0.35, 12, 16]} />
        <meshStandardMaterial color="#ECE8E0" roughness={0.4} metalness={0.3} />
      </mesh>

      {/* Backpack Power Cell / ECG Holter Unit */}
      <mesh position={[0, 0.2, -0.16]}>
        <boxGeometry args={[0.22, 0.28, 0.1]} />
        <meshStandardMaterial color="#B66B49" roughness={0.5} metalness={0.5} />
      </mesh>

      {/* Atmospheric Under-Glow Indicator */}
      <mesh position={[0, -0.7, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.1, 0.45, 32]} />
        <meshBasicMaterial color="#315B4C" transparent opacity={0.35} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};
