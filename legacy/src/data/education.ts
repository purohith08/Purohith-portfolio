export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  period: string;
  status: string;
  details: string[];
}

export interface ActivityItem {
  title: string;
  category: "Leadership" | "Certification" | "Workshop / Challenge";
  organization: string;
  period: string;
  summary: string;
  evidenceNote?: string;
}

export const educationData: EducationItem[] = [
  {
    degree: "B.Tech in Biomedical Engineering",
    institution: "Dhanalakshmi Srinivasan University",
    location: "Trichy, Tamil Nadu, India",
    period: "2022 - 2026",
    status: "Graduating 2026",
    details: [
      "Rigorous foundational coursework in Biomedical Instrumentation, Medical Physics, Biosignal Processing, and Medical Image Processing.",
      "Hands-on laboratory research in physiological signal acquisition, digital filtering, and clinical electronics.",
      "Capstone focus: Low-cost real-time motor imagery EEG-based neural prosthetics controller."
    ]
  }
];

export const activitiesData: ActivityItem[] = [
  {
    title: "Technical Leadership & Student Chapter Coordination",
    category: "Leadership",
    organization: "BIOENGINE Club / BMESI Student Chapter",
    period: "2024 - 2026",
    summary:
      "Active organizer for departmental symposiums and technical project exhibitions (including BIOCONVERGENCE), mentoring junior biomedical students on engineering projects and biosignal tools.",
    evidenceNote: "Documented student chapter and engineering symposium coordination."
  },
  {
    title: "Healthcare Entrepreneurship & Innovation",
    category: "Certification",
    organization: "NPTEL / Swayam",
    period: "2024",
    summary:
      "Explored med-tech product ideation, regulatory pathways for medical devices, clinical need validation, and healthcare venture dynamics.",
    evidenceNote: "Coursework and certification in healthcare innovation."
  },
  {
    title: "Robotics & Autonomous Systems Challenge",
    category: "Workshop / Challenge",
    organization: "ISRO Robotics Challenge Participation",
    period: "2024",
    summary:
      "Participated in robotics challenge designing telemetry, embedded sensor acquisition, and navigational control prototypes.",
    evidenceNote: "Selected technical challenge participation."
  },
  {
    title: "Drone Technology & Embedded Instrumentation Workshop",
    category: "Workshop / Challenge",
    organization: "IIT Madras Technical Workshops & Bootcamp",
    period: "2024",
    summary:
      "Intensive practical training in flight controller sensors, telemetry parsing, IMU calibration, and embedded hardware-software integration.",
    evidenceNote: "Verified workshop participation."
  }
];
