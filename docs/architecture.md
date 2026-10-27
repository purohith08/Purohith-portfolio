# Biomedical Intelligence Lab Architecture

## 1. System Overview

The Biomedical Intelligence Lab portfolio is an interactive, high-performance web application designed to demonstrate the engineering capabilities of S. Purohith in medical software development, physiological signal processing, and medical instrumentation.

## 2. Architectural Layers

### A. Presentation & Application Shell (`src/App.tsx`)
- Hosts the fixed telemetry navigation header (`Navbar.tsx`).
- Coordinates WebGL support detection and graceful degradation to standard 2D SVG schematics (`SceneFallback.tsx`).
- Controls responsiveness across mobile, tablet, and widescreen layouts.
- Employs Tailwind CSS v4 design tokens based on the dark scientific laboratory theme.

### B. Procedural 3D Telemetry (`src/components/scenes/`)
- Procedural Three.js components mounted inside a single high-performance React Three Fiber canvas.
- Components:
  - `NeuralMesh.tsx`: 56 spherical nodes connected via Euclidean distance thresholding simulating synaptic motor-imagery arrays.
  - `MedicalScanRings.tsx`: Concentric tomographic gantry scan rings with sine-driven sweep planes.
  - `SignalWaveformStream.tsx`: Dynamic 100-point line segment buffer representing real-time physiological biosignal waveforms.
- Constraints: No Blender assets, no external GLTF/GLB files, no pre-rendered videos. 100% procedural code.

### C. Interactive Clinical & Engineering Demonstrations (`src/components/sections/`)
1. **`DICOMViewport.tsx`**:
   - Interactive medical imaging console demonstrating cine playback (10 FPS), window/level presets (Soft Tissue W:400 L:40, Bone W:1800 L:400, Lung W:1500 L:-600), and multi-frame scrub control.
   - Highlights Qt C++ desktop multi-threaded architecture (worker thread IO decoupled from OpenGL UI rendering).
2. **`EEGWorkbench.tsx`**:
   - Interactive real-time biosignal oscilloscope marching wave phase at 250 Hz equivalent.
   - Interactive toggles between Raw (50Hz hum + ocular drift), 8-30 Hz Bandpass (Mu/Beta rhythm), and Common Spatial Pattern (CSP) power envelope.
   - Electrode selection for C3, Cz, and C4 (10-20 international system).
3. **`InstrumentationWorkshop.tsx`**:
   - 4-stage hardware pipeline breakdown: Bio-transducers, Analog Front End (INA128/ADS1299 CMRR > 110dB), Delta-Sigma ADC + ESP32 FreeRTOS, and UART 115200 baud prosthetic kinematics.

### D. Verified Data Layer (`src/data/`)
- Strictly typed TypeScript definitions for:
  - `profile.ts`: Verified biographical background, contact addresses, and core metrics.
  - `projects.ts`: Structured case studies (problem, solution, pipeline, contributions, validation metrics, limitations).
  - `experience.ts`: Chronological history at Suntrion Technosol, DEBEL-DRDO, and GVN Riverside Hospital.
  - `skills.ts`: Evidence-leveled matrix of competencies.
  - `education.ts`: B.Tech BME curriculum, symposium coordination, and technical challenge participations.
