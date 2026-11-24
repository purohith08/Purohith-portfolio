import React, { useState } from 'react';
import { motion, useTransform, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { projectsData, type ProjectCaseStudy } from '../../data/projects';
import { CaseStudyModal } from './CaseStudyModal';
import { GithubIcon } from '../ui/Icons';
import { useSectionParallax } from '../../hooks/useSectionParallax';

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectCaseStudy | null>(null);
  const [filter, setFilter] = useState<'all' | 'signals' | 'imaging' | 'embedded' | 'software'>('all');

  const { ref, smoothProgress, backgroundY } = useSectionParallax<HTMLElement>({
    backgroundRange: [-25, 25],
    clamp: false,
  });

  // Staggered multi-plane parallax for project cards across 3 columns using spring-smoothed progress
  const colY0 = useTransform(smoothProgress, [0, 1], [30, -30], { clamp: false });
  const colY1 = useTransform(smoothProgress, [0, 1], [65, -65], { clamp: false });
  const colY2 = useTransform(smoothProgress, [0, 1], [45, -45], { clamp: false });
  const colYs = [colY0, colY1, colY2];

  const filteredProjects = projectsData.filter(
    (p) => filter === 'all' || p.category === filter
  );

  return (
    <section
      ref={ref}
      id="projects"
      className="py-20 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto border-t border-[#264653]/50"
    >
      {/* Header — Option 2 Theme */}
      <motion.div
        style={{ y: backgroundY }}
        className="flex flex-col md:flex-row md:items-end justify-between mb-12 text-left will-change-transform"
      >
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#2A9D8F] animate-pulse" />
            <span className="badge-telemetry">SECTION 02: SELECTED ENGINEERING WORK</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#E9ECEF] tracking-tight">
            Verified Project Case Studies
          </h2>
        </div>

        {/* Category Filters with signature motion.dev layoutId spring indicator */}
        <div role="tablist" aria-label="Filter case studies by domain" className="flex flex-wrap gap-1 p-1 rounded-xl bg-[#16272F]/90 border border-[#264653] mt-4 md:mt-0">
          {(['all', 'signals', 'imaging', 'embedded', 'software'] as const).map((cat) => (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={filter === cat}
              aria-controls="projects-grid"
              onClick={() => setFilter(cat)}
              className={`relative px-3.5 py-1.5 rounded-lg text-xs font-telemetry uppercase tracking-wider transition-colors cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#2A9D8F] ${
                filter === cat ? 'text-[#0B1317] font-bold' : 'text-[#ADB5BD] hover:text-[#E9ECEF]'
              }`}
            >
              {filter === cat && (
                <motion.div
                  layoutId="activeFilterPill"
                  className="absolute inset-0 bg-[#2A9D8F] rounded-lg shadow-md"
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Projects Grid with Differential Multi-Plane Parallax & Spring Hover */}
      <div id="projects-grid" role="region" aria-label="Project Case Studies Grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            style={{ y: colYs[index % colYs.length] }}
            whileHover={{ y: -6, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
            className="surface-instrument-card rounded-2xl p-6 flex flex-col justify-between group relative overflow-hidden will-change-transform"
          >
            {/* Top Bar: Status & Category */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="font-telemetry text-xs font-bold text-[#2A9D8F]">
                    {String(index + 1).padStart(3, '0')}
                  </span>
                  <span className="badge-telemetry text-[10px]">
                    {project.category.toUpperCase()}
                  </span>
                </div>
                <span className="text-[11px] font-telemetry text-[#ADB5BD]">
                  {project.date}
                </span>
              </div>

              {/* Title & Organization */}
              <h3 className="font-display text-lg font-bold text-[#E9ECEF] group-hover:text-[#2A9D8F] transition-colors mb-1.5 leading-snug">
                {project.title}
              </h3>

              {project.organization && (
                <div className="text-xs font-telemetry text-[#2A9D8F] mb-3">
                  {project.organization}
                </div>
              )}

              {/* Summary */}
              <p className="text-xs text-[#CED4DA] leading-relaxed mb-4 line-clamp-3">
                {project.summary}
              </p>

              {/* Tech Badges */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {project.technologies.slice(0, 4).map((tech, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-telemetry px-2 py-0.5 rounded bg-[#16272F] text-[#CED4DA] border border-[#264653]"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 4 && (
                  <span className="text-[10px] font-telemetry px-1.5 py-0.5 rounded text-[#ADB5BD]">
                    +{project.technologies.length - 4}
                  </span>
                )}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-[#264653]/60 flex items-center justify-between">
              <motion.button
                type="button"
                onClick={() => setSelectedProject(project)}
                whileHover={{ x: 3 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-1.5 text-xs font-display font-medium text-[#2A9D8F] hover:text-[#E9ECEF] transition-colors cursor-pointer focus:outline-none focus:underline"
              >
                <span>Read Full Case Study</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </motion.button>

              <div className="flex items-center gap-2">
                {project.evidenceLinks.github && (
                  <motion.a
                    href={project.evidenceLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-1.5 rounded bg-[#16272F] border border-[#264653] text-[#ADB5BD] hover:text-[#2A9D8F] transition-colors focus:outline-none focus:ring-1 focus:ring-[#2A9D8F]"
                    aria-label={`GitHub repository for ${project.title}`}
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                  </motion.a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Full Architectural Case Study Modal with AnimatePresence */}
      <AnimatePresence>
        {selectedProject && (
          <CaseStudyModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};
