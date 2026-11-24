import React, { useState, useEffect, lazy, Suspense } from 'react';
import { MenuNav } from './components/navigation/MenuNav';
import { Hero } from './components/sections/Hero';
import { Experience } from './components/sections/Experience';
import { Projects } from './components/sections/Projects';
import { Contact } from './components/sections/Contact';
import { SceneFallback } from './components/scenes/SceneFallback';
import { scrollSceneController } from './components/scenes/ScrollSceneController';

// Dynamically load the procedural 3D instrument stage
const InstrumentStage = lazy(() => import('./components/scenes/InstrumentStage'));

export const App: React.FC = () => {
  const [reducedMotion] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

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

  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] flex flex-col relative selection:bg-[var(--signal-cyan)]/20 selection:text-[var(--signal-cyan)] overflow-x-hidden">
      
      {/* Accessible WCAG Level A Skip to Content Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#00F2FE] focus:text-[#060911] focus:font-display focus:font-bold focus:text-xs focus:rounded-lg focus:shadow-2xl focus:outline-none focus:ring-2 focus:ring-white"
      >
        Skip to main content
      </a>

      {/* Background Precision Grid & Radial Gradient */}
      <div className="fixed inset-0 bg-lab-grid pointer-events-none opacity-40 z-0" />
      <div className="fixed inset-0 bg-lab-radial pointer-events-none z-0" />

      {/* Persistent Full-Page Procedural 3D Stage (Always Active 3D) */}
      <Suspense fallback={<SceneFallback />}>
        <InstrumentStage reducedMotion={reducedMotion} />
      </Suspense>

      {/* Edge Navigation: Built-in Top-Right Menu & Monogram Drawer */}
      <MenuNav />

      {/* Exactly 4 Sections: Top (Hero/Bio/Summary) -> Experience -> Projects -> Contact */}
      <div className="relative z-10">
        <Hero />
        
        <main id="main-content" tabIndex={-1} className="focus:outline-none">
          <Experience />
          <Projects />
        </main>

        <Contact />
      </div>

    </div>
  );
};

export default App;
