import React from 'react';
import { GraduationCap, Award, BookOpen, CheckCircle } from 'lucide-react';
import { educationData, activitiesData } from '../../data/education';

export const Education: React.FC = () => {
  return (
    <section id="education" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-900">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-950/60 border border-teal-500/30 text-xs font-mono text-teal-300 mb-3">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>ACADEMIC FOUNDATION & LEADERSHIP</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight">
            Education & Technical Leadership
          </h2>
        </div>
        <p className="text-sm sm:text-base text-slate-400 max-w-md">
          Formal engineering degree, NPTEL medical device entrepreneurship coursework, and verified symposium leadership.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Formal Degree Card (Col 1 & 2) */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Formal Degree Program
          </h3>

          {educationData.map((edu, idx) => (
            <div
              key={idx}
              className="glass-panel p-6 sm:p-8 rounded-2xl border-slate-800/80 bg-slate-950/70"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-teal-500/10 text-teal-300 border border-teal-500/30">
                  {edu.status}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {edu.period} • {edu.location}
                </span>
              </div>

              <h4 className="text-2xl font-bold text-slate-100 mb-1">
                {edu.degree}
              </h4>

              <div className="text-base text-cyan-300 font-medium mb-6">
                {edu.institution}
              </div>

              <div className="space-y-3">
                {edu.details.map((detail, dIdx) => (
                  <div key={dIdx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                    <CheckCircle className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Working Principles callout */}
          <div className="p-6 rounded-2xl bg-slate-950/50 border border-slate-800">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 font-semibold">
              Engineering Working Principles
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Every biomedical engineering system begins with rigorous physical understanding of the signal transducer, followed by deterministic data pipelines, conservative noise filtering, and maintainable software architecture with clear failure boundaries.
            </p>
          </div>
        </div>

        {/* Certifications & Selected Activities (Col 3) */}
        <div className="space-y-6">
          <h3 className="text-xs font-mono uppercase tracking-wider text-teal-400 font-semibold flex items-center gap-2">
            <Award className="w-4 h-4" />
            Activities & Certifications
          </h3>

          <div className="space-y-4">
            {activitiesData.map((act, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-cyan-300 border border-slate-800">
                    {act.category}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500">{act.period}</span>
                </div>

                <h4 className="text-sm font-bold text-slate-200 mb-1">
                  {act.title}
                </h4>

                <div className="text-xs text-slate-400 mb-3 font-medium">
                  {act.organization}
                </div>

                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  {act.summary}
                </p>

                {act.evidenceNote && (
                  <div className="text-[10px] font-mono text-teal-400/80">
                    ✓ {act.evidenceNote}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>

      </div>

    </section>
  );
};
