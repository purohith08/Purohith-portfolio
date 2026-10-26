import React from 'react';
import { Activity, ShieldCheck } from 'lucide-react';

export const SceneFallback: React.FC = () => {
  return (
    <div className="w-full h-full absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
      {/* Abstract static scientific lattice and concentric rings */}
      <div className="relative w-80 h-80 sm:w-96 sm:h-96 rounded-full border border-teal-500/20 flex items-center justify-center animate-pulse">
        <div className="absolute inset-4 rounded-full border border-cyan-400/20" />
        <div className="absolute inset-12 rounded-full border border-teal-400/30 border-dashed" />
        <div className="absolute inset-24 rounded-full border border-teal-500/40" />
        
        {/* Central pulse icon */}
        <div className="w-20 h-20 rounded-2xl bg-teal-950/80 border border-teal-400/50 flex items-center justify-center shadow-lg shadow-teal-500/20">
          <Activity className="w-10 h-10 text-teal-300" />
        </div>

        {/* Diagnostic badge */}
        <div className="absolute -bottom-6 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-700 text-[11px] font-mono text-slate-400 flex items-center gap-1.5 shadow-md">
          <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
          <span>Biomedical Instrumentation Active (Standard Visual Mode)</span>
        </div>
      </div>
    </div>
  );
};
