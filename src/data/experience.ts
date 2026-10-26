export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  location: string;
  period: string;
  type: "employment" | "internship" | "research" | "clinical";
  summary: string;
  responsibilities: string[];
  technologies: string[];
  verificationNote?: string;
}

export const experienceData: ExperienceItem[] = [
  {
    id: "suntrion-technosol",
    role: "Medical Software Developer (Qt / C++)",
    organization: "Suntrion Technosol Pvt Ltd",
    location: "Trichy, India",
    period: "2025 - Present",
    type: "employment",
    summary:
      "Developing medical desktop applications with C++ and Qt, optimizing DICOM viewers, cine playback mechanisms, and clinical user workflows.",
    responsibilities: [
      "Engineered responsive viewport modules in Qt C++ to render high-resolution medical images and cine-loops smoothly.",
      "Optimized memory caching and multi-frame rendering loops to prevent UI frame stalls during clinical reviews.",
      "Collaborated with engineering teams to enhance patient data navigation and interface ergonomics.",
      "Ensured code adherence to modular software standards and desktop GUI architecture best practices."
    ],
    technologies: ["C++", "Qt / Qt Widgets", "DICOM workflows", "Visual Studio", "Desktop Architecture"],
    verificationNote: "Employment verified; discussions and public displays are framed in public-safe engineering architectural terms under NDA guidelines."
  },
  {
    id: "debel-drdo",
    role: "Research Intern — Biomedical Signals",
    organization: "DEBEL - Defence Bioengineering & Electromedical Lab, DRDO",
    location: "Bengaluru, India",
    period: "June 2025 - July 2025",
    type: "research",
    summary:
      "Conducted research on 'Bilateral Muscle Synergy Analysis of Human Gait Using Surface Electromyography (sEMG)' under senior DRDO scientists.",
    responsibilities: [
      "Carried out multi-channel surface EMG signal preprocessing, digital filtering, and amplitude envelope extraction.",
      "Implemented Non-negative Matrix Factorization (NMF) algorithms to identify underlying motor control synergies during human walking.",
      "Analyzed synergy coordination stability and bilateral symmetry across standardized gait cycle phases.",
      "Maintained strict data discipline in compliance with laboratory protocols and defense research standards."
    ],
    technologies: ["MATLAB", "Python", "sEMG Signal Processing", "SciPy", "Biomechanics Analysis"],
    verificationNote: "Research internship verified through public profile records. Complies with DRDO public disclosure boundaries."
  },
  {
    id: "gvn-hospital",
    role: "Biomedical Engineering Intern",
    organization: "GVN Riverside Hospital",
    location: "Trichy, India",
    period: "2024",
    type: "clinical",
    summary:
      "Hands-on clinical biomedical instrumentation training, maintenance workflows, calibration, and patient safety testing.",
    responsibilities: [
      "Observed and assisted with preventive maintenance, safety inspections, and troubleshooting of clinical monitoring equipment.",
      "Gained direct exposure to ICU patient monitors, defibrillators, infusion pumps, and electro-surgical units.",
      "Learned hospital clinical engineering standards, equipment inventory tracking, and medical device electrical safety verification."
    ],
    technologies: ["Clinical Instrumentation", "Electrical Safety Analyzers", "Hospital Engineering Systems"],
    verificationNote: "Hospital clinical engineering exposure verified."
  }
];
