import React, { useState, useEffect } from 'react';
import { 
  Layers, 
  Briefcase, 
  Cpu, 
  GraduationCap, 
  Mail, 
  Menu, 
  X, 
  Eye, 
  EyeOff 
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../ui/Icons';

interface NavbarProps {
  onToggle3D?: () => void;
  is3DActive?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggle3D, is3DActive = true }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Featured Work', href: '#projects', icon: Layers },
    { name: 'Experience', href: '#experience', icon: Briefcase },
    { name: 'Capabilities', href: '#skills', icon: Cpu },
    { name: 'Education', href: '#education', icon: GraduationCap },
    { name: 'Contact', href: '#contact', icon: Mail },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#07090e]/85 backdrop-blur-md border-b border-cyan-500/15 py-3 shadow-lg shadow-black/40' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo / Monogram */}
          <a 
            href="#" 
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-teal-400 rounded-lg p-1"
            aria-label="S. Purohith Portfolio Home"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500/20 to-cyan-500/10 border border-teal-500/40 flex items-center justify-center text-teal-300 font-mono font-bold text-lg group-hover:border-teal-400 transition-colors shadow-sm shadow-teal-500/20">
              SP
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-slate-100 text-sm tracking-wide group-hover:text-teal-300 transition-colors">
                S. PUROHITH
              </span>
              <span className="text-[11px] font-mono text-cyan-400/80 tracking-wider">
                BIOMEDICAL SYSTEMS & SOFTWARE
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800/80 shadow-inner" aria-label="Main Navigation">
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="px-4 py-1.5 text-xs font-medium text-slate-300 hover:text-teal-300 hover:bg-slate-800/70 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-teal-400"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Quick Shortcuts & 3D Performance Toggle */}
          <div className="hidden lg:flex items-center gap-3">
            {onToggle3D && (
              <button
                onClick={onToggle3D}
                type="button"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono bg-slate-900/80 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-400 cursor-pointer"
                title={is3DActive ? "Switch to lightweight fallback scene" : "Enable interactive 3D WebGL scene"}
              >
                {is3DActive ? <Eye className="w-3.5 h-3.5 text-teal-400" /> : <EyeOff className="w-3.5 h-3.5 text-amber-400" />}
                <span>{is3DActive ? "3D Active" : "Lite Mode"}</span>
              </button>
            )}

            <div className="h-5 w-px bg-slate-800" />

            <div className="flex items-center gap-2">
              <a
                href="https://github.com/purohith08"
                target="_blank"
                rel="noreferrer"
                className="p-2 text-slate-400 hover:text-teal-300 hover:bg-slate-800/60 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-teal-400"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/purohiths/"
                target="_blank"
                rel="noreferrer"
                className="p-2 text-slate-400 hover:text-teal-300 hover:bg-slate-800/60 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-teal-400"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>

            <a
              href="#contact"
              className="px-4 py-1.5 text-xs font-semibold rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 hover:brightness-110 shadow-md shadow-teal-500/20 transition-all font-mono"
            >
              CONNECT
            </a>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center gap-2 md:hidden">
            {onToggle3D && (
              <button
                onClick={onToggle3D}
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400 text-xs font-mono"
                aria-label="Toggle 3D"
              >
                {is3DActive ? "3D" : "2D"}
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 pb-4 border-t border-slate-800/80 bg-slate-950/95 backdrop-blur-xl rounded-2xl px-4 shadow-2xl flex flex-col gap-2">
            {navLinks.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 py-2.5 px-3 text-sm text-slate-300 hover:text-teal-300 hover:bg-slate-900/80 rounded-xl transition-colors"
                >
                  <Icon className="w-4 h-4 text-teal-400" />
                  <span>{item.name}</span>
                </a>
              );
            })}
            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/purohith08"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 text-slate-400 hover:text-teal-300"
                >
                  <GithubIcon className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/purohiths/"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 text-slate-400 hover:text-teal-300"
                >
                  <LinkedinIcon className="w-5 h-5" />
                </a>
              </div>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 text-xs font-semibold rounded-full bg-teal-500 text-slate-950 font-mono"
              >
                CONNECT & RESUME
              </a>
            </div>
          </div>
        )}

      </div>
    </header>
  );
};
