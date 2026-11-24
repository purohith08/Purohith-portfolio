import React from 'react';
import { X, ExternalLink, ShieldAlert, GitBranch } from 'lucide-react';
import type { ProjectCaseStudy } from '../../data/projects';

interface CaseStudyModalProps {
  project: ProjectCaseStudy | null;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-[#171916]/65 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
    >
      <div 
        className="relative w-full max-w-4xl bg-[#F5F3EE] border border-[#D9D5CC] rounded-2xl shadow-xl overflow-hidden my-8 max-h-[90vh] flex flex-col text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#D9D5CC] bg-[#ECE8E0]/70">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded text-xs font-mono font-semibold bg-[#FFFFFF] text-[#315B4C] border border-[#D9D5CC]">
              {project.status}
            </span>
            <span className="text-xs font-mono text-[#595D56]">{project.date}</span>
            {project.organization && (
              <span className="hidden sm:inline text-xs font-mono text-[#171916]">
                • {project.organization}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded text-[#595D56] hover:text-[#171916] hover:bg-[#D9D5CC]/60 transition-colors cursor-pointer"
            aria-label="Close Case Study"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8 text-[#171916]">
          
          {/* Title & Subtitle */}
          <div>
            <h2 id="case-study-title" className="font-editorial text-2xl sm:text-4xl text-[#171916] mb-2 leading-tight">
              {project.title}
            </h2>
            <p className="text-sm sm:text-base text-[#595D56] font-normal leading-relaxed">
              {project.subtitle}
            </p>
          </div>

          {/* Confidentiality Warning if applicable */}
          {project.confidentialityNote && (
            <div className="p-4 rounded-xl bg-[#ECE8E0] border border-[#B66B49]/40 flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-[#B66B49] shrink-0 mt-0.5" />
              <div className="text-xs text-[#171916] leading-relaxed font-normal">
                <span className="font-semibold text-[#B66B49]">Compliance & Confidentiality:</span> {project.confidentialityNote}
              </div>
            </div>
          )}

          {/* Problem & Solution Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-[#FFFFFF] border border-[#D9D5CC]">
              <h3 className="text-[10px] font-mono uppercase tracking-wider text-[#B66B49] mb-2 font-semibold">
                Clinical / Engineering Problem
              </h3>
              <p className="text-xs sm:text-sm text-[#595D56] leading-relaxed font-normal">
                {project.problem}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#FFFFFF] border border-[#D9D5CC]">
              <h3 className="text-[10px] font-mono uppercase tracking-wider text-[#315B4C] mb-2 font-semibold">
                Engineered Solution
              </h3>
              <p className="text-xs sm:text-sm text-[#595D56] leading-relaxed font-normal">
                {project.solution}
              </p>
            </div>
          </div>

          {/* System Architecture & Workflow Pipeline */}
          <div className="p-6 rounded-xl bg-[#ECE8E0]/60 border border-[#D9D5CC]">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#171916] mb-4 font-semibold flex items-center gap-2">
              <GitBranch className="w-4 h-4 text-[#315B4C]" />
              System Architecture & Data Pipeline
            </h3>
            <div className="space-y-3">
              {project.architectureWorkflow.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm">
                  <div className="w-5 h-5 rounded bg-[#FFFFFF] border border-[#D9D5CC] flex items-center justify-center font-mono text-[#171916] shrink-0 text-xs mt-0.5 font-semibold">
                    {idx + 1}
                  </div>
                  <div className="text-[#171916] pt-0.5 leading-relaxed font-normal">{step}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Personal Key Contributions */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#8A8E85] mb-3 font-semibold">
              Direct Contributions & Modules
            </h3>
            <ul className="space-y-2">
              {project.keyContributions.map((item, idx) => (
                <li key={idx} className="text-xs sm:text-sm text-[#171916] flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#315B4C] mt-2 shrink-0" />
                  <span className="leading-relaxed font-normal">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technical Stack Tags */}
          <div>
            <h3 className="text-[10px] font-mono uppercase tracking-wider text-[#8A8E85] mb-2.5 font-semibold">
              Technologies & Frameworks
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded text-xs font-mono bg-[#ECE8E0] text-[#171916] border border-[#D9D5CC]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Validation Metrics & Limitations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-[#D9D5CC]">
            <div>
              <h3 className="text-[10px] font-mono uppercase tracking-wider text-[#315B4C] mb-2 font-semibold">
                Validation & Empirical Evidence
              </h3>
              <p className="text-xs text-[#595D56] leading-relaxed font-normal">
                {project.validationMetrics}
              </p>
            </div>
            <div>
              <h3 className="text-[10px] font-mono uppercase tracking-wider text-[#B66B49] mb-2 font-semibold">
                Limitations & Future Iteration
              </h3>
              <p className="text-xs text-[#595D56] leading-relaxed font-normal">
                {project.limitationsAndFuture}
              </p>
            </div>
          </div>

        </div>

        {/* Modal Footer with Links */}
        <div className="p-6 border-t border-[#D9D5CC] bg-[#ECE8E0]/70 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-[#595D56] font-mono">
            {project.evidenceLinks.notes && <span>{project.evidenceLinks.notes}</span>}
          </div>

          <div className="flex items-center gap-3">
            {project.evidenceLinks.github && (
              <a
                href={project.evidenceLinks.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded bg-[#FFFFFF] border border-[#D9D5CC] hover:border-[#171916] text-[#171916] text-xs font-mono transition-colors"
              >
                <span>Source Repository</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#595D56]" />
              </a>
            )}
            <button
              onClick={onClose}
              className="px-5 py-2 rounded bg-[#171916] hover:bg-[#315B4C] text-[#F5F3EE] font-semibold text-xs transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
