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
    id: "freelance-medical-imaging",
    role: "Freelance Software Developer – Medical Imaging",
    organization: "Medical Imaging & Clinic Management Desktop and Web Applications",
    location: "Remote / Trichy, India",
    period: "Jul 2026 – Oct 2026",
    type: "employment",
    summary:
      "Built and documented medical imaging software spanning DICOM workstations, ultrasound PACS platforms, teleradiology servers, and DICOM video compression research pipelines.",
    responsibilities: [
      "DICOM workstation: Implemented DICOM video support (ultrasound cine loops, XA/XC modalities) with MPEG-2 / H.264 decoding and frame navigation, integrated with the existing Cine Tool; analysed the PySide6 / VTK / Pydicom codebase to plan cine playback and memory improvements.",
      "Qt/C++ UI engineering: Fixed responsive layout, clipping and rendering bugs in the report editor, patient demography, referral-doctor and hub dialogs across screen sizes from 1280×1024 to 1920×1080.",
      "Requirements and compliance documentation: Authored the Patient Viewer and Image Viewer User Requirement Documents (URD) with numbered requirements and acceptance criteria, derived the Software Requirement Document (SRD), and built a URD → SRD → test-case traceability matrix in Excel; filled the Software Bill of Materials (SBOM) and SOUP list.",
      "Ultrasound PACS platform: Analysed the C++/Qt and Python hybrid codebase, wrote its User Requirements Document, and debugged runtime failures (missing DLLs, model-weight paths) in the release build; scripted model-weight synchronisation to the build output.",
      "DICOM video compression research and prototypes: Built Python dashboards and pipelines for MPEG-1, MPEG-2, H.264 and H.265 that transcode DICOM cine and re-encapsulate valid multi-frame DICOM output with tags preserved; reported compression ratio, bitrate, PSNR and latency; validated all four pipelines end to end.",
      "Lossless and cloud storage analysis: Benchmarked strict-lossless options (JPEG-LS, JPEG 2000, FFV1) for cine and angiography, and proposed an ROI/RONI strategy (lossless diagnostic region, higher compression elsewhere) for AWS S3 archival.",
      "Teleradiology and PACS server support: Diagnosed Django/PostgreSQL authentication and settings errors, an HTTP 500 on a password-reset endpoint, Poetry environment issues, and set up and ran an endoscopy imaging platform in Visual Studio."
    ],
    technologies: [
      "C++",
      "Qt / PySide6",
      "DICOM (Cine, XA/XC, US)",
      "VTK",
      "Pydicom",
      "FFmpeg",
      "Python",
      "FastAPI",
      "Django REST",
      "PostgreSQL",
      "Docker",
      "Poetry"
    ],
    verificationNote: "Independent software development and compliance documentation verified via project artifacts and URD/SRD traceability."
  },
  {
    id: "drdo-debel",
    role: "Research Intern",
    organization: "DRDO – DEBEL (Defence Bioengineering and Electromedical Laboratory)",
    location: "Bengaluru, India",
    period: "Jan 2026 – Mar 2026",
    type: "research",
    summary:
      "Supported medical device testing, verification, technical documentation, and equipment-safety procedures within India's premier defence electromedical lab.",
    responsibilities: [
      "Supported medical device testing and verification, technical documentation and equipment-safety procedures.",
      "Assisted senior scientists with embedded electronics and biomedical signal-processing work.",
      "Conducted standardized testing protocols and adhered to defence laboratory safety and data integrity standards."
    ],
    technologies: ["Medical Device Testing", "Technical Documentation", "Signal Processing", "Embedded Systems", "Equipment Safety"],
    verificationNote: "Official research internship at DRDO DEBEL, Bengaluru."
  },
  {
    id: "dsu-drone-centre",
    role: "Research Intern",
    organization: "DSU Drone Innovation Centre",
    location: "Trichy, India",
    period: "Feb 2025 – Mar 2025",
    type: "research",
    summary:
      "Calibrated UAV sensor arrays and flight controller systems; served as Drone Engineer on team ANAV at the ISRO Robotic Challenge 2025.",
    responsibilities: [
      "Calibrated multi-axis UAV sensors (IMU, barometer, compass) and tuned PID flight controllers.",
      "Served as Drone Engineer on team ANAV representing the institution at the ISRO Robotic Challenge 2025.",
      "Tested telemetry streams, fail-safe recovery logic, and autonomous flight stability on custom drone airframes."
    ],
    technologies: ["UAV Sensor Calibration", "Flight Controllers", "Telemetry", "Embedded C", "ISRO Robotic Challenge"],
    verificationNote: "Verified research participation and ISRO Robotic Challenge 2025 team engineering."
  },
  {
    id: "gvn-hospital",
    role: "Biomedical Intern",
    organization: "GVN Riverside Hospital",
    location: "Trichy, India",
    period: "Jul 2024 – Aug 2024",
    type: "clinical",
    summary:
      "Carried out clinical equipment calibration and preventive maintenance across hospital intensive care and general surgical wards.",
    responsibilities: [
      "Performed calibration and preventive maintenance of ECG machines, defibrillators, infusion pumps and suction pumps using inspection checklists.",
      "Inspected electrical safety parameters and verified device performance according to hospital clinical engineering protocols.",
      "Maintained calibration documentation, service tags, and equipment inspection logs for critical medical devices."
    ],
    technologies: ["ECG Machines", "Defibrillators", "Infusion Pumps", "Suction Pumps", "Preventive Maintenance", "Clinical Inspection"],
    verificationNote: "Hospital clinical engineering internship verified via institutional records."
  }
];
