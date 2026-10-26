import React, { useState } from 'react';
import { 
  FolderGit2, 
  ArrowUpRight, 
  Brain, 
  Film, 
  Activity, 
  Cpu, 
  ExternalLink 
} from 'lucide-react';
import { projectsData } from '../../data/projects';
import type { ProjectCaseStudy, ProjectCategory } from '../../data/projects';
import { CaseStudyModal } from './CaseStudyModal';

export const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | 'all'>('all');
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<ProjectCaseStudy | null>(null);

  const featuredProjects = projectsData.filter((p) => p.tier === 'featured');
  const secondaryProjects = projectsData.filter((p) => p.tier === 'secondary');

  const filteredSecondary = activeCategory === 'all' 
    ? secondaryProjects 
    : secondaryProjects.filter((p) => p.category === activeCategory);

  const categories: { label: string; value: ProjectCategory | 'all' }[] = [
    { label: 'All Domains', value: 'all' },
    { label: 'Biosignals (EEG/EMG)', value: 'signals' },
    { label: 'Medical Imaging', value: 'imaging' },
    { label: 'Embedded & Sensors', value: 'embedded' },
    { label: 'Medical Software', value: 'software' },
  ];

  const getCategoryIcon = (category: ProjectCategory) => {
    switch (category) {
      case 'signals': return Brain;
      case 'imaging': return Film;
      case 'embedded': return Cpu;
      case 'software': return Activity;
    }
  };

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-3">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>PRIMARY CASE STUDIES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight">
            Featured Engineering Systems
          </h2>
        </div>
        <p className="text-sm sm:text-base text-slate-400 max-w-md">
          Evidence-led projects with defined problem statements, signal/image pipelines, architectures, and empirical validation.
        </p>
      </div>

      {/* Featured Projects Grid (Top 3 Priority) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
        {featuredProjects.map((project, idx) => {
          const Icon = getCategoryIcon(project.category);
          return (
            <div
              key={project.id}
              className="glass-panel glass-panel-hover rounded-2xl p-7 flex flex-col justify-between relative group border-slate-800/80 bg-slate-950/70"
            >
              {/* Top Meta info */}
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-cyan-500/30 flex items-center justify-center text-cyan-300 group-hover:border-teal-400 transition-colors shadow-sm shadow-cyan-500/10">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="px-3 py-1 rounded-full text-[11px] font-mono bg-teal-500/10 text-teal-300 border border-teal-500/30">
                    {project.status}
                  </span>
                </div>

                <div className="text-[11px] font-mono text-cyan-400 mb-2">
                  0{idx + 1} // {project.organization || project.date}
                </div>

                <h3 className="text-xl font-bold text-slate-100 group-hover:text-teal-300 transition-colors mb-3 leading-snug">
                  {project.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  {project.summary}
                </p>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-slate-900/90 text-slate-300 border border-slate-800"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="px-2 py-1 text-[11px] font-mono text-slate-500">
                      +{project.technologies.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <button
                  onClick={() => setSelectedCaseStudy(project)}
                  className="flex items-center gap-1.5 text-xs font-mono font-semibold text-teal-300 hover:text-teal-200 transition-colors focus:outline-none focus:underline cursor-pointer"
                >
                  <span>INSPECT CASE STUDY</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                {project.evidenceLinks.github && (
                  <a
                    href={project.evidenceLinks.github}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 text-slate-400 hover:text-white transition-colors"
                    title="View GitHub Repository"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Secondary Projects Section */}
      <div className="pt-12 border-t border-slate-800/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-100">
              Secondary Prototypes & Research Projects
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Additional prototypes, clinic architectures, and exploratory hardware systems.
            </p>
          </div>

          {/* Domain Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                  activeCategory === cat.value
                    ? 'bg-teal-500 text-slate-950 font-semibold shadow-sm shadow-teal-500/30'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Secondary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSecondary.map((project) => {
            const Icon = getCategoryIcon(project.category);
            return (
              <div
                key={project.id}
                className="p-5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-mono text-cyan-400 flex items-center gap-1.5">
                      <Icon className="w-3.5 h-3.5" />
                      {project.status}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">{project.date}</span>
                  </div>

                  <h4 className="text-base font-bold text-slate-200 mb-2">
                    {project.title}
                  </h4>

                  <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                    {project.summary}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900 text-slate-400 border border-slate-800/80"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-900 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedCaseStudy(project)}
                    className="text-xs font-mono text-teal-400 hover:text-teal-300 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Details</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                  <span className="text-[11px] font-mono text-slate-500">
                    {project.category}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Case Study Modal */}
      <CaseStudyModal
        project={selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
      />

    </section>
  );
};
