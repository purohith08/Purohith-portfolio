import React, { useState } from 'react';
import { 
  ArrowUpRight, 
  ExternalLink, 
  ShieldCheck 
} from 'lucide-react';
import { projectsData } from '../../data/projects';
import type { ProjectCaseStudy, ProjectCategory } from '../../data/projects';
import { CaseStudyModal } from './CaseStudyModal';
import { EEGWorkbench } from './EEGWorkbench';
import { DICOMViewport } from './DICOMViewport';

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
    { label: 'Biosignals (EEG/sEMG)', value: 'signals' },
    { label: 'Medical Imaging', value: 'imaging' },
    { label: 'Embedded & Sensors', value: 'embedded' },
    { label: 'Medical Software', value: 'software' },
  ];

  return (
    <section id="work" className="py-28 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto border-t border-[#D9D5CC]">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#ECE8E0] text-[11px] font-mono text-[#595D56] mb-3">
            <span>SELECTED CASE STUDIES</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-5xl font-normal text-[#171916] tracking-tight">
            Featured Engineering Systems
          </h2>
        </div>
        <p className="text-sm sm:text-base text-[#595D56] max-w-md font-normal leading-relaxed">
          Comprehensive project case studies covering algorithm workflows, desktop architectures, and empirical validation.
        </p>
      </div>

      {/* Featured Project 1: EEG Motor-Imagery (with Interactive Workbench Embed) */}
      <div className="surface-card rounded-2xl p-8 sm:p-10 mb-16 border border-[#D9D5CC]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[11px] font-mono text-[#315B4C] font-semibold">
                  01 // RESEARCH CAPSTONE
                </span>
                <span className="text-[11px] font-mono text-[#8A8E85]">2025 - 2026</span>
              </div>

              <h3 className="font-editorial text-2xl sm:text-3xl text-[#171916] mb-3">
                Low-Cost Motor Imagery EEG-Based Prosthetic Hand Controller
              </h3>

              <p className="text-sm text-[#595D56] leading-relaxed mb-6">
                Engineered an end-to-end motor imagery decoding pipeline designed for non-invasive assistive prosthetic control. Evaluated Filter Bank Common Spatial Patterns (FBCSP) and spatial filtering with SVM and EEGNet neural pipelines.
              </p>

              <div className="space-y-2 mb-6 text-xs text-[#171916]">
                <div className="flex items-start gap-2">
                  <span className="font-mono text-[#315B4C] font-bold">•</span>
                  <span><strong>Algorithm Flow:</strong> Raw EEG $\rightarrow$ 8-30Hz bandpass $\rightarrow$ FBCSP spatial covariance $\rightarrow$ SVM / EEGNet classifier.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-mono text-[#315B4C] font-bold">•</span>
                  <span><strong>Contribution:</strong> Python preprocessing pipelines, trial cross-validation, and interactive latency game mapping.</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-8">
                {['Python', 'MNE-Python', 'NumPy', 'SciPy', 'scikit-learn', 'EEGNet'].map((tech) => (
                  <span key={tech} className="px-2.5 py-1 rounded bg-[#ECE8E0] text-[11px] font-mono text-[#171916]">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4 border-t border-[#D9D5CC]">
              <button
                onClick={() => setSelectedCaseStudy(featuredProjects[0])}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#171916] hover:text-[#315B4C] transition-colors cursor-pointer"
              >
                <span>Read Full Case Study</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              <a
                href="https://github.com/purohith08/BCI-IV-YEAR-project"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-mono text-[#595D56] hover:text-[#171916] transition-colors flex items-center gap-1"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>GitHub Repo</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-7">
            <EEGWorkbench />
          </div>
        </div>
      </div>

      {/* Featured Project 2: Qt/C++ Medical Imaging (with Interactive Viewport Embed) */}
      <div className="surface-card rounded-2xl p-8 sm:p-10 mb-16 border border-[#D9D5CC]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[11px] font-mono text-[#B66B49] font-semibold">
                  02 // MEDICAL SOFTWARE EMPLOYMENT
                </span>
                <span className="text-[11px] font-mono text-[#8A8E85]">Suntrion Technosol</span>
              </div>

              <h3 className="font-editorial text-2xl sm:text-3xl text-[#171916] mb-3">
                Medical Imaging & Cine Desktop Application
              </h3>

              <p className="text-sm text-[#595D56] leading-relaxed mb-6">
                Contributed to desktop medical imaging software, focusing on high-framerate viewport behavior, DICOM/cine loop rendering, layout responsiveness, and clinical workflow UI optimization.
              </p>

              <div className="space-y-2 mb-6 text-xs text-[#171916]">
                <div className="flex items-start gap-2">
                  <span className="font-mono text-[#B66B49] font-bold">•</span>
                  <span><strong>Workstation Controls:</strong> Smooth cine playback, window/level adjustments, and multi-slice layout memory caching.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-mono text-[#B66B49] font-bold">•</span>
                  <span><strong>Compliance Note:</strong> Framed strictly in public-safe engineering architectural terms under employer NDA.</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-8">
                {['C++', 'Qt / Qt Widgets', 'DICOM workflows', 'Visual Studio', 'Image Pipelines'].map((tech) => (
                  <span key={tech} className="px-2.5 py-1 rounded bg-[#ECE8E0] text-[11px] font-mono text-[#171916]">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4 border-t border-[#D9D5CC]">
              <button
                onClick={() => setSelectedCaseStudy(featuredProjects[1])}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#171916] hover:text-[#315B4C] transition-colors cursor-pointer"
              >
                <span>Read Full Case Study</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-7">
            <DICOMViewport />
          </div>
        </div>
      </div>

      {/* Featured Project 3: DEBEL-DRDO sEMG Gait Research */}
      <div className="surface-card rounded-2xl p-8 sm:p-10 mb-20 border border-[#D9D5CC]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[11px] font-mono text-[#315B4C] font-semibold">
                03 // DEFENSE RESEARCH INTERNSHIP
              </span>
              <span className="text-[11px] font-mono text-[#8A8E85]">DEBEL - DRDO</span>
            </div>

            <h3 className="font-editorial text-2xl sm:text-3xl text-[#171916] mb-3">
              Bilateral Muscle Synergy Analysis of Human Gait (sEMG)
            </h3>

            <p className="text-sm text-[#595D56] leading-relaxed mb-6">
              Surface electromyography (sEMG) acquisition, artifact filtering, and muscle synergy extraction across gait cycles during a research internship at DEBEL-DRDO, Bengaluru.
            </p>

            <div className="flex items-center gap-4 pt-2">
              <button
                onClick={() => setSelectedCaseStudy(featuredProjects[2])}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#171916] hover:text-[#315B4C] transition-colors cursor-pointer"
              >
                <span>Inspect DRDO Research Methodology</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 bg-[#ECE8E0]/60 rounded-xl p-6 border border-[#D9D5CC]">
            <h4 className="text-xs font-mono text-[#8A8E85] uppercase tracking-wider mb-3">
              Biomechanical Data & Synergy Pipeline (Public-Safe Methods)
            </h4>
            
            <div className="space-y-3 text-xs text-[#171916]">
              <div className="p-3 bg-[#FFFFFF] rounded border border-[#D9D5CC] flex items-start gap-3">
                <span className="w-5 h-5 rounded bg-[#ECE8E0] text-[10px] font-mono font-bold flex items-center justify-center shrink-0">1</span>
                <div>
                  <strong>SENIAM Acquisition & Bandpass:</strong> 20–450 Hz 4th-order Butterworth filter + 50 Hz notch filter removing motion artifacts.
                </div>
              </div>

              <div className="p-3 bg-[#FFFFFF] rounded border border-[#D9D5CC] flex items-start gap-3">
                <span className="w-5 h-5 rounded bg-[#ECE8E0] text-[10px] font-mono font-bold flex items-center justify-center shrink-0">2</span>
                <div>
                  <strong>Linear Envelope:</strong> Full-wave rectification followed by low-pass filtering (4–10 Hz) capturing muscle activation profiles.
                </div>
              </div>

              <div className="p-3 bg-[#FFFFFF] rounded border border-[#D9D5CC] flex items-start gap-3">
                <span className="w-5 h-5 rounded bg-[#ECE8E0] text-[10px] font-mono font-bold flex items-center justify-center shrink-0">3</span>
                <div>
                  <strong>NMF Decomposition:</strong> Matrix factorized into spatial synergy weights ($W$) and time-varying activation coefficients ($H$).
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#D9D5CC] flex items-center gap-2 text-[11px] font-mono text-[#595D56]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#315B4C]" />
              <span>Complies strictly with DRDO public disclosure boundaries.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Projects Section */}
      <div className="pt-12 border-t border-[#D9D5CC]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <h3 className="font-editorial text-2xl text-[#171916]">
              Secondary Engineering Prototypes
            </h3>
            <p className="text-xs text-[#595D56]">
              Embedded systems, clinic management architectures, and exploratory optical instrumentation.
            </p>
          </div>

          {/* Domain Filter Pills */}
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-3 py-1 rounded text-xs font-mono transition-colors cursor-pointer ${
                  activeCategory === cat.value
                    ? 'bg-[#171916] text-[#F5F3EE] font-semibold'
                    : 'bg-[#ECE8E0] text-[#595D56] hover:text-[#171916]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Secondary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredSecondary.map((project) => (
            <div
              key={project.id}
              className="surface-card p-6 rounded-xl border border-[#D9D5CC] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-[#315B4C] uppercase font-semibold">
                    {project.status}
                  </span>
                  <span className="text-[10px] font-mono text-[#8A8E85]">{project.date}</span>
                </div>

                <h4 className="font-editorial text-lg text-[#171916] mb-2 leading-snug">
                  {project.title}
                </h4>

                <p className="text-xs text-[#595D56] mb-4 leading-relaxed">
                  {project.summary}
                </p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#ECE8E0] text-[#595D56]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-[#D9D5CC] flex items-center justify-between">
                <button
                  onClick={() => setSelectedCaseStudy(project)}
                  className="text-xs font-mono font-semibold text-[#171916] hover:text-[#315B4C] flex items-center gap-1 cursor-pointer"
                >
                  <span>Details</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
                <span className="text-[10px] font-mono text-[#8A8E85]">
                  {project.category}
                </span>
              </div>
            </div>
          ))}
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
