import React, { useState } from 'react';
import { Send, Copy, Check, ShieldCheck, ArrowUpRight } from 'lucide-react';
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
    <footer id="contact" className="py-28 px-6 sm:px-8 lg:px-12 border-t border-[#D9D5CC] bg-[#ECE8E0]/40">
      <div className="max-w-5xl mx-auto">
        
        {/* Editorial Contact Card */}
        <div className="surface-card rounded-2xl p-8 sm:p-12 border border-[#D9D5CC] mb-16 shadow-xs">
          
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-8">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#ECE8E0] text-[11px] font-mono text-[#595D56] mb-4">
                <span>DIRECT ACCESS FOR RECRUITERS & ENGINEERING LEADS</span>
              </div>

              <h2 className="font-editorial text-3xl sm:text-4xl text-[#171916] mb-3">
                Let's discuss medical software & biosignal engineering.
              </h2>

              <p className="text-sm sm:text-base text-[#595D56] leading-relaxed font-normal">
                Available for full-time biomedical software engineering, desktop medical imaging, and biosignal processing roles.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 shrink-0">
              <a
                href={`mailto:${profileData.contact.email}`}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded bg-[#171916] text-[#F5F3EE] hover:bg-[#315B4C] font-semibold text-xs transition-colors shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Compose Direct Email</span>
              </a>

              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded border border-[#D9D5CC] bg-[#FFFFFF] hover:border-[#171916] text-[#171916] text-xs font-mono transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#315B4C]" /> : <Copy className="w-3.5 h-3.5 text-[#595D56]" />}
                <span>{copied ? "COPIED TO CLIPBOARD" : "COPY EMAIL"}</span>
              </button>
            </div>
          </div>

          <div className="pt-6 border-t border-[#D9D5CC] flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#595D56]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#315B4C]" />
              <span className="text-[#171916]">{profileData.contact.email}</span>
            </div>
            
            <div className="flex items-center gap-6">
              <a
                href={profileData.contact.linkedIn}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#171916] transition-colors flex items-center gap-1.5"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3 h-3 text-[#8A8E85]" />
              </a>
              <a
                href={profileData.contact.gitHub}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#171916] transition-colors flex items-center gap-1.5"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub</span>
                <ArrowUpRight className="w-3 h-3 text-[#8A8E85]" />
              </a>
            </div>
          </div>

        </div>

        {/* Footer Meta */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#8A8E85] gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#315B4C]" />
            <span>S. Purohith • Biomedical Engineer & Software Developer</span>
          </div>

          <div className="text-center sm:text-right">
            <span>React + TypeScript + Three.js + Tailwind CSS</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
