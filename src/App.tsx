import React, { useState, useEffect } from 'react';
import { Navbar } from './components/navigation/Navbar';
import { Hero } from './components/sections/Hero';
import { HeroScene } from './components/scenes/HeroScene';
import { SceneFallback } from './components/scenes/SceneFallback';
import { Projects } from './components/sections/Projects';
import { Experience } from './components/sections/Experience';
import { Skills } from './components/sections/Skills';
import { Education } from './components/sections/Education';
import { Contact } from './components/sections/Contact';

export const App: React.FC = () => {
  const [is3DActive, setIs3DActive] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [webGLSupported, setWebGLSupported] = useState(true);

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
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col telemetry-grid relative selection:bg-teal-500/20 selection:text-teal-200">
      
      {/* Fixed Navigation */}
      <Navbar onToggle3D={webGLSupported ? toggle3D : undefined} is3DActive={is3DActive} />

      {/* Hero Visual Container */}
      <div className="relative w-full overflow-hidden">
        {/* 3D Scene or Accessible 2D Fallback */}
        {is3DActive && webGLSupported ? (
          <HeroScene reducedMotion={reducedMotion} />
        ) : (
          <SceneFallback />
        )}

        {/* Hero Interactive Overlay */}
        <Hero />
      </div>

      {/* Main Content Sections */}
      <main id="main-content" tabIndex={-1} className="focus:outline-none">
        <Projects />
        <Experience />
        <Skills />
        <Education />
      </main>

      {/* Recruiter Contact & Footer */}
      <Contact />

    </div>
  );
};

export default App;
