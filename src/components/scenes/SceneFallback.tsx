import React from 'react';
import { Activity, ShieldCheck } from 'lucide-react';

export const SceneFallback: React.FC = () => {
  return (
    <div className="w-full h-full absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
      {/* Precision telemetry radar schematic with hairline circles */}
      <div className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-full border border-white/10 flex items-center justify-center">
        <div className="absolute inset-4 rounded-full border border-white/5" />
        <div className="absolute inset-12 rounded-full border border-[#00F2FE]/20 border-dashed animate-spin" style={{ animationDuration: '40s' }} />
        <div className="absolute inset-24 rounded-full border border-[#0AE4BA]/20" />
        
        {/* Central telemetry monogram */}
        <div className="w-16 h-16 rounded-2xl bg-[#0A1120] border border-[#00F2FE]/40 flex items-center justify-center shadow-lg shadow-[#00F2FE]/10">
          <Activity className="w-7 h-7 text-[#00F2FE] animate-pulse" />
        </div>

        {/* Diagnostic readout */}
        <div className="absolute -bottom-5 px-3 py-1 rounded bg-[#0A1120] border border-white/10 text-[10px] font-telemetry text-[#94A3B8] flex items-center gap-1.5 shadow-md">
          <ShieldCheck className="w-3.5 h-3.5 text-[#0AE4BA]" />
          <span>Biomedical Schematics (Standard 2D Mode)</span>
        </div>
      </div>
    </div>
  );
};
