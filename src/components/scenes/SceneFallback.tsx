import React from 'react';
import { Compass, ShieldCheck } from 'lucide-react';

export const SceneFallback: React.FC = () => {
  return (
    <div className="w-full h-full absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
      {/* Editorial geometric diagram with fine hairline circles */}
      <div className="relative w-72 h-72 sm:w-88 sm:h-88 rounded-full border border-[#D9D5CC] flex items-center justify-center">
        <div className="absolute inset-4 rounded-full border border-[#E8E5DD]" />
        <div className="absolute inset-12 rounded-full border border-[#315B4C]/25 border-dashed" />
        <div className="absolute inset-24 rounded-full border border-[#B66B49]/30" />
        
        {/* Central architectural monogram mark */}
        <div className="w-16 h-16 rounded-xl bg-[#ECE8E0] border border-[#D9D5CC] flex items-center justify-center shadow-xs">
          <Compass className="w-7 h-7 text-[#315B4C]" />
        </div>

        {/* Diagnostic badge */}
        <div className="absolute -bottom-5 px-3 py-1 rounded bg-[#FFFFFF] border border-[#D9D5CC] text-[10px] font-mono text-[#595D56] flex items-center gap-1.5 shadow-xs">
          <ShieldCheck className="w-3.5 h-3.5 text-[#315B4C]" />
          <span>Biomedical Schematics (Standard Mode)</span>
        </div>
      </div>
    </div>
  );
};
