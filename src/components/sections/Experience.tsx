import React from 'react';
import { motion, useTransform } from 'framer-motion';
import { Calendar, MapPin, CheckCircle2, ShieldCheck } from 'lucide-react';
import { experienceData } from '../../data/experience';
import { useSectionParallax } from '../../hooks/useSectionParallax';

export const Experience: React.FC = () => {
  const { ref, scrollYProgress, backgroundY } = useSectionParallax<HTMLElement>({
    backgroundRange: [-25, 25],
    clamp: false,
  });

  // Staggered differential parallax per card for tangible spatial depth
  const cardY0 = useTransform(scrollYProgress, [0, 1], [35, -35], { clamp: false });
  const cardY1 = useTransform(scrollYProgress, [0, 1], [60, -60], { clamp: false });
  const cardY2 = useTransform(scrollYProgress, [0, 1], [85, -85], { clamp: false });
  const cardYs = [cardY0, cardY1, cardY2];

  return (
    <section
      ref={ref}
      id="experience"
      className="py-20 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto border-t border-[#264653]/50"
    >
      {/* Header — Anchored background parallax layer */}
      <motion.div
        style={{ y: backgroundY }}
        className="flex flex-col md:flex-row md:items-end justify-between mb-12 text-left will-change-transform"
      >
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#2A9D8F] animate-pulse" />
            <span className="badge-telemetry">SECTION 01: PROFESSIONAL TRAJECTORY</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#E9ECEF] tracking-tight">
            Engineering, Research & Clinical Experience
          </h2>
        </div>
        <p className="text-sm text-[#ADB5BD] max-w-md mt-4 md:mt-0 font-sans leading-relaxed">
          Verified employment at Suntrion Technosol, defense research at DEBEL-DRDO, and clinical instrumentation at GVN Riverside Hospital.
        </p>
      </motion.div>

      {/* Experience Chronological Timeline with Differential Card Parallax */}
      <div className="space-y-6 text-left">
        {experienceData.map((item, index) => (
          <motion.div
            key={item.id}
            style={{ y: cardYs[index % cardYs.length] }}
            className="surface-instrument-card rounded-2xl p-6 sm:p-8 border border-[#264653]/60 shadow-xl relative overflow-hidden will-change-transform"
          >
            {/* Top Row: Role, Organization, Location, Period */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#264653]/60">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="badge-telemetry text-[10px] uppercase">{item.type}</span>
                  <span className="text-xs font-telemetry text-[#2A9D8F]">{item.organization}</span>
                </div>
                <h3 className="font-display text-xl font-bold text-[#E9ECEF]">
                  {item.role}
                </h3>
              </div>

              <div className="flex sm:flex-col items-start sm:items-end gap-3 sm:gap-1 text-xs font-telemetry text-[#ADB5BD]">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#2A9D8F]" />
                  <span>{item.period}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#2A9D8F]" />
                  <span>{item.location}</span>
                </div>
              </div>
            </div>

            {/* Summary */}
            <p className="text-sm text-[#CED4DA] my-4 leading-relaxed font-sans">
              {item.summary}
            </p>

            {/* Responsibilities list */}
            <div className="space-y-2 mb-6">
              {item.responsibilities.map((resp, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-[#E9ECEF]">
                  <CheckCircle2 className="w-4 h-4 text-[#2A9D8F] shrink-0 mt-0.5" />
                  <span className="font-sans leading-relaxed">{resp}</span>
                </div>
              ))}
            </div>

            {/* Bottom Row: Technologies & Verification Note */}
            <div className="pt-4 border-t border-[#264653]/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex flex-wrap gap-1.5">
                {item.technologies.map((t, idx) => (
                  <span key={idx} className="text-[10px] font-telemetry px-2 py-0.5 rounded bg-[#16272F] text-[#2A9D8F] border border-[#264653]">
                    {t}
                  </span>
                ))}
              </div>

              {item.verificationNote && (
                <div className="flex items-center gap-1.5 text-[11px] font-telemetry text-[#ADB5BD]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#2A9D8F]" />
                  <span>{item.verificationNote}</span>
                </div>
              )}
            </div>

          </motion.div>
        ))}
      </div>

    </section>
  );
};
