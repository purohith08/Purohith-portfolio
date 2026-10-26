import React from 'react';
import { ArrowDownRight, Mail, Compass } from 'lucide-react';
import { profileData } from '../../data/profile';
import { GithubIcon, LinkedinIcon } from '../ui/Icons';

interface HeroProps {
  onExploreClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  return (
    <section className="relative min-h-[92vh] flex items-center pt-28 pb-16 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto">
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center z-10">
        
        {/* Left Column: Asymmetric Editorial Typography */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          
          {/* Status Label */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#ECE8E0] border border-[#D9D5CC] text-[11px] font-mono text-[#595D56] mb-6 tracking-wide">
            <span className="w-2 h-2 rounded-full bg-[#315B4C]" />
            <span className="font-semibold text-[#171916]">S. PUROHITH</span>
            <span className="text-[#8A8E85]">/</span>
            <span>BIOMEDICAL ENGINEERING & SOFTWARE</span>
          </div>

          {/* Primary Editorial Headline */}
          <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-[#171916] leading-[1.06] mb-6">
            Engineering software for{' '}
            <span className="font-editorial-italic font-normal text-[#315B4C]">
              medical imaging
            </span>{' '}
            and physiological signals.
          </h1>

          {/* Clear, quiet value proposition */}
          <p className="text-base sm:text-lg text-[#595D56] max-w-xl font-normal leading-relaxed mb-8">
            Combining biomedical engineering domain rigor with native C++, Qt, Python pipelines, and deep motor-imagery signal processing.
          </p>

          {/* Recruiter First-Actions */}
          <div className="flex flex-wrap items-center gap-3.5 mb-10">
            <a
              href="#work"
              onClick={onExploreClick}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-[#171916] text-[#F5F3EE] hover:bg-[#315B4C] text-xs font-semibold tracking-wide transition-colors shadow-xs"
            >
              <span>Explore Selected Work</span>
              <ArrowDownRight className="w-3.5 h-3.5" />
            </a>

            <a
              href={`mailto:${profileData.contact.email}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded border border-[#D9D5CC] bg-[#FFFFFF] hover:border-[#171916] text-[#171916] text-xs font-medium transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#595D56]" />
              <span>Contact Directly</span>
            </a>

            <div className="flex items-center gap-2 ml-1">
              <a
                href={profileData.contact.gitHub}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded border border-[#D9D5CC] bg-[#FFFFFF] text-[#595D56] hover:text-[#171916] hover:border-[#171916] transition-colors"
                title="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={profileData.contact.linkedIn}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded border border-[#D9D5CC] bg-[#FFFFFF] text-[#595D56] hover:text-[#171916] hover:border-[#171916] transition-colors"
                title="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Editorial Facts Row */}
          <div className="w-full pt-6 border-t border-[#D9D5CC] grid grid-cols-2 sm:grid-cols-3 gap-6 text-left">
            <div>
              <div className="text-[10px] font-mono text-[#8A8E85] uppercase tracking-wider mb-1">
                Primary Stack
              </div>
              <div className="text-sm font-semibold text-[#171916]">
                C++, Qt, Python
              </div>
              <div className="text-xs text-[#595D56]">
                Desktop & Signal Pipelines
              </div>
            </div>

            <div>
              <div className="text-[10px] font-mono text-[#8A8E85] uppercase tracking-wider mb-1">
                Research Focus
              </div>
              <div className="text-sm font-semibold text-[#171916]">
                DEBEL-DRDO
              </div>
              <div className="text-xs text-[#595D56]">
                sEMG Muscle Synergy Analysis
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <div className="text-[10px] font-mono text-[#8A8E85] uppercase tracking-wider mb-1">
                Capstone Work
              </div>
              <div className="text-sm font-semibold text-[#171916]">
                EEG Motor-Imagery
              </div>
              <div className="text-xs text-[#595D56]">
                FBCSP + SVM / EEGNet
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Spatial Frame for 3D Art-Directed Scene */}
        <div className="lg:col-span-5 h-[380px] sm:h-[460px] lg:h-[520px] relative rounded-xl border border-[#D9D5CC] bg-gradient-to-b from-[#ECE8E0]/40 to-[#F5F3EE] p-4 flex items-end justify-between shadow-xs overflow-hidden">
          
          {/* 3D Scene viewport background indicator */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-2 text-[10px] font-mono text-[#595D56] bg-[#FFFFFF]/80 backdrop-blur-xs px-2.5 py-1 rounded border border-[#D9D5CC]">
            <Compass className="w-3 h-3 text-[#315B4C]" />
            <span>Interactive Neural Mesh & Volumetric Sweep</span>
          </div>

          <div className="absolute top-4 right-4 z-20 text-[10px] font-mono text-[#8A8E85]">
            FIG 0.1
          </div>

          {/* Caption footnote */}
          <div className="z-20 w-full pt-3 border-t border-[#D9D5CC]/80 flex items-center justify-between text-[11px] font-mono text-[#595D56]">
            <span>Drag to inspect spatial coordinates</span>
            <span className="text-[#315B4C] font-semibold">60 FPS Restrained Rig</span>
          </div>

        </div>

      </div>
    </section>
  );
};
