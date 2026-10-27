# S. Purohith — Biomedical Engineering & Medical Software Portfolio

Interactive engineering portfolio showcasing medical software (C++/Qt/DICOM), biosignal processing pipelines (EEG motor-imagery, sEMG gait analysis), and embedded medical instrumentation.

Built with **React 19**, **Three.js**, **React Three Fiber**, **GSAP**, **Tailwind CSS v4**, and strict **TypeScript**.

---

## 🔬 Core Focus Areas

1. **Medical Imaging Software**: High-performance DICOM viewing workflows, multi-frame cine loops, and asynchronous C++/Qt desktop architecture.
2. **Biosignal Processing & Computational ML**: MNE-Python, SciPy, Filter Bank Common Spatial Patterns (FBCSP), and Support Vector Machine (SVM) / EEGNet pipelines for assistive neural prosthetic control.
3. **Defense Laboratory Research**: Surface EMG Bilateral Muscle Synergy Analysis during human gait at Defence Bioengineering & Electromedical Laboratory (DEBEL - DRDO).
4. **Biomedical Instrumentation & Firmware**: 24-bit Delta-Sigma ADC acquisition, analog front-end biopotential conditioning, and ESP32 FreeRTOS multitasking.

---

## 🛠️ Technology Stack

- **Frontend & Layout**: React 19, Vite, Tailwind CSS v4, Lucide React
- **3D Telemetry Graphics**: Three.js, React Three Fiber (R3F), `@react-three/drei`
- **Animation & Transitions**: GSAP ScrollTrigger, Framer Motion
- **Quality & Compilation**: Strict TypeScript (Node 22 / TS 6), Oxlint
- **Deployment**: Automated GitHub Actions workflow deploying to GitHub Pages

---

## 🚀 Local Development

To clone, install, and run locally:

```bash
git clone https://github.com/purohith08/Purohith-portfolio.git
cd Purohith-portfolio
npm install
npm run dev
```

### Production Build & Linting

```bash
npm run build   # tsc -b && vite build
npm run lint    # oxlint
npm run preview # preview production dist
```

---

## 📂 Project Architecture

```text
portfolio/
├── .agent/skills/         # Architectural guidelines & live 3D engineer skills
├── .github/workflows/     # GitHub Pages deployment automation
├── docs/                  # Architecture, facts, and implementation logs
├── public/                # Static assets, emblems, and icons
├── src/
│   ├── assets/            # Global media assets
│   ├── components/
│   │   ├── navigation/    # Scientific telemetry HUD navbar
│   │   ├── scenes/        # Procedural WebGL instruments (NeuralMesh, MedicalScanRings, Waveforms)
│   │   ├── sections/      # Interactive viewports, workbenches, case studies, experience, skills
│   │   └── ui/            # Emblems and icons
│   ├── data/              # Verified biographical, project, and experience schemas
│   ├── App.tsx            # Responsive application shell & 3D fallback orchestration
│   ├── index.css          # Biomedical Intelligence Lab design tokens & typography
│   └── main.tsx           # React entrypoint
└── vite.config.ts         # Vite build configuration with base: './'
```

---

## 🔒 Confidentiality & Verification Notice

All clinical engineering discussions, defense research descriptions, and proprietary medical desktop architecture details strictly adhere to commercial NDA boundaries and DRDO public security guidelines. Only verified public engineering methodologies are showcased.
