import React from 'react';
import { motion, useTransform } from 'framer-motion';
import { Calendar, MapPin, CheckCircle2, ShieldCheck, GraduationCap, Award, BookOpen, Rocket } from 'lucide-react';
import { experienceData } from '../../data/experience';
import { educationData, activitiesData } from '../../data/education';
import { useSectionParallax } from '../../hooks/useSectionParallax';

export const Experience: React.FC = () => {
  const { ref, scrollYProgress, backgroundY } = useSectionParallax<HTMLElement>({
    backgroundRange: [-25, 25],
    clamp: false,
  });

  // Staggered differential parallax per card for tangible spatial depth
  const cardY0 = useTransform(scrollYProgress, [0, 1], [30, -30], { clamp: false });
  const cardY1 = useTransform(scrollYProgress, [0, 1], [50, -50], { clamp: false });
  const cardY2 = useTransform(scrollYProgress, [0, 1], [70, -70], { clamp: false });
  const cardY3 = useTransform(scrollYProgress, [0, 1], [90, -90], { clamp: false });
  const cardYs = [cardY0, cardY1, cardY2, cardY3];

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
          Medical imaging development, defense bioengineering research at DRDO DEBEL, UAV flight systems at DSU, and clinical engineering at GVN Riverside Hospital.
        </p>
      </motion.div>

      {/* Experience Chronological Timeline with Differential Card Parallax */}
      <div className="space-y-6 text-left mb-16">
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

      {/* Verified Education & Academic Credentials */}
      <div className="border-t border-[#264653]/50 pt-14 text-left">
        <div className="flex items-center gap-2 mb-6">
          <GraduationCap className="w-5 h-5 text-[#2A9D8F]" />
          <h3 className="font-display text-2xl font-bold text-[#E9ECEF] tracking-tight">
            Academic Background & Certified Credentials
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Main Degree Card */}
          <div className="surface-instrument-card rounded-2xl p-6 border border-[#264653]/60 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-telemetry text-[#2A9D8F] mb-2">
                <span>{educationData[0].period}</span>
                <span className="font-bold px-2 py-0.5 rounded bg-[#2A9D8F]/15 border border-[#2A9D8F]/30">{educationData[0].score}</span>
              </div>
              <h4 className="font-display font-bold text-lg text-[#E9ECEF] mb-1">
                {educationData[0].degree}
              </h4>
              <p className="text-xs text-[#ADB5BD] mb-3">
                {educationData[0].institution}, {educationData[0].location}
              </p>
              <ul className="space-y-1.5 text-xs text-[#CED4DA] font-sans">
                {educationData[0].details.map((d, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#2A9D8F] mt-1">•</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* NPTEL Certification & Publication */}
          <div className="surface-instrument-card rounded-2xl p-6 border border-[#264653]/60 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-telemetry text-[#2A9D8F] mb-2">
                <Award className="w-4 h-4 text-[#2A9D8F]" />
                <span className="font-bold">NPTEL IIT MADRAS (94%)</span>
              </div>
              <h4 className="font-display font-bold text-base text-[#E9ECEF] mb-1">
                {activitiesData[0].title}
              </h4>
              <p className="text-xs text-[#CED4DA] font-sans mb-3">
                {activitiesData[0].summary}
              </p>
            </div>

            <div className="pt-3 border-t border-[#264653]/50">
              <div className="flex items-center gap-2 text-xs font-telemetry text-[#2A9D8F] mb-1">
                <BookOpen className="w-4 h-4 text-[#2A9D8F]" />
                <span className="font-bold">RESEARCH PUBLICATION</span>
              </div>
              <h5 className="font-display font-semibold text-xs text-[#E9ECEF]">
                {activitiesData[3].title}
              </h5>
              <p className="text-[11px] text-[#ADB5BD] mt-1">
                ICMSET Conference 2025 • {activitiesData[3].scoreOrStatus}
              </p>
            </div>
          </div>

          {/* ISRO Challenge & Specialized Training */}
          <div className="surface-instrument-card rounded-2xl p-6 border border-[#264653]/60 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-telemetry text-[#2A9D8F] mb-2">
                <Rocket className="w-4 h-4 text-[#2A9D8F]" />
                <span className="font-bold">ISRO ROBOTIC CHALLENGE 2025</span>
              </div>
              <h4 className="font-display font-bold text-base text-[#E9ECEF] mb-1">
                Drone Engineer — Team ANAV
              </h4>
              <p className="text-xs text-[#CED4DA] font-sans">
                Calibrated sensor telemetry arrays, autonomous IMU positioning, and flight controllers at DSU Drone Innovation Centre.
              </p>
            </div>

            <div className="pt-3 border-t border-[#264653]/50">
              <span className="text-[10px] font-telemetry text-[#ADB5BD] uppercase block mb-1">
                Specialized Technical Training
              </span>
              <p className="text-xs text-[#E9ECEF] font-sans">
                Full Stack Web Development & Embedded Systems • CodeBind Technologies
              </p>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};
