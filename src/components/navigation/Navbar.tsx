import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
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
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Work', href: '#work' },
    { name: 'Experience', href: '#experience' },
    { name: 'Capabilities', href: '#capabilities' },
    { name: 'Academic Background', href: '#background' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#F5F3EE]/92 backdrop-blur-md border-b border-[#D9D5CC] py-3.5 shadow-sm' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between">
          
          {/* Refined Identity Monogram */}
          <a 
            href="#" 
            className="flex items-center gap-3.5 group focus:outline-none focus:ring-2 focus:ring-[#315B4C] rounded-md"
            aria-label="S. Purohith Portfolio Homepage"
          >
            <div className="w-8 h-8 rounded bg-[#171916] text-[#F5F3EE] flex items-center justify-center font-mono font-semibold text-xs tracking-wider transition-colors group-hover:bg-[#315B4C]">
              SP
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-[#171916] text-sm tracking-tight leading-snug">
                S. Purohith
              </span>
              <span className="text-[11px] font-mono text-[#595D56] tracking-normal">
                Biomedical & Medical Software
              </span>
            </div>
          </a>

          {/* Desktop Minimal Navigation */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-xs font-medium tracking-wide text-[#595D56] hover:text-[#171916] transition-colors relative py-1 focus:outline-none focus:text-[#171916]"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Actions & Scene Switcher */}
          <div className="hidden md:flex items-center gap-4">
            {onToggle3D && (
              <button
                onClick={onToggle3D}
                type="button"
                className="flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-mono border border-[#D9D5CC] bg-[#ECE8E0]/60 text-[#595D56] hover:text-[#171916] hover:border-[#171916]/30 transition-all cursor-pointer"
                title={is3DActive ? "Switch to minimal diagram mode" : "Enable interactive 3D spatial scene"}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${is3DActive ? 'bg-[#315B4C]' : 'bg-[#B66B49]'}`} />
                <span>{is3DActive ? "3D Scene" : "Lite Mode"}</span>
              </button>
            )}

            <div className="h-4 w-px bg-[#D9D5CC]" />

            <div className="flex items-center gap-1">
              <a
                href="https://github.com/purohith08"
                target="_blank"
                rel="noreferrer"
                className="p-1.5 text-[#595D56] hover:text-[#171916] transition-colors rounded"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://www.linkedin.com/in/purohiths/"
                target="_blank"
                rel="noreferrer"
                className="p-1.5 text-[#595D56] hover:text-[#171916] transition-colors rounded"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
              </a>
            </div>

            <a
              href="#contact"
              className="inline-flex items-center gap-1 px-3.5 py-1.5 text-xs font-semibold rounded bg-[#171916] text-[#F5F3EE] hover:bg-[#315B4C] transition-colors shadow-xs"
            >
              <span>Get in touch</span>
            </a>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center gap-2 md:hidden">
            {onToggle3D && (
              <button
                onClick={onToggle3D}
                className="px-2 py-1 rounded border border-[#D9D5CC] text-[10px] font-mono text-[#595D56]"
              >
                {is3DActive ? "3D" : "2D"}
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded text-[#171916] hover:text-[#315B4C] focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 pb-4 border-t border-[#D9D5CC] bg-[#F5F3EE] flex flex-col gap-3">
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-[#171916] py-1 px-1 hover:text-[#315B4C] transition-colors"
              >
                {item.name}
              </a>
            ))}
            <div className="pt-3 border-t border-[#D9D5CC] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/purohith08"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#595D56] hover:text-[#171916]"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://www.linkedin.com/in/purohiths/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#595D56] hover:text-[#171916]"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              </div>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3.5 py-1.5 text-xs font-semibold rounded bg-[#171916] text-[#F5F3EE]"
              >
                Contact
              </a>
            </div>
          </div>
        )}

      </div>
    </header>
  );
};
