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
    subtitle: "Real-time biosignal feature extraction, FBCSP/EEGNet/SVM classification & physical actuation",
    status: "Research Prototype",
    date: "2025 – 2026",
    organization: "Final-Year B.Tech Capstone Project (Guide: Dr. N. Shankar)",
    summary:
      "Engineered an end-to-end motor imagery decoding pipeline designed for affordable neural prosthetic control. Integrated ADS1299 EEG acquisition, Filter Bank Common Spatial Patterns (FBCSP), EEGNet, and SVM classifiers, mapping commands to Raspberry Pi and Arduino for multi-servo finger actuation.",
    problem:
      "Commercial neural prosthetics cost tens of thousands of dollars. Non-invasive EEG interfaces suffer from low signal-to-noise ratios, non-stationarity, and subject-specific trial variability that derail real-time actuation.",
    solution:
      "Constructed a modular biosignal pipeline: 24-bit ADS1299 acquisition → 50Hz notch & 8-30Hz bandpass filtering (Mu and Beta rhythm extraction) → Filter Bank Common Spatial Patterns (FBCSP) spatial filtering → Supervised classification via SVM and compact EEGNet models → Serial control mapping to Raspberry Pi and Arduino servo drivers.",
    architectureWorkflow: [
      "Acquisition: ADS1299 low-noise 24-bit delta-sigma bio-potential analog front-end",
      "Preprocessing: 50Hz notch filter, 8-30Hz bandpass filtering, and epoch segmentation",
      "Spatial Decomposition: Filter Bank Common Spatial Patterns (FBCSP) sub-band spatial covariance",
      "Classification: Supervised SVM / lightweight EEGNet neural architecture",
      "Actuation Interface: UART telemetry to Raspberry Pi & Arduino driving PWM articulated prosthetic servos"
    ],
    keyContributions: [
      "Engineered the complete BCI processing pipeline in Python utilizing MNE-Python, NumPy, and SciPy.",
      "Trained and cross-validated motor imagery classifiers with strict trial separation to eliminate data leakage.",
      "Interfaced real-time classification triggers to Raspberry Pi and Arduino for physical finger flexion and extension."
    ],
    technologies: ["Python", "ADS1299", "FBCSP", "EEGNet", "SVM", "MNE-Python", "Raspberry Pi", "Arduino", "SciPy"],
    validationMetrics:
      "Validated on standardized motor-imagery benchmark data and live epoch streams; verified confusion matrix stability and low-latency actuation trigger times.",
    limitationsAndFuture:
      "Subject-specific variance requires initial baseline calibration; future iterations will integrate real-time adaptive transfer learning.",
    evidenceLinks: {
      github: "https://github.com/purohith08/BCI-IV-YEAR-project",
      notes: "Capstone project guided by Dr. N. Shankar; includes preprocessing, classifiers, and hardware drivers."
    }
  },
  {
    id: "dicom-video-workstation",
    tier: "featured",
    category: "imaging",
    title: "DICOM Cine Workstation & Qt/C++ Medical UI Engineering",
    subtitle: "Multi-frame ultrasound & XA/XC cine loops, MPEG-2/H.264 decoding, and URD/SRD traceability",
    status: "Professional Contribution",
    date: "Jul 2026 – Oct 2026",
    organization: "Freelance Medical Imaging Software Developer",
    summary:
      "Implemented DICOM video support for ultrasound cine loops and XA/XC modalities with MPEG-2/H.264 decoding in a medical workstation. Refactored Qt/C++ medical viewports for responsive scaling and authored complete URD/SRD compliance documentation.",
    problem:
      "Clinical imaging workstations require instantaneous frame navigation, smooth playback of high-framerate multi-frame ultrasound cine loops without UI thread locking, and strict regulatory requirement traceability.",
    solution:
      "Integrated MPEG-2 / H.264 video decoding and frame navigation into the existing Cine Tool. Analysed PySide6 / VTK / Pydicom codebase to plan cine playback and memory improvements. Resolved responsive layout, clipping, and rendering bugs across screen sizes from 1280×1024 to 1920×1080. Authored Patient Viewer and Image Viewer URD/SRD documentation and traceability matrices in Excel.",
    architectureWorkflow: [
      "Input Layer: DICOM ultrasound cine & X-ray angiography (XA/XC) multi-frame parsing",
      "Decoding Pipeline: MPEG-2 and H.264 decoding integrated with Cine Tool frame navigation",
      "Rendering Viewport: Qt/C++ double-buffered medical viewport handling window/level and zoom/pan",
      "Ergonomics: Responsive dialog layouts from 1280×1024 to 1080p for report editor and patient demography",
      "Compliance: Numbered URD → SRD → Test-case traceability matrix and SBOM / SOUP lists in Excel"
    ],
    keyContributions: [
      "Implemented DICOM video support for ultrasound cine and XA/XC with smooth frame navigation and caching.",
      "Fixed layout clipping, responsive scaling, and rendering bugs in report editor, patient demography, and hub dialogs.",
      "Authored Patient Viewer and Image Viewer User Requirement Documents and Software Requirement Documents with test traceability."
    ],
    technologies: ["C++", "Qt / PySide6", "DICOM (XA/XC/US)", "VTK", "Pydicom", "H.264", "MPEG-2", "Visual Studio", "Excel URD/SRD"],
    validationMetrics:
      "Eliminated rendering stalls across 1280×1024 to 1920×1080 displays; validated end-to-end URD → SRD test-case coverage and SBOM audits.",
    limitationsAndFuture:
      "Proprietary clinical codebase protected under NDA; architecture and requirement methodology presented in public-safe form.",
    evidenceLinks: {
      notes: "Freelance medical imaging workstation engineering and regulatory compliance documentation."
    },
    confidentialityNote: "Commercial codebase and proprietary clinical documents protected under professional NDA boundaries."
  },
  {
    id: "ai-ultrasound-reporting",
    tier: "featured",
    category: "software",
    title: "AI-Based Ultrasound Report Generation Web Application",
    subtitle: "Automated clinical report generation service with FastAPI backend and React frontend",
    status: "Research Prototype",
    date: "2025 – 2026",
    organization: "Medical Software Systems",
    summary:
      "Developed a full-stack medical web application pairing a FastAPI microservice backend with a responsive React user interface to streamline clinical ultrasound report generation and structured reporting.",
    problem:
      "Radiologists and sonographers spend excessive time manually transcribing ultrasound findings, measurements, and diagnostic impressions into disparate hospital reporting templates.",
    solution:
      "Engineered an interactive web application that accepts structured ultrasound parameters, image findings, and biometric measurements, automatically generating standardized diagnostic report drafts via a FastAPI service.",
    architectureWorkflow: [
      "Frontend: React SPA with structured medical input forms, dynamic biometric validation, and report preview",
      "Backend API: Asynchronous FastAPI service handling validation, template injection, and document compilation",
      "Database Layer: PostgreSQL storage for clinician profiles, examination records, and report templates",
      "Export Module: Formatted PDF and structured DICOM SR (Structured Report) output generation"
    ],
    keyContributions: [
      "Built high-performance asynchronous REST endpoints in FastAPI for rapid report compilation.",
      "Designed an ergonomic React interface allowing sonographers to review, edit, and sign off on drafts in seconds.",
      "Containerized backend services with Docker to ensure reproducible local and cloud deployment."
    ],
    technologies: ["FastAPI", "React", "Python", "PostgreSQL", "Docker", "Tailwind CSS", "REST API"],
    validationMetrics:
      "Sub-50ms API response times for report draft generation; validated against standard clinical ultrasound reporting templates.",
    limitationsAndFuture:
      "Ongoing development aims to incorporate automatic DICOM SR ingestion directly from PACS modalities.",
    evidenceLinks: {
      notes: "Full-stack medical application built with FastAPI and React."
    }
  },
  {
    id: "dicom-video-compression-research",
    tier: "secondary",
    category: "imaging",
    title: "DICOM Video Compression Research & Cloud Archival Strategy",
    subtitle: "Benchmarking MPEG-1/2/H.264/H.265 transcoding, lossless codecs & ROI/RONI AWS S3 archival",
    status: "Professional Contribution",
    date: "Jul 2026 – Oct 2026",
    organization: "Freelance Medical Imaging Research",
    summary:
      "Built Python dashboards and pipelines for MPEG-1, MPEG-2, H.264, and H.265 transcoding of DICOM cine loops while preserving tags. Benchmarked strict-lossless codecs (JPEG-LS, JPEG 2000, FFV1) and designed an ROI/RONI strategy for AWS S3 archival.",
    problem:
      "High-frame-rate medical cine series (ultrasound and angiography) generate massive datasets that overwhelm network bandwidth and PACS cloud storage budgets without compromising diagnostic regions.",
    solution:
      "Built automated Python pipelines that transcode DICOM cine into multi-frame formats, re-encapsulating valid DICOM output with metadata preserved. Evaluated compression ratio, bitrate, PSNR, and latency across all four codecs. Proposed an ROI/RONI scheme preserving strict-lossless diagnostic regions while applying high compression to background tissue for S3 archival.",
    architectureWorkflow: [
      "Input: Multi-frame DICOM cine (ultrasound cine loops, coronary angiography)",
      "Transcoding Engine: Python FFmpeg wrapper transcoding to MPEG-1, MPEG-2, H.264, H.265",
      "Tag Preservation: Re-encapsulation of DICOM SOP Class, Transfer Syntax, and patient metadata via Pydicom",
      "Benchmarking Suite: Automated calculation of Peak Signal-to-Noise Ratio (PSNR), bitrate, compression ratio, latency",
      "Cloud Strategy: ROI (Region of Interest) lossless preservation (JPEG-LS/2000) with RONI high compression for AWS S3"
    ],
    keyContributions: [
      "Validated all four video compression pipelines end-to-end with verified DICOM conformance.",
      "Benchmarked strict-lossless options (JPEG-LS, JPEG 2000, FFV1) for cine and angiography.",
      "Proposed practical ROI/RONI compression architecture reducing cloud archival costs by over 60%."
    ],
    technologies: ["Python", "Pydicom", "FFmpeg", "OpenCV", "JPEG-LS", "JPEG 2000", "H.265", "AWS S3 Archival"],
    validationMetrics:
      "Reported objective PSNR curves, bitrate savings, and transcode latency metrics across ultrasound and angiography test datasets.",
    limitationsAndFuture:
      "ROI segmentation currently relies on pre-defined clinical masks; future iterations will test automated deep-learning bounding boxes.",
    evidenceLinks: {
      notes: "Research dashboards, pipelines, and cloud archival strategy."
    }
  },
  {
    id: "nir-dot-breast-screening",
    tier: "secondary",
    category: "embedded",
    title: "NIR-DOT Portable Breast Cancer Screening Prototype",
    subtitle: "Near-infrared diffuse optical tomography using ESP32 & BPW34 photodiodes on tissue phantoms",
    status: "Research Prototype",
    date: "2024 – 2025",
    organization: "Biomedical Instrumentation Lab",
    summary:
      "Constructed a portable near-infrared optical screening prototype utilizing an ESP32 microcontroller and BPW34 photodiode sensors to detect differential optical absorption in breast tissue phantoms.",
    problem:
      "Conventional mammography involves painful tissue compression and ionizing radiation, creating screening resistance and barriers in low-resource primary care clinics.",
    solution:
      "Designed an optoelectronic sensor array driven by an ESP32, measuring diffuse optical transmission at near-infrared wavelengths to detect localized hemoglobin concentration differences.",
    architectureWorkflow: [
      "Optical Transmission: Dual NIR emitters emitting across diagnostic optical window",
      "Sensor Front-End: BPW34 silicon PIN photodiodes with transimpedance amplification",
      "Firmware: ESP32 ADC multi-channel sampling and digital baseline subtraction",
      "Validation: Physical breast tissue phantoms with calibrated optical inclusions"
    ],
    keyContributions: [
      "Designed low-noise sensor front-end circuitry using BPW34 photodiodes.",
      "Authored ESP32 firmware for multi-channel optical acquisition and serial streaming.",
      "Validated differential optical attenuation on custom silicone-lipid tissue phantoms."
    ],
    technologies: ["ESP32", "BPW34 Photodiodes", "Embedded C", "Optoelectronics", "Tissue Phantoms", "Analog Circuits"],
    validationMetrics:
      "Successfully detected embedded phantom inclusions simulating abnormal optical density variations with high repeatability.",
    limitationsAndFuture:
      "Prototype designed for preliminary non-ionizing screening validation; requires clinical ethics review before human subject trials.",
    evidenceLinks: {
      notes: "Benchtop experimental prototype validated on optical tissue phantoms."
    }
  },
  {
    id: "ultrasound-pacs-teleradiology",
    tier: "secondary",
    category: "software",
    title: "Ultrasound PACS Platform & Teleradiology Server",
    subtitle: "Hybrid C++/Qt & Python codebase analysis, model-weight sync, and Django/PostgreSQL debugging",
    status: "Professional Contribution",
    date: "Jul 2026 – Oct 2026",
    organization: "Freelance Medical Software Development",
    summary:
      "Supported hybrid C++/Qt and Python ultrasound PACS development, authored User Requirements Documents, resolved release build runtime errors, and diagnosed Django/PostgreSQL teleradiology server issues.",
    problem:
      "Hybrid medical imaging platforms often experience release build failures (missing DLLs, model-weight path mismatches) and teleradiology authentication / server errors under production loads.",
    solution:
      "Analysed the C++/Qt and Python codebase, authored the platform's URD, debugged runtime release failures, scripted automated model-weight synchronisation, and diagnosed Django/PostgreSQL settings and HTTP 500 password-reset endpoints.",
    architectureWorkflow: [
      "Application Core: C++/Qt and Python hybrid architecture for ultrasound image review",
      "Deployment Scripts: Python scripts synchronising ML model weights and dynamic libraries to build targets",
      "Server Backend: Django REST Framework with PostgreSQL, Redis task queues, and Celery workers",
      "Diagnostics: Resolved Poetry environment dependency collisions and set up endoscopy imaging in Visual Studio"
    ],
    keyContributions: [
      "Authored User Requirements Document for hybrid ultrasound PACS platform.",
      "Eliminated release build runtime failures by automating model-weight synchronisation to build outputs.",
      "Diagnosed and resolved Django/PostgreSQL authentication errors and HTTP 500 endpoint exceptions."
    ],
    technologies: ["C++", "Qt", "Python", "Django REST", "PostgreSQL", "Redis", "Celery", "Poetry", "Visual Studio"],
    validationMetrics:
      "Ensured zero-defect release builds with automated dependency synchronisation and stable server endpoint responses.",
    limitationsAndFuture:
      "Production deployment pipelines managed in client private infrastructure.",
    evidenceLinks: {
      notes: "Ultrasound PACS platform and teleradiology server engineering."
    },
    confidentialityNote: "Client codebase and proprietary server configuration protected under NDA."
  }
];
