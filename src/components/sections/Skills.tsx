import React, { useState } from 'react';
import { skillsData } from '../../data/skills';

export const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<number>(0);

  return (
    <section id="skills" className="py-20 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto border-t border-white/10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 text-left">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#0AE4BA] animate-pulse" />
            <span className="badge-telemetry-emerald">SECTION 06: TECHNICAL PROFICIENCIES</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Biomedical Engineering Competencies
          </h2>
        </div>
        <p className="text-sm text-[#94A3B8] max-w-md mt-4 md:mt-0 font-sans">
          Curated matrix across medical imaging standards, signal processing & computational ML, desktop software systems, and embedded firmware.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {skillsData.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => setActiveCategory(idx)}
            className={`px-4 py-2 rounded-lg font-display text-xs font-semibold tracking-wide border transition-all cursor-pointer ${
              activeCategory === idx
                ? 'bg-[#00F2FE]/10 border-[#00F2FE] text-[#00F2FE]'
                : 'surface-panel-inset border-white/5 text-[#94A3B8] hover:border-white/20 hover:text-white'
            }`}
          >
            {cat.category}
          </button>
        ))}
      </div>

      {/* Active Category Skills Grid */}
      <div className="surface-instrument rounded-2xl p-6 sm:p-8 border border-white/10 shadow-2xl text-left">
        <div className="mb-6 pb-4 border-b border-white/10">
          <h3 className="font-display text-xl font-bold text-white mb-1">
            {skillsData[activeCategory].category}
          </h3>
          <p className="text-xs text-[#94A3B8] font-sans">
            {skillsData[activeCategory].description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skillsData[activeCategory].skills.map((skill, i) => (
            <div
              key={i}
              className="p-4 rounded-xl surface-panel-inset border border-white/5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-display text-sm font-bold text-white">
                    {skill.name}
                  </span>
                  <span className={`text-[10px] font-telemetry px-1.5 py-0.5 rounded ${
                    skill.level === 'Used in a project' 
                      ? 'bg-[#0AE4BA]/10 text-[#0AE4BA] border border-[#0AE4BA]/30'
                      : 'bg-white/5 text-[#94A3B8]'
                  }`}>
                    {skill.level}
                  </span>
                </div>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  {skill.context}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};
