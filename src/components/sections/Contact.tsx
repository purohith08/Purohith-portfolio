import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, ExternalLink, Terminal, ShieldCheck, Copy, Check, FileText, Phone } from 'lucide-react';
import { profileData } from '../../data/profile';
import { GithubIcon, LinkedinIcon } from '../ui/Icons';
import { useSectionParallax } from '../../hooks/useSectionParallax';

export const Contact: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const { ref, foregroundY, backgroundY, accentY } = useSectionParallax<HTMLElement>({
    foregroundRange: [40, -40],
    backgroundRange: [-25, 25],
    accentRange: [20, -20],
    clamp: false,
  });

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profileData.contact.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 3000);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = profileData.contact.email;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 3000);
    }
  };

  const handleCopyPhone = async () => {
    try {
      await navigator.clipboard.writeText(profileData.contact.phone);
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 3000);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = profileData.contact.phone;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 3000);
    }
  };

  return (
    <footer
      ref={ref}
      id="contact"
      className="py-28 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto border-t border-[#264653]/50 text-left relative z-10"
    >
      {/* Section Header */}
      <motion.div
        style={{ y: backgroundY }}
        className="flex flex-col md:flex-row md:items-end justify-between mb-16 will-change-transform"
      >
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2A9D8F] animate-pulse" />
            <span className="badge-telemetry">SECTION 03: DIRECT INQUIRIES & CONTACT</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#E9ECEF] tracking-tight">
            Initiate Direct Inquiries
          </h2>
        </div>
        <p className="text-sm text-[#ADB5BD] max-w-md mt-4 md:mt-0 font-sans leading-relaxed">
          {profileData.contact.availability}. Open for technical discussions, medical software engineering roles, and biomedical imaging collaborations.
        </p>
      </motion.div>

      {/* Clean Direct Contact Grid */}
      <motion.div
        style={{ y: foregroundY }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 will-change-transform"
      >
        {/* Email Node with One-Click Copy */}
        <div className="surface-instrument-card rounded-2xl p-6 sm:p-7 flex flex-col justify-between border border-[#264653]/60 relative overflow-hidden group">
          <div className="space-y-4">
            <div className="w-11 h-11 rounded-xl bg-[#2A9D8F]/15 border border-[#2A9D8F]/30 flex items-center justify-center text-[#2A9D8F]">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-telemetry text-[#ADB5BD] uppercase tracking-wider block mb-1">
                Primary Email
              </span>
              <a
                href={`mailto:${profileData.contact.email}`}
                className="font-display font-bold text-sm sm:text-base text-[#E9ECEF] group-hover:text-[#2A9D8F] transition-colors break-all focus:outline-none focus:underline"
              >
                {profileData.contact.email}
              </a>
            </div>
          </div>

          <div className="pt-5 mt-5 border-t border-[#264653]/60 flex items-center gap-2">
            <motion.button
              type="button"
              onClick={handleCopyEmail}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 450, damping: 20 }}
              className={`flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg font-telemetry text-[11px] font-semibold border transition-colors cursor-pointer ${
                copiedEmail
                  ? 'bg-[#2A9D8F]/20 border-[#2A9D8F] text-[#2A9D8F]'
                  : 'bg-[#16272F] border-[#264653] text-[#CED4DA] hover:text-[#E9ECEF] hover:border-[#2A9D8F]'
              }`}
            >
              {copiedEmail ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#2A9D8F]" />
                  <span>COPIED</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#2A9D8F]" />
                  <span>COPY</span>
                </>
              )}
            </motion.button>

            <motion.a
              href={`mailto:${profileData.contact.email}`}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className="p-2 rounded-lg bg-[#2A9D8F] text-[#0B1317] hover:bg-[#238276] transition-colors"
              title="Open default email application"
              aria-label="Send direct email"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </motion.a>
          </div>
        </div>

        {/* Direct Phone / Call Node */}
        <div className="surface-instrument-card rounded-2xl p-6 sm:p-7 flex flex-col justify-between border border-[#264653]/60 relative overflow-hidden group">
          <div className="space-y-4">
            <div className="w-11 h-11 rounded-xl bg-[#2A9D8F]/15 border border-[#2A9D8F]/30 flex items-center justify-center text-[#2A9D8F]">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-telemetry text-[#ADB5BD] uppercase tracking-wider block mb-1">
                Direct Telephony
              </span>
              <a
                href={`tel:${profileData.contact.phone.replace(/\s+/g, '')}`}
                className="font-display font-bold text-sm sm:text-base text-[#E9ECEF] group-hover:text-[#2A9D8F] transition-colors focus:outline-none focus:underline"
              >
                {profileData.contact.phone}
              </a>
            </div>
          </div>

          <div className="pt-5 mt-5 border-t border-[#264653]/60 flex items-center gap-2">
            <motion.button
              type="button"
              onClick={handleCopyPhone}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 450, damping: 20 }}
              className={`flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg font-telemetry text-[11px] font-semibold border transition-colors cursor-pointer ${
                copiedPhone
                  ? 'bg-[#2A9D8F]/20 border-[#2A9D8F] text-[#2A9D8F]'
                  : 'bg-[#16272F] border-[#264653] text-[#CED4DA] hover:text-[#E9ECEF] hover:border-[#2A9D8F]'
              }`}
            >
              {copiedPhone ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#2A9D8F]" />
                  <span>COPIED</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#2A9D8F]" />
                  <span>COPY</span>
                </>
              )}
            </motion.button>

            <motion.a
              href={`tel:${profileData.contact.phone.replace(/\s+/g, '')}`}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className="p-2 rounded-lg bg-[#2A9D8F] text-[#0B1317] hover:bg-[#238276] transition-colors"
              title="Direct call"
              aria-label="Direct phone call"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </motion.a>
          </div>
        </div>

        {/* Location & Relocation Node */}
        <div className="surface-instrument-card rounded-2xl p-6 sm:p-7 flex flex-col justify-between border border-[#264653]/60">
          <div className="space-y-4">
            <div className="w-11 h-11 rounded-xl bg-[#2A9D8F]/15 border border-[#2A9D8F]/30 flex items-center justify-center text-[#2A9D8F]">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-telemetry text-[#ADB5BD] uppercase tracking-wider block mb-1">
                Base Location
              </span>
              <h3 className="font-display font-bold text-sm sm:text-base text-[#E9ECEF]">
                {profileData.contact.location}
              </h3>
              <p className="text-[11px] text-[#ADB5BD] mt-1 font-sans">
                Seeking healthcare product development in Bangalore (open to relocation & hybrid).
              </p>
            </div>
          </div>

          <div className="pt-5 mt-5 border-t border-[#264653]/60">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#2A9D8F]/10 text-[#2A9D8F] text-[10px] font-telemetry">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2A9D8F] animate-pulse" />
              <span>Available for Hire</span>
            </span>
          </div>
        </div>

        {/* CV & Documentation Node */}
        <div className="surface-instrument-card rounded-2xl p-6 sm:p-7 flex flex-col justify-between border border-[#264653]/60">
          <div className="space-y-4">
            <div className="w-11 h-11 rounded-xl bg-[#264653]/40 border border-[#264653] flex items-center justify-center text-[#2A9D8F]">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-telemetry text-[#ADB5BD] uppercase tracking-wider block mb-1">
                Curriculum Vitae
              </span>
              <h3 className="font-display font-bold text-sm sm:text-base text-[#E9ECEF]">
                Verified Engineering Resume
              </h3>
              <p className="text-[11px] text-[#ADB5BD] mt-1 font-sans">
                Official CV with DICOM workstation, DRDO DEBEL, and BCI projects.
              </p>
            </div>
          </div>

          <div className="pt-5 mt-5 border-t border-[#264653]/60">
            <motion.a
              href="Purohith-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[#2A9D8F] text-[#0B1317] font-display font-semibold text-[11px] tracking-wider uppercase hover:bg-[#238276] transition-colors shadow-md"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Download PDF CV</span>
            </motion.a>
          </div>
        </div>
      </motion.div>

      {/* Verified Professional Network Nodes Banner */}
      <motion.div
        style={{ y: accentY }}
        className="surface-instrument rounded-2xl p-6 sm:p-8 border border-[#264653]/60 flex flex-col sm:flex-row items-center justify-between gap-6 will-change-transform"
      >
        <div className="flex items-center gap-3">
          <Terminal className="w-5 h-5 text-[#2A9D8F] shrink-0" />
          <div className="text-left">
            <span className="font-display font-bold text-sm text-[#E9ECEF] block">
              Verified Profiles & Source Code
            </span>
            <span className="text-xs text-[#ADB5BD] font-telemetry">
              Explore public GitHub algorithms and LinkedIn professional trajectory
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <motion.a
            href={profileData.contact.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="S. Purohith LinkedIn Profile"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2.5 px-5 py-2.5 rounded-lg bg-[#16272F] border border-[#264653] hover:border-[#2A9D8F] text-xs font-display font-medium text-[#E9ECEF] transition-all group"
          >
            <LinkedinIcon className="w-4 h-4 text-[#2A9D8F]" />
            <span>LinkedIn</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
          </motion.a>

          <motion.a
            href={profileData.contact.gitHub}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="S. Purohith GitHub Repositories"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2.5 px-5 py-2.5 rounded-lg bg-[#16272F] border border-[#264653] hover:border-[#2A9D8F] text-xs font-display font-medium text-[#E9ECEF] transition-all group"
          >
            <GithubIcon className="w-4 h-4 text-[#2A9D8F]" />
            <span>GitHub</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
          </motion.a>
        </div>
      </motion.div>

      {/* Colophon & Accessibility Guarantee */}
      <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-telemetry text-[#ADB5BD]">
        <div className="flex items-center gap-2 text-[#2A9D8F]">
          <ShieldCheck className="w-4 h-4" />
          <span>S. PUROHITH • BIOMEDICAL INTELLIGENCE LAB</span>
        </div>
        <div>
          React 19 • Three.js • React Three Fiber • Zero tracking • WCAG AA
        </div>
      </div>

    </footer>
  );
};
