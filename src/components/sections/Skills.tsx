import React from 'react';
import { Info } from 'lucide-react';
import { skillsData } from '../../data/skills';
import type { EvidenceLevel } from '../../data/skills';

export const Skills: React.FC = () => {
  const getBadgeStyle = (level: EvidenceLevel) => {
    switch (level) {
      case 'Used in a project':
        return 'bg-[#ECE8E0] text-[#315B4C] border-[#D9D5CC] font-semibold';
      case 'Working knowledge':
        return 'bg-[#ECE8E0] text-[#595D56] border-[#D9D5CC]';
      case 'Exploring':
        return 'bg-[#ECE8E0]/50 text-[#8A8E85] border-[#D9D5CC]';
    }
  };

  return (
    <section id="capabilities" className="py-28 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto border-t border-[#D9D5CC]">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#ECE8E0] text-[11px] font-mono text-[#595D56] mb-3">
            <span>EVIDENCE-LED COMPETENCIES</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-5xl font-normal text-[#171916] tracking-tight">
            Technical Capabilities
          </h2>
        </div>
        
        {/* Evidence Legend */}
        <div className="p-3 rounded-lg bg-[#ECE8E0]/70 border border-[#D9D5CC] text-xs font-mono flex flex-wrap gap-4 items-center">
          <span className="text-[#8A8E85] font-semibold">Evidence Level:</span>
          <span className="flex items-center gap-1.5 text-[#315B4C]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#315B4C]" />
            Used in a Project
          </span>
          <span className="flex items-center gap-1.5 text-[#595D56]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8A8E85]" />
            Working Knowledge
          </span>
        </div>
      </div>

      {/* Skills Matrix Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillsData.map((category, idx) => (
          <div
            key={category.category}
            className="surface-card rounded-xl p-6 border border-[#D9D5CC] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-[#8A8E85]">
                  DOMAIN 0{idx + 1}
                </span>
                <span className="text-[10px] font-mono text-[#8A8E85]">
                  {category.skills.length} competencies
                </span>
              </div>

              <h3 className="font-editorial text-xl text-[#171916] mb-1">
                {category.category}
              </h3>
              
              <p className="text-xs text-[#595D56] mb-5 leading-relaxed font-normal">
                {category.description}
              </p>

              {/* Individual Skill Items */}
              <div className="space-y-2.5">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="p-3 rounded bg-[#ECE8E0]/50 border border-[#D9D5CC]/80"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-[#171916]">
                        {skill.name}
                      </span>
                      <span
                        className={`px-1.5 py-0.5 rounded text-[10px] font-mono border ${getBadgeStyle(
                          skill.level
                        )}`}
                      >
                        {skill.level}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#595D56] leading-normal font-normal">
                      {skill.context}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-[#D9D5CC] flex items-center gap-2 text-[10px] font-mono text-[#8A8E85]">
              <Info className="w-3 h-3 text-[#595D56]" />
              <span>Validated against verifiable repository & project artifacts</span>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
};
