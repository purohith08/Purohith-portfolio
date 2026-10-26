import React, { useState } from 'react';
import { Send, Copy, Check, ShieldCheck, Terminal } from 'lucide-react';
import { profileData } from '../../data/profile';
import { GithubIcon, LinkedinIcon } from '../ui/Icons';

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <footer id="contact" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-900 bg-[#05070b]">
      <div className="max-w-5xl mx-auto">
        
        {/* Recruiter Contact CTA Card */}
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border-teal-500/25 bg-slate-950/90 relative overflow-hidden mb-16 shadow-2xl">
          
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-950/60 border border-teal-500/30 text-xs font-mono text-teal-300 mb-4">
                <Terminal className="w-3.5 h-3.5" />
                <span>DIRECT ACCESS FOR RECRUITERS & ENGINEERING LEADS</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 mb-3 tracking-tight">
                Let's Discuss MedTech & Engineering Systems
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Open to discussions regarding full-time biomedical software engineering, biosignal processing pipelines, and medical desktop application roles.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
              <a
                href={`mailto:${profileData.contact.email}`}
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-950 font-bold text-xs sm:text-sm font-mono hover:brightness-110 shadow-lg shadow-teal-500/25 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>COMPOSE EMAIL</span>
              </a>

              <button
                onClick={handleCopyEmail}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-200 text-xs font-mono transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-teal-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
                <span>{copied ? "COPIED TO CLIPBOARD" : "COPY EMAIL"}</span>
              </button>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-400" />
              <span>{profileData.contact.email}</span>
            </div>
            <div className="flex items-center gap-6">
              <a
                href={profileData.contact.linkedIn}
                target="_blank"
                rel="noreferrer"
                className="hover:text-teal-300 transition-colors flex items-center gap-1.5"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>
              <a
                href={profileData.contact.gitHub}
                target="_blank"
                rel="noreferrer"
                className="hover:text-teal-300 transition-colors flex items-center gap-1.5"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
            </div>
          </div>

        </div>

        {/* Footer Meta */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-400 pt-8 border-t border-slate-900 gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-teal-400" />
            <span>Built in compliance with the Professional Master Plan • S. Purohith</span>
          </div>

          <div className="text-slate-400 text-center sm:text-right">
            <span>React + TypeScript + Three.js + Tailwind CSS</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
