import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { projectsData, type ProjectCaseStudy } from '../../data/projects';
import { CaseStudyModal } from './CaseStudyModal';
import { GithubIcon } from '../ui/Icons';

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectCaseStudy | null>(null);
  const [filter, setFilter] = useState<'all' | 'signals' | 'imaging' | 'embedded' | 'software'>('all');

  const filteredProjects = projectsData.filter(
    (p) => filter === 'all' || p.category === filter
  );

  return (
    <section id="projects" className="py-20 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto border-t border-white/10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 text-left">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#00F2FE] animate-pulse" />
            <span className="badge-telemetry">SECTION 04: RESEARCH & ENGINEERING</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Verified Project Case Studies
          </h2>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
          {(['all', 'signals', 'imaging', 'embedded', 'software'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-telemetry uppercase tracking-wider border transition-all cursor-pointer ${
                filter === cat
                  ? 'bg-[#00F2FE]/10 border-[#00F2FE] text-[#00F2FE] font-bold'
                  : 'surface-panel-inset border-white/5 text-[#94A3B8] hover:text-white hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="surface-instrument-card rounded-2xl p-6 flex flex-col justify-between group relative overflow-hidden"
          >
            {/* Top Bar: Status & Category */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="badge-telemetry text-[10px]">
                  {project.category.toUpperCase()}
                </span>
                <span className="text-[11px] font-telemetry text-[#64748B]">
                  {project.date}
                </span>
              </div>

              {/* Title & Organization */}
              <h3 className="font-display text-lg font-bold text-white group-hover:text-[#00F2FE] transition-colors mb-1.5 leading-snug">
                {project.title}
              </h3>

              {project.organization && (
                <div className="text-xs font-telemetry text-[#0AE4BA] mb-3">
                  {project.organization}
                </div>
              )}

              {/* Summary */}
              <p className="text-xs text-[#94A3B8] leading-relaxed mb-4 line-clamp-3">
                {project.summary}
              </p>

              {/* Tech Badges */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {project.technologies.slice(0, 4).map((tech, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-telemetry px-2 py-0.5 rounded surface-panel-inset text-[#94A3B8] border border-white/5"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 4 && (
                  <span className="text-[10px] font-telemetry px-1.5 py-0.5 rounded text-[#64748B]">
                    +{project.technologies.length - 4}
                  </span>
                )}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={() => setSelectedProject(project)}
                className="inline-flex items-center gap-1.5 text-xs font-display font-medium text-[#00F2FE] hover:text-[#0AE4BA] transition-colors cursor-pointer"
              >
                <span>Read Full Case Study</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              <div className="flex items-center gap-2">
                {project.evidenceLinks.github && (
                  <a
                    href={project.evidenceLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded surface-panel-inset text-[#94A3B8] hover:text-white"
                    aria-label="GitHub Repository"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Case Study Modal */}
      {selectedProject && (
        <CaseStudyModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

    </section>
  );
};
