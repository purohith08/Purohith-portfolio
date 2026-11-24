import { useRef } from 'react';
import { useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';

export interface SectionParallaxResult<T extends HTMLElement = HTMLElement> {
  ref: React.RefObject<T | null>;
  scrollYProgress: MotionValue<number>;
  smoothProgress: MotionValue<number>;
  foregroundY: MotionValue<number>;
  backgroundY: MotionValue<number>;
  accentY: MotionValue<number>;
}

export interface SectionParallaxOptions {
  foregroundRange?: [number, number];
  backgroundRange?: [number, number];
  accentRange?: [number, number];
  clamp?: boolean;
  stiffness?: number;
  damping?: number;
}

/**
 * motion.dev inspired physics-based differential parallax scroll hook.
 * Uses useSpring smoothing to eliminate mousewheel stepping and create
 * signature fluid inertia as the viewport scrolls up and down.
 */
export function useSectionParallax<T extends HTMLElement = HTMLElement>(
  options: SectionParallaxOptions = {}
): SectionParallaxResult<T> {
  const ref = useRef<T | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // motion.dev signature spring physics smoothing
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: options.stiffness ?? 130,
    damping: options.damping ?? 28,
    mass: 0.7,
    restDelta: 0.0005,
  });

  const foregroundY = useTransform(
    smoothProgress,
    [0, 1],
    options.foregroundRange ?? [60, -60],
    { clamp: options.clamp ?? false }
  );

  const backgroundY = useTransform(
    smoothProgress,
    [0, 1],
    options.backgroundRange ?? [-30, 30],
    { clamp: options.clamp ?? false }
  );

  const accentY = useTransform(
    smoothProgress,
    [0, 1],
    options.accentRange ?? [90, -90],
    { clamp: options.clamp ?? false }
  );

  return {
    ref,
    scrollYProgress,
    smoothProgress,
    foregroundY,
    backgroundY,
    accentY,
  };
}
