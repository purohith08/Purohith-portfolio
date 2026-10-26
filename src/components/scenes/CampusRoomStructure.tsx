import React from 'react';
import { Html } from '@react-three/drei';
import type { CampusRoom, InteractiveEntity } from '../../data/campusWorld';

interface CampusRoomStructureProps {
  room: CampusRoom;
  activeEntityId: string | null;
  onSelectEntity: (entity: InteractiveEntity) => void;
  isAvatarNear: boolean;
}

export const CampusRoomStructure: React.FC<CampusRoomStructureProps> = ({
  room,
  onSelectEntity,
  isAvatarNear,
}) => {
  const [posX, posY, posZ] = room.focalPosition;

  return (
    <group position={[posX, posY, posZ]}>
      {/* Architectural Floor Slab */}
      <mesh position={[0, 0.05, 0]} receiveShadow>
        <boxGeometry args={[7.2, 0.1, 7.2]} />
        <meshStandardMaterial
          color="#ECE8E0"
          roughness={0.4}
          metalness={0.2}
        />
      </mesh>

      {/* Outer Border Inset */}
      <mesh position={[0, 0.12, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3.2, 3.4, 32]} />
        <meshBasicMaterial color={room.accentColor} transparent opacity={isAvatarNear ? 0.7 : 0.25} />
      </mesh>

      {/* 4 Sleek Corner Pillars */}
      {[
        [-3.2, -3.2],
        [3.2, -3.2],
        [-3.2, 3.2],
        [3.2, 3.2],
      ].map(([px, pz], idx) => (
        <mesh key={idx} position={[px, 1.4, pz]}>
          <cylinderGeometry args={[0.08, 0.08, 2.8, 16]} />
          <meshStandardMaterial color="#171916" roughness={0.3} metalness={0.8} />
        </mesh>
      ))}

      {/* Room Ceiling Ring Floating Arch */}
      <mesh position={[0, 2.8, 0]}>
        <torusGeometry args={[2.8, 0.02, 16, 64]} />
        <meshStandardMaterial color={room.accentColor} roughness={0.3} metalness={0.7} />
      </mesh>

      {/* Interactive Entity for this room */}
      {room.entities.map((entity) => {
        return (
          <group key={entity.id} position={[0, 0, 0]}>
            {/* Pedestal */}
            <mesh position={[0, 0.45, 0]}>
              <cylinderGeometry args={[0.9, 1.1, 0.7, 32]} />
              <meshStandardMaterial color="#171916" roughness={0.4} metalness={0.6} />
            </mesh>

            {/* Glowing Focal Sculpture */}
            <mesh position={[0, 1.35, 0]}>
              <octahedronGeometry args={[0.42]} />
              <meshStandardMaterial
                color={entity.color}
                roughness={0.2}
                metalness={0.8}
                wireframe
              />
            </mesh>

            {/* Orbiting Gyro Ring */}
            <mesh position={[0, 1.35, 0]} rotation={[Math.PI / 3, 0, 0]}>
              <torusGeometry args={[0.7, 0.015, 16, 64]} />
              <meshBasicMaterial color={entity.color} transparent opacity={isAvatarNear ? 0.85 : 0.35} />
            </mesh>

            {/* Spatial HUD Card Proximity Element */}
            <Html position={[0, 2.4, 0]} center distanceFactor={14}>
              <div className="flex flex-col items-center pointer-events-auto select-none transition-all duration-300">
                <div
                  className={`px-3 py-1.5 rounded-lg border text-xs font-mono font-semibold transition-all shadow-md flex items-center gap-1.5 whitespace-nowrap ${
                    isAvatarNear
                      ? 'bg-[#171916] text-[#F5F3EE] border-[#315B4C] scale-105 ring-2 ring-[#315B4C]/40'
                      : 'bg-[#ECE8E0]/90 text-[#171916] border-[#D9D5CC]'
                  }`}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: entity.color }}
                  />
                  <span>{room.name}</span>
                </div>

                <div className="text-[10px] font-mono text-[#595D56] mt-1 bg-[#FFFFFF]/80 px-2 py-0.5 rounded border border-[#D9D5CC]">
                  {room.subtitle}
                </div>

                {isAvatarNear && (
                  <button
                    onClick={() => onSelectEntity(entity)}
                    className="mt-2 px-3 py-1 bg-[#315B4C] hover:bg-[#234337] text-white font-mono text-xs rounded-full shadow-lg cursor-pointer"
                  >
                    {entity.actionLabel}
                  </button>
                )}
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
};
