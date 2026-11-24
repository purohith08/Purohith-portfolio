import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, ChevronLeft, ChevronRight, Monitor } from 'lucide-react';

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
      colorAccent: '#00F2FE'
    },
    bone: { 
      window: 'W: 1800', 
      level: 'L: 400', 
      label: 'Bone Window', 
      cssFilter: 'contrast(2.2) brightness(1.3) grayscale(1)',
      colorAccent: '#0AE4BA'
    },
    lung: { 
      window: 'W: 1500', 
      level: 'L: -600', 
      label: 'Lung Window', 
      cssFilter: 'contrast(0.85) brightness(0.75)',
      colorAccent: '#38BDF8'
    },
  };

  // Automated Cine Playback loop (advancing slices at clinical cine framerate)
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
    <section id="imaging" className="py-20 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto border-t border-white/10">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 text-left">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#00F2FE] animate-pulse" />
            <span className="badge-telemetry">WORKFLOW 01: MEDICAL IMAGING</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            DICOM Viewport & Multi-Frame Cine Loop
          </h2>
        </div>
        <p className="text-sm text-[#CBD5E1] max-w-md mt-4 md:mt-0 font-sans">
          Simulating high-performance C++ Qt desktop viewport architectures: asynchronous multi-frame buffer loading, instantaneous window/level adjustments, and deterministic playback loops.
        </p>
      </div>

      {/* Main Viewport Workspace */}
      <div className="surface-instrument rounded-2xl p-6 sm:p-8 border border-white/10 shadow-2xl text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Simulated DICOM Canvas Viewer */}
          <div className="lg:col-span-7 bg-[#03060B] rounded-xl border border-white/10 p-4 relative overflow-hidden flex flex-col items-center justify-center min-h-[360px]">
            {/* Viewport HUD Overlay: Standard Clinical Corner Annotations */}
            <div className="absolute top-3 left-4 font-telemetry text-[11px] text-[#00F2FE] space-y-0.5 pointer-events-none z-10">
              <div>SERIES: 004 / AXIAL CINE</div>
              <div>MODALITY: CT (ILLUSTRATIVE)</div>
              <div>ZOOM: 100% | 512x512</div>
            </div>

            <div className="absolute top-3 right-4 font-telemetry text-[11px] text-[#0AE4BA] text-right space-y-0.5 pointer-events-none z-10">
              <div>{presets[activePreset].window}</div>
              <div>{presets[activePreset].level}</div>
              <div>FRAME: {String(currentFrame).padStart(2, '0')} / {totalFrames}</div>
            </div>

            <div className="absolute bottom-3 left-4 font-telemetry text-[10px] text-[#94A3B8] pointer-events-none z-10">
              FPS: {isPlaying ? '10.0 (CINE LOOP)' : '0.0 (PAUSED)'} | QT GLWIDGET PIPELINE
            </div>

            {/* Procedural Cross-Sectional CT Anatomy Graphic */}
            <div 
              className="relative w-64 h-64 rounded-full flex items-center justify-center transition-all duration-200"
              style={{ filter: presets[activePreset].cssFilter }}
            >
              {/* Patient Body Outer Contour */}
              <div 
                className="w-56 h-56 rounded-full border border-white/20 bg-gradient-to-b from-[#131B2A] to-[#0A101C] flex items-center justify-center relative shadow-inner"
              >
                {/* Vertebral Column / Spine posterior marker */}
                <div 
                  className="w-10 h-8 rounded-md bg-white/70 absolute bottom-6 border border-white shadow-md flex items-center justify-center"
                  style={{ transform: `scale(${1 + Math.sin(currentFrame * 0.2) * 0.05})` }}
                >
                  <span className="w-3 h-3 rounded-full bg-[#03060B]" />
                </div>

                {/* Symmetrical Lung / Soft Tissue Cavities */}
                <div className="flex gap-8 items-center justify-center">
                  <div 
                    className="w-14 h-24 rounded-3xl bg-[#03060B] border border-white/30"
                    style={{ height: `${70 + Math.sin(currentFrame * 0.3) * 20}px` }}
                  />
                  <div 
                    className="w-14 h-24 rounded-3xl bg-[#03060B] border border-white/30"
                    style={{ height: `${70 + Math.sin(currentFrame * 0.3) * 20}px` }}
                  />
                </div>

                {/* Mediastinum & Cardiac silhouette */}
                <div 
                  className="w-16 h-16 rounded-full bg-white/40 absolute border border-white/50 flex items-center justify-center"
                  style={{ transform: `scale(${0.9 + Math.sin(currentFrame * 0.4) * 0.15})` }}
                >
                  <div className="w-8 h-8 rounded-full bg-white/60 animate-ping opacity-30" />
                </div>

                {/* Crosshair coordinate markers */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30">
                  <div className="w-full h-px bg-[#00F2FE]" />
                  <div className="h-full w-px bg-[#00F2FE] absolute" />
                </div>
              </div>
            </div>

            {/* Scrub Slider */}
            <div className="w-full mt-4 z-10 px-4">
              <label htmlFor="dicom-frame-slider" className="sr-only">
                DICOM cine slice frame position
              </label>
              <input
                id="dicom-frame-slider"
                type="range"
                min="1"
                max={totalFrames}
                value={currentFrame}
                aria-label="DICOM cine slice frame position"
                aria-valuemin={1}
                aria-valuemax={totalFrames}
                aria-valuenow={currentFrame}
                aria-valuetext={`Frame ${currentFrame} of ${totalFrames}`}
                onChange={(e) => {
                  setIsPlaying(false);
                  setCurrentFrame(Number(e.target.value));
                }}
                className="w-full accent-[#00F2FE] cursor-pointer bg-white/10 h-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#00F2FE]"
              />
            </div>
          </div>

          {/* Clinical Control Console & Architecture Specs */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* Playback Controls */}
            <div>
              <span className="font-telemetry text-xs text-[#CBD5E1] uppercase block mb-3 font-semibold">
                Cine Playback Controls
              </span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  aria-pressed={isPlaying}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg font-display text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#00F2FE] ${
                    isPlaying 
                      ? 'bg-[#FF5E7E] text-white shadow-lg shadow-[#FF5E7E]/20' 
                      : 'bg-[#00F2FE] text-[#060911] shadow-lg shadow-[#00F2FE]/20 hover:bg-[#0AE4BA]'
                  }`}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isPlaying ? 'Halt Cine Loop' : 'Start Cine Loop'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsPlaying(false);
                    setCurrentFrame(prev => (prev <= 1 ? totalFrames : prev - 1));
                  }}
                  className="p-2.5 rounded-lg surface-panel-inset text-[#CBD5E1] hover:text-white transition-colors cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#00F2FE]"
                  aria-label="Step to Previous Frame"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsPlaying(false);
                    setCurrentFrame(prev => (prev >= totalFrames ? 1 : prev + 1));
                  }}
                  className="p-2.5 rounded-lg surface-panel-inset text-[#CBD5E1] hover:text-white transition-colors cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#00F2FE]"
                  aria-label="Step to Next Frame"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Window / Level Radiologic Presets */}
            <div>
              <span className="font-telemetry text-xs text-[#CBD5E1] uppercase block mb-3 font-semibold">
                Window / Level Presets (LUT Transform)
              </span>
              <div role="radiogroup" aria-label="Window/Level Presets" className="grid grid-cols-3 gap-2">
                {(Object.keys(presets) as Array<keyof typeof presets>).map((key) => (
                  <button
                    key={key}
                    type="button"
                    role="radio"
                    aria-checked={activePreset === key}
                    onClick={() => setActivePreset(key)}
                    className={`px-3 py-2 rounded-lg text-xs font-telemetry border text-center transition-all cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#00F2FE] ${
                      activePreset === key
                        ? 'bg-[#00F2FE]/10 border-[#00F2FE] text-[#00F2FE]'
                        : 'surface-panel-inset border-white/5 text-[#94A3B8] hover:border-white/20 hover:text-white'
                    }`}
                  >
                    <span className="block font-medium">{presets[key].label}</span>
                    <span className="text-[10px] text-[#94A3B8] block mt-0.5">{presets[key].window}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Architecture Highlights */}
            <div className="p-4 rounded-xl surface-panel-inset border border-white/5 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-white font-medium">
                <Monitor className="w-4 h-4 text-[#0AE4BA]" />
                <span>Qt / C++ Architectural Pattern</span>
              </div>
              <p className="text-[#CBD5E1] leading-relaxed">
                Separates file IO and DICOM header parsing into worker threads, streaming RGBA pixel buffers directly into OpenGL textures without blocking the clinical UI.
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
