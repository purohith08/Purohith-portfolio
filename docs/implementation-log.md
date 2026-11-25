# Implementation Log — Rebuild Phases

## Session Date: October 27, 2026

### Phase 1: Foundation & Decontamination
1. **Pre-execution Verification**:
   - Confirmed current working branch is `portfolio-rebuild`.
   - Confirmed backup branch `backup/portfolio-before-rebuild` points to prior commit `bdb02e9`.
   - Remotes, GitHub Pages deployment workflow (`.github/workflows/deploy.yml`), and Git history preserved.
2. **Obsolete File Pruning**:
   - Removed humanoid avatar, character physics, and campus exploration game rooms (`BiomedicalExplorerAvatar.tsx`, `CampusRoomStructure.tsx`, `CampusWorldExperience.tsx`, `BiomedicalWorldStation.tsx`, `BiomedicalWorldModal.tsx`, `campusWorld.ts`, legacy assets).
3. **Dependency Optimization**:
   - Uninstalled `@react-three/rapier`.
   - Installed `gsap`, `@types/gsap`, and `framer-motion`.
4. **Biomedical Intelligence Lab Foundation**:
   - Built dark space navy design tokens (`#060911`, `#0A1120`, `#00F2FE`, `#0AE4BA`), responsive typography, HUD navigation, and verified content sections (Hero, DICOM, EEG, Instrumentation, Projects, Experience, Skills, Education, Contact).
   - `tsc -b`, `vite build`, and `oxlint` all passed with 0 errors.

---

### Phase 2: Cinematic 3D Scroll Choreography
1. **Unified Scroll Architecture (`ScrollSceneController.ts` & `types.ts`)**:
   - Built typed state controller implementing GSAP ScrollTrigger for smooth scrubbed interpolation across document scroll progress.
   - Eliminated dual-animation conflicts: single source of truth driving camera coordinates `cameraPos`, `cameraLookAt`, and sub-element procedural weights.
   - Clean lifecycle management: triggers and resize listeners cleanly killed and disposed on unmount.
2. **Implementation of the Five Visual States**:
   - **State A (Biopotential Core)** at `#hero`: Centered neural node lattice with concentric CT/MRI scan rings and gentle laser cyan/teal lighting.
   - **State B (Medical Imaging Gantry)** at `#imaging`: Reconfigured rings into a tomographic instrument with stacked translucent scan planes and smooth rotation.
   - **State C (Biosignal Oscilloscope)** at `#signals`: Multi-channel procedural waveform stream with independent physiological frequencies and phase offsets.
   - **State D (Microelectronic Circuit Lattice)** at `#hardware`: Neural nodes smoothly morph from spherical geometry into an orthogonal planar circuit lattice with boosted line intensity.
   - **State E (Knowledge Constellation)** at `#projects`, `#experience`, `#skills`, `#education`: Nodes expand outward into a connected scientific knowledge graph.
3. **Component Re-engineering & Geometry Optimization**:
   - `InstrumentStage.tsx`: Unified procedural R3F canvas hosting the 3D instrument rig.
   - `NeuralMesh.tsx`: Added procedural position blending between spherical cluster, circuit grid, and constellation expansion without recreating Three.js geometry buffers.
   - `MedicalScanRings.tsx`: Added stacked tomographic scan planes with smooth opacity fading.
   - `SignalWaveformStream.tsx`: Added multi-channel biosignal line geometry buffers.
   - `App.tsx`: Dynamically code-splits `InstrumentStage` using `React.lazy` and `Suspense`, dropping the main bundle down to 422 kB uncompressed (137 kB gzipped).
4. **Accessibility & Fallback Integrity**:
   - Supports `prefers-reduced-motion` to bypass scroll-driven camera movements.
   - Context creation check gracefully serves `SceneFallback` if WebGL is unavailable.
   - Telemetry HUD button provides manual toggle between 3D ONLINE and BYPASS modes.
5. **Quality Gate Verification**:
   - `tsc -b`: 0 errors.
   - `oxlint`: 0 warnings, 0 errors.
   - `vite build`: Succeeded with code-split chunks (`index` 422 kB, `InstrumentStage` 918 kB).

---

### Phase 2.1 — Stage 0 Baseline Measurements (October 27, 2026)
- **Local Checkpoint Created:** Commit `6b5062a` ("chore(checkpoint): baseline checkpoint before Phase 2.1")
- **Tag Created:** `pre-phase-2-1`
- **Active Dev Server:** Running on `http://127.0.0.1:5173/` (task-240)
- **Baseline Production Bundle Sizes (`npm run build`):**
  - `dist/index.html`: `2.13 kB` (gzip: `1.06 kB`)
  - `dist/assets/index-*.css`: `39.17 kB` (gzip: `7.50 kB`)
  - `dist/assets/index-*.js`: `422.62 kB` (gzip: `137.51 kB`)
  - `dist/assets/InstrumentStage-*.js`: `918.74 kB` (gzip: `243.99 kB`)
- **Baseline Lighthouse Metrics (Audited on Production Preview `http://127.0.0.1:4173/`):**
  - Accessibility: `90 / 100`
  - Best Practices: `100 / 100`
  - SEO: `91 / 100`
  - Performance: `44 / 100` (FCP: `4.2s`, LCP: `5.0s`, TBT: `1,640ms`, CLS: `0`)
  - Frame-rate Observation: Clamped procedural R3F canvas maintains smooth 60 FPS rendering under desktop interaction with clamped DPR (`1.75`).

---

### Phase 2.1 — Stage 1: Design Tokens & Typography (October 27, 2026)
1. **Design Tokens Defined (`src/index.css`)**:
   - Established complete CSS custom property design system inspired by the Dribbble motion reference:
     - `--bg-base: #01040E` (Deep Midnight Background)
     - `--bg-elevated: #050C24` (Elevated Void)
     - `--surface-card: rgba(13, 29, 82, 0.45)` (Indigo-Navy Surface)
     - `--surface-card-hover: rgba(13, 29, 82, 0.75)`
     - `--accent-primary: #5B6BA2` (Periwinkle Border / Accent)
     - `--accent-secondary: #0D1D52` (Deep Indigo)
     - `--accent-magenta: #A40D5A` (Muted Berry Accent)
     - `--accent-violet: #512544` (Deep Violet Accent)
     - `--accent-coral: #DA403E` (Coral Accent Indicator)
     - `--text-coral: #FF6B68` (High-contrast Coral Text for accessibility)
     - `--signal-cyan: #00F2FE` (Restrained Biomedical Laser Cyan)
     - `--signal-teal: #0AE4BA` (Precision Teal)
     - `--text-primary: #E9E8EF` (High-contrast Primary Text)
     - `--text-secondary: #A5B4FC` (Periwinkle Body / Secondary)
     - `--text-muted: #8B9CC7` (Accessible Muted Monospace / Meta)
     - `--border-subtle: rgba(91, 107, 162, 0.22)`
     - `--border-strong: rgba(91, 107, 162, 0.45)`
     - `--focus-ring: #00F2FE` (Visible Keyboard Focus)
2. **Typography System**:
   - Fluid typography with CSS `clamp()`:
     - `--text-hero-headline: clamp(2.25rem, 5vw + 1rem, 4.75rem)`
     - `--text-section-title: clamp(1.75rem, 3.5vw + 0.5rem, 2.75rem)`
     - `--text-card-title: clamp(1.125rem, 1.5vw + 0.5rem, 1.35rem)`
     - `--text-body-lead: clamp(1rem, 1.2vw + 0.4rem, 1.15rem)`
   - Clear editorial hierarchy: Display headings (`Space Grotesk`), body copy (`Inter`), telemetry code labels (`JetBrains Mono`).
3. **Motion Design Tokens**:
   - `--duration-fast: 0.2s`
   - `--duration-base: 0.5s`
   - `--duration-slow: 0.9s`
   - `--ease-standard: cubic-bezier(0.16, 1, 0.3, 1)`
   - `--ease-out: cubic-bezier(0, 0, 0.2, 1)`
   - `--stagger-interval: 0.06s`
   - Strict CSS `@media (prefers-reduced-motion: reduce)` override disabling animations without requiring JavaScript.
4. **WCAG AA Contrast Audit**:
   - `--text-primary` (`#E9E8EF`) on `--bg-base` (`#01040E`): **16.83:1** (Passes AAA)
   - `--text-primary` (`#E9E8EF`) on `--surface-card` (`#0D1D52`): **13.12:1** (Passes AAA)
   - `--text-secondary` (`#A5B4FC`) on `--bg-base`: **10.28:1** (Passes AAA)
   - `--text-secondary` (`#A5B4FC`) on `--surface-card`: **8.01:1** (Passes AAA)
   - `--text-muted` (`#8B9CC7`) on `--bg-base`: **7.49:1** (Passes AAA)
   - `--text-muted` (`#8B9CC7`) on `--surface-card`: **5.84:1** (Passes AA)
   - `--signal-cyan` (`#00F2FE`) on `--bg-base`: **14.76:1** (Passes AAA)
   - `--signal-teal` (`#0AE4BA`) on `--bg-base`: **12.51:1** (Passes AAA)
   - `--text-coral` (`#FF6B68`) on `--surface-card`: **5.75:1** (Passes AA, adjusted from `#DA403E` which was 3.64:1 for text)
5. **Quality Gates & Build Verification**:
   - `tsc -b`: 0 errors.
   - `oxlint`: 0 warnings, 0 errors.
   - `vite build`: Completed in 829ms with zero errors.
   - Local development server: Active on `http://127.0.0.1:5173/` serving live updated tokens.

---

### Phase 3 — CV Synchronization, Option 2 Palette & Live Production Deployment (November 25, 2026)
1. **Core Layout & UI Simplification**:
   - Streamlined the portfolio into 4 clean, focused sections: Hero → 01 Work Experience → 02 Selected Projects → 03 Direct Contact.
   - Removed top-left monogram box; aligned `S. Purohith` header name at `pt-6 sm:pt-8` matching the top-right `[ MENU = ]` spring drawer button.
   - Integrated seamless intro entrance directly into the Hero view with zero modal popups or countdown timers.
2. **Option 2 Color System & motion.dev Physics**:
   - Implemented Option 2 tokens: `#264653` Primary (Slate), `#E9ECEF` Secondary (Porcelain), and `#2A9D8F` Highlight (Persian Teal).
   - Procedural 3D scene updated with dark slate and teal lighting; removed floating prism slabs.
   - Parallax scrolling powered by `useSpring` physics (`stiffness: 130, damping: 28`) across multi-layer foreground and background planes.
   - Gliding `layoutId="activeFilterPill"` indicator on project domain filter tabs.
3. **CV Ground-Truth Synchronization (`Purohith_CV.pdf`)**:
   - **Contact**: Updated professional email to `purohiths.bme@gmail.com`, direct telephony to `+91 79049 82453`, and location to `Trichy, Tamil Nadu – 620004, India` with target objective note (*Seeking healthcare product-development roles in Bangalore*).
   - **Experience**:
     - *Freelance Software Developer – Medical Imaging* (Jul 2026 – Oct 2026): DICOM video support (ultrasound cine, XA/XC modalities) with MPEG-2/H.264 decoding, Qt/C++ multi-resolution viewports (1280×1024 to 1080p), URD & SRD authoring with traceability matrix in Excel, SBOM/SOUP audits, ultrasound PACS hybrid codebase, video compression research (MPEG-1/2, H.264/265), and strict-lossless ROI/RONI AWS S3 archival.
     - *Research Intern — DRDO DEBEL* (Jan 2026 – Mar 2026): Medical device testing, verification, technical documentation, and safety procedures.
     - *Research Intern — DSU Drone Innovation Centre* (Feb 2025 – Mar 2025): UAV sensor calibration, flight controllers, Drone Engineer on Team ANAV at ISRO Robotic Challenge 2025.
     - *Biomedical Intern — GVN Riverside Hospital* (Jul 2024 – Aug 2024): Clinical instrumentation calibration and preventive maintenance checklists.
   - **Projects**:
     - *Low-Cost Motor Imagery EEG Prosthetic Hand Controller*: Capstone project guided by Dr. N. Shankar using ADS1299, FBCSP, EEGNet, SVM, Raspberry Pi, and Arduino actuation.
     - *DICOM Cine Workstation & Qt/C++ Medical UI Engineering*: Workstation engineering and regulatory compliance documentation.
     - *AI-Based Ultrasound Report Generation*: Full-stack medical web application built with FastAPI and React.
     - *DICOM Video Compression Research & Cloud Archival Strategy*: Transcoding pipelines and ROI/RONI cloud archival benchmarks.
     - *NIR-DOT Portable Breast Cancer Screening*: ESP32 with BPW34 photodiodes validated on tissue phantoms.
     - *Ultrasound PACS Platform & Teleradiology Server*: Hybrid C++/Qt and Python platform with automated model-weight synchronisation.
   - **Academic Background & Credentials**:
     - B.Tech in Biomedical Engineering (Dhanalakshmi Srinivasan University, May 2026 | CGPA 7.0).
     - NPTEL Healthcare Entrepreneurship (IIT Madras | Elite, 94%).
     - Research Publication: *"A Review on Pain Reduction Techniques in Mammography"* (ICMSET 2025, under review).
     - CodeBind Technologies Full Stack Web Development & Embedded Systems training certifications.
4. **Deployment & Quality Gates**:
   - Added `public/.nojekyll` to eliminate Jekyll interference during GitHub Pages deployment.
   - Updated `package.json` deploy command: `"deploy": "gh-pages -d dist --nojekyll --dotfiles"`.
   - Ran `oxlint` (0 errors, 0 warnings across 34 files) and production build `tsc -b && vite build` (zero errors).
   - Fast-forward merged `portfolio-rebuild` into `main` and pushed to `origin/main`.
   - Deployed to GitHub Pages (`origin/gh-pages`); confirmed live deployment serving updated assets at `https://purohith08.github.io/Purohith-portfolio/`.
