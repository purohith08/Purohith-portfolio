export interface Profile {
  name: string;
  displayTitle: string;
  tagline: string;
  shortBio: string;
  valueProposition: string[];
  contact: {
    email: string;
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
  displayTitle: "Biomedical Engineer | Medical Imaging & Biomedical Software Developer",
  tagline: "Building software and engineering systems for medical imaging, biomedical signals, and healthcare technology.",
  shortBio:
    "Biomedical Engineering graduate with a strong focus in medical software, biosignal processing pipelines, and engineering tools for clinical and research workflows. Experienced in EEG-based motor-imagery classification, medical desktop applications (Qt/C++), biomedical instrumentation, and embedded hardware-software integration.",
  valueProposition: [
    "Domain + Software: Bridges clinical/biomedical engineering requirements with rigorous software delivery.",
    "Signal & Imaging Pipelines: Practical experience with DICOM standards, cine viewing workflows, MNE-Python, and sEMG gait analysis.",
    "Hardware-to-Application: From ADC/sensor acquisition on microcontrollers (ESP32/Arduino) to interactive desktop and analytical interfaces.",
  ],
  contact: {
    email: "purohithradhalakshmi@gmail.com",
    linkedIn: "https://www.linkedin.com/in/purohiths/",
    gitHub: "https://github.com/purohith08",
    location: "Tamil Nadu, India",
    availability: "Available for full-time biomedical engineering & medical software roles",
  },
  metricsSummary: [
    { label: "Core Focus", value: "Signal & Imaging", detail: "EEG, sEMG, DICOM & Cine loops" },
    { label: "Key Stack", value: "C++, Python, Qt", detail: "High-performance medical workflows" },
    { label: "Research", value: "DEBEL-DRDO", detail: "Surface EMG Gait Synergy Analysis" },
    { label: "Architecture", value: "Hardware & App", detail: "Sensors, desktop apps & ML models" },
  ],
};
