export type EvidenceLevel = "Used in a project" | "Working knowledge" | "Exploring";

export interface SkillCategory {
  category: string;
  description: string;
  skills: {
    name: string;
    level: EvidenceLevel;
    context: string;
  }[];
}

export const skillsData: SkillCategory[] = [
  {
    category: "Medical Imaging & Standards",
    description: "DICOM workflows, medical viewports, format pipelines, and clinical tools",
    skills: [
      { name: "DICOM Workflows", level: "Used in a project", context: "Metadata parsing, multi-frame cine loops, window/level adjustments" },
      { name: "pydicom", level: "Used in a project", context: "Image array extraction, tag inspection, dataset validation" },
      { name: "Cornerstone.js", level: "Working knowledge", context: "Web-based medical imaging viewport architecture" },
      { name: "VTK / DCMTK", level: "Working knowledge", context: "Volumetric rendering concepts and standard imaging toolkits" },
      { name: "Medical UI Standards", level: "Used in a project", context: "Ergonomic clinical viewports, multi-pane layouts, cine controls" }
    ]
  },
  {
    category: "Biosignals & Computational ML",
    description: "Signal preprocessing, filtering, spatial patterns, and feature pipelines",
    skills: [
      { name: "EEG Signal Processing", level: "Used in a project", context: "MNE-Python, CSP, FBCSP feature extraction, epoch segmentation" },
      { name: "sEMG Gait Analysis", level: "Used in a project", context: "Bandpass filtering, full-wave rectification, linear envelopes, NMF" },
      { name: "Python (NumPy / SciPy)", level: "Used in a project", context: "Digital filter design (Butterworth, Notch), Fourier analysis" },
      { name: "Machine Learning (SVM)", level: "Used in a project", context: "scikit-learn linear/RBF classifiers, cross-validation, confusion matrices" },
      { name: "Deep Learning (EEGNet)", level: "Used in a project", context: "Lightweight temporal/spatial convolutions for biosignals" },
      { name: "MATLAB", level: "Used in a project", context: "Signal processing toolboxes, synergy extraction during DRDO research" }
    ]
  },
  {
    category: "Core Software & Desktop Systems",
    description: "Native desktop engineering, performance optimization, and architecture",
    skills: [
      { name: "C++", level: "Used in a project", context: "Native application logic, memory safety, object-oriented desktop architecture" },
      { name: "Qt / Qt Widgets", level: "Used in a project", context: "Custom viewports, event filtering, asynchronous data loading, clinical GUIs" },
      { name: "Python", level: "Used in a project", context: "Research prototyping, automation, data science pipelines" },
      { name: "TypeScript / JavaScript", level: "Used in a project", context: "React frontends, dynamic visualization, interactive WebGL" },
      { name: "Visual Studio Tooling", level: "Used in a project", context: "MSVC compiler configuration, debuggers, profiling workflows" },
      { name: "SQLite / Relational DB", level: "Used in a project", context: "Schema design, relational constraints, desktop local caching" }
    ]
  },
  {
    category: "Embedded & Hardware Prototyping",
    description: "Microcontroller firmware, bio-amplifiers, and actuation control",
    skills: [
      { name: "ESP32 / FreeRTOS", level: "Used in a project", context: "Multi-threaded acquisition, ADC polling, UART serial telemetry" },
      { name: "Arduino / C", level: "Used in a project", context: "PWM multi-servo kinematic control, flex sensor integration" },
      { name: "Raspberry Pi", level: "Working knowledge", context: "Linux single-board computer integration and serial bridging" },
      { name: "Sensor & ADC Interfacing", level: "Used in a project", context: "Bio-potential electrodes, transimpedance amplification circuits" },
      { name: "Serial Protocols (UART/I2C/SPI)", level: "Used in a project", context: "Packet validation, ring buffers, deterministic baud transmission" }
    ]
  },
  {
    category: "Web & Modern Tooling",
    description: "Web development, 3D graphics, version control, and environments",
    skills: [
      { name: "React & Vite", level: "Used in a project", context: "Modern component-driven web applications and portfolios" },
      { name: "Three.js & R3F", level: "Used in a project", context: "Interactive 3D scenes, shaders, spatial data visualization" },
      { name: "Tailwind CSS", level: "Used in a project", context: "Responsive design systems and customized HUD styling" },
      { name: "Git & GitHub", level: "Used in a project", context: "Branch workflows, code reviews, open-source repositories" },
      { name: "Docker", level: "Exploring", context: "Containerized reproducible research environments" }
    ]
  }
];
