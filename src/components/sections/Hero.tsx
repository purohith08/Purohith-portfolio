import React from 'react';
import { ArrowDownRight, Mail, Terminal } from 'lucide-react';
import { profileData } from '../../data/profile';
import { GithubIcon, LinkedinIcon } from '../ui/Icons';

interface HeroProps {
  onExploreClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto w-full z-10 flex flex-col items-center text-center">
        
        {/* Recruiter Telemetry Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-teal-500/30 text-xs font-mono text-teal-300 mb-6 backdrop-blur-md shadow-sm shadow-teal-500/10">
          <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
          <span className="font-semibold tracking-wide">MEDTECH SOFTWARE & SYSTEMS</span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-400">{profileData.contact.availability}</span>
        </div>

        {/* Primary Identity Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-100 max-w-4xl leading-[1.1] mb-6">
          Architecting Software for{' '}
          <span className="bg-gradient-to-r from-teal-300 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
            Medical Imaging & Biosignals
          </span>
        </h1>

        {/* Focused Value Proposition */}
        <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed mb-8">
          {profileData.tagline}
        </p>

        {/* Fast Action Buttons for Technical Recruiters */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <a
            href="#projects"
            onClick={onExploreClick}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-950 font-semibold text-sm hover:brightness-110 shadow-lg shadow-teal-500/25 transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-teal-400 font-mono"
          >
            <span>EXPLORE WORK</span>
            <ArrowDownRight className="w-4 h-4" />
          </a>

          <a
            href="mailto:purohithradhalakshmi@gmail.com"
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900/80 border border-slate-700 hover:border-teal-400/50 text-slate-200 hover:text-white text-sm font-medium backdrop-blur-md transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-teal-400 font-mono"
          >
            <Mail className="w-4 h-4 text-teal-400" />
            <span>CONTACT DIRECT</span>
          </a>

          <a
            href="https://github.com/purohith08"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-5 py-3 rounded-full bg-slate-900/60 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-teal-300 text-sm font-mono transition-colors"
            title="GitHub Profile"
          >
            <GithubIcon className="w-4 h-4" />
            <span>GITHUB</span>
          </a>

          <a
            href="https://www.linkedin.com/in/purohiths/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-5 py-3 rounded-full bg-slate-900/60 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-cyan-300 text-sm font-mono transition-colors"
            title="LinkedIn Profile"
          >
            <LinkedinIcon className="w-4 h-4" />
            <span>LINKEDIN</span>
          </a>
        </div>

        {/* Telemetry Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full max-w-4xl text-left">
          {profileData.metricsSummary.map((metric, idx) => (
            <div 
              key={idx}
              className="glass-panel p-4 rounded-xl border border-slate-800/80 bg-slate-950/60"
            >
              <div className="text-[11px] font-mono text-teal-400 uppercase tracking-wider mb-1 flex items-center justify-between">
                <span>{metric.label}</span>
                <Terminal className="w-3 h-3 text-slate-500" />
              </div>
              <div className="text-base sm:text-lg font-bold text-slate-100 mb-1">
                {metric.value}
              </div>
              <div className="text-xs text-slate-400 leading-snug">
                {metric.detail}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
