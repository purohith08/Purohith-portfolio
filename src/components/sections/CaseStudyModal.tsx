import React from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import type { ProjectCaseStudy } from '../../data/projects';
import { GithubIcon } from '../ui/Icons';

interface CaseStudyModalProps {
  project: ProjectCaseStudy;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
      <div 
        className="surface-instrument w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 shadow-2xl p-6 sm:p-8 text-left relative"
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-study-title"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-lg surface-panel-inset text-[#94A3B8] hover:text-white transition-colors"
          aria-label="Close Case Study"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Ribbon */}
        <div className="flex items-center gap-2 mb-3">
          <span className="badge-telemetry">{project.category.toUpperCase()}</span>
          <span className="text-xs font-telemetry text-[#0AE4BA]">{project.status}</span>
          <span className="text-xs font-telemetry text-[#64748B]">• {project.date}</span>
        </div>

        <h2 id="case-study-title" className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">
          {project.title}
        </h2>

        {project.organization && (
          <div className="text-sm font-telemetry text-[#00F2FE] mb-6">
            {project.organization}
          </div>
        )}

        {/* Section: Problem & Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 pt-6 border-t border-white/10">
          <div className="surface-panel-inset p-4 rounded-xl border border-white/5">
            <h4 className="font-telemetry text-xs font-bold text-[#FF5E7E] uppercase mb-2">
              Clinical & Engineering Problem
            </h4>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              {project.problem}
            </p>
          </div>

          <div className="surface-panel-inset p-4 rounded-xl border border-white/5">
            <h4 className="font-telemetry text-xs font-bold text-[#0AE4BA] uppercase mb-2">
              Engineered Solution
            </h4>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              {project.solution}
            </p>
          </div>
        </div>

        {/* Architecture & Workflow */}
        <div className="my-6">
          <h4 className="font-telemetry text-xs font-bold text-[#00F2FE] uppercase mb-3">
            System Architecture & Pipeline Steps
          </h4>
          <div className="space-y-2">
            {project.architectureWorkflow.map((step, idx) => (
              <div key={idx} className="p-3 rounded-lg surface-panel-inset flex items-start gap-3 text-xs">
                <span className="font-telemetry text-[#00F2FE] font-bold">0{idx + 1}.</span>
                <span className="text-[#F1F5F9] font-sans">{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Key Contributions */}
        <div className="my-6">
          <h4 className="font-telemetry text-xs font-bold text-[#00F2FE] uppercase mb-3">
            Key Engineering Contributions
          </h4>
          <div className="space-y-2">
            {project.keyContributions.map((contrib, idx) => (
              <div key={idx} className="flex items-start gap-3 text-xs text-[#94A3B8]">
                <CheckCircle2 className="w-4 h-4 text-[#0AE4BA] shrink-0 mt-0.5" />
                <span className="font-sans leading-relaxed">{contrib}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Validation & Limitations */}
        <div className="p-4 rounded-xl surface-panel-inset border border-white/5 my-6 text-xs space-y-2">
          <div className="font-telemetry text-[#0AE4BA] font-semibold">
            Validation & Verification:
          </div>
          <p className="text-[#94A3B8]">
            {project.validationMetrics}
          </p>
          <div className="font-telemetry text-[#64748B] pt-2">
            Limitations: {project.limitationsAndFuture}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((t, idx) => (
              <span key={idx} className="badge-telemetry text-[10px]">
                {t}
              </span>
            ))}
          </div>

          {project.evidenceLinks.github && (
            <a
              href={project.evidenceLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#00F2FE] text-[#060911] font-display text-xs font-semibold hover:bg-[#0AE4BA] transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
              <span>View Source on GitHub</span>
            </a>
          )}
        </div>

      </div>
    </div>
  );
};
