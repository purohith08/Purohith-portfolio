import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Briefcase, Radio, Mail, FileText, ArrowUpRight } from 'lucide-react';
import { profileData } from '../../data/profile';
import { GithubIcon, LinkedinIcon } from '../ui/Icons';
import { useSectionParallax } from '../../hooks/useSectionParallax';

export const Hero: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  // Parallax scroll transforms for differential multi-plane motion
  const { ref, foregroundY, backgroundY, accentY } = useSectionParallax<HTMLElement>({
    foregroundRange: [0, -60],
    backgroundRange: [0, -20],
    accentRange: [0, -90],
    clamp: false,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={ref}
      id="hero"
      aria-label="Introduction & Professional Summary"
      className="relative min-h-[92vh] flex flex-col justify-start pt-6 sm:pt-8 pb-16 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto z-10 text-left"
    >
      <div className="max-w-4xl relative z-30 pr-24 sm:pr-32 lg:pr-0">
        
        {/* Subtle Horizontal Medical Laser Accent (Option 2 Highlight #2A9D8F) */}
        <div className="relative w-full h-[1px] bg-white/10 overflow-hidden mb-6">
          <div
            className={`absolute top-0 bottom-0 bg-gradient-to-r from-transparent via-[#2A9D8F] to-transparent w-48 transition-all duration-1000 ease-out ${
              mounted ? 'translate-x-[450%] opacity-0' : '-translate-x-full opacity-100'
            }`}
            style={{ boxShadow: '0 0 16px #2A9D8F' }}
          />
        </div>

        {/* Name & Title — Aligned at Menu Bar Height (Secondary #E9ECEF) */}
        <motion.div
          style={{ y: backgroundY }}
          className={`transition-all duration-700 ease-out transform ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <h1 className="font-display tracking-tight text-[#E9ECEF] mb-6">
            <span className="block text-5xl sm:text-7xl lg:text-8xl font-black text-[#E9ECEF] tracking-[-0.03em] leading-none mb-3">
              {profileData.name}
            </span>
            <span className="block text-xl sm:text-3xl lg:text-4xl font-semibold text-[#CED4DA] tracking-tight">
              Biomedical Engineer & Medical Software Developer
            </span>
          </h1>
        </motion.div>

        {/* Bio & Capabilities Index — Foreground parallax glide */}
        <motion.div
          style={{ y: foregroundY }}
          className="will-change-transform"
        >
          {/* Bio — Clear, scannable, high-contrast editorial prose */}
          <div
            className={`transition-all duration-700 delay-150 ease-out transform ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <p className="text-base sm:text-lg text-[#ADB5BD] max-w-3xl font-sans leading-relaxed mb-8">
              {profileData.shortBio}
            </p>
          </div>

          {/* Architectural Capabilities Index (Option 2 Tokens: #264653 Primary Slate, #2A9D8F Highlight) */}
          <div
            className={`grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 py-6 border-y border-white/10 transition-all duration-700 delay-300 ease-out transform ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <div className="pr-4 border-b md:border-b-0 md:border-r border-white/10 pb-4 md:pb-0">
              <span className="font-telemetry text-[11px] font-bold text-[#2A9D8F] tracking-widest uppercase block mb-1">
                01 / MEDICAL IMAGING & PACS
              </span>
              <p className="font-sans text-xs text-[#CED4DA] leading-relaxed">
                Multi-frame ultrasound & XA/XC cine loops, MPEG-2/H.264 video decoding, PySide6 / VTK / Pydicom, and Qt/C++ viewports.
              </p>
            </div>

            <div className="pr-4 border-b md:border-b-0 md:border-r border-white/10 pb-4 md:pb-0">
              <span className="font-telemetry text-[11px] font-bold text-[#2A9D8F] tracking-widest uppercase block mb-1">
                02 / BIOSIGNALS & BCI
              </span>
              <p className="font-sans text-xs text-[#CED4DA] leading-relaxed">
                Motor-imagery BCI (FBCSP, EEGNet, SVM) with ADS1299 acquisition, and Raspberry Pi / Arduino prosthetic hand actuation.
              </p>
            </div>

            <div>
              <span className="font-telemetry text-[11px] font-bold text-[#CED4DA] tracking-widest uppercase block mb-1">
                03 / RESEARCH & COMPLIANCE
              </span>
              <p className="font-sans text-xs text-[#CED4DA] leading-relaxed">
                Defense bioengineering at DRDO DEBEL, team ANAV at ISRO Robotic Challenge 2025, and URD → SRD compliance traceability.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Clear Action Triggers & Telemetry — Accent parallax layer */}
        <motion.div
          style={{ y: accentY }}
          className="will-change-transform"
        >
          <div
            className={`flex flex-wrap items-center gap-3.5 mb-12 transition-all duration-700 delay-500 ease-out transform ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            {/* Primary Action — Option 2 Highlight #2A9D8F with motion.dev spring */}
            <motion.a
              href="#experience"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96, y: 1 }}
              transition={{ type: 'spring', stiffness: 450, damping: 20 }}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#2A9D8F] hover:bg-[#238276] text-[#0B1317] font-display font-bold text-xs tracking-wider uppercase transition-colors shadow-xl shadow-[#2A9D8F]/20 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2A9D8F]"
            >
              <Briefcase className="w-4 h-4 text-[#0B1317]" />
              <span>Work Experience</span>
              <ArrowDown className="w-4 h-4 text-[#0B1317]" />
            </motion.a>

            {/* Secondary Action — Option 2 Slate #264653 with spring */}
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96, y: 1 }}
              transition={{ type: 'spring', stiffness: 450, damping: 20 }}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-[#16272F] hover:bg-[#264653] border border-[#264653] hover:border-[#2A9D8F] text-[#E9ECEF] font-display font-medium text-xs tracking-wider uppercase transition-colors cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#2A9D8F]"
            >
              <Radio className="w-4 h-4 text-[#2A9D8F]" />
              <span>Selected Projects</span>
            </motion.a>

            {/* Tertiary Action */}
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96, y: 1 }}
              transition={{ type: 'spring', stiffness: 450, damping: 20 }}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-[#16272F] hover:bg-[#264653] border border-[#264653] hover:border-[#2A9D8F] text-[#E9ECEF] font-display font-medium text-xs tracking-wider uppercase transition-colors cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#2A9D8F]"
            >
              <Mail className="w-4 h-4 text-[#2A9D8F]" />
              <span>Contact</span>
            </motion.a>

            {/* Resume PDF Action */}
            <motion.a
              href="Purohith-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open S. Purohith CV / Resume (PDF)"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96, y: 1 }}
              transition={{ type: 'spring', stiffness: 450, damping: 20 }}
              className="inline-flex items-center gap-1.5 px-4 py-3.5 rounded-full bg-[#16272F]/80 hover:bg-[#264653] border border-white/10 hover:border-[#2A9D8F]/50 text-[#CED4DA] hover:text-[#E9ECEF] font-display font-medium text-xs tracking-wider uppercase transition-colors"
            >
              <FileText className="w-4 h-4 text-[#2A9D8F]" />
              <span>Resume</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#ADB5BD]" />
            </motion.a>

            {/* External Social Profiles */}
            <div className="flex items-center gap-2 pl-1">
              <motion.a
                href={profileData.contact.gitHub}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                whileHover={{ scale: 1.12, y: -2 }}
                whileTap={{ scale: 0.92 }}
                transition={{ type: 'spring', stiffness: 450, damping: 20 }}
                className="p-3 rounded-full bg-[#16272F] border border-[#264653] text-[#CED4DA] hover:text-[#2A9D8F] hover:border-[#2A9D8F]/50 transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
              </motion.a>
              <motion.a
                href={profileData.contact.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                whileHover={{ scale: 1.12, y: -2 }}
                whileTap={{ scale: 0.92 }}
                transition={{ type: 'spring', stiffness: 450, damping: 20 }}
                className="p-3 rounded-full bg-[#16272F] border border-[#264653] text-[#CED4DA] hover:text-[#2A9D8F] hover:border-[#2A9D8F]/50 transition-colors"
              >
                <LinkedinIcon className="w-4 h-4" />
              </motion.a>
            </div>
          </div>

          {/* Architectural Telemetry Matrix Bar */}
          <div
            className={`grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10 transition-all duration-700 delay-700 ease-out transform ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            {profileData.metricsSummary.map((m, i) => (
              <div key={i} className="space-y-0.5">
                <span className="font-telemetry text-[10px] text-[#ADB5BD] uppercase tracking-wider block">
                  {m.label}
                </span>
                <span className="font-display text-sm font-bold text-[#E9ECEF] block">
                  {m.value}
                </span>
                <span className="font-telemetry text-[11px] text-[#CED4DA] block">
                  {m.detail}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};
