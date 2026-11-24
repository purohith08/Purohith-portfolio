import React, { useState, useEffect } from 'react';
import { ArrowUp, Menu, X, FileText } from 'lucide-react';

export const CornerNav: React.FC = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [timeStr, setTimeStr] = useState('');

  // Live IST local time formatted like Vadim Carazan's location header
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

  const navItems = [
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* Top Floating Edge Header */}
      <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none p-4 sm:p-6 lg:p-8 flex items-start justify-between">
        
        {/* Top-Left: Minimal Monogram Brand Logo */}
        <div className="pointer-events-auto">
          <a
            href="#hero"
            aria-label="S. Purohith — Return to top"
            className="flex items-center gap-2.5 group focus:outline-none"
          >
            <div className="w-8 h-8 rounded-lg bg-[#0A1120]/90 border border-white/20 flex items-center justify-center relative overflow-hidden group-hover:border-[#00F2FE] transition-colors shadow-lg">
              <span className="font-display font-black text-xs tracking-wider text-white group-hover:text-[#00F2FE]">
                SP
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00F2FE]/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </div>
          </a>
        </div>

        {/* Top-Center: Live Location Telemetry */}
        <div className="hidden md:flex flex-col text-left font-telemetry text-[11px] text-[#94A3B8] pointer-events-auto space-y-0.5">
          <div>
            <span className="text-[#64748B]">Role: </span>
            <span className="text-white font-medium">Medical Software & Biosignals</span>
          </div>
          <div>
            <span className="text-[#64748B]">Based in: </span>
            <span className="text-[#0AE4BA]">Trichy, India</span>
            <span className="text-[#64748B]"> ({timeStr} IST)</span>
          </div>
        </div>

        {/* Top-Right: Edge Navigation Menu */}
        <div className="pointer-events-auto flex items-center gap-2">
          {/* Desktop Nav Strip */}
          <nav
            aria-label="Corner Navigation"
            className="hidden sm:flex items-center gap-4 px-4 py-2 rounded-full surface-instrument border border-white/10 shadow-xl"
          >
            <span className="font-telemetry text-[10px] uppercase text-[#64748B] tracking-wider pr-1">
              Navigate:
            </span>
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="font-display text-xs text-[#CBD5E1] hover:text-[#00F2FE] transition-colors focus:outline-none focus:text-[#00F2FE]"
              >
                {item.label}
              </a>
            ))}

            <span className="w-px h-3 bg-white/20" />

            <a
              href="Purohith-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download S. Purohith CV / Resume (PDF)"
              className="inline-flex items-center gap-1 font-display text-xs text-[#0AE4BA] hover:text-white transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sm:hidden p-2.5 rounded-xl surface-instrument border border-white/15 text-white hover:border-[#00F2FE] focus:outline-none"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-4 top-20 z-50 surface-instrument rounded-2xl border border-white/15 p-5 shadow-2xl flex flex-col gap-3 sm:hidden animate-in fade-in duration-200">
          <div className="font-telemetry text-xs text-[#64748B] pb-2 border-b border-white/10 flex items-center justify-between">
            <span>SECTIONS</span>
            <span className="text-[#0AE4BA]">Trichy, India ({timeStr})</span>
          </div>

          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-display font-medium text-[#CBD5E1] hover:text-[#00F2FE] hover:bg-white/5 transition-colors"
            >
              {item.label}
            </a>
          ))}

          <a
            href="Purohith-Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-display font-medium text-[#0AE4BA] border border-[#0AE4BA]/30 bg-[#0AE4BA]/5"
          >
            <FileText className="w-4 h-4" />
            <span>Download Resume (PDF)</span>
          </a>
        </div>
      )}

      {/* Bottom-Right Persistent "Back to top" */}
      {showBackToTop && (
        <div className="fixed bottom-6 right-6 z-40 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to home top"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full surface-instrument border border-white/15 text-xs font-telemetry text-white hover:text-[#00F2FE] hover:border-[#00F2FE]/50 shadow-2xl transition-all cursor-pointer group"
          >
            <ArrowUp className="w-3.5 h-3.5 text-[#00F2FE] group-hover:-translate-y-0.5 transition-transform" />
            <span>Back to home</span>
          </button>
        </div>
      )}
    </>
  );
};
