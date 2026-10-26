import React, { useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Grid } from '@react-three/drei';
import * as THREE from 'three';
import { BiomedicalExplorerAvatar } from './BiomedicalExplorerAvatar';
import { CampusRoomStructure } from './CampusRoomStructure';
import { CAMPUS_ROOMS } from '../../data/campusWorld';
import type { CampusLocationId, InteractiveEntity } from '../../data/campusWorld';
import { X, Gamepad2, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, MapPin } from 'lucide-react';

interface CampusWorldExperienceProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToTarget: (targetType: string, targetId: string) => void;
}

// Camera tracking avatar smoothly with dynamic room awareness
const CampusCameraRig: React.FC<{
  targetPosition: THREE.Vector3;
  activeRoomId: CampusLocationId;
}> = ({ targetPosition }) => {
  useFrame((state) => {
    const idealOffset = new THREE.Vector3(targetPosition.x, targetPosition.y + 4.8, targetPosition.z + 7.8);
    state.camera.position.lerp(idealOffset, 0.08);
    state.camera.lookAt(targetPosition.x, targetPosition.y + 0.9, targetPosition.z);
  });
  return null;
};

export const CampusWorldCanvas: React.FC<{
  onSelectEntity: (entity: InteractiveEntity) => void;
  keys: { forward: boolean; backward: boolean; left: boolean; right: boolean };
  currentRoom: CampusLocationId;
  onRoomChange: (roomId: CampusLocationId) => void;
  avatarTeleportPos: [number, number, number] | null;
}> = ({ onSelectEntity, keys, currentRoom, onRoomChange, avatarTeleportPos }) => {
  const [avatarPos, setAvatarPos] = useState<THREE.Vector3>(new THREE.Vector3(0, 0, 0));

  // Determine active room based on avatar proximity
  useEffect(() => {
    let closestRoom = CAMPUS_ROOMS[0];
    let minDistance = Infinity;

    for (const room of CAMPUS_ROOMS) {
      const roomPos = new THREE.Vector3(...room.focalPosition);
      const dist = avatarPos.distanceTo(roomPos);
      if (dist < minDistance) {
        minDistance = dist;
        closestRoom = room;
      }
    }

    if (minDistance < 5.5 && closestRoom.id !== currentRoom) {
      onRoomChange(closestRoom.id);
    }
  }, [avatarPos, currentRoom, onRoomChange]);

  return (
    <Canvas
      camera={{ position: [0, 5, 9], fov: 48 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <ambientLight intensity={0.9} color="#F5F3EE" />
      <directionalLight position={[12, 22, 12]} intensity={1.3} color="#FFFBF0" castShadow />
      <pointLight position={[-12, 10, -12]} intensity={0.7} color="#315B4C" />
      <pointLight position={[12, 10, 12]} intensity={0.7} color="#B66B49" />

      {/* Campus Ground Architectural Grid */}
      <Grid
        args={[48, 48]}
        cellSize={1.2}
        cellThickness={1}
        cellColor="#D9D5CC"
        sectionSize={4.8}
        sectionThickness={1.6}
        sectionColor="#8A8E85"
        fadeDistance={36}
        fadeStrength={1.2}
      />

      <Suspense fallback={null}>
        {/* Playable Character Avatar */}
        <BiomedicalExplorerAvatar
          position={avatarTeleportPos || [0, 0, 0]}
          onPositionChange={(pos) => setAvatarPos(pos.clone())}
          keys={keys}
        />

        <CampusCameraRig targetPosition={avatarPos} activeRoomId={currentRoom} />

        {/* 6 Connected Campus Laboratory Pavilions */}
        {CAMPUS_ROOMS.map((room) => {
          const roomPos = new THREE.Vector3(...room.focalPosition);
          const isNear = avatarPos.distanceTo(roomPos) < 4.2;

          return (
            <CampusRoomStructure
              key={room.id}
              room={room}
              activeEntityId={null}
              onSelectEntity={onSelectEntity}
              isAvatarNear={isNear}
            />
          );
        })}
      </Suspense>
    </Canvas>
  );
};

export const CampusWorldExperience: React.FC<CampusWorldExperienceProps> = ({
  isOpen,
  onClose,
  onNavigateToTarget,
}) => {
  const [activeRoomId, setActiveRoomId] = useState<CampusLocationId>('atrium');
  const [teleportPos, setTeleportPos] = useState<[number, number, number] | null>(null);

  const [keys, setKeys] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });

  // Keyboard navigation listeners
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'w' || e.key === 'W' || e.key === 'ArrowUp') setKeys((prev) => ({ ...prev, forward: true }));
      if (e.key === 's' || e.key === 'S' || e.key === 'ArrowDown') setKeys((prev) => ({ ...prev, backward: true }));
      if (e.key === 'a' || e.key === 'A' || e.key === 'ArrowLeft') setKeys((prev) => ({ ...prev, left: true }));
      if (e.key === 'd' || e.key === 'D' || e.key === 'ArrowRight') setKeys((prev) => ({ ...prev, right: true }));
      if (e.key === 'Escape') onClose();
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'w' || e.key === 'W' || e.key === 'ArrowUp') setKeys((prev) => ({ ...prev, forward: false }));
      if (e.key === 's' || e.key === 'S' || e.key === 'ArrowDown') setKeys((prev) => ({ ...prev, backward: false }));
      if (e.key === 'a' || e.key === 'A' || e.key === 'ArrowLeft') setKeys((prev) => ({ ...prev, left: false }));
      if (e.key === 'd' || e.key === 'D' || e.key === 'ArrowRight') setKeys((prev) => ({ ...prev, right: false }));
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentRoom = CAMPUS_ROOMS.find((r) => r.id === activeRoomId) || CAMPUS_ROOMS[0];

  return (
    <div className="fixed inset-0 z-50 bg-[#171916]/85 backdrop-blur-md flex flex-col items-center justify-center p-3 sm:p-6">
      
      {/* Exploration Viewport Shell */}
      <div className="relative w-full max-w-7xl h-[90vh] bg-[#F5F3EE] rounded-3xl border border-[#D9D5CC] shadow-2xl overflow-hidden flex flex-col">
        
        {/* Top Spatial Campus Navigation Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#D9D5CC] bg-[#ECE8E0]/95 z-20">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#171916] text-[#F5F3EE] flex items-center justify-center font-mono font-bold text-xs">
              3D
            </div>
            <div>
              <span className="font-semibold text-sm text-[#171916]">
                The Biomedical Exploration Campus
              </span>
              <span className="hidden sm:inline text-xs font-mono text-[#595D56] ml-2">
                • Current: <strong className="text-[#315B4C]">{currentRoom.name}</strong>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#D9D5CC] text-[11px] font-mono text-[#595D56]">
              <Gamepad2 className="w-3.5 h-3.5 text-[#315B4C]" />
              <span>WASD to walk avatar • Proximity unlocks interactive rooms</span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#595D56] hover:text-[#171916] hover:bg-[#D9D5CC] transition-colors cursor-pointer"
              aria-label="Exit 3D Campus"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 3D Canvas Viewport */}
        <div className="relative flex-1 w-full h-full">
          <CampusWorldCanvas
            onSelectEntity={(entity) => {
              onNavigateToTarget(entity.targetType, entity.targetId);
              onClose();
            }}
            keys={keys}
            currentRoom={activeRoomId}
            onRoomChange={(newId) => setActiveRoomId(newId)}
            avatarTeleportPos={teleportPos}
          />

          {/* Quick Spatial Location Teleport Selector */}
          <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-1.5 max-w-xl">
            {CAMPUS_ROOMS.map((room) => (
              <button
                key={room.id}
                onClick={() => {
                  setActiveRoomId(room.id);
                  setTeleportPos(room.focalPosition);
                }}
                className={`px-3 py-1 rounded-full text-xs font-mono border transition-all cursor-pointer shadow-xs ${
                  activeRoomId === room.id
                    ? 'bg-[#171916] text-[#F5F3EE] border-[#171916] font-semibold'
                    : 'bg-[#FFFFFF]/90 hover:bg-[#ECE8E0] text-[#171916] border-[#D9D5CC]'
                }`}
              >
                {room.shortTitle}
              </button>
            ))}
          </div>

          {/* Mobile Virtual D-Pad */}
          <div className="md:hidden absolute bottom-5 left-5 z-20 grid grid-cols-3 gap-1 bg-[#FFFFFF]/85 backdrop-blur-xs p-2 rounded-2xl border border-[#D9D5CC] shadow-lg">
            <div />
            <button
              onMouseDown={() => setKeys((prev) => ({ ...prev, forward: true }))}
              onMouseUp={() => setKeys((prev) => ({ ...prev, forward: false }))}
              onTouchStart={() => setKeys((prev) => ({ ...prev, forward: true }))}
              onTouchEnd={() => setKeys((prev) => ({ ...prev, forward: false }))}
              className="w-10 h-10 rounded-xl bg-[#ECE8E0] active:bg-[#315B4C] active:text-white flex items-center justify-center font-mono font-bold"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
            <div />
            <button
              onMouseDown={() => setKeys((prev) => ({ ...prev, left: true }))}
              onMouseUp={() => setKeys((prev) => ({ ...prev, left: false }))}
              onTouchStart={() => setKeys((prev) => ({ ...prev, left: true }))}
              onTouchEnd={() => setKeys((prev) => ({ ...prev, left: false }))}
              className="w-10 h-10 rounded-xl bg-[#ECE8E0] active:bg-[#315B4C] active:text-white flex items-center justify-center font-mono font-bold"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onMouseDown={() => setKeys((prev) => ({ ...prev, backward: true }))}
              onMouseUp={() => setKeys((prev) => ({ ...prev, backward: false }))}
              onTouchStart={() => setKeys((prev) => ({ ...prev, backward: true }))}
              onTouchEnd={() => setKeys((prev) => ({ ...prev, backward: false }))}
              className="w-10 h-10 rounded-xl bg-[#ECE8E0] active:bg-[#315B4C] active:text-white flex items-center justify-center font-mono font-bold"
            >
              <ArrowDown className="w-4 h-4" />
            </button>
            <button
              onMouseDown={() => setKeys((prev) => ({ ...prev, right: true }))}
              onMouseUp={() => setKeys((prev) => ({ ...prev, right: false }))}
              onTouchStart={() => setKeys((prev) => ({ ...prev, right: true }))}
              onTouchEnd={() => setKeys((prev) => ({ ...prev, right: false }))}
              className="w-10 h-10 rounded-xl bg-[#ECE8E0] active:bg-[#315B4C] active:text-white flex items-center justify-center font-mono font-bold"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Active Room Information Card at Bottom-Right */}
          <div className="absolute bottom-5 right-5 z-20 max-w-xs sm:max-w-sm bg-[#FFFFFF]/90 backdrop-blur-md p-4 rounded-2xl border border-[#D9D5CC] shadow-xl text-left hidden sm:block">
            <div className="text-[10px] font-mono text-[#8A8E85] uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <MapPin className="w-3 h-3 text-[#315B4C]" />
              <span>CURRENT LOCATION</span>
            </div>
            <h4 className="font-editorial text-lg text-[#171916] mb-1">
              {currentRoom.name}
            </h4>
            <p className="text-xs text-[#595D56] leading-relaxed mb-3 font-normal">
              {currentRoom.description}
            </p>
            <button
              onClick={() => {
                const primaryEntity = currentRoom.entities[0];
                if (primaryEntity) {
                  onNavigateToTarget(primaryEntity.targetType, primaryEntity.targetId);
                  onClose();
                }
              }}
              className="text-xs font-mono font-semibold text-[#315B4C] hover:text-[#234337] flex items-center gap-1 cursor-pointer"
            >
              <span>Inspect {currentRoom.shortTitle} Details</span>
              <span>→</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
