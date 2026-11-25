import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, X, FileText, ExternalLink, ArrowRight } from 'lucide-react';
import { profileData } from '../../data/profile';
import { GithubIcon, LinkedinIcon } from '../ui/Icons';

export const MenuNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [timeStr, setTimeStr] = useState('');

  // Live IST local time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
      setTimeStr(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000 * 30);
    return () => clearInterval(interval);
  }, []);

  // Back to top appearance on scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const navLinks = [
    { num: '01', label: 'Work Experience', href: '#experience', desc: 'Medical Imaging, DRDO DEBEL & ISRO Challenge' },
    { num: '02', label: 'Selected Projects', href: '#projects', desc: 'BCI Hand Controller, DICOM Cine & AI Reporting' },
    { num: '03', label: 'Direct Contact', href: '#contact', desc: 'Direct Inquiries, Phone, Email & Location' },
  ];

  return (
    <>
      {/* Top-Right: motion.dev Spring Menu Button */}
      <div className="fixed top-6 right-6 sm:top-8 sm:right-8 z-40">
        <motion.button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-expanded={isOpen}
          aria-label="Open Navigation Menu"
          whileHover={{ scale: 1.05, y: -1 }}
          whileTap={{ scale: 0.95, y: 1 }}
          transition={{ type: 'spring', stiffness: 450, damping: 20 }}
          className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#16272F]/90 border border-[#264653] hover:border-[#2A9D8F] text-[#E9ECEF] transition-colors shadow-xl cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#2A9D8F]"
        >
          <span className="font-telemetry text-xs font-semibold tracking-wider text-[#CED4DA] group-hover:text-[#E9ECEF]">
            MENU
          </span>
          <div className="flex flex-col gap-1 w-4">
            <span className="h-[1.5px] w-full bg-[#2A9D8F] group-hover:w-3 transition-all duration-300 ml-auto" />
            <span className="h-[1.5px] w-full bg-[#E9ECEF] group-hover:bg-[#2A9D8F] transition-colors" />
          </div>
        </motion.button>
      </div>

      {/* motion.dev Spring Physics Slide-Over Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Site Navigation Drawer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-xl"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 350, damping: 32 }}
              className="w-full max-w-lg h-full bg-[#0D181D] border-l border-[#264653] p-8 sm:p-12 flex flex-col justify-between text-left overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Drawer Header */}
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-[#264653] mb-10">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#2A9D8F] animate-pulse" />
                    <span className="font-telemetry text-xs font-bold tracking-widest text-[#CED4DA] uppercase">
                      NAVIGATION INDEX
                    </span>
                  </div>
                  <motion.button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#264653] text-xs font-telemetry text-[#CED4DA] hover:text-[#E9ECEF] hover:border-[#2A9D8F] transition-colors cursor-pointer"
                    aria-label="Close menu"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>CLOSE</span>
                  </motion.button>
                </div>

                {/* Large Editorial Nav Links */}
                <nav className="space-y-6">
                  {navLinks.map((item) => (
                    <motion.a
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      whileHover={{ x: 4, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
                      className="group block p-4 rounded-xl border border-white/5 hover:border-[#2A9D8F]/60 hover:bg-[#264653]/30 transition-all"
                    >
                      <div className="flex items-baseline justify-between mb-1">
                        <span className="font-telemetry text-xs text-[#2A9D8F] font-bold">
                          {item.num}
                        </span>
                        <ArrowRight className="w-4 h-4 text-[#ADB5BD] group-hover:text-[#2A9D8F] group-hover:translate-x-1 transition-all" />
                      </div>
                      <div className="font-display text-2xl font-bold text-[#E9ECEF] group-hover:text-[#2A9D8F] transition-colors">
                        {item.label}
                      </div>
                      <p className="font-sans text-xs text-[#ADB5BD] mt-1">
                        {item.desc}
                      </p>
                    </motion.a>
                  ))}
                </nav>

                {/* Resume Direct Action */}
                <div className="mt-8 pt-6 border-t border-[#264653]">
                  <motion.a
                    href="Purohith-Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    className="w-full inline-flex items-center justify-between p-4 rounded-xl bg-[#16272F] border border-[#264653] hover:border-[#2A9D8F] text-[#E9ECEF] transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-[#2A9D8F]" />
                      <div>
                        <span className="font-display text-sm font-bold block">Curriculum Vitae</span>
                        <span className="font-telemetry text-[11px] text-[#CED4DA]">Verified Engineering Resume (PDF)</span>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-[#ADB5BD] group-hover:text-[#2A9D8F] transition-colors" />
                  </motion.a>
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="pt-8 border-t border-[#264653] space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-telemetry text-xs text-[#ADB5BD]">CONNECT</span>
                  <div className="flex items-center gap-3">
                    <motion.a
                      href={profileData.contact.gitHub}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 rounded-lg bg-[#16272F] border border-[#264653] text-[#CED4DA] hover:text-[#2A9D8F] transition-colors"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </motion.a>
                    <motion.a
                      href={profileData.contact.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 rounded-lg bg-[#16272F] border border-[#264653] text-[#CED4DA] hover:text-[#2A9D8F] transition-colors"
                    >
                      <LinkedinIcon className="w-4 h-4" />
                    </motion.a>
                  </div>
                </div>

                <div className="font-telemetry text-[11px] text-[#ADB5BD] leading-relaxed">
                  Trichy, Tamil Nadu, India • UTC+5:30 (Live: {timeStr})<br />
                  Biomedical Engineering & Medical Imaging Software
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Persistent Back to Top Floating Trigger */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="fixed bottom-6 right-6 z-40"
          >
            <motion.button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Back to top"
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.92, y: 1 }}
              transition={{ type: 'spring', stiffness: 450, damping: 20 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#16272F]/90 border border-[#264653] text-xs font-telemetry text-[#E9ECEF] hover:text-[#2A9D8F] hover:border-[#2A9D8F] shadow-2xl transition-colors cursor-pointer group"
            >
              <ArrowUp className="w-3.5 h-3.5 text-[#2A9D8F] group-hover:-translate-y-0.5 transition-transform" />
              <span>Top</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
