import React from 'react';
import { X, ExternalLink, ShieldAlert, CheckCircle2, GitBranch } from 'lucide-react';
import type { ProjectCaseStudy } from '../../data/projects';

interface CaseStudyModalProps {
  project: ProjectCaseStudy | null;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
    >
      <div 
        className="relative w-full max-w-4xl bg-slate-950 border border-teal-500/30 rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-900/60">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-teal-500/10 text-teal-300 border border-teal-500/30">
              {project.status}
            </span>
            <span className="text-xs font-mono text-slate-400">{project.date}</span>
            {project.organization && (
              <span className="hidden sm:inline text-xs font-mono text-cyan-400">
                • {project.organization}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-400 cursor-pointer"
            aria-label="Close Case Study"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8 text-slate-200">
          
          {/* Title & Subtitle */}
          <div>
            <h2 id="case-study-title" className="text-2xl sm:text-3xl font-bold text-slate-100 mb-2">
              {project.title}
            </h2>
            <p className="text-base text-cyan-300/90 font-medium">
              {project.subtitle}
            </p>
          </div>

          {/* Confidentiality Warning if applicable */}
          {project.confidentialityNote && (
            <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/30 flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div className="text-xs text-amber-200/90 leading-relaxed">
                <span className="font-semibold text-amber-300">Confidentiality & Compliance Note:</span> {project.confidentialityNote}
              </div>
            </div>
          )}

          {/* Problem & Solution Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-slate-900/40 border border-slate-800">
              <h3 className="text-xs font-mono uppercase tracking-wider text-rose-400 mb-2 font-semibold">
                Clinical / Engineering Problem
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {project.problem}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/40 border border-slate-800">
              <h3 className="text-xs font-mono uppercase tracking-wider text-teal-400 mb-2 font-semibold">
                Engineered Solution
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* System Architecture & Workflow Pipeline */}
          <div className="p-6 rounded-xl bg-slate-900/60 border border-cyan-500/20">
            <h3 className="text-sm font-mono uppercase tracking-wider text-cyan-400 mb-4 font-semibold flex items-center gap-2">
              <GitBranch className="w-4 h-4" />
              System Architecture & Data Pipeline
            </h3>
            <div className="space-y-3">
              {project.architectureWorkflow.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm">
                  <div className="w-6 h-6 rounded-md bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center font-mono text-cyan-300 shrink-0 text-xs mt-0.5">
                    {idx + 1}
                  </div>
                  <div className="text-slate-300 pt-0.5">{step}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Personal Key Contributions */}
          <div>
            <h3 className="text-sm font-mono uppercase tracking-wider text-slate-300 mb-3 font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-400" />
              Direct Contributions & Modules
            </h3>
            <ul className="space-y-2">
              {project.keyContributions.map((item, idx) => (
                <li key={idx} className="text-xs sm:text-sm text-slate-300 flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-2 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technical Stack Tags */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2.5 font-semibold">
              Technologies & Frameworks
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-lg text-xs font-mono bg-slate-900 border border-slate-700 text-slate-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Validation Metrics & Limitations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-slate-800">
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-teal-400 mb-2 font-semibold">
                Validation & Empirical Evidence
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {project.validationMetrics}
              </p>
            </div>
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-amber-400 mb-2 font-semibold">
                Limitations & Future Iteration
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {project.limitationsAndFuture}
              </p>
            </div>
          </div>

        </div>

        {/* Modal Footer with Links */}
        <div className="p-6 border-t border-slate-800 bg-slate-900/60 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-slate-400 font-mono">
            {project.evidenceLinks.notes && <span>{project.evidenceLinks.notes}</span>}
          </div>

          <div className="flex items-center gap-3">
            {project.evidenceLinks.github && (
              <a
                href={project.evidenceLinks.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 text-xs font-mono transition-colors"
              >
                <span>SOURCE CODE</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-semibold text-xs font-mono transition-colors cursor-pointer"
            >
              DONE
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
