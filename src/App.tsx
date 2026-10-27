import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Navbar } from './components/navigation/Navbar';
import { Hero } from './components/sections/Hero';
import { DICOMViewport } from './components/sections/DICOMViewport';
import { EEGWorkbench } from './components/sections/EEGWorkbench';
import { InstrumentationWorkshop } from './components/sections/InstrumentationWorkshop';
import { Projects } from './components/sections/Projects';
import { Experience } from './components/sections/Experience';
import { Skills } from './components/sections/Skills';
import { Education } from './components/sections/Education';
import { Contact } from './components/sections/Contact';
import { SceneFallback } from './components/scenes/SceneFallback';
import { scrollSceneController } from './components/scenes/ScrollSceneController';

// Dynamically load the 3D instrument stage to keep initial chunk light and optimize load
const InstrumentStage = lazy(() => import('./components/scenes/InstrumentStage'));

export const App: React.FC = () => {
  const [is3DActive, setIs3DActive] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      return !!gl;
    } catch {
      return false;
    }
  });

  const [reducedMotion] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  const webGLSupported = is3DActive;

  // Initialize and clean up GSAP ScrollTrigger
  useEffect(() => {
    if (!reducedMotion) {
      scrollSceneController.initScrollTriggers();
    }

    const handleResize = () => {
      scrollSceneController.refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      scrollSceneController.dispose();
    };
  }, [reducedMotion]);

  const toggle3D = () => {
    if (!webGLSupported) return;
    setIs3DActive((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-[#060911] text-[#F1F5F9] flex flex-col relative selection:bg-[#00F2FE]/20 selection:text-[#00F2FE] overflow-x-hidden">
      
      {/* Background Precision Grid & Radial Gradient */}
      <div className="fixed inset-0 bg-lab-grid pointer-events-none opacity-50 z-0" />
      <div className="fixed inset-0 bg-lab-radial pointer-events-none z-0" />

      {/* Persistent Full-Page Procedural 3D Scientific Instrument Stage */}
      {is3DActive && webGLSupported ? (
        <Suspense fallback={<SceneFallback />}>
          <InstrumentStage reducedMotion={reducedMotion} />
        </Suspense>
      ) : (
        <SceneFallback />
      )}

      {/* Fixed Telemetry HUD Header */}
      <Navbar 
        onToggle3D={webGLSupported ? toggle3D : undefined} 
        is3DActive={is3DActive} 
      />

      {/* Main Professional Content Layers (Semantic Accessible HTML) */}
      <div className="relative z-10">
        <Hero />
        
        <main id="main-content" tabIndex={-1} className="focus:outline-none">
          <DICOMViewport />
          <EEGWorkbench />
          <InstrumentationWorkshop />
          <Projects />
          <Experience />
          <Skills />
          <Education />
        </main>

        {/* Laboratory Dispatch Contact & Colophon */}
        <Contact />
      </div>

    </div>
  );
};

export default App;
