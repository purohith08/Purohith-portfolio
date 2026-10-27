import React from 'react';
import { Mail, MapPin, ExternalLink, Terminal, ShieldCheck } from 'lucide-react';
import { profileData } from '../../data/profile';
import { GithubIcon, LinkedinIcon } from '../ui/Icons';

export const Contact: React.FC = () => {
  return (
    <footer id="contact" className="py-24 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto border-t border-white/10 text-left">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Direct Inquiries */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#00F2FE] animate-pulse" />
            <span className="badge-telemetry">SECTION 08: SECURE DISPATCH</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Initiate Contact & Collaboration
          </h2>

          <p className="text-sm text-[#94A3B8] max-w-xl font-sans leading-relaxed">
            {profileData.contact.availability}. Open for technical discussions regarding medical software (Qt/C++), biosignal processing, and biomedical engineering systems.
          </p>

          <div className="pt-4 space-y-3">
            <a
              href={`mailto:${profileData.contact.email}`}
              className="inline-flex items-center gap-3 p-4 rounded-xl surface-instrument border border-white/10 hover:border-[#00F2FE] transition-colors group w-full max-w-md"
            >
              <div className="p-2.5 rounded-lg bg-[#00F2FE]/10 text-[#00F2FE]">
                <Mail className="w-5 h-5" />
              </div>
              <div className="text-left">
                <span className="text-[10px] font-telemetry text-[#94A3B8] block">PRIMARY EMAIL ADDRESS</span>
                <span className="font-display font-semibold text-sm text-white group-hover:text-[#00F2FE]">
                  {profileData.contact.email}
                </span>
              </div>
            </a>

            <div className="flex items-center gap-3 p-4 rounded-xl surface-panel-inset border border-white/5 w-full max-w-md">
              <div className="p-2.5 rounded-lg bg-[#0AE4BA]/10 text-[#0AE4BA]">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="text-left">
                <span className="text-[10px] font-telemetry text-[#94A3B8] block">BASE LOCATION</span>
                <span className="font-display font-semibold text-sm text-white">
                  {profileData.contact.location}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Verified Network Nodes & Colophon */}
        <div className="lg:col-span-5 surface-instrument rounded-2xl p-6 sm:p-8 border border-white/10 shadow-2xl space-y-6">
          <div className="flex items-center gap-2 pb-4 border-b border-white/10">
            <Terminal className="w-4 h-4 text-[#00F2FE]" />
            <span className="font-telemetry text-xs text-white font-semibold">VERIFIED PROFESSIONAL NODES</span>
          </div>

          <div className="space-y-3">
            <a
              href={profileData.contact.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3.5 rounded-xl surface-panel-inset border border-white/5 hover:border-[#00F2FE]/40 text-[#94A3B8] hover:text-white transition-colors"
            >
              <div className="flex items-center gap-3">
                <LinkedinIcon className="w-4 h-4 text-[#00F2FE]" />
                <span className="font-display text-xs font-semibold text-white">LinkedIn Profile</span>
              </div>
              <ExternalLink className="w-4 h-4 opacity-70" />
            </a>

            <a
              href={profileData.contact.gitHub}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3.5 rounded-xl surface-panel-inset border border-white/5 hover:border-[#00F2FE]/40 text-[#94A3B8] hover:text-white transition-colors"
            >
              <div className="flex items-center gap-3">
                <GithubIcon className="w-4 h-4 text-[#0AE4BA]" />
                <span className="font-display text-xs font-semibold text-white">GitHub Repositories</span>
              </div>
              <ExternalLink className="w-4 h-4 opacity-70" />
            </a>
          </div>

          {/* Colophon Note */}
          <div className="pt-4 border-t border-white/10 text-[11px] font-telemetry text-[#64748B] space-y-2">
            <div className="flex items-center gap-1.5 text-[#0AE4BA]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>STRICT TYPESCRIPT & GSAP ARCHITECTURE</span>
            </div>
            <p>
              Designed and built for S. Purohith. React 19, Three.js, React Three Fiber, GSAP, and Vite.
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
};
