import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { experienceData } from '../../data/experience';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-28 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto border-t border-[#D9D5CC]">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#ECE8E0] text-[11px] font-mono text-[#595D56] mb-3">
            <span>CHRONOLOGICAL RECORD</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-5xl font-normal text-[#171916] tracking-tight">
            Professional Experience & Research
          </h2>
        </div>
        <p className="text-sm sm:text-base text-[#595D56] max-w-md font-normal leading-relaxed">
          Verified record across commercial medical imaging software development, defense biosignal research, and clinical instrumentation.
        </p>
      </div>

      {/* Editorial Timeline */}
      <div className="space-y-8">
        {experienceData.map((exp) => (
          <div
            key={exp.id}
            className="surface-card rounded-2xl p-8 sm:p-10 border border-[#D9D5CC]"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Left Column: Organization & Period */}
              <div className="lg:col-span-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-[#ECE8E0] text-[#315B4C] uppercase">
                    {exp.type}
                  </span>
                  <span className="text-xs font-mono text-[#8A8E85]">{exp.period}</span>
                </div>

                <h3 className="font-editorial text-2xl text-[#171916] mb-1">
                  {exp.role}
                </h3>

                <div className="text-sm font-medium text-[#595D56] mb-4">
                  {exp.organization} • {exp.location}
                </div>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#ECE8E0] text-[#595D56]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Column: Narrative & Responsibilities */}
              <div className="lg:col-span-8 pl-0 lg:pl-6 border-l-0 lg:border-l border-[#D9D5CC]">
                <p className="text-sm text-[#595D56] leading-relaxed mb-6 font-normal">
                  {exp.summary}
                </p>

                <h4 className="text-[10px] font-mono uppercase tracking-wider text-[#8A8E85] mb-3">
                  Key Deliverables & Responsibilities
                </h4>

                <ul className="space-y-2 mb-6">
                  {exp.responsibilities.map((resp, rIdx) => (
                    <li key={rIdx} className="text-xs sm:text-sm text-[#171916] flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#315B4C] mt-1.5 shrink-0" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>

                {exp.verificationNote && (
                  <div className="pt-3 border-t border-[#D9D5CC] flex items-center gap-2 text-[11px] font-mono text-[#595D56]">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#315B4C]" />
                    <span>{exp.verificationNote}</span>
                  </div>
                )}
              </div>

            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
