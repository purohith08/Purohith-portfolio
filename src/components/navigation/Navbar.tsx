import React, { useState } from 'react';
import { Activity, Radio, Cpu, Layers, User, Mail, Menu, X } from 'lucide-react';
import { profileData } from '../../data/profile';

interface NavbarProps {
  is3DActive?: boolean;
  onToggle3D?: () => void;
  scrollProgress?: number;
}

export const Navbar: React.FC<NavbarProps> = ({ is3DActive = true, onToggle3D }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Imaging Software', href: '#imaging', icon: Layers },
    { label: 'Biosignals', href: '#signals', icon: Activity },
    { label: 'Hardware & DSP', href: '#hardware', icon: Cpu },
    { label: 'Projects', href: '#projects', icon: Radio },
    { label: 'Experience', href: '#experience', icon: User },
    { label: 'Contact', href: '#contact', icon: Mail },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 surface-instrument border-b border-white/10 px-4 sm:px-8 py-3 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Lab Branding & Status Indicator */}
        <a href="#" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#00F2FE]/50 rounded p-1">
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
        <nav className="hidden lg:flex items-center gap-1 bg-[#060911]/60 border border-white/5 rounded-full p-1.5 shadow-inner">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.href}
                href={link.href}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-[#94A3B8] hover:text-[#00F2FE] hover:bg-white/5 transition-all focus:outline-none focus:ring-1 focus:ring-[#00F2FE]"
              >
                <Icon className="w-3.5 h-3.5 opacity-70" />
                <span>{link.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Right HUD Controls */}
        <div className="flex items-center gap-3">
          {/* 3D Visualizer Toggle if supported */}
          {onToggle3D && (
            <button
              onClick={onToggle3D}
              aria-label="Toggle 3D Visualizer Engine"
              title="Toggle WebGL Background Engine"
              className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded text-xs font-telemetry border transition-all ${
                is3DActive
                  ? 'border-[#00F2FE]/40 bg-[#00F2FE]/10 text-[#00F2FE]'
                  : 'border-white/10 bg-white/5 text-[#94A3B8] hover:text-white'
              }`}
            >
              <Radio className={`w-3.5 h-3.5 ${is3DActive ? 'animate-pulse text-[#00F2FE]' : ''}`} />
              <span>3D ENGINE: {is3DActive ? 'ONLINE' : 'BYPASS'}</span>
            </button>
          )}

          {/* Quick Contact CTA */}
          <a
            href={`mailto:${profileData.contact.email}`}
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded bg-[#00F2FE] text-[#060911] hover:bg-[#0AE4BA] font-display font-medium text-xs tracking-wide transition-colors shadow-sm"
          >
            <span>Dispatch Contact</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded text-[#94A3B8] hover:text-white hover:bg-white/5 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden surface-instrument border-t border-white/10 mt-3 p-4 rounded-xl flex flex-col gap-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded text-sm text-[#94A3B8] hover:text-[#00F2FE] hover:bg-white/5"
              >
                <Icon className="w-4 h-4 text-[#00F2FE]" />
                <span>{link.label}</span>
              </a>
            );
          })}
          {onToggle3D && (
            <div className="pt-2 border-t border-white/10 flex items-center justify-between">
              <span className="font-telemetry text-xs text-[#94A3B8]">3D Telemetry Render:</span>
              <button
                onClick={onToggle3D}
                className="badge-telemetry text-xs"
              >
                {is3DActive ? 'ACTIVE' : 'DISABLED'}
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
