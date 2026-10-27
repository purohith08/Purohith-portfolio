import React from 'react';
import { Calendar, MapPin, CheckCircle2, ShieldCheck } from 'lucide-react';
import { experienceData } from '../../data/experience';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-20 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto border-t border-white/10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 text-left">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#00F2FE] animate-pulse" />
            <span className="badge-telemetry">SECTION 05: PROFESSIONAL TRAJECTORY</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Engineering, Research & Clinical Experience
          </h2>
        </div>
        <p className="text-sm text-[#94A3B8] max-w-md mt-4 md:mt-0 font-sans">
          Verified employment, defense laboratory research, and hospital biomedical instrumentation experience.
        </p>
      </div>

      {/* Experience Chronological Timeline */}
      <div className="space-y-6 text-left">
        {experienceData.map((item) => (
          <div
            key={item.id}
            className="surface-instrument-card rounded-2xl p-6 sm:p-8 border border-white/10 shadow-xl relative overflow-hidden"
          >
            {/* Top Row: Role, Organization, Location, Period */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="badge-telemetry text-[10px] uppercase">{item.type}</span>
                  <span className="text-xs font-telemetry text-[#0AE4BA]">{item.organization}</span>
                </div>
                <h3 className="font-display text-xl font-bold text-white">
                  {item.role}
                </h3>
              </div>

              <div className="flex sm:flex-col items-start sm:items-end gap-3 sm:gap-1 text-xs font-telemetry text-[#94A3B8]">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#00F2FE]" />
                  <span>{item.period}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#64748B]" />
                  <span>{item.location}</span>
                </div>
              </div>
            </div>

            {/* Summary */}
            <p className="text-sm text-[#94A3B8] my-4 leading-relaxed font-sans">
              {item.summary}
            </p>

            {/* Responsibilities list */}
            <div className="space-y-2 mb-6">
              {item.responsibilities.map((resp, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-[#F1F5F9]">
                  <CheckCircle2 className="w-4 h-4 text-[#0AE4BA] shrink-0 mt-0.5" />
                  <span className="font-sans leading-relaxed">{resp}</span>
                </div>
              ))}
            </div>

            {/* Bottom Row: Technologies & Verification Note */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex flex-wrap gap-1.5">
                {item.technologies.map((t, idx) => (
                  <span key={idx} className="text-[10px] font-telemetry px-2 py-0.5 rounded surface-panel-inset text-[#00F2FE] border border-white/5">
                    {t}
                  </span>
                ))}
              </div>

              {item.verificationNote && (
                <div className="flex items-center gap-1.5 text-[11px] font-telemetry text-[#64748B]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#0AE4BA]" />
                  <span>{item.verificationNote}</span>
                </div>
              )}
            </div>

          </div>
        ))}
      </div>

    </section>
  );
};
