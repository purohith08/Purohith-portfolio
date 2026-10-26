import React, { useState, useEffect } from 'react';
import { Navbar } from './components/navigation/Navbar';
import { Hero } from './components/sections/Hero';
import { HeroScene } from './components/scenes/HeroScene';
import { SceneFallback } from './components/scenes/SceneFallback';
import { Projects } from './components/sections/Projects';
import { Experience } from './components/sections/Experience';
import { Skills } from './components/sections/Skills';
import { Education } from './components/sections/Education';
import { InstrumentationWorkshop } from './components/sections/InstrumentationWorkshop';
import { Contact } from './components/sections/Contact';

import { BiomedicalWorldModal } from './components/scenes/BiomedicalWorldModal';

export const App: React.FC = () => {
  const [is3DActive, setIs3DActive] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [webGLSupported, setWebGLSupported] = useState(true);
  const [isWorldModalOpen, setIsWorldModalOpen] = useState(false);

  // Check WebGL availability and system reduced-motion preference
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebGLSupported(false);
        setIs3DActive(false);
      }
    } catch (e) {
      setWebGLSupported(false);
      setIs3DActive(false);
    }

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionQuery.matches) {
      setReducedMotion(true);
    }
  }, []);

  const toggle3D = () => {
    if (!webGLSupported) return;
    setIs3DActive((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-[#F5F3EE] text-[#171916] flex flex-col relative selection:bg-[#315B4C]/15 selection:text-[#171916]">
      
      {/* Editorial Fixed Header */}
      <Navbar 
        onToggle3D={webGLSupported ? toggle3D : undefined} 
        is3DActive={is3DActive} 
        onOpenWorld={() => setIsWorldModalOpen(true)}
      />

      {/* Hero Visual Composition */}
      <div className="relative w-full">
        {/* Integrated 3D Scene / Fallback positioned in right viewport */}
        <div className="hidden lg:block absolute right-0 top-0 w-1/2 h-[92vh] pointer-events-none z-0">
          <div className="relative w-full h-full pointer-events-auto">
            {is3DActive && webGLSupported ? (
              <HeroScene reducedMotion={reducedMotion} />
            ) : (
              <SceneFallback />
            )}
          </div>
        </div>

        {/* Hero Interactive Overlay */}
        <Hero onExploreClick={() => setIsWorldModalOpen(true)} />
      </div>

      {/* Main Professional Sections (5 Connected Exploration Zones) */}
      <main id="main-content" tabIndex={-1} className="focus:outline-none">
        <Projects />
        <InstrumentationWorkshop />
        <Experience />
        <Skills />
        <Education />
      </main>

      {/* Editorial Contact & Colophon */}
      <Contact />

      {/* Playable 3D Biomedical Exploration World Modal */}
      <BiomedicalWorldModal
        isOpen={isWorldModalOpen}
        onClose={() => setIsWorldModalOpen(false)}
        onSelectStation={(stationId) => {
          if (stationId === 'instrumentation-workshop') {
            const el = document.getElementById('instrumentation');
            el?.scrollIntoView({ behavior: 'smooth' });
          } else {
            const el = document.getElementById('work');
            el?.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      />

    </div>
  );
};

export default App;
