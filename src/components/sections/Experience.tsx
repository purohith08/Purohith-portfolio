import React from 'react';
import { Calendar, MapPin, CheckCircle, ShieldCheck } from 'lucide-react';
import { experienceData } from '../../data/experience';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-900">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-950/60 border border-teal-500/30 text-xs font-mono text-teal-300 mb-3">
            <span>TRACK RECORD</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight">
            Professional Experience & Research
          </h2>
        </div>
        <p className="text-sm sm:text-base text-slate-400 max-w-md">
          Chronological history across medical software engineering, defense biomedical research, and clinical hospital engineering.
        </p>
      </div>

      {/* Experience Timeline */}
      <div className="relative border-l border-slate-800 ml-4 sm:ml-8 space-y-12">
        {experienceData.map((exp) => (
          <div key={exp.id} className="relative pl-6 sm:pl-10">
            
            {/* Timeline bullet node */}
            <div className="absolute -left-3 top-1.5 w-6 h-6 rounded-full bg-slate-950 border-2 border-teal-400 flex items-center justify-center shadow-md shadow-teal-500/30">
              <span className="w-2 h-2 rounded-full bg-cyan-300" />
            </div>

            {/* Content card */}
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border-slate-800/80 bg-slate-950/70">
              
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-slate-900 border border-slate-700 text-teal-300">
                  {exp.type.toUpperCase()}
                </span>
                <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    {exp.period}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    {exp.location}
                  </span>
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-slate-100 mb-1">
                {exp.role}
              </h3>

              <div className="text-sm font-medium text-cyan-300/90 mb-4 flex items-center gap-2">
                <span>{exp.organization}</span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                {exp.summary}
              </p>

              {/* Responsibilities */}
              <div className="mb-6">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 font-semibold">
                  Key Responsibilities & Deliverables
                </h4>
                <ul className="space-y-2">
                  {exp.responsibilities.map((resp, rIdx) => (
                    <li key={rIdx} className="text-xs sm:text-sm text-slate-300 flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies Used */}
              <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-slate-800/80">
                <span className="text-[11px] font-mono text-slate-500 mr-2">Core Tools:</span>
                {exp.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-900 text-slate-300 border border-slate-800"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Verification & Compliance Note */}
              {exp.verificationNote && (
                <div className="mt-4 pt-3 border-t border-slate-900 flex items-center gap-2 text-[11px] font-mono text-slate-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  <span>{exp.verificationNote}</span>
                </div>
              )}

            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
