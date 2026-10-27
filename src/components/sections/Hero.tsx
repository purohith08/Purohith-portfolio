import React from 'react';
import { ArrowDownRight, Layers, Activity, Cpu, Terminal, ShieldCheck } from 'lucide-react';
import { profileData } from '../../data/profile';
import { GithubIcon, LinkedinIcon } from '../ui/Icons';

interface HeroProps {
  onExploreProjects?: () => void;
}

export const Hero: React.FC<HeroProps> = () => {
  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center pt-32 pb-16 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto z-10">
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Asymmetrical Precision Scientific Information */}
        <div className="lg:col-span-8 flex flex-col items-start text-left">
          
          {/* Instrument Status Ribbon */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0F1A2E]/90 border border-white/10 text-xs font-telemetry text-[#94A3B8] mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#0AE4BA] animate-pulse" />
            <span className="text-[#00F2FE] font-medium">STATUS: ACTIVE RESEARCH & DEV</span>
            <span className="text-white/20">|</span>
            <span className="text-[#F1F5F9]">TRICHY, INDIA</span>
          </div>

          {/* Headline: Medical Systems & Biosignals */}
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08] mb-6">
            Engineering software for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F2FE] via-[#0AE4BA] to-[#4E80EE]">
              medical imaging
            </span>{' '}
            and physiological signals.
          </h1>

          {/* Direct, domain-rigorous proposition */}
          <p className="text-base sm:text-lg text-[#94A3B8] max-w-2xl font-sans leading-relaxed mb-8">
            {profileData.shortBio}
          </p>

          {/* Quick-Action Command Line & CTA Links */}
          <div className="flex flex-wrap items-center gap-4 mb-10">
            <a
              href="#imaging"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-lg bg-[#00F2FE] text-[#060911] hover:bg-[#0AE4BA] font-display font-semibold text-xs tracking-wider uppercase transition-all shadow-lg shadow-[#00F2FE]/20"
            >
              <span>Explore Medical Viewport</span>
              <ArrowDownRight className="w-4 h-4" />
            </a>

            <a
              href="#signals"
              className="inline-flex items-center gap-2.5 px-5 py-3 rounded-lg bg-[#0F1A2E] border border-white/10 text-[#F1F5F9] hover:border-[#00F2FE]/50 hover:text-[#00F2FE] font-display font-medium text-xs tracking-wider uppercase transition-all"
            >
              <Activity className="w-4 h-4 text-[#0AE4BA]" />
              <span>EEG / sEMG Pipeline</span>
            </a>

            <div className="flex items-center gap-2 pl-2 border-l border-white/10">
              <a
                href={profileData.contact.gitHub}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="p-2.5 rounded-lg bg-[#0A1120] border border-white/10 text-[#94A3B8] hover:text-[#00F2FE] hover:border-[#00F2FE]/40 transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={profileData.contact.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="p-2.5 rounded-lg bg-[#0A1120] border border-white/10 text-[#94A3B8] hover:text-[#00F2FE] hover:border-[#00F2FE]/40 transition-colors"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Verified Engineering Pillar Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-3xl pt-6 border-t border-white/10">
            <div className="surface-instrument-card p-3 rounded-lg flex items-center gap-3">
              <div className="p-2 rounded bg-[#00F2FE]/10 text-[#00F2FE]">
                <Layers className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="font-telemetry text-[11px] text-[#94A3B8] block">Medical Desktop</span>
                <span className="font-display text-xs font-semibold text-white">Qt C++ DICOM Cine</span>
              </div>
            </div>

            <div className="surface-instrument-card p-3 rounded-lg flex items-center gap-3">
              <div className="p-2 rounded bg-[#0AE4BA]/10 text-[#0AE4BA]">
                <Activity className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="font-telemetry text-[11px] text-[#94A3B8] block">Biosignal Processing</span>
                <span className="font-display text-xs font-semibold text-white">EEG / sEMG / FBCSP</span>
              </div>
            </div>

            <div className="surface-instrument-card p-3 rounded-lg flex items-center gap-3">
              <div className="p-2 rounded bg-[#4E80EE]/10 text-[#4E80EE]">
                <Cpu className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="font-telemetry text-[11px] text-[#94A3B8] block">Embedded Systems</span>
                <span className="font-display text-xs font-semibold text-white">ESP32 / FreeRTOS / ADC</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Verified Laboratory Telemetry Data Card */}
        <div className="lg:col-span-4 w-full">
          <div className="surface-instrument rounded-2xl p-6 border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00F2FE]/10 rounded-full blur-2xl pointer-events-none" />
            
            {/* Terminal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#00F2FE]" />
                <span className="font-telemetry text-xs text-white font-semibold">LAB TELEMETRY METRICS</span>
              </div>
              <span className="badge-telemetry-emerald text-[10px]">VERIFIED</span>
            </div>

            {/* Metrics List from Profile Data */}
            <div className="space-y-4 text-left">
              {profileData.metricsSummary.map((metric, i) => (
                <div key={i} className="p-3 rounded-lg surface-panel-inset">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-telemetry text-[11px] text-[#94A3B8] uppercase">
                      {metric.label}
                    </span>
                    <span className="font-display text-sm font-semibold text-[#00F2FE]">
                      {metric.value}
                    </span>
                  </div>
                  <p className="text-xs text-[#94A3B8] leading-tight">
                    {metric.detail}
                  </p>
                </div>
              ))}
            </div>

            {/* Notice / Security boundary */}
            <div className="mt-5 pt-4 border-t border-white/10 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#0AE4BA] shrink-0 mt-0.5" />
              <p className="text-[11px] text-[#64748B] text-left leading-normal font-telemetry">
                Public technical disclosure strictly adheres to commercial NDA and DRDO public security boundaries.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
