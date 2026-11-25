export interface Profile {
  name: string;
  displayTitle: string;
  tagline: string;
  shortBio: string;
  valueProposition: string[];
  contact: {
    email: string;
    phone: string;
    linkedIn: string;
    gitHub: string;
    location: string;
    availability: string;
  };
  metricsSummary: {
    label: string;
    value: string;
    detail: string;
  }[];
}

export const profileData: Profile = {
  name: "S. Purohith",
  displayTitle: "Biomedical Engineer | Medical Imaging Software (C++ / Python / DICOM) | Biosignal Processing",
  tagline: "Building software, medical imaging pipelines, and biosignal systems for healthcare technology.",
  shortBio:
    "B.Tech Biomedical Engineering graduate (2026) with hands-on experience building and documenting medical imaging software. Worked as a freelance developer on DICOM workstations, ultrasound PACS platforms, teleradiology systems, and video compression pipelines, alongside research internships at DRDO DEBEL, DSU Drone Innovation Centre, and hospital clinical engineering. Strong in C++ (Qt), Python, DICOM cine, and EEG/biosignal processing; seeking a healthcare product-development role in Bangalore.",
  valueProposition: [
    "Medical Imaging & DICOM: Hands-on multi-frame cine loops (ultrasound, XA/XC), MPEG-2/H.264 video decoding, PySide6/VTK/Pydicom, and ROI-based lossless compression.",
    "Desktop & Web Engineering: Native Qt/C++ medical UI viewports, FastAPI and Django REST microservices, PostgreSQL, and Docker containerization.",
    "Biosignals & Embedded: Motor-imagery BCI (FBCSP, EEGNet, SVM) with ADS1299 acquisition, ESP32 firmware, and Raspberry Pi / Arduino actuation.",
    "Compliance & Quality Documentation: Authored URD/SRD requirement suites, traceability matrices, SBOM / SOUP lists, and medical device verification.",
  ],
  contact: {
    email: "purohiths.bme@gmail.com",
    phone: "+91 79049 82453",
    linkedIn: "https://www.linkedin.com/in/purohiths/",
    gitHub: "https://github.com/purohith08",
    location: "Trichy, Tamil Nadu – 620004, India",
    availability: "Seeking Healthcare Product-Development Roles in Bangalore",
  },
  metricsSummary: [
    { label: "Medical Imaging", value: "DICOM & Cine", detail: "Multi-frame ultrasound & XA/XC loops" },
    { label: "Core Stack", value: "C++ (Qt) & Python", detail: "FastAPI, PySide6, VTK & Pydicom" },
    { label: "Biosignals", value: "EEG & ADS1299", detail: "FBCSP, EEGNet & SVM BCI pipeline" },
    { label: "Compliance", value: "URD / SRD / SBOM", detail: "Traceability matrices & verification" },
  ],
};
