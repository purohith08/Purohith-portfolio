import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Activity, Zap } from 'lucide-react';

export const EEGWorkbench: React.FC = () => {
  const [selectedChannel, setSelectedChannel] = useState<'C3' | 'Cz' | 'C4'>('C3');
  const [pipelineStage, setPipelineStage] = useState<'raw' | 'bandpass' | 'csp'>('bandpass');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [timeOffset, setTimeOffset] = useState<number>(0);
  const animationFrameRef = useRef<number | null>(null);

  const channelInfo = {
    C3: { label: 'C3 (Left Motor Cortex)', role: 'Contralateral activation for right-hand motor imagery' },
    Cz: { label: 'Cz (Vertex / Sensorimotor)', role: 'Central sensorimotor baseline reference' },
    C4: { label: 'C4 (Right Motor Cortex)', role: 'Contralateral activation for left-hand motor imagery' },
  };

  const stages = [
    { id: 'raw', name: 'Raw EEG Signal', desc: '50 Hz powerline hum + DC ocular drift' },
    { id: 'bandpass', name: '8–30 Hz Filtered', desc: 'Butterworth bandpass isolating Mu (8-12Hz) & Beta (16-24Hz)' },
    { id: 'csp', name: 'CSP Feature Envelope', desc: 'Common Spatial Pattern spatial filtering & energy envelope' },
  ] as const;

  // Real-time animation loop marching wave phase
  useEffect(() => {
    let lastTime = performance.now();

    const animate = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      if (isPlaying) {
        setTimeOffset((prev) => (prev + delta * 3.5) % 100);
      }
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying]);

  // Compute mathematically realistic physiological biosignal path points
  const pointsCount = 140;
  const pathD = React.useMemo(() => {
    const points: string[] = [];
    const width = 600;
    const height = 140;
    const centerY = height / 2;

    for (let i = 0; i < pointsCount; i++) {
      const x = (i / (pointsCount - 1)) * width;
      const t = (i / 14) + timeOffset;

      let yOffset = 0;

      if (pipelineStage === 'raw') {
        // High 50Hz artifact + slow drift + random micro-noise
        const drift = Math.sin(t * 0.4) * 22;
        const lineHum = Math.sin(t * 12) * 16;
        const brainRhythm = Math.sin(t * 2.8) * 12 + Math.sin(t * 4.2) * 8;
        yOffset = drift + lineHum + brainRhythm;
      } else if (pipelineStage === 'bandpass') {
        // Cleaned Mu (8-12 Hz) & Beta rhythm desynchronization (ERD)
        const muWave = Math.sin(t * 2.5) * 18;
        const betaBurst = Math.sin(t * 5.2) * 12 * Math.cos(t * 0.8);
        yOffset = muWave + betaBurst;
      } else {
        // Common Spatial Pattern logarithmic power envelope
        const envelope = Math.abs(Math.sin(t * 1.5)) * 26 + 10;
        yOffset = Math.sin(t * 3.0) * envelope;
      }

      const y = centerY + yOffset;
      points.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`);
    }

    return points.join(' ');
  }, [pipelineStage, timeOffset]);

  return (
    <section id="signals" className="py-20 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto border-t border-white/10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 text-left">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#0AE4BA] animate-pulse" />
            <span className="badge-telemetry-emerald">WORKFLOW 02: NEURAL BIOSIGNALS</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Motor Imagery EEG Processing Pipeline
          </h2>
        </div>
        <p className="text-sm text-[#94A3B8] max-w-md mt-4 md:mt-0 font-sans">
          MNE-Python & SciPy based feature extraction pipeline: digital filtering, spatial filtering via Filter Bank Common Spatial Patterns (FBCSP), and classification into prosthetic finger triggers.
        </p>
      </div>

      {/* Main Interactive Oscilloscope Card */}
      <div className="surface-instrument rounded-2xl p-6 sm:p-8 border border-white/10 shadow-2xl text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Real-time Biosignal Trace Oscilloscope */}
          <div className="lg:col-span-8 bg-[#03060B] rounded-xl border border-white/10 p-5 relative overflow-hidden flex flex-col justify-between min-h-[340px]">
            {/* Grid Lines */}
            <div className="absolute inset-0 bg-lab-grid opacity-30 pointer-events-none" />

            {/* Top Telemetry Header */}
            <div className="flex items-center justify-between z-10 font-telemetry text-xs">
              <div className="flex items-center gap-2 text-[#0AE4BA]">
                <Activity className="w-4 h-4 animate-signal-pulse" />
                <span className="font-semibold">CHANNEL: {selectedChannel}</span>
                <span className="text-[#64748B]">|</span>
                <span className="text-[#94A3B8]">{channelInfo[selectedChannel].label}</span>
              </div>
              <div className="text-[#00F2FE]">
                SAMPLING: 250 Hz | 24-BIT ADC
              </div>
            </div>

            {/* Oscilloscope SVG Waveform */}
            <div className="w-full my-6 flex items-center justify-center relative">
              <svg viewBox="0 0 600 140" className="w-full h-36 overflow-visible">
                {/* Horizontal Zero Voltage Baseline */}
                <line x1="0" y1="70" x2="600" y2="70" stroke="rgba(255,255,255,0.1)" strokeDasharray="4 4" />
                
                {/* Biosignal Trace */}
                <path
                  d={pathD}
                  fill="none"
                  stroke={pipelineStage === 'csp' ? '#00F2FE' : '#0AE4BA'}
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="filter drop-shadow-[0_0_8px_rgba(10,228,186,0.6)]"
                />
              </svg>

              {/* Real-time Oscilloscope Sweep Line */}
              <div className="absolute top-0 bottom-0 w-px bg-white/40 shadow-[0_0_8px_white] pointer-events-none" style={{ left: '85%' }} />
            </div>

            {/* Footer Status Indicators */}
            <div className="flex items-center justify-between z-10 font-telemetry text-[11px] text-[#64748B] pt-2 border-t border-white/5">
              <div>STAGE: {pipelineStage.toUpperCase()}</div>
              <div>CLASSIFIER: FBCSP + SVM / EEGNET</div>
              <div>LATENCY: &lt; 18 ms</div>
            </div>
          </div>

          {/* Pipeline Controls & Channel Selection */}
          <div className="lg:col-span-4 flex flex-col space-y-6">
            
            {/* Stage Selector */}
            <div>
              <span className="font-telemetry text-xs text-[#94A3B8] uppercase block mb-3">
                DSP Pipeline Stage
              </span>
              <div className="space-y-2">
                {stages.map((stage) => (
                  <button
                    key={stage.id}
                    onClick={() => setPipelineStage(stage.id)}
                    className={`w-full p-3 rounded-lg border text-left transition-all cursor-pointer ${
                      pipelineStage === stage.id
                        ? 'bg-[#0AE4BA]/10 border-[#0AE4BA] text-white shadow-sm'
                        : 'surface-panel-inset border-white/5 text-[#94A3B8] hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`font-display text-xs font-semibold ${pipelineStage === stage.id ? 'text-[#0AE4BA]' : 'text-white'}`}>
                        {stage.name}
                      </span>
                      {pipelineStage === stage.id && <Zap className="w-3.5 h-3.5 text-[#0AE4BA]" />}
                    </div>
                    <p className="text-[11px] text-[#94A3B8] font-sans">
                      {stage.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Channel Toggles */}
            <div>
              <span className="font-telemetry text-xs text-[#94A3B8] uppercase block mb-3">
                10-20 International Electrode
              </span>
              <div className="grid grid-cols-3 gap-2">
                {(['C3', 'Cz', 'C4'] as const).map((ch) => (
                  <button
                    key={ch}
                    onClick={() => setSelectedChannel(ch)}
                    className={`py-2 px-3 rounded-lg font-telemetry text-xs border transition-all cursor-pointer ${
                      selectedChannel === ch
                        ? 'bg-[#00F2FE]/10 border-[#00F2FE] text-[#00F2FE] font-bold'
                        : 'surface-panel-inset border-white/5 text-[#94A3B8] hover:border-white/20'
                    }`}
                  >
                    {ch}
                  </button>
                ))}
              </div>
            </div>

            {/* Play/Pause Toggle */}
            <div className="pt-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-full py-2.5 rounded-lg border border-white/10 surface-panel-inset text-xs font-display font-medium text-white hover:border-[#0AE4BA]/50 flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isPlaying ? 'Freeze Biosignal Waveform' : 'Resume Real-time Acquisition'}</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
