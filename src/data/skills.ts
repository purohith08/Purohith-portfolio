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
    description: "DICOM multi-frame cine loops, format pipelines, PACS protocols, and video compression",
    skills: [
      { name: "DICOM Cine (XA/XC/US)", level: "Used in a project", context: "Multi-frame ultrasound cine loops, X-ray angiography, tag encapsulation" },
      { name: "Pydicom & VTK", level: "Used in a project", context: "Tag parsing, pixel array extraction, 2D/3D visualization pipelines" },
      { name: "FFmpeg & Video Transcoding", level: "Used in a project", context: "MPEG-1/2, H.264, H.265 transcoding preserving DICOM metadata" },
      { name: "ROI-Based Compression", level: "Used in a project", context: "Strict-lossless diagnostic region (JPEG-LS, JPEG 2000, FFV1) with high-ratio peripheral storage" },
      { name: "OpenCV", level: "Used in a project", context: "Image processing, spatial filtering, and feature extraction" },
      { name: "PACS Basics & Teleradiology", level: "Used in a project", context: "DICOM query/retrieve workflows, store SCP/SCU, and cloud S3 archival" }
    ]
  },
  {
    category: "Programming & Frameworks",
    description: "Native medical desktop viewports, high-performance C++, and asynchronous Python backends",
    skills: [
      { name: "C++", level: "Used in a project", context: "Object-oriented native desktop architecture, memory optimization, low-latency loops" },
      { name: "Qt / PySide6", level: "Used in a project", context: "Custom medical UI viewports, responsive layouts across 1280x1024 to 1080p, Cine Tool controls" },
      { name: "Python", level: "Used in a project", context: "Compression benchmarking, signal processing pipelines, ML model scripting" },
      { name: "FastAPI & Django REST", level: "Used in a project", context: "Microservices for AI report generation, PACS backend services, PostgreSQL schemas" },
      { name: "Embedded C", level: "Used in a project", context: "Microcontroller firmware, timer interrupts, ADC polling, PWM servo kinematics" },
      { name: "MATLAB", level: "Used in a project", context: "Biosignal analysis, digital filter design, matrix decomposition algorithms" },
      { name: "JavaScript / React", level: "Used in a project", context: "Web UI dashboards, full-stack ultrasound report interface" }
    ]
  },
  {
    category: "Biosignals & Computational ML",
    description: "Motor-imagery decoding, spatial patterns, lightweight neural architectures, and feature pipelines",
    skills: [
      { name: "EEG Motor Imagery BCI", level: "Used in a project", context: "Motor-imagery classification for neural prosthetics controller (guide: Dr. N. Shankar)" },
      { name: "FBCSP (Filter Bank CSP)", level: "Used in a project", context: "Sub-band spatial covariance decomposition and optimal frequency band filtering" },
      { name: "EEGNet Deep Learning", level: "Used in a project", context: "Compact CNN with depthwise & separable convolutions tailored for EEG" },
      { name: "Support Vector Machines (SVM)", level: "Used in a project", context: "Supervised trial classification, RBF/linear hyperplanes, cross-validation" },
      { name: "sEMG Signal Processing", level: "Used in a project", context: "Linear envelopes, motion artifact notch filtering, muscle synergy analysis" },
      { name: "ADS1299 Acquisition", level: "Used in a project", context: "Low-noise 24-bit delta-sigma bio-potential analog front-end" }
    ]
  },
  {
    category: "Embedded & Hardware Prototyping",
    description: "Microcontroller platforms, optical bio-sensing, and multi-servo prosthetic actuation",
    skills: [
      { name: "ESP32", level: "Used in a project", context: "Dual-core firmware, FreeRTOS tasks, NIR-DOT optical breast cancer screening prototype" },
      { name: "Arduino & Raspberry Pi", level: "Used in a project", context: "Real-time servo actuation, serial bridging, kinematics for prosthetic hand" },
      { name: "BPW34 Photodiodes & NIR Optoelectronics", level: "Used in a project", context: "Multi-wavelength optical detection and tissue phantom verification" },
      { name: "Serial Protocols (UART / SPI / I2C)", level: "Used in a project", context: "Low-latency packet framing, checksum validation, telemetry streaming" },
      { name: "UAV Flight Controllers & Sensors", level: "Used in a project", context: "Sensor calibration on team ANAV at ISRO Robotic Challenge 2025" }
    ]
  },
  {
    category: "Documentation & Quality Assurance",
    description: "Medical device requirement traceability, SBOM/SOUP audits, and clinical verification",
    skills: [
      { name: "URD & SRD Authoring", level: "Used in a project", context: "Patient Viewer & Image Viewer numbered requirements and acceptance criteria" },
      { name: "Test-Case Traceability Matrix", level: "Used in a project", context: "End-to-end URD → SRD → Verification test matrix mapping in Excel" },
      { name: "SBOM & SOUP Documentation", level: "Used in a project", context: "Software Bill of Materials and Software of Unknown Provenance risk audits" },
      { name: "Medical Device Verification", level: "Used in a project", context: "Testing protocols and safety procedures at DRDO DEBEL and hospital wards" },
      { name: "Tools: Git, VS Code, Poetry, Docker", level: "Used in a project", context: "Reproducible developer environments, containerized services, dependency management" }
    ]
  }
];
