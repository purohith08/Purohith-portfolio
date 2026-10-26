import React, { useState } from 'react';
import { Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react';

export const DICOMViewport: React.FC = () => {
  const [currentFrame, setCurrentFrame] = useState<number>(14);
  const totalFrames = 32;
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activePreset, setActivePreset] = useState<'softTissue' | 'bone' | 'lung'>('softTissue');

  const presets = {
    softTissue: { window: 'W: 400', level: 'L: 40', label: 'Soft Tissue (Abdomen/Brain)' },
    bone: { window: 'W: 1800', level: 'L: 400', label: 'Bone Structure' },
    lung: { window: 'W: 1500', level: 'L: -600', label: 'Lung Window' },
  };

  return (
    <div className="surface-card rounded-xl p-6 border border-[#D9D5CC] shadow-xs text-left">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#D9D5CC]">
        <div>
          <div className="text-[10px] font-mono text-[#8A8E85] uppercase tracking-wider">
            Medical Workstation UI Simulation
          </div>
          <h4 className="text-base font-semibold text-[#171916]">
            Qt/C++ DICOM & Cine Playback Viewport Architecture
          </h4>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono px-2 py-1 rounded bg-[#ECE8E0] text-[#595D56] border border-[#D9D5CC]">
            MODALITY: CT/MR • 512x512
          </span>
        </div>
      </div>

      {/* Main Workstation Screen */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-4">
        
        {/* Left: Simulated Medical Viewport */}
        <div className="lg:col-span-8 bg-[#0B0D0C] rounded-lg border border-[#2B3029] p-4 flex flex-col justify-between relative overflow-hidden h-72">
          
          {/* Top Medical Annotations */}
          <div className="flex items-center justify-between text-[11px] font-mono text-[#8A8E85] z-10">
            <div>
              <span>ANONYMIZED SYNTHETIC STUDY</span>
              <div className="text-[#315B4C] font-semibold">VIEWPORT: AXIAL SLICE #{currentFrame}</div>
            </div>
            <div className="text-right">
              <div>TE: 12.4ms • TR: 450ms</div>
              <div>{presets[activePreset].window} {presets[activePreset].level}</div>
            </div>
          </div>

          {/* Central Medical Anatomical Slice Representation (Procedural SVG Tomography) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <svg viewBox="0 0 300 300" className="w-52 h-52 opacity-85">
              {/* Outer skull/contour ring */}
              <circle cx="150" cy="150" r="110" fill="none" stroke="#2B3029" strokeWidth="6" />
              <circle cx="150" cy="150" r="100" fill="none" stroke="#4A5246" strokeWidth="2" strokeDasharray="4 2" />
              {/* Ventricles / tissue lobes */}
              <ellipse cx="125" cy="140" rx={24 + (currentFrame % 5)} ry={40 - (currentFrame % 4)} fill="#1F241C" stroke="#315B4C" strokeWidth="1.5" />
              <ellipse cx="175" cy="140" rx={24 + (currentFrame % 5)} ry={40 - (currentFrame % 4)} fill="#1F241C" stroke="#315B4C" strokeWidth="1.5" />
              {/* Sulci / gyri cross-sections */}
              <path d="M 90 120 Q 110 150, 95 180" stroke="#3A4036" strokeWidth="2" fill="none" />
              <path d="M 210 120 Q 190 150, 205 180" stroke="#3A4036" strokeWidth="2" fill="none" />
            </svg>
          </div>

          {/* Bottom Cine Controls Overlay */}
          <div className="flex items-center justify-between z-10 pt-2 border-t border-[#1F241C]">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentFrame(prev => Math.max(1, prev - 1))}
                className="p-1 rounded bg-[#1F241C] text-[#ECE8E0] hover:bg-[#315B4C] transition-colors"
                title="Previous Frame"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="px-2.5 py-1 rounded text-xs font-mono bg-[#1F241C] text-[#ECE8E0] hover:bg-[#315B4C] transition-colors flex items-center gap-1.5"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isPlaying ? 'PAUSE CINE' : 'PLAY CINE'}</span>
              </button>
              <button
                onClick={() => setCurrentFrame(prev => Math.min(totalFrames, prev + 1))}
                className="p-1 rounded bg-[#1F241C] text-[#ECE8E0] hover:bg-[#315B4C] transition-colors"
                title="Next Frame"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-[#8A8E85]">
              <span>SLICE: {currentFrame}/{totalFrames}</span>
            </div>
          </div>

        </div>

        {/* Right: Workstation Tools & Architecture Panel */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
          <div>
            <label className="block text-[11px] font-mono text-[#595D56] mb-1.5 uppercase">
              Window / Level (LUT) Presets
            </label>
            <div className="space-y-1.5">
              {(['softTissue', 'bone', 'lung'] as const).map((key) => (
                <button
                  key={key}
                  onClick={() => setActivePreset(key)}
                  className={`w-full text-left px-3 py-2 rounded text-xs transition-colors flex items-center justify-between ${
                    activePreset === key
                      ? 'bg-[#171916] text-[#F5F3EE] font-medium'
                      : 'bg-[#ECE8E0] text-[#595D56] hover:text-[#171916]'
                  }`}
                >
                  <span>{presets[key].label}</span>
                  <span className="font-mono text-[10px] opacity-75">{presets[key].window}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="p-3 rounded bg-[#ECE8E0]/70 border border-[#D9D5CC] text-xs">
            <span className="font-mono text-[10px] text-[#8A8E85] uppercase block mb-1">
              Architecture Delivery
            </span>
            <p className="text-[#171916] leading-relaxed">
              Decoupled Qt C++ event filtering ensuring 60 FPS viewport repaint during high-framerate multi-frame cine loops with zero memory leaks.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
