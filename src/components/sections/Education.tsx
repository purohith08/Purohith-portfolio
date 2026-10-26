import React from 'react';
import { Award } from 'lucide-react';
import { educationData, activitiesData } from '../../data/education';

export const Education: React.FC = () => {
  return (
    <section id="background" className="py-28 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto border-t border-[#D9D5CC]">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#ECE8E0] text-[11px] font-mono text-[#595D56] mb-3">
            <span>FOUNDATION & LEADERSHIP</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-5xl font-normal text-[#171916] tracking-tight">
            Academic Background & Leadership
          </h2>
        </div>
        <p className="text-sm sm:text-base text-[#595D56] max-w-md font-normal leading-relaxed">
          Biomedical engineering curriculum, NPTEL healthcare entrepreneurship training, and verified symposium coordination.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Formal Degree & Working Principles (Col 1 to 7) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="surface-card rounded-2xl p-8 border border-[#D9D5CC]">
            {educationData.map((edu, idx) => (
              <div key={idx}>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded text-xs font-mono bg-[#ECE8E0] text-[#315B4C] font-semibold">
                    {edu.status}
                  </span>
                  <span className="text-xs font-mono text-[#8A8E85]">
                    {edu.period} • {edu.location}
                  </span>
                </div>

                <h3 className="font-editorial text-2xl text-[#171916] mb-1">
                  {edu.degree}
                </h3>

                <div className="text-sm font-medium text-[#595D56] mb-6">
                  {edu.institution}
                </div>

                <div className="space-y-3">
                  {edu.details.map((detail, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#171916]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#315B4C] mt-2 shrink-0" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Working Principles callout */}
          <div className="p-6 rounded-xl bg-[#ECE8E0]/70 border border-[#D9D5CC]">
            <h4 className="text-[10px] font-mono uppercase tracking-wider text-[#8A8E85] mb-2 font-semibold">
              Engineering Working Principles
            </h4>
            <p className="text-xs sm:text-sm text-[#171916] leading-relaxed font-normal">
              Every biomedical engineering system begins with physical comprehension of the bio-transducer, followed by deterministic data acquisition, conservative filter boundaries, and modular software architecture designed for reproducible review.
            </p>
          </div>
        </div>

        {/* Certifications & Selected Activities (Col 8 to 12) */}
        <div className="lg:col-span-5 space-y-4">
          <h4 className="text-xs font-mono uppercase tracking-wider text-[#8A8E85] mb-4 font-semibold flex items-center gap-2">
            <Award className="w-3.5 h-3.5 text-[#B66B49]" />
            Activities & Certifications
          </h4>

          {activitiesData.map((act, idx) => (
            <div
              key={idx}
              className="surface-card rounded-xl p-5 border border-[#D9D5CC]"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#ECE8E0] text-[#315B4C] font-semibold">
                  {act.category}
                </span>
                <span className="text-[10px] font-mono text-[#8A8E85]">{act.period}</span>
              </div>

              <h5 className="font-editorial text-base text-[#171916] mb-1">
                {act.title}
              </h5>

              <div className="text-xs text-[#595D56] mb-2 font-medium">
                {act.organization}
              </div>

              <p className="text-xs text-[#595D56] leading-relaxed mb-2 font-normal">
                {act.summary}
              </p>

              {act.evidenceNote && (
                <div className="text-[10px] font-mono text-[#315B4C]">
                  ✓ {act.evidenceNote}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>

    </section>
  );
};
