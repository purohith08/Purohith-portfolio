import React from 'react';
import { Html } from '@react-three/drei';

export interface StationProps {
  id: string;
  name: string;
  domain: string;
  position: [number, number, number];
  color: string;
  isNear: boolean;
  onInteract: () => void;
}

export const BiomedicalWorldStation: React.FC<StationProps> = ({
  name,
  domain,
  position,
  color,
  isNear,
  onInteract,
}) => {
  return (
    <group position={position}>
      {/* Base Pedestal with Stone / Metallic Finish */}
      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry args={[1.2, 1.4, 0.5, 32]} />
        <meshStandardMaterial color="#ECE8E0" roughness={0.3} metalness={0.4} />
      </mesh>

      {/* Floating Holographic Domain Ring */}
      <mesh position={[0, 1.2, 0]} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[0.9, 0.02, 16, 64]} />
        <meshBasicMaterial color={color} transparent opacity={isNear ? 0.9 : 0.4} />
      </mesh>

      {/* Central Interactive Geometric Node */}
      <mesh position={[0, 1.2, 0]}>
        <octahedronGeometry args={[0.45]} />
        <meshStandardMaterial
          color={color}
          roughness={0.2}
          metalness={0.8}
          wireframe
        />
      </mesh>

      {/* Proximity Interaction Beacon */}
      <Html position={[0, 2.2, 0]} center distanceFactor={14}>
        <div className="flex flex-col items-center pointer-events-auto select-none transition-all duration-300">
          <div
            className={`px-3 py-1.5 rounded-lg border text-xs font-mono font-semibold transition-all shadow-md flex items-center gap-1.5 whitespace-nowrap ${
              isNear
                ? 'bg-[#171916] text-[#F5F3EE] border-[#315B4C] scale-110 ring-2 ring-[#315B4C]/40'
                : 'bg-[#ECE8E0]/90 text-[#171916] border-[#D9D5CC]'
            }`}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: color }}
            />
            <span>{name}</span>
          </div>

          <div className="text-[10px] font-mono text-[#595D56] mt-1 bg-[#FFFFFF]/80 px-2 py-0.5 rounded border border-[#D9D5CC]">
            {domain}
          </div>

          {isNear && (
            <button
              onClick={onInteract}
              className="mt-2 px-3 py-1 bg-[#315B4C] hover:bg-[#234337] text-white font-mono text-xs rounded-full shadow-lg animate-bounce cursor-pointer"
            >
              PRESS [E] OR TAP TO INSPECT
            </button>
          )}
        </div>
      </Html>
    </group>
  );
};
