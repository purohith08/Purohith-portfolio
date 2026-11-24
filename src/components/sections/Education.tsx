import React from 'react';
import { GraduationCap, Award, CheckCircle2 } from 'lucide-react';
import { educationData, activitiesData } from '../../data/education';

export const Education: React.FC = () => {
  return (
    <section id="education" className="py-20 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto border-t border-white/10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 text-left">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#00F2FE] animate-pulse" />
            <span className="badge-telemetry">SECTION 07: FOUNDATION</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Academic Degree & Technical Leadership
          </h2>
        </div>
        <p className="text-sm text-[#94A3B8] max-w-md mt-4 md:mt-0 font-sans">
          B.Tech in Biomedical Engineering coursework, technical club leadership, and healthcare innovation certifications.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
        
        {/* Degree Column */}
        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <GraduationCap className="w-5 h-5 text-[#00F2FE]" />
            <h3 className="font-display text-xl font-bold text-white">Academic Degree</h3>
          </div>

          {educationData.map((edu, idx) => (
            <div
              key={idx}
              className="surface-instrument-card rounded-2xl p-6 sm:p-8 border border-white/10 shadow-xl"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="badge-telemetry">{edu.status}</span>
                <span className="text-xs font-telemetry text-[#00F2FE]">{edu.period}</span>
              </div>

              <h4 className="font-display text-xl font-bold text-white mb-1">
                {edu.degree}
              </h4>
              <div className="text-xs font-telemetry text-[#0AE4BA] mb-4">
                {edu.institution} • {edu.location}
              </div>

              <div className="space-y-2 pt-4 border-t border-white/10">
                {edu.details.map((detail, dIdx) => (
                  <div key={dIdx} className="flex items-start gap-2.5 text-xs text-[#94A3B8]">
                    <CheckCircle2 className="w-4 h-4 text-[#0AE4BA] shrink-0 mt-0.5" />
                    <span className="font-sans leading-relaxed">{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Leadership & Certifications Column */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-5 h-5 text-[#0AE4BA]" />
            <h3 className="font-display text-xl font-bold text-white">Leadership & Certifications</h3>
          </div>

          {activitiesData.map((act, idx) => (
            <div
              key={idx}
              className="surface-instrument-card rounded-xl p-5 border border-white/10"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="badge-telemetry text-[10px]">{act.category}</span>
                <span className="text-[11px] font-telemetry text-[#94A3B8]">{act.period}</span>
              </div>

              <h4 className="font-display text-sm font-bold text-white mb-0.5">
                {act.title}
              </h4>
              <div className="text-[11px] font-telemetry text-[#0AE4BA] mb-2">
                {act.organization}
              </div>

              <p className="text-xs text-[#94A3B8] leading-relaxed">
                {act.summary}
              </p>
            </div>
          ))}
        </div>

      </div>

    </section>
  );
};
