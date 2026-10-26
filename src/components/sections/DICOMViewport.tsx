import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, ChevronLeft, ChevronRight, Info } from 'lucide-react';

export const DICOMViewport: React.FC = () => {
  const [currentFrame, setCurrentFrame] = useState<number>(14);
  const totalFrames = 32;
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activePreset, setActivePreset] = useState<'softTissue' | 'bone' | 'lung'>('softTissue');
  const timerRef = useRef<number | null>(null);

  const presets = {
    softTissue: { 
      window: 'W: 400', 
      level: 'L: 40', 
      label: 'Soft Tissue', 
      cssFilter: 'contrast(1.2) brightness(1.0)',
      paletteColor: '#315B4C'
    },
    bone: { 
      window: 'W: 1800', 
      level: 'L: 400', 
      label: 'Bone Window', 
      cssFilter: 'contrast(2.2) brightness(1.3) grayscale(1)',
      paletteColor: '#D9D5CC'
    },
    lung: { 
      window: 'W: 1500', 
      level: 'L: -600', 
      label: 'Lung Window', 
      cssFilter: 'contrast(0.85) brightness(0.75)',
      paletteColor: '#8A8E85'
    },
  };

  // Real automated Cine Playback loop (advancing slices at clinical cine framerate)
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = window.setInterval(() => {
        setCurrentFrame((prev) => (prev >= totalFrames ? 1 : prev + 1));
      }, 100); // 10 FPS cine playback rate
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPlaying]);

  return (
    <div className="surface-card rounded-xl p-6 border border-[#D9D5CC] shadow-xs text-left">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#D9D5CC]">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#B66B49] animate-pulse" />
            <span className="text-[10px] font-mono text-[#8A8E85] uppercase tracking-wider">
              ZONE 3 // MEDICAL IMAGING GALLERY
            </span>
          </div>
          <h4 className="font-editorial text-xl font-normal text-[#171916] mt-0.5">
            Qt/C++ DICOM & Cine Playback Viewport Architecture
          </h4>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono px-2.5 py-1 rounded bg-[#ECE8E0] text-[#595D56] border border-[#D9D5CC]">
            DE-IDENTIFIED BENCHMARK DATASET
          </span>
        </div>
      </div>

      {/* Main Workstation Screen */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-4">
        
        {/* Left: Medical Viewport */}
        <div className="lg:col-span-8 bg-[#0A0D0B] rounded-lg border border-[#232B25] p-4 flex flex-col justify-between relative overflow-hidden h-72">
          
          {/* Top Medical Annotations */}
          <div className="flex items-center justify-between text-[11px] font-mono text-[#8A8E85] z-10">
            <div>
              <span className="text-[#ECE8E0]/70 font-semibold">SYNTHETIC DICOM SEQUENCE</span>
              <div className="text-[#315B4C] font-semibold mt-0.5">
                AXIAL SLICE #{currentFrame} OF {totalFrames}
              </div>
            </div>
            <div className="text-right">
              <div>TE: 14.2ms • TR: 480ms</div>
              <div className="text-[#ECE8E0]/90 font-semibold">{presets[activePreset].window} {presets[activePreset].level}</div>
            </div>
          </div>

          {/* Central Medical Anatomical Slice (CSS Filter reacts to active W/L preset) */}
          <div 
            className="absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-300"
            style={{ filter: presets[activePreset].cssFilter }}
          >
            <svg viewBox="0 0 300 300" className="w-52 h-52">
              {/* Outer skull boundary */}
              <circle cx="150" cy="150" r="112" fill="none" stroke="#2B362E" strokeWidth="6" />
              <circle cx="150" cy="150" r="102" fill="none" stroke={presets[activePreset].paletteColor} strokeWidth="1.8" strokeDasharray="3 2" />
              
              {/* Internal parenchyma / ventricles changing with currentFrame */}
              <ellipse 
                cx="126" 
                cy="142" 
                rx={18 + (currentFrame % 7) * 1.5} 
                ry={34 - (currentFrame % 5) * 1.2} 
                fill="#161E19" 
                stroke="#315B4C" 
                strokeWidth="1.4" 
              />
              <ellipse 
                cx="174" 
                cy="142" 
                rx={18 + (currentFrame % 7) * 1.5} 
                ry={34 - (currentFrame % 5) * 1.2} 
                fill="#161E19" 
                stroke="#315B4C" 
                strokeWidth="1.4" 
              />

              {/* Anatomical sulci depth lines */}
              <path d={`M 95 125 Q ${115 + (currentFrame % 4)} 150, 98 175`} stroke="#3A473E" strokeWidth="1.8" fill="none" />
              <path d={`M 205 125 Q ${185 - (currentFrame % 4)} 150, 202 175`} stroke="#3A473E" strokeWidth="1.8" fill="none" />
            </svg>
          </div>

          {/* Bottom Interactive Cine Controls Overlay */}
          <div className="flex items-center justify-between z-10 pt-2 border-t border-[#19221C]">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentFrame((prev) => Math.max(1, prev - 1))}
                className="p-1 rounded bg-[#161E19] text-[#ECE8E0] hover:bg-[#315B4C] transition-colors cursor-pointer"
                title="Previous Slice"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="px-3 py-1 rounded text-xs font-mono bg-[#161E19] text-[#ECE8E0] hover:bg-[#315B4C] transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5 text-[#315B4C]" /> : <Play className="w-3.5 h-3.5 text-[#B66B49]" />}
                <span>{isPlaying ? 'PAUSE CINE LOOP' : 'RUN CINE (10 FPS)'}</span>
              </button>
              <button
                onClick={() => setCurrentFrame((prev) => Math.min(totalFrames, prev + 1))}
                className="p-1 rounded bg-[#161E19] text-[#ECE8E0] hover:bg-[#315B4C] transition-colors cursor-pointer"
                title="Next Slice"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Frame Scrub Slider */}
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="1"
                max={totalFrames}
                value={currentFrame}
                onChange={(e) => {
                  setIsPlaying(false);
                  setCurrentFrame(parseInt(e.target.value, 10));
                }}
                className="w-24 sm:w-32 accent-[#315B4C] cursor-pointer"
              />
              <span className="text-xs font-mono text-[#8A8E85]">{currentFrame}/{totalFrames}</span>
            </div>
          </div>

        </div>

        {/* Right: Workstation Tools & Presets Panel */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
          <div>
            <label className="block text-[10px] font-mono text-[#8A8E85] mb-1.5 uppercase">
              Window / Level (LUT) Calibration
            </label>
            <div className="space-y-1.5">
              {(['softTissue', 'bone', 'lung'] as const).map((key) => (
                <button
                  key={key}
                  onClick={() => setActivePreset(key)}
                  className={`w-full text-left px-3 py-2 rounded text-xs transition-colors flex items-center justify-between cursor-pointer ${
                    activePreset === key
                      ? 'bg-[#171916] text-[#F5F3EE] font-semibold'
                      : 'bg-[#ECE8E0] text-[#595D56] hover:text-[#171916]'
                  }`}
                >
                  <span>{presets[key].label}</span>
                  <span className="font-mono text-[10px] opacity-75">{presets[key].window}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="p-3.5 rounded bg-[#ECE8E0]/70 border border-[#D9D5CC] text-xs">
            <span className="font-mono text-[10px] text-[#8A8E85] uppercase block mb-1">
              Engineering Architecture
            </span>
            <p className="text-[#171916] leading-relaxed font-normal">
              Contributed to modular Qt C++ viewports with asynchronous data buffering to maintain fluid 60 FPS user navigation without UI thread stalls.
            </p>
          </div>
        </div>

      </div>

      {/* Compliance Disclaimer */}
      <div className="p-2.5 rounded bg-[#ECE8E0]/60 border border-[#D9D5CC] flex items-center gap-2 text-[11px] font-mono text-[#595D56]">
        <Info className="w-3.5 h-3.5 text-[#B66B49] shrink-0" />
        <span>Demonstration mode: Illustrative workstation viewport architecture. No proprietary employer source code or clinical patient identifiers.</span>
      </div>

    </div>
  );
};
