import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Info } from 'lucide-react';

export const EEGWorkbench: React.FC = () => {
  const [selectedChannel, setSelectedChannel] = useState<'C3' | 'Cz' | 'C4'>('C3');
  const [pipelineStage, setPipelineStage] = useState<'raw' | 'bandpass' | 'csp'>('bandpass');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [timeOffset, setTimeOffset] = useState<number>(0);
  const animationFrameRef = useRef<number | null>(null);

  const channelInfo = {
    C3: { label: 'C3 (Left Motor Cortex)', role: 'Right-hand motor imagery contralateral activation' },
    Cz: { label: 'Cz (Vertex / Sensorimotor)', role: 'Central sensorimotor baseline' },
    C4: { label: 'C4 (Right Motor Cortex)', role: 'Left-hand motor imagery contralateral activation' },
  };

  const stages = [
    { id: 'raw', name: 'Raw EEG', desc: '50 Hz powerline interference + ocular baseline drift' },
    { id: 'bandpass', name: '8–30 Hz Filtered', desc: '4th-order Butterworth bandpass (Mu 8-12Hz & Beta 16-24Hz)' },
    { id: 'csp', name: 'CSP Feature Envelope', desc: 'Spatial covariance matrix & instantaneous motor class energy' },
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
  const pointsCount = 120;
  const pathD = React.useMemo(() => {
    const points: string[] = [];
    const width = 500;
    const height = 100;
    const centerY = height / 2;

    for (let i = 0; i < pointsCount; i++) {
      const x = (i / (pointsCount - 1)) * width;
      const t = (i / 15) + timeOffset;

      let yOffset = 0;

      if (pipelineStage === 'raw') {
        // High frequency 50Hz hum + slow baseline wander + neural burst
        const baseline = Math.sin(t * 0.4) * 16;
        const hum50Hz = Math.sin(t * 14) * 7;
        const noise = Math.cos(t * 6.2) * 9;
        yOffset = baseline + hum50Hz + noise;
      } else if (pipelineStage === 'bandpass') {
        // Cleaned Mu rhythm (10Hz) & Beta rhythm (20Hz)
        const mu = Math.sin(t * 2.8) * 14;
        const beta = Math.cos(t * 5.6) * 7;
        const modulator = Math.sin(t * 0.7);
        yOffset = (mu + beta) * (0.8 + 0.4 * modulator);
      } else if (pipelineStage === 'csp') {
        // Filter Bank Common Spatial Pattern rectified envelope
        const baseSignal = Math.abs(Math.sin(t * 2.5));
        const channelBias = selectedChannel === 'C3' ? 1.4 : 0.6;
        yOffset = -(baseSignal * 26 * channelBias) + 12;
      }

      const y = Math.min(height - 6, Math.max(6, centerY + yOffset));
      points.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`);
    }

    return points.join(' ');
  }, [selectedChannel, pipelineStage, timeOffset]);

  return (
    <div className="surface-card rounded-xl p-6 border border-[#D9D5CC] shadow-xs text-left">
      
      {/* Workbench Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#D9D5CC]">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#315B4C] animate-pulse" />
            <span className="text-[10px] font-mono text-[#8A8E85] uppercase tracking-wider">
              ZONE 2 // NEURAL SIGNAL STUDIO
            </span>
          </div>
          <h4 className="font-editorial text-xl font-normal text-[#171916] mt-0.5">
            Motor-Imagery EEG Signal Processing Pipeline
          </h4>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono bg-[#ECE8E0] text-[#171916] hover:bg-[#D9D5CC] transition-colors cursor-pointer"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 text-[#315B4C]" /> : <Play className="w-3.5 h-3.5 text-[#B66B49]" />}
            <span>{isPlaying ? 'Pause Oscilloscope' : 'Resume Trace'}</span>
          </button>
          <button
            onClick={() => setTimeOffset(0)}
            className="p-1.5 rounded bg-[#ECE8E0] text-[#595D56] hover:text-[#171916] transition-colors cursor-pointer"
            title="Reset Phase"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Control Strip */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4 border-b border-[#D9D5CC]">
        {/* Channel Selection */}
        <div>
          <label className="block text-[10px] font-mono text-[#8A8E85] mb-1.5 uppercase">
            1. Sensor Channel
          </label>
          <div className="flex items-center gap-2">
            {(['C3', 'Cz', 'C4'] as const).map((ch) => (
              <button
                key={ch}
                onClick={() => setSelectedChannel(ch)}
                className={`px-3 py-1.5 rounded text-xs font-mono transition-colors cursor-pointer ${
                  selectedChannel === ch
                    ? 'bg-[#171916] text-[#F5F3EE] font-semibold'
                    : 'bg-[#ECE8E0] text-[#595D56] hover:text-[#171916]'
                }`}
              >
                Channel {ch}
              </button>
            ))}
          </div>
          <div className="text-[11px] text-[#595D56] mt-1.5 font-normal">
            {channelInfo[selectedChannel].label}
          </div>
        </div>

        {/* Processing Stage Selection */}
        <div>
          <label className="block text-[10px] font-mono text-[#8A8E85] mb-1.5 uppercase">
            2. Pipeline Processing Stage
          </label>
          <div className="flex flex-wrap gap-2">
            {stages.map((st) => (
              <button
                key={st.id}
                onClick={() => setPipelineStage(st.id)}
                className={`px-3 py-1.5 rounded text-xs font-mono transition-colors cursor-pointer ${
                  pipelineStage === st.id
                    ? 'bg-[#315B4C] text-[#F5F3EE] font-semibold'
                    : 'bg-[#ECE8E0] text-[#595D56] hover:text-[#171916]'
                }`}
              >
                {st.name}
              </button>
            ))}
          </div>
          <div className="text-[11px] text-[#595D56] mt-1.5">
            {stages.find((s) => s.id === pipelineStage)?.desc}
          </div>
        </div>
      </div>

      {/* Signal Oscilloscope Trace Viewport */}
      <div className="relative h-44 my-4 rounded-lg bg-[#0F1310] border border-[#232B25] overflow-hidden flex items-center justify-center p-4">
        
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#19211B_1px,transparent_1px),linear-gradient(to_bottom,#19211B_1px,transparent_1px)] bg-[size:25px_25px] opacity-75" />

        {/* Centerline */}
        <div className="absolute inset-x-0 top-1/2 h-px bg-[#26332A]" />

        {/* Dynamic Waveform Path */}
        <svg
          viewBox="0 0 500 100"
          className="w-full h-full relative z-10"
          preserveAspectRatio="none"
        >
          <path
            d={pathD}
            fill="none"
            stroke={pipelineStage === 'csp' ? '#B66B49' : '#315B4C'}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Real-time Oscilloscope HUD Annotations */}
        <div className="absolute top-3 left-3 z-20 text-[10px] font-mono text-[#8A8E85] flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#315B4C]" />
          <span>FS: 250 HZ</span>
          <span>•</span>
          <span>CHANNEL: {selectedChannel}</span>
          <span>•</span>
          <span>EPOCH: 2.0S</span>
        </div>

        <div className="absolute bottom-3 right-3 z-20 text-[10px] font-mono text-[#ECE8E0]/70 flex items-center gap-2">
          <span>{isPlaying ? 'ACTIVE SWEEP' : 'HOLD BUFFER'}</span>
          <span>•</span>
          <span>{pipelineStage === 'raw' ? 'UNFILTERED' : 'NOTCH: 50HZ'}</span>
        </div>
      </div>

      {/* Truthful Data Label */}
      <div className="p-2.5 rounded bg-[#ECE8E0]/60 border border-[#D9D5CC] flex items-center gap-2 text-[11px] font-mono text-[#595D56] mb-4">
        <Info className="w-3.5 h-3.5 text-[#315B4C] shrink-0" />
        <span>Demonstration mode: Synthetic physiological trace generated according to motor-imagery benchmark parameters.</span>
      </div>

      {/* 3-Step Pipeline Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-3 border-t border-[#D9D5CC]">
        <div className="p-3 rounded bg-[#FFFFFF] border border-[#D9D5CC]">
          <span className="font-mono text-[10px] text-[#8A8E85] uppercase block mb-1">Step 1 • Filtering</span>
          <p className="text-[#171916] font-normal leading-relaxed">Isolates Mu (8–12 Hz) & Beta (16–24 Hz) motor rhythm suppression during imagined movement.</p>
        </div>
        <div className="p-3 rounded bg-[#FFFFFF] border border-[#D9D5CC]">
          <span className="font-mono text-[10px] text-[#8A8E85] uppercase block mb-1">Step 2 • Spatial CSP</span>
          <p className="text-[#171916] font-normal leading-relaxed">Filter Bank CSP maximizes variance difference between left-hand and right-hand motor trials.</p>
        </div>
        <div className="p-3 rounded bg-[#FFFFFF] border border-[#D9D5CC]">
          <span className="font-mono text-[10px] text-[#8A8E85] uppercase block mb-1">Step 3 • Classification</span>
          <p className="text-[#171916] font-normal leading-relaxed">SVM & lightweight EEGNet model generate discrete control triggers mapped to prosthetic fingers.</p>
        </div>
      </div>

    </div>
  );
};
