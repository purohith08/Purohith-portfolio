import React, { useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Grid } from '@react-three/drei';
import * as THREE from 'three';
import { BiomedicalExplorerAvatar } from './BiomedicalExplorerAvatar';
import { BiomedicalWorldStation } from './BiomedicalWorldStation';
import { X, Gamepad2, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';

interface BiomedicalWorldModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectStation: (stationId: string) => void;
}

// Third-person camera tracking the explorer avatar
const CameraFollowRig: React.FC<{ targetPosition: THREE.Vector3 }> = ({ targetPosition }) => {
  useFrame((state) => {
    const idealOffset = new THREE.Vector3(targetPosition.x, targetPosition.y + 4.8, targetPosition.z + 7.5);
    state.camera.position.lerp(idealOffset, 0.08);
    state.camera.lookAt(targetPosition.x, targetPosition.y + 1.0, targetPosition.z);
  });
  return null;
};

export const BiomedicalWorldCanvas: React.FC<{
  onSelectStation: (id: string) => void;
  keys: { forward: boolean; backward: boolean; left: boolean; right: boolean };
}> = ({ onSelectStation, keys }) => {
  const [avatarPos, setAvatarPos] = useState<THREE.Vector3>(new THREE.Vector3(0, 0, 0));

  const stations = [
    {
      id: 'eeg-motor-imagery',
      name: 'BCI & Neural Prosthetics',
      domain: 'EEG Motor Imagery • FBCSP • SVM',
      position: [0, 0, -6] as [number, number, number],
      color: '#315B4C',
    },
    {
      id: 'medical-imaging-desktop',
      name: 'Medical Imaging Viewport',
      domain: 'C++ / Qt • DICOM • Cine Loops',
      position: [7, 0, -2] as [number, number, number],
      color: '#B66B49',
    },
    {
      id: 'instrumentation-workshop',
      name: 'Biomedical Signal Chain',
      domain: 'Bio-Amp • ESP32 • Kinematics',
      position: [-7, 0, -2] as [number, number, number],
      color: '#315B4C',
    },
    {
      id: 'debel-drdo-gait',
      name: 'DEBEL-DRDO Gait Research',
      domain: 'sEMG Synergies • Biomechanics',
      position: [0, 0, 6] as [number, number, number],
      color: '#B66B49',
    },
  ];

  return (
    <Canvas
      camera={{ position: [0, 5, 8], fov: 48 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <ambientLight intensity={0.9} color="#F5F3EE" />
      <directionalLight position={[10, 20, 10]} intensity={1.2} color="#FFFBF0" castShadow />
      <pointLight position={[-10, 8, -10]} intensity={0.6} color="#315B4C" />
      <pointLight position={[10, 8, 10]} intensity={0.6} color="#B66B49" />

      {/* Grid Floor */}
      <Grid
        args={[36, 36]}
        cellSize={1}
        cellThickness={1}
        cellColor="#D9D5CC"
        sectionSize={4}
        sectionThickness={1.5}
        sectionColor="#8A8E85"
        fadeDistance={28}
        fadeStrength={1.2}
      />

      <Suspense fallback={null}>
        <BiomedicalExplorerAvatar
          position={[0, 0, 0]}
          onPositionChange={(pos) => setAvatarPos(pos.clone())}
          keys={keys}
        />

        <CameraFollowRig targetPosition={avatarPos} />

        {/* 4 Laboratory Stations */}
        {stations.map((st) => {
          const stationVec = new THREE.Vector3(...st.position);
          const isNear = avatarPos.distanceTo(stationVec) < 2.8;

          return (
            <BiomedicalWorldStation
              key={st.id}
              id={st.id}
              name={st.name}
              domain={st.domain}
              position={st.position}
              color={st.color}
              isNear={isNear}
              onInteract={() => onSelectStation(st.id)}
            />
          );
        })}
      </Suspense>
    </Canvas>
  );
};

export const BiomedicalWorldModal: React.FC<BiomedicalWorldModalProps> = ({
  isOpen,
  onClose,
  onSelectStation,
}) => {
  const [keys, setKeys] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });

  // Listen to keyboard WASD / Arrow keys
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'w' || e.key === 'W' || e.key === 'ArrowUp') {
        setKeys((prev) => ({ ...prev, forward: true }));
      }
      if (e.key === 's' || e.key === 'S' || e.key === 'ArrowDown') {
        setKeys((prev) => ({ ...prev, backward: true }));
      }
      if (e.key === 'a' || e.key === 'A' || e.key === 'ArrowLeft') {
        setKeys((prev) => ({ ...prev, left: true }));
      }
      if (e.key === 'd' || e.key === 'D' || e.key === 'ArrowRight') {
        setKeys((prev) => ({ ...prev, right: true }));
      }
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'w' || e.key === 'W' || e.key === 'ArrowUp') {
        setKeys((prev) => ({ ...prev, forward: false }));
      }
      if (e.key === 's' || e.key === 'S' || e.key === 'ArrowDown') {
        setKeys((prev) => ({ ...prev, backward: false }));
      }
      if (e.key === 'a' || e.key === 'A' || e.key === 'ArrowLeft') {
        setKeys((prev) => ({ ...prev, left: false }));
      }
      if (e.key === 'd' || e.key === 'D' || e.key === 'ArrowRight') {
        setKeys((prev) => ({ ...prev, right: false }));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#171916]/85 backdrop-blur-md flex flex-col items-center justify-center p-3 sm:p-6">
      
      {/* Container */}
      <div className="relative w-full max-w-6xl h-[88vh] bg-[#F5F3EE] rounded-3xl border border-[#D9D5CC] shadow-2xl overflow-hidden flex flex-col">
        
        {/* World Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#D9D5CC] bg-[#ECE8E0]/90 z-20">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#171916] text-[#F5F3EE] flex items-center justify-center font-mono font-bold text-xs">
              3D
            </div>
            <div>
              <span className="font-semibold text-sm text-[#171916]">
                The Biomedical Exploration World
              </span>
              <span className="hidden sm:inline text-xs font-mono text-[#595D56] ml-2">
                • Walk or guide avatar to inspect medical systems
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#D9D5CC] text-[11px] font-mono text-[#595D56]">
              <Gamepad2 className="w-3.5 h-3.5 text-[#315B4C]" />
              <span>Use WASD / Arrow Keys to walk</span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#595D56] hover:text-[#171916] hover:bg-[#D9D5CC] transition-colors cursor-pointer"
              aria-label="Exit Exploration Mode"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 3D Canvas Viewport */}
        <div className="relative flex-1 w-full h-full">
          <BiomedicalWorldCanvas
            onSelectStation={(id) => {
              onSelectStation(id);
              onClose();
            }}
            keys={keys}
          />

          {/* On-Screen Mobile Virtual D-Pad */}
          <div className="md:hidden absolute bottom-5 left-5 z-20 grid grid-cols-3 gap-1 bg-[#FFFFFF]/80 backdrop-blur-xs p-2 rounded-2xl border border-[#D9D5CC] shadow-lg">
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

          {/* Quick Station Teleport Bar */}
          <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-2">
            {[
              { id: 'eeg-motor-imagery', label: 'BCI Station' },
              { id: 'medical-imaging-desktop', label: 'DICOM Workstation' },
              { id: 'instrumentation-workshop', label: 'Signal Chain' },
              { id: 'debel-drdo-gait', label: 'DRDO Research' },
            ].map((st) => (
              <button
                key={st.id}
                onClick={() => {
                  onSelectStation(st.id);
                  onClose();
                }}
                className="px-3 py-1 rounded-full text-xs font-mono bg-[#FFFFFF]/90 hover:bg-[#171916] hover:text-[#F5F3EE] border border-[#D9D5CC] shadow-xs transition-colors cursor-pointer"
              >
                Go to {st.label}
              </button>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
