import React, { useState } from 'react';
import { Play, Pause } from 'lucide-react';

export const EEGWorkbench: React.FC = () => {
  const [selectedChannel, setSelectedChannel] = useState<'C3' | 'Cz' | 'C4'>('C3');
  const [pipelineStage, setPipelineStage] = useState<'raw' | 'bandpass' | 'csp'>('bandpass');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  // Channel details
  const channelInfo = {
    C3: { label: 'C3 (Left Motor Cortex)', role: 'Right-hand motor imagery contralateral activation' },
    Cz: { label: 'Cz (Vertex / Sensorimotor)', role: 'Foot / central sensorimotor rhythm baseline' },
    C4: { label: 'C4 (Right Motor Cortex)', role: 'Left-hand motor imagery contralateral activation' },
  };

  // Pipeline stages
  const stages = [
    { id: 'raw', name: 'Raw EEG', desc: '50 Hz noise + ocular baseline' },
    { id: 'bandpass', name: '8–30 Hz Filtered', desc: '4th-order Butterworth (Mu/Beta rhythm)' },
    { id: 'csp', name: 'CSP Feature Envelope', desc: 'Spatial covariance & motor class energy' },
  ] as const;

  // Synthesize realistic EEG waveforms depending on stage and channel
  const getWavePath = () => {
    switch (pipelineStage) {
      case 'raw':
        return "M 0 50 Q 25 20, 50 65 T 100 40 T 150 80 T 200 20 T 250 75 T 300 30 T 350 70 T 400 45 T 450 60 T 500 50";
      case 'bandpass':
        return "M 0 50 Q 25 35, 50 65 T 100 35 T 150 65 T 200 30 T 250 70 T 300 35 T 350 65 T 400 38 T 450 62 T 500 50";
      case 'csp':
        return selectedChannel === 'C3'
          ? "M 0 50 Q 50 15, 100 45 T 200 10 T 300 40 T 400 15 T 500 48"
          : "M 0 50 Q 50 40, 100 55 T 200 45 T 300 58 T 400 42 T 500 50";
    }
  };

  return (
    <div className="surface-card rounded-xl p-6 border border-[#D9D5CC] shadow-xs text-left">
      
      {/* Workbench Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#D9D5CC]">
        <div>
          <div className="text-[10px] font-mono text-[#8A8E85] uppercase tracking-wider">
            Interactive Signal Inspection Workbench
          </div>
          <h4 className="text-base font-semibold text-[#171916]">
            Motor-Imagery EEG Signal Processing Pipeline
          </h4>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono bg-[#ECE8E0] text-[#171916] hover:bg-[#D9D5CC] transition-colors"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlaying ? 'Pause Trace' : 'Play Trace'}</span>
          </button>
        </div>
      </div>

      {/* Control Strip */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4 border-b border-[#D9D5CC]">
        {/* Channel Selection */}
        <div>
          <label className="block text-[11px] font-mono text-[#595D56] mb-1.5">
            1. SENSOR CHANNEL
          </label>
          <div className="flex items-center gap-2">
            {(['C3', 'Cz', 'C4'] as const).map((ch) => (
              <button
                key={ch}
                onClick={() => setSelectedChannel(ch)}
                className={`px-3 py-1.5 rounded text-xs font-mono transition-colors ${
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
            {channelInfo[selectedChannel].label} — {channelInfo[selectedChannel].role}
          </div>
        </div>

        {/* Processing Stage Selection */}
        <div>
          <label className="block text-[11px] font-mono text-[#595D56] mb-1.5">
            2. PIPELINE STAGE
          </label>
          <div className="flex flex-wrap gap-2">
            {stages.map((st) => (
              <button
                key={st.id}
                onClick={() => setPipelineStage(st.id)}
                className={`px-3 py-1.5 rounded text-xs font-mono transition-colors ${
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
            {stages.find(s => s.id === pipelineStage)?.desc}
          </div>
        </div>
      </div>

      {/* Signal Oscilloscope Trace Viewport */}
      <div className="relative h-44 my-4 rounded-lg bg-[#111411] border border-[#2B3029] overflow-hidden flex items-center justify-center p-4">
        
        {/* Grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1F241C_1px,transparent_1px),linear-gradient(to_bottom,#1F241C_1px,transparent_1px)] bg-[size:24px_24px] opacity-60" />

        {/* SVG Biosignal Trace */}
        <svg
          viewBox="0 0 500 100"
          className="w-full h-full relative z-10 preserve-3d"
          preserveAspectRatio="none"
        >
          <path
            d={getWavePath()}
            fill="none"
            stroke={pipelineStage === 'csp' ? '#B66B49' : '#315B4C'}
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={isPlaying ? "transition-all duration-300" : ""}
          />
        </svg>

        {/* HUD Annotations */}
        <div className="absolute top-3 left-3 z-20 text-[10px] font-mono text-[#8A8E85] flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#315B4C]" />
          <span>FS: 250 HZ</span>
          <span>•</span>
          <span>WINDOW: 2.0 SEC (500 SAMPLES)</span>
        </div>

        <div className="absolute bottom-3 right-3 z-20 text-[10px] font-mono text-[#ECE8E0]/70">
          FILTER: 8–30 HZ BANDPASS • NOTCH: 50 HZ
        </div>
      </div>

      {/* Pipeline Technical Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-3 border-t border-[#D9D5CC]">
        <div className="p-2.5 rounded bg-[#ECE8E0]/60 border border-[#D9D5CC]">
          <span className="font-mono text-[10px] text-[#8A8E85] uppercase block mb-1">Step 1 • Filtering</span>
          <p className="text-[#171916]">Butterworth 8-30Hz isolates Mu (8-12Hz) & Beta (16-24Hz) motor rhythms.</p>
        </div>
        <div className="p-2.5 rounded bg-[#ECE8E0]/60 border border-[#D9D5CC]">
          <span className="font-mono text-[10px] text-[#8A8E85] uppercase block mb-1">Step 2 • Spatial CSP</span>
          <p className="text-[#171916]">Maximizes variance for one motor class while minimizing it for the other.</p>
        </div>
        <div className="p-2.5 rounded bg-[#ECE8E0]/60 border border-[#D9D5CC]">
          <span className="font-mono text-[10px] text-[#8A8E85] uppercase block mb-1">Step 3 • Classification</span>
          <p className="text-[#171916]">SVM & lightweight EEGNet decode intention into discrete trigger commands.</p>
        </div>
      </div>

    </div>
  );
};
