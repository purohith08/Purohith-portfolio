export type CampusLocationId = 
  | 'atrium' 
  | 'imaging-centre' 
  | 'neural-lab' 
  | 'research-studio' 
  | 'instrumentation-workshop' 
  | 'career-archive';

export interface InteractiveEntity {
  id: string;
  name: string;
  room: CampusLocationId;
  position: [number, number, number];
  rotation?: [number, number, number];
  color: string;
  badge: string;
  headline: string;
  summary: string;
  actionLabel: string;
  targetType: 'case-study' | 'workbench' | 'research' | 'instrument' | 'archive' | 'contact';
  targetId: string;
}

export interface CampusRoom {
  id: CampusLocationId;
  name: string;
  shortTitle: string;
  subtitle: string;
  description: string;
  focalPosition: [number, number, number];
  cameraPosition: [number, number, number];
  cameraLookAt: [number, number, number];
  ambientColor: string;
  accentColor: string;
  entities: InteractiveEntity[];
}

export const CAMPUS_ROOMS: CampusRoom[] = [
  {
    id: 'atrium',
    name: 'The Welcome Atrium',
    shortTitle: 'Atrium',
    subtitle: 'Campus Centerpiece & Gateway',
    description: 'Sculptural monument uniting neural branching geometry, gantry scan geometry, and precision optical sensors.',
    focalPosition: [0, 0, 0],
    cameraPosition: [0, 4.2, 9.5],
    cameraLookAt: [0, 1.2, 0],
    ambientColor: '#F5F3EE',
    accentColor: '#B66B49',
    entities: [
      {
        id: 'monument-core',
        name: 'Biomedical Landmark',
        room: 'atrium',
        position: [0, 1.5, 0],
        color: '#B66B49',
        badge: 'SCULPTURAL CORE',
        headline: 'S. Purohith — Biomedical Systems & Software',
        summary: 'Bridging physiological transducer physics with native desktop architectures and signal machine learning.',
        actionLabel: 'EXPLORE PROFILE',
        targetType: 'contact',
        targetId: 'contact',
      }
    ]
  },
  {
    id: 'imaging-centre',
    name: 'Medical Imaging Centre',
    shortTitle: 'Imaging',
    subtitle: 'DICOM Workstations & Cine Viewports',
    description: 'High-framerate viewport engineering, multi-frame cine loops, and clinical DICOM workstation layouts.',
    focalPosition: [9.5, 0, -3.5],
    cameraPosition: [9.5, 3.8, 2.5],
    cameraLookAt: [9.5, 1.2, -3.5],
    ambientColor: '#171916',
    accentColor: '#315B4C',
    entities: [
      {
        id: 'dicom-workstation-entity',
        name: 'Qt/C++ Imaging Workstation',
        room: 'imaging-centre',
        position: [9.5, 1.4, -3.5],
        color: '#315B4C',
        badge: 'WORKSTATION DESK',
        headline: 'Medical Imaging & Cine Desktop Application',
        summary: 'Contributed to high-framerate viewports, asynchronous buffering, and Window/Level LUT adjustments at Suntrion Technosol.',
        actionLabel: 'OPEN IMAGING WORKBENCH',
        targetType: 'workbench',
        targetId: 'medical-imaging-desktop',
      }
    ]
  },
  {
    id: 'neural-lab',
    name: 'Neural Signal Laboratory',
    shortTitle: 'Neural Lab',
    subtitle: 'Brain-Computer Interfaces & Motor Imagery',
    description: 'Biosignal epoch segmentation, Filter Bank Common Spatial Patterns (FBCSP), and EEGNet neural decoding.',
    focalPosition: [-9.5, 0, -3.5],
    cameraPosition: [-9.5, 3.8, 2.5],
    cameraLookAt: [-9.5, 1.2, -3.5],
    ambientColor: '#0F1310',
    accentColor: '#B66B49',
    entities: [
      {
        id: 'bci-console-entity',
        name: 'EEG Signal Oscilloscope Console',
        room: 'neural-lab',
        position: [-9.5, 1.4, -3.5],
        color: '#B66B49',
        badge: 'BCI CONSOLE',
        headline: 'Motor Imagery EEG Prosthetic Controller',
        summary: 'Extracts contralateral Mu & Beta rhythms (8-30Hz) using spatial covariance matrices and machine learning.',
        actionLabel: 'LAUNCH NEURAL STUDIO',
        targetType: 'workbench',
        targetId: 'eeg-motor-imagery',
      }
    ]
  },
  {
    id: 'research-studio',
    name: 'Biomedical Research Studio',
    shortTitle: 'Research Studio',
    subtitle: 'Biomechanics & DEBEL-DRDO Gait Analysis',
    description: 'Defense research internship investigating bilateral muscle synergy analysis of human gait using sEMG.',
    focalPosition: [9.5, 0, 7.5],
    cameraPosition: [9.5, 3.8, 13.5],
    cameraLookAt: [9.5, 1.2, 7.5],
    ambientColor: '#1A1815',
    accentColor: '#315B4C',
    entities: [
      {
        id: 'drdo-research-bench',
        name: 'sEMG Synergy Analysis Bench',
        room: 'research-studio',
        position: [9.5, 1.4, 7.5],
        color: '#315B4C',
        badge: 'DRDO BENCH',
        headline: 'DEBEL-DRDO Human Gait Synergy Research',
        summary: 'Non-negative Matrix Factorization (NMF) decomposing bilateral lower-limb muscle activations across normalized gait cycles.',
        actionLabel: 'VIEW RESEARCH PIPELINE',
        targetType: 'research',
        targetId: 'debel-drdo-gait',
      }
    ]
  },
  {
    id: 'instrumentation-workshop',
    name: 'Instrumentation Workshop',
    shortTitle: 'Workshop',
    subtitle: 'Embedded Microcontrollers & Sensor Chains',
    description: 'Hardware testbenches integrating bio-potential electrodes, high-CMRR INA amplifiers, 24-bit ADCs, and ESP32 telemetry.',
    focalPosition: [-9.5, 0, 7.5],
    cameraPosition: [-9.5, 3.8, 13.5],
    cameraLookAt: [-9.5, 1.2, 7.5],
    ambientColor: '#141715',
    accentColor: '#B66B49',
    entities: [
      {
        id: 'hardware-bench-entity',
        name: 'Sensor & Firmware Testbench',
        room: 'instrumentation-workshop',
        position: [-9.5, 1.4, 7.5],
        color: '#B66B49',
        badge: 'HARDWARE RIG',
        headline: 'End-to-End Physical-to-Digital Signal Chain',
        summary: 'Skin-electrode impedance matching, ADS1299 delta-sigma acquisition, and FreeRTOS multi-tasking ring buffers.',
        actionLabel: 'INSPECT SIGNAL CHAIN',
        targetType: 'instrument',
        targetId: 'instrumentation-workshop',
      }
    ]
  },
  {
    id: 'career-archive',
    name: 'Project Archive & Career Centre',
    shortTitle: 'Career Archive',
    subtitle: 'Verified Case Studies, Experience & Credentials',
    description: 'Centralized repository of verified medical software systems, education records, and direct recruiter channels.',
    focalPosition: [0, 0, 11.5],
    cameraPosition: [0, 3.8, 17.5],
    cameraLookAt: [0, 1.2, 11.5],
    ambientColor: '#F5F3EE',
    accentColor: '#171916',
    entities: [
      {
        id: 'archive-terminal-entity',
        name: 'Career & Portfolio Archive Terminal',
        room: 'career-archive',
        position: [0, 1.4, 11.5],
        color: '#171916',
        badge: 'ARCHIVE HUB',
        headline: 'Full Engineering Portfolio & Experience',
        summary: 'Access verified case studies, NPTEL credentials, technical skills matrix, and professional recruiter contact links.',
        actionLabel: 'OPEN FULL ARCHIVE',
        targetType: 'archive',
        targetId: 'archive',
      }
    ]
  }
];
