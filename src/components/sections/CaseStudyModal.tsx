import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, CheckCircle2 } from 'lucide-react';
import type { ProjectCaseStudy } from '../../data/projects';
import { GithubIcon } from '../ui/Icons';

interface CaseStudyModalProps {
  project: ProjectCaseStudy;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose }) => {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  // Lock body scroll when modal is mounted
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus close button on mount
    closeButtonRef.current?.focus();

    // Listen for Escape key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      className="fixed inset-0 z-60 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md"
      onClick={onClose}
      role="presentation"
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.94, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 10 }}
        transition={{ type: 'spring', stiffness: 380, damping: 28 }}
        className="surface-instrument w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-[#264653] shadow-2xl p-6 sm:p-8 text-left relative focus:outline-none"
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-study-title"
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        {/* Close Button */}
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-lg bg-[#16272F] border border-[#264653] text-[#CED4DA] hover:text-[#E9ECEF] hover:border-[#2A9D8F] transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2A9D8F]"
          aria-label="Close Case Study"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Ribbon */}
        <div className="flex items-center gap-2 mb-3">
          <span className="badge-telemetry">{project.category.toUpperCase()}</span>
          <span className="text-xs font-telemetry text-[#2A9D8F]">{project.status}</span>
          <span className="text-xs font-telemetry text-[#ADB5BD]">• {project.date}</span>
        </div>

        <h2 id="case-study-title" className="font-display text-2xl sm:text-3xl font-bold text-[#E9ECEF] mb-2 pr-10">
          {project.title}
        </h2>

        {project.organization && (
          <div className="text-sm font-telemetry text-[#2A9D8F] mb-6">
            {project.organization}
          </div>
        )}

        {/* Section: Problem & Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 pt-6 border-t border-[#264653]/60">
          <div className="bg-[#16272F]/70 p-4 rounded-xl border border-[#264653]">
            <h3 className="font-telemetry text-xs font-bold text-[#E9ECEF] uppercase mb-2">
              Clinical & Engineering Problem
            </h3>
            <p className="text-xs text-[#CED4DA] leading-relaxed">
              {project.problem}
            </p>
          </div>

          <div className="bg-[#16272F]/70 p-4 rounded-xl border border-[#264653]">
            <h3 className="font-telemetry text-xs font-bold text-[#2A9D8F] uppercase mb-2">
              Engineered Solution
            </h3>
            <p className="text-xs text-[#CED4DA] leading-relaxed">
              {project.solution}
            </p>
          </div>
        </div>

        {/* Architecture & Workflow */}
        <div className="my-6">
          <h3 className="font-telemetry text-xs font-bold text-[#2A9D8F] uppercase mb-3">
            System Architecture & Pipeline Steps
          </h3>
          <div className="space-y-2">
            {project.architectureWorkflow.map((step, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-[#16272F]/50 border border-[#264653]/60 flex items-start gap-3 text-xs">
                <span className="font-telemetry text-[#2A9D8F] font-bold">0{idx + 1}.</span>
                <span className="text-[#E9ECEF] font-sans">{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Key Contributions */}
        <div className="my-6">
          <h3 className="font-telemetry text-xs font-bold text-[#2A9D8F] uppercase mb-3">
            Key Engineering Contributions
          </h3>
          <div className="space-y-2">
            {project.keyContributions.map((contrib, idx) => (
              <div key={idx} className="flex items-start gap-3 text-xs text-[#CED4DA]">
                <CheckCircle2 className="w-4 h-4 text-[#2A9D8F] shrink-0 mt-0.5" />
                <span className="font-sans leading-relaxed text-[#E9ECEF]">{contrib}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Validation & Limitations */}
        <div className="p-4 rounded-xl bg-[#16272F]/70 border border-[#264653] my-6 text-xs space-y-2">
          <div className="font-telemetry text-[#2A9D8F] font-semibold">
            Validation & Verification:
          </div>
          <p className="text-[#CED4DA]">
            {project.validationMetrics}
          </p>
          <div className="font-telemetry text-[#ADB5BD] pt-2 border-t border-[#264653]/60">
            <span className="text-[#E9ECEF] font-medium">Boundaries & Limitations:</span> {project.limitationsAndFuture}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="pt-4 border-t border-[#264653]/60 flex flex-wrap items-center justify-between gap-4">
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#2A9D8F] text-[#0B1317] font-display text-xs font-semibold hover:bg-[#238276] transition-colors focus:outline-none focus:ring-2 focus:ring-[#2A9D8F]"
            >
              <GithubIcon className="w-4 h-4" />
              <span>View Source on GitHub</span>
            </a>
          )}
        </div>

      </motion.div>
    </motion.div>
  );
};
