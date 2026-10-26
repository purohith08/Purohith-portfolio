export type ProjectTier = 'featured' | 'secondary';
export type ProjectCategory = 'signals' | 'imaging' | 'embedded' | 'software';
export type ProjectStatus = 'Research Prototype' | 'Professional Contribution' | 'Research Internship' | 'Architecture Prototype' | 'Concept';

export interface ProjectCaseStudy {
  id: string;
  tier: ProjectTier;
  category: ProjectCategory;
  title: string;
  subtitle: string;
  status: ProjectStatus;
  date: string;
  organization?: string;
  summary: string;
  problem: string;
  solution: string;
  architectureWorkflow: string[];
  keyContributions: string[];
  technologies: string[];
  validationMetrics: string;
  limitationsAndFuture: string;
  evidenceLinks: {
    github?: string;
    demo?: string;
    notes?: string;
  };
  confidentialityNote?: string;
}

export const projectsData: ProjectCaseStudy[] = [
  {
    id: "eeg-motor-imagery",
    tier: "featured",
    category: "signals",
    title: "Low-Cost Motor Imagery EEG-Based Prosthetic Hand Controller",
    subtitle: "Real-time biosignal feature extraction & classification pipeline with interactive validation",
    status: "Research Prototype",
    date: "2025 - 2026",
    organization: "Capstone Project (B.Tech BME)",
    summary:
      "Engineered an end-to-end motor imagery decoding pipeline designed for non-invasive assistive prosthetic control. Evaluated Filter Bank Common Spatial Patterns (FBCSP) and spatial filtering with Support Vector Machine (SVM) and EEGNet pipelines.",
    problem:
      "Commercial neural prosthetics are cost-prohibitive. Non-invasive EEG interfaces suffer from low signal-to-noise ratios, non-stationarity, and subject-specific trial variability that derail real-time actuation.",
    solution:
      "Constructed a modular signal processing pipeline: raw multi-channel EEG preprocessing $\\rightarrow$ bandpass filtering and spatial feature extraction via CSP/FBCSP $\\rightarrow$ classification using linear/RBF SVM and lightweight EEGNet models $\\rightarrow$ control mapping output to an interactive game simulation and hardware servo triggers.",
    architectureWorkflow: [
      "Input: Multi-channel EEG epoch acquisition (motor-imagery paradigm)",
      "Preprocessing: 50Hz notch filter, 8-30Hz bandpass filtering (Mu and Beta rhythm extraction), artifact thresholding",
      "Feature Stage: Spatial covariance estimation & Filter Bank Common Spatial Patterns (FBCSP)",
      "Classification: Supervised SVM / compact EEGNet neural architecture",
      "Actuation Interface: Control signal serial pipeline mapped to prosthetic fingers / simulation state"
    ],
    keyContributions: [
      "Designed spatial filtering and epoching modules in Python utilizing MNE-Python, NumPy, and SciPy.",
      "Trained and cross-validated motor imagery classifiers with strict trial separation to avoid data leakage.",
      "Connected real-time classification feedback to an interactive test game for latency and command validation."
    ],
    technologies: ["Python", "MNE-Python", "NumPy", "SciPy", "scikit-learn", "EEGNet", "PyQt / Matplotlib"],
    validationMetrics:
      "Evaluated on multi-trial motor-imagery benchmark data. Verified confusion matrix stability across trials. (Tested in offline and replayed streaming evaluation mode; academic prototype, not clinically cleared).",
    limitationsAndFuture:
      "Subject variability requires quick initial calibration. Future work aims to implement transfer learning models and test ultra-low power edge deployment on embedded microprocessors.",
    evidenceLinks: {
      github: "https://github.com/purohith08/BCI-IV-YEAR-project",
      notes: "Public repository with preprocessing pipelines and classification notebooks."
    }
  },
  {
    id: "medical-imaging-desktop",
    tier: "featured",
    category: "imaging",
    title: "Medical Imaging & Cine Desktop Application",
    subtitle: "High-performance DICOM and cine workflow UI engineering with Qt and C++",
    status: "Professional Contribution",
    date: "2025 - 2026",
    organization: "Suntrion Technosol Pvt Ltd",
    summary:
      "Contributed to desktop medical imaging software, focusing on high-framerate viewport behavior, DICOM/cine loop rendering, layout responsiveness, and clinical workflow UI optimization.",
    problem:
      "Clinical imaging workstations require instantaneous frame navigation, smooth window/level adjustments, and deterministic memory behavior during multi-frame cine loops without UI thread locking.",
    solution:
      "Implemented modular Qt C++ UI components separating decoding and display logic. Optimized viewport paint events, caching mechanisms, and asynchronous data streaming to preserve fluid 60 FPS viewport manipulation.",
    architectureWorkflow: [
      "Input Layer: DICOM image/cine multi-frame dataset parsing",
      "Processing/Decoding: Frame-by-frame memory buffer management and LUT transformations",
      "Rendering Layer: Dedicated Qt Graphics/OpenGL viewport rendering with double buffering",
      "Interaction Layer: Window/level (contrast/brightness) manipulation, zoom, pan, and cine playback controls",
      "State Management: Decoupled workflow state maintaining synchronous metadata display"
    ],
    keyContributions: [
      "Architected clean viewport interaction controls for continuous cine-loop replay and frame-by-frame inspection.",
      "Refactored legacy UI widgets to eliminate paint event stalls and prevent UI freezes during heavy cine rendering.",
      "Adhered strictly to medical software code maintainability standards and modular desktop architectural patterns."
    ],
    technologies: ["C++", "Qt / Qt Widgets", "DICOM workflows", "Visual Studio", "Image Pipelines"],
    validationMetrics:
      "Verified stable viewport frame-rates with zero memory leaks across sustained multi-hour cine loop stress testing on synthetic test sets.",
    limitationsAndFuture:
      "Proprietary clinical codebase protected under NDA; presented through public-safe architecture diagrams and synthetic de-identified mock data.",
    evidenceLinks: {
      notes: "Public-safe architectural review and engineering documentation."
    },
    confidentialityNote: "Commercial product source code and clinical patient files remain confidential under employer NDA."
  },
  {
    id: "debel-drdo-gait",
    tier: "featured",
    category: "signals",
    title: "Bilateral Muscle Synergy Analysis of Human Gait (sEMG)",
    subtitle: "Surface electromyography acquisition, signal processing, and biomechanical coordination analysis",
    status: "Research Internship",
    date: "June 2025 - July 2025",
    organization: "DEBEL - Defence Bioengineering & Electromedical Lab, DRDO",
    summary:
      "Conducted surface electromyography (sEMG) signal acquisition, artifact filtering, and muscle synergy extraction across gait cycles during a research internship at DEBEL-DRDO, Bengaluru.",
    problem:
      "Understanding neuromuscular motor control and bilateral coordination during human walking requires isolating clean motor unit action potentials from motion artifacts and inter-muscle cross-talk.",
    solution:
      "Applied biomedical signal filtering pipelines: high-pass filtering (motion artifact removal), full-wave rectification, linear envelope estimation via low-pass Butterworth filtering, and Non-negative Matrix Factorization (NMF) for synergy extraction.",
    architectureWorkflow: [
      "Acquisition: Multi-channel sEMG sensor placement on bilateral lower-limb muscle groups",
      "Filtering: 20-450 Hz bandpass filter + 50 Hz notch filter to remove powerline interference",
      "Envelope Extraction: Full-wave rectification followed by 4th-order low-pass Butterworth filtering",
      "Segmentation: Gait cycle normalization (0-100% stance/swing phase)",
      "Dimensionality Reduction: Extraction of muscle synergy weightings and temporal activation profiles via NMF"
    ],
    keyContributions: [
      "Executed sEMG preprocessing algorithms and normalization routines adhering to SENIAM electrode placement guidelines.",
      "Computed synergy vector correlations across gait cycles to assess bilateral coordination and neuromuscular control.",
      "Synthesized findings into technical reports adhering to defence research publication protocols."
    ],
    technologies: ["MATLAB", "Python", "NumPy / SciPy", "sEMG Processing", "Biomechanical Modeling"],
    validationMetrics:
      "Analyzed Variance Accounted For (VAF) across varying synergy numbers (k=3 to 5) to establish optimal reconstruction fidelity.",
    limitationsAndFuture:
      "Internal DRDO lab datasets and defence research outputs are restricted; only generalized methodological pipelines and non-sensitive signal concepts are demonstrated.",
    evidenceLinks: {
      notes: "Research internship completed under DEBEL-DRDO guidance; methodology adheres to open biomechanical standards."
    },
    confidentialityNote: "Subject to DRDO institutional disclosure boundaries. No restricted data or internal reports published."
  },
  {
    id: "nirs-screening-prototype",
    tier: "secondary",
    category: "embedded",
    title: "NIRS Optical Screening & Tissue Oxygenation Prototype",
    subtitle: "Near-infrared spectroscopy instrumentation concept and signal pipeline",
    status: "Concept",
    date: "2024 - 2025",
    organization: "Independent Academic Research",
    summary:
      "Explored multi-wavelength near-infrared optical sensing principles (Beer-Lambert law) for differential optical density calculation and non-invasive hemodynamic monitoring.",
    problem:
      "Conventional tissue screening tools often involve ionizing radiation or high infrastructure costs, limiting accessible preventative triage in peripheral healthcare centers.",
    solution:
      "Designed a dual-wavelength LED driver and photodiode receiver circuit pipeline simulating optical absorption changes corresponding to oxygenated and deoxygenated hemoglobin levels.",
    architectureWorkflow: [
      "Optical Emitters: Dual-wavelength NIR sources (735nm & 850nm)",
      "Analog Front End: Transimpedance amplifier (TIA) with high gain-bandwidth product",
      "Signal Conditioning: ADC conversion with digital bandpass and ambient light cancellation",
      "Computation: Modified Beer-Lambert Law calculation for relative $\\Delta[HbO_2]$ and $\\Delta[Hb]$"
    ],
    keyContributions: [
      "Modeled photon attenuation in tissue phantom media using analytical equations.",
      "Prototyped the analog transimpedance amplification circuit stage for low-noise optical signal acquisition."
    ],
    technologies: ["Optoelectronics", "Analog Circuitry", "Python", "Instrumentation"],
    validationMetrics:
      "Bench-tested on optical phantom models; verified signal response linearity across varying baseline optical densities.",
    limitationsAndFuture:
      "Conceptual engineering prototype only. No clinical diagnostic claims; human trials require formal IRB/ethics committee approval.",
    evidenceLinks: {
      notes: "Academic and bench prototype phase."
    }
  },
  {
    id: "nexclin-clinic-manager",
    tier: "secondary",
    category: "software",
    title: "NexClin Clinic & Patient Management System",
    subtitle: "Modular C++/Qt desktop architecture with relational database storage",
    status: "Architecture Prototype",
    date: "2025",
    organization: "Independent Software Project",
    summary:
      "Engineered an offline-capable, responsive desktop management application designed for small clinics, featuring role-based workflows and SQLite/PostgreSQL schema structures.",
    problem:
      "Small clinics often struggle with clunky cloud interfaces that fail during intermittent internet connectivity and suffer from vendor lock-in.",
    solution:
      "Developed a robust native desktop application in Qt/C++ with localized data caching, cryptographic password hashing, and clean UI navigation.",
    architectureWorkflow: [
      "UI Layer: Custom Qt Widgets styled with dark clinical theme",
      "Business Logic: Patient records, visit logs, appointment scheduling controllers",
      "Data Access Layer: Relational SQLite storage with transaction rollbacks",
      "Security: Salted SHA-256 credential hashing and localized file encryption"
    ],
    keyContributions: [
      "Designed database schema with foreign-key referential integrity for patient histories and consultations.",
      "Implemented responsive UI layouts and asynchronous query execution to prevent interface freezing."
    ],
    technologies: ["C++", "Qt", "SQLite", "Desktop Architecture", "UI Design"],
    validationMetrics:
      "Stress-tested with 10,000 synthetic patient records with sub-10ms query return times.",
    limitationsAndFuture:
      "Roadmap includes automated backup synchronization to self-hosted encrypted network storage.",
    evidenceLinks: {
      notes: "Private repository; clean architecture design presented."
    }
  },
  {
    id: "embedded-biomedical-prototypes",
    tier: "secondary",
    category: "embedded",
    title: "Embedded Biosignal Acquisition & Actuation Units",
    subtitle: "Microcontroller firmware, ADC sampling, and servo driver integrations",
    status: "Research Prototype",
    date: "2024 - 2025",
    organization: "Biomedical Systems Lab",
    summary:
      "Integrated microcontrollers (ESP32 / Arduino / RPi) with bio-amplifiers and servo motor drivers to validate closed-loop signal-to-actuation workflows.",
    problem:
      "Bridging algorithmic classification code on a workstation to physical prosthetic actuators requires deterministic serial communication and low jitter.",
    solution:
      "Authored optimized C/C++ firmware implementing ring buffers, UART packet validation with checksums, and PWM multi-servo kinematics.",
    architectureWorkflow: [
      "Sensor Layer: Bio-potential electrodes / flex sensors",
      "Firmware Layer: FreeRTOS task handling on ESP32 (ADC sampling task + UART telemetry task)",
      "Driver Layer: PWM multi-channel control of prosthetic hand finger servos with smooth acceleration ramping"
    ],
    keyContributions: [
      "Wrote robust microcontroller firmware with timer interrupts and minimal latency.",
      "Created calibration routines to map analog voltage swings to proportional servo angles."
    ],
    technologies: ["ESP32", "Arduino", "C/C++", "UART/SPI/I2C", "Servo Drivers"],
    validationMetrics:
      "Maintained stable serial packet reception with < 15ms end-to-end trigger latency.",
    limitationsAndFuture:
      "Ongoing development focuses on PCB miniaturization and custom power management circuitry.",
    evidenceLinks: {
      notes: "Laboratory testbed setup and firmware test benches."
    }
  }
];
