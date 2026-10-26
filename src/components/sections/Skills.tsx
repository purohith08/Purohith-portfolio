import React from 'react';
import { Cpu, Info } from 'lucide-react';
import { skillsData } from '../../data/skills';
import type { EvidenceLevel } from '../../data/skills';

export const Skills: React.FC = () => {
  const getBadgeStyle = (level: EvidenceLevel) => {
    switch (level) {
      case 'Used in a project':
        return 'bg-teal-500/10 text-teal-300 border-teal-500/30';
      case 'Working knowledge':
        return 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30';
      case 'Exploring':
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-900">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>TECHNICAL CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight">
            Evidence-Based Skills Matrix
          </h2>
        </div>
        
        {/* Evidence Legend */}
        <div className="glass-panel p-4 rounded-xl border border-slate-800/80 bg-slate-950/60 text-xs font-mono flex flex-wrap gap-4 items-center">
          <span className="text-slate-400 font-semibold">Evidence Key:</span>
          <span className="flex items-center gap-1.5 text-teal-300">
            <span className="w-2 h-2 rounded-full bg-teal-400" />
            Used in a Project
          </span>
          <span className="flex items-center gap-1.5 text-cyan-300">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            Working Knowledge
          </span>
          <span className="flex items-center gap-1.5 text-slate-400">
            <span className="w-2 h-2 rounded-full bg-slate-500" />
            Exploring
          </span>
        </div>
      </div>

      {/* Skills Matrix Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skillsData.map((category, idx) => (
          <div
            key={category.category}
            className="glass-panel rounded-2xl p-6 border-slate-800/80 bg-slate-950/70 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono text-cyan-400">
                  DOMAIN 0{idx + 1}
                </span>
                <span className="text-[11px] font-mono text-slate-500">
                  {category.skills.length} competencies
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-100 mb-1">
                {category.category}
              </h3>
              
              <p className="text-xs text-slate-400 mb-5 leading-relaxed">
                {category.description}
              </p>

              {/* Individual Skill Items */}
              <div className="space-y-3">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/70 hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-semibold text-slate-200">
                        {skill.name}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-mono border ${getBadgeStyle(
                          skill.level
                        )}`}
                      >
                        {skill.level}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-normal">
                      {skill.context}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-slate-900 flex items-center gap-2 text-[11px] font-mono text-slate-500">
              <Info className="w-3 h-3 text-slate-400" />
              <span>Validated against verifiable repository & project artifacts</span>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
};
