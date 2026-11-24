import React, { useState, useEffect } from 'react';
import { Activity, Cpu, Layers, User, Mail, Menu, X, FileText, Radio } from 'lucide-react';
import { profileData } from '../../data/profile';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Imaging Software', href: '#imaging', icon: Layers },
    { label: 'Biosignals', href: '#signals', icon: Activity },
    { label: 'Hardware & DSP', href: '#hardware', icon: Cpu },
    { label: 'Projects', href: '#projects', icon: Radio },
    { label: 'Experience', href: '#experience', icon: User },
    { label: 'Contact', href: '#contact', icon: Mail },
  ];

  return (
    <>
      {/* WCAG Level A Skip-to-Content Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#00F2FE] focus:text-[#060911] focus:font-display focus:font-bold focus:text-xs focus:rounded-lg focus:shadow-2xl focus:outline-none focus:ring-2 focus:ring-white"
      >
        Skip to main content
      </a>

      <header className="fixed top-0 left-0 right-0 z-50 surface-instrument border-b border-white/10 px-4 sm:px-8 py-3 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Lab Branding & Status Indicator (Fixed target anchor to #hero) */}
          <a
            href="#hero"
            aria-label="S. Purohith Portfolio — Return to top"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#00F2FE]/50 rounded p-1"
          >
            <div className="w-8 h-8 rounded bg-[#0A1120] border border-[#00F2FE]/30 flex items-center justify-center relative overflow-hidden group-hover:border-[#00F2FE] transition-colors">
              <span className="w-2 h-2 rounded-full bg-[#00F2FE] animate-signal-pulse" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00F2FE]/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </div>
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-2">
                <span className="font-display font-semibold text-sm tracking-wider text-white">
                  {profileData.name.toUpperCase()}
                </span>
                <span className="badge-telemetry text-[9px] py-0.5 px-1.5 hidden sm:inline-block">
                  LAB: BIOMEDICAL
                </span>
              </div>
              <span className="font-telemetry text-[10px] text-[#94A3B8] tracking-tight">
                MED-TECH / C++ / BIOSIGNALS
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav 
            aria-label="Main Navigation"
            className="hidden lg:flex items-center gap-1 bg-[#060911]/60 border border-white/5 rounded-full p-1.5 shadow-inner"
          >
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-[#94A3B8] hover:text-[#00F2FE] hover:bg-white/5 transition-all focus:outline-none focus:ring-1 focus:ring-[#00F2FE]"
                >
                  <Icon className="w-3.5 h-3.5 opacity-70" aria-hidden="true" />
                  <span>{link.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Right HUD Controls */}
          <div className="flex items-center gap-3">
            {/* Live 3D Spatial Status Badge (Always Active) */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#00F2FE]/10 border border-[#00F2FE]/30 text-[10px] font-telemetry text-[#00F2FE]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0AE4BA] animate-pulse" />
              <span>3D SPATIAL WORLD</span>
            </div>

            {/* Resume / CV Link */}
            <a
              href="Purohith-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download S. Purohith CV / Resume (PDF)"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-[#94A3B8] hover:text-[#00F2FE] hover:border-[#00F2FE]/40 text-xs font-telemetry transition-all"
            >
              <FileText className="w-3.5 h-3.5 text-[#0AE4BA]" />
              <span>RESUME</span>
            </a>

            {/* Quick Contact CTA */}
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded bg-[#00F2FE] text-[#060911] hover:bg-[#0AE4BA] font-display font-medium text-xs tracking-wide transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0AE4BA]"
            >
              <span>Dispatch Contact</span>
            </a>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded text-[#94A3B8] hover:text-white hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-[#00F2FE] cursor-pointer"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-drawer"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div 
            id="mobile-nav-drawer"
            role="region"
            aria-label="Mobile Navigation Drawer"
            className="lg:hidden surface-instrument border-t border-white/10 mt-3 p-4 rounded-xl flex flex-col gap-2 animate-in fade-in slide-in-from-top-2 duration-200"
          >
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded text-sm text-[#94A3B8] hover:text-[#00F2FE] hover:bg-white/5 transition-colors"
                >
                  <Icon className="w-4 h-4 text-[#00F2FE]" />
                  <span>{link.label}</span>
                </a>
              );
            })}

            <a
              href="Purohith-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded text-sm text-[#0AE4BA] hover:bg-white/5 border border-[#0AE4BA]/20 mt-1"
            >
              <FileText className="w-4 h-4" />
              <span>Download Resume (PDF)</span>
            </a>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between mt-1">
              <span className="font-telemetry text-xs text-[#94A3B8]">3D Engine Environment:</span>
              <span className="badge-telemetry text-xs">PERSISTENT 3D</span>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
