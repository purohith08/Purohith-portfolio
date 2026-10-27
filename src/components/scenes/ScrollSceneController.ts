import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { SceneScrollProgress } from './types';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export class ScrollSceneController {
  private triggers: ScrollTrigger[] = [];
  public state: SceneScrollProgress = {
    scrollProgress: 0,
    activeState: 'BIOPOTENTIAL_CORE',
    stateProgress: 0,
    cameraPos: [0, 0, 7.8],
    cameraLookAt: [0, 0, 0],
    coreOpacity: 1.0,
    ringsOpacity: 0.8,
    waveformOpacity: 0.3,
    latticeProgress: 0.0,
    constellationSpread: 0.0,
  };

  private listeners: Set<(state: SceneScrollProgress) => void> = new Set();

  constructor() {
    this.initScrollTriggers();
  }

  public subscribe(fn: (state: SceneScrollProgress) => void): () => void {
    this.listeners.add(fn);
    fn(this.state);
    return () => {
      this.listeners.delete(fn);
    };
  }

  private notify() {
    this.listeners.forEach((fn) => fn(this.state));
  }

  public initScrollTriggers() {
    if (typeof window === 'undefined') return;

    // Clean up any existing instances first
    this.dispose();

    // Main document scrub timeline
    const mainTrigger = ScrollTrigger.create({
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.2,
      onUpdate: (self) => {
        const p = self.progress;
        this.state.scrollProgress = p;

        // Determine active visual state and calculate smoothly interpolated camera & weights
        if (p < 0.2) {
          // State A: Biopotential Core
          const localP = p / 0.2;
          this.state.activeState = 'BIOPOTENTIAL_CORE';
          this.state.stateProgress = localP;
          this.interpolate(
            [0, 0, 7.8], [2.2, 0.4, 6.5],
            [0, 0, 0], [0.4, 0, 0],
            localP
          );
          this.state.coreOpacity = 1.0 - localP * 0.2;
          this.state.ringsOpacity = 0.8 + localP * 0.2;
          this.state.waveformOpacity = 0.3 + localP * 0.2;
          this.state.latticeProgress = 0.0;
          this.state.constellationSpread = 0.0;
        } else if (p < 0.42) {
          // State B: Medical Imaging Gantry (DICOM)
          const localP = (p - 0.2) / 0.22;
          this.state.activeState = 'MEDICAL_IMAGING_GANTRY';
          this.state.stateProgress = localP;
          this.interpolate(
            [2.2, 0.4, 6.5], [-2.0, -0.4, 5.8],
            [0.4, 0, 0], [-0.3, -0.2, 0],
            localP
          );
          this.state.coreOpacity = 0.8 - localP * 0.4;
          this.state.ringsOpacity = 1.0;
          this.state.waveformOpacity = 0.5 + localP * 0.5;
          this.state.latticeProgress = 0.0;
          this.state.constellationSpread = 0.0;
        } else if (p < 0.65) {
          // State C: Biosignal Oscilloscope (EEG)
          const localP = (p - 0.42) / 0.23;
          this.state.activeState = 'BIOSIGNAL_OSCILLOSCOPE';
          this.state.stateProgress = localP;
          this.interpolate(
            [-2.0, -0.4, 5.8], [1.6, -1.0, 5.6],
            [-0.3, -0.2, 0], [0.2, -0.6, 0],
            localP
          );
          this.state.coreOpacity = 0.4 + localP * 0.3;
          this.state.ringsOpacity = 1.0 - localP * 0.5;
          this.state.waveformOpacity = 1.0;
          this.state.latticeProgress = localP * 0.7;
          this.state.constellationSpread = 0.0;
        } else if (p < 0.82) {
          // State D: Microelectronic Circuit Lattice (Hardware)
          const localP = (p - 0.65) / 0.17;
          this.state.activeState = 'CIRCUIT_LATTICE';
          this.state.stateProgress = localP;
          this.interpolate(
            [1.6, -1.0, 5.6], [0, -1.6, 8.2],
            [0.2, -0.6, 0], [0, -1.0, 0],
            localP
          );
          this.state.coreOpacity = 0.7 + localP * 0.3;
          this.state.ringsOpacity = 0.5 - localP * 0.3;
          this.state.waveformOpacity = 1.0 - localP * 0.6;
          this.state.latticeProgress = 0.7 + localP * 0.3;
          this.state.constellationSpread = localP * 0.5;
        } else {
          // State E: Knowledge Constellation (Projects, Experience, Skills, Education, Contact)
          const localP = (p - 0.82) / 0.18;
          this.state.activeState = 'KNOWLEDGE_CONSTELLATION';
          this.state.stateProgress = localP;
          this.interpolate(
            [0, -1.6, 8.2], [0, -2.0, 9.2],
            [0, -1.0, 0], [0, -1.4, 0],
            localP
          );
          this.state.coreOpacity = 1.0;
          this.state.ringsOpacity = 0.2 + (1 - localP) * 0.1;
          this.state.waveformOpacity = 0.3;
          this.state.latticeProgress = 1.0;
          this.state.constellationSpread = 0.5 + localP * 0.5;
        }

        this.notify();
      },
    });

    this.triggers.push(mainTrigger);
  }

  private interpolate(
    fromPos: number[],
    toPos: number[],
    fromLook: number[],
    toLook: number[],
    t: number
  ) {
    // Smooth cosine interpolation
    const ease = (1 - Math.cos(t * Math.PI)) / 2;
    this.state.cameraPos = [
      fromPos[0] + (toPos[0] - fromPos[0]) * ease,
      fromPos[1] + (toPos[1] - fromPos[1]) * ease,
      fromPos[2] + (toPos[2] - fromPos[2]) * ease,
    ];
    this.state.cameraLookAt = [
      fromLook[0] + (toLook[0] - fromLook[0]) * ease,
      fromLook[1] + (toLook[1] - fromLook[1]) * ease,
      fromLook[2] + (toLook[2] - fromLook[2]) * ease,
    ];
  }

  public refresh() {
    ScrollTrigger.refresh();
  }

  public dispose() {
    this.triggers.forEach((trigger) => trigger.kill());
    this.triggers = [];
  }
}

// Global singleton instance for clean cross-component consumption
export const scrollSceneController = new ScrollSceneController();
