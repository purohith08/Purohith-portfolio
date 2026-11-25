export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  period: string;
  score: string;
  status: string;
  details: string[];
}

export interface ActivityItem {
  title: string;
  category: "Certification" | "Publication" | "Training" | "Challenge";
  organization: string;
  period: string;
  summary: string;
  scoreOrStatus?: string;
  evidenceNote?: string;
}

export const educationData: EducationItem[] = [
  {
    degree: "B.Tech in Biomedical Engineering",
    institution: "Dhanalakshmi Srinivasan University",
    location: "Trichy, Tamil Nadu, India",
    period: "2022 – May 2026",
    score: "CGPA 7.0",
    status: "Graduating May 2026",
    details: [
      "Core curriculum in Biomedical Instrumentation, Medical Image Processing, Biosignal Processing, and Medical Physics.",
      "Final-year capstone project: Low-cost motor-imagery EEG prosthetic hand controller guided by Dr. N. Shankar.",
      "Hands-on laboratory research in biosignal acquisition, digital filtering, and embedded medical instrumentation."
    ]
  },
  {
    degree: "Higher Secondary (HSE)",
    institution: "Sacred Heart Higher Secondary School",
    location: "Trichy, Tamil Nadu, India",
    period: "2020 – 2022",
    score: "72%",
    status: "Completed 2022",
    details: [
      "Rigorous pre-university focus in Physics, Chemistry, Mathematics, and Biology."
    ]
  },
  {
    degree: "SSLC",
    institution: "St. Arnold's Matriculation School",
    location: "Trichy, Tamil Nadu, India",
    period: "2019 – 2020",
    score: "78%",
    status: "Completed 2020",
    details: [
      "Secondary school education with high academic standing in Science and Mathematics."
    ]
  }
];

export const activitiesData: ActivityItem[] = [
  {
    title: "Healthcare Entrepreneurship",
    category: "Certification",
    organization: "NPTEL – IIT Madras",
    period: "Jan – Apr 2026",
    scoreOrStatus: "Elite, 94%",
    summary:
      "Awarded Elite certificate (score: 94%) in med-tech entrepreneurship, healthcare product development, clinical validation, and regulatory frameworks.",
    evidenceNote: "Official NPTEL / IIT Madras certification."
  },
  {
    title: "Full Stack Web Development Training",
    category: "Training",
    organization: "CodeBind Technologies, Chennai",
    period: "Apr 2025",
    summary:
      "Comprehensive engineering training in modern full-stack web architecture, frontend component lifecycles, and backend RESTful API integration.",
    evidenceNote: "CodeBind Technologies training certificate."
  },
  {
    title: "Embedded Systems Training",
    category: "Training",
    organization: "CodeBind Technologies, Coimbatore",
    period: "Apr 2024",
    summary:
      "Practical engineering in embedded C, microcontroller peripherals (timers, interrupts, ADC, PWM), and hardware sensor communications (UART, I2C, SPI).",
    evidenceNote: "CodeBind Technologies embedded training certificate."
  },
  {
    title: "A Review on Pain Reduction Techniques in Mammography",
    category: "Publication",
    organization: "ICMSET Conference, Dhanalakshmi Srinivasan University",
    period: "2025",
    scoreOrStatus: "Under Review",
    summary:
      "Co-authored research review synthesizing engineering techniques, curved paddle geometries, and sensory distraction strategies for pain alleviation during X-ray mammography.",
    evidenceNote: "Conference submission under peer review."
  },
  {
    title: "ISRO Robotic Challenge 2025",
    category: "Challenge",
    organization: "ISRO / DSU Drone Innovation Centre",
    period: "Feb – Mar 2025",
    summary:
      "Served as Drone Engineer on team ANAV, tuning flight controllers and calibrating autonomous UAV sensor telemetry for the national ISRO challenge.",
    evidenceNote: "Team ANAV participant."
  }
];
