# S. Purohith — Biomedical Systems & 3D Engineering Portfolio

> **Production URL**: Ready for Vercel / GitHub Pages deployment  
> **Source Repository**: `https://github.com/purohith08/portfolio`  
> **Primary Identity**: Biomedical Engineer | Medical Imaging & Biomedical Software Developer

---

## 🔬 Overview & Vision

An original, high-performance, interactive **3D WebGL Portfolio** built for S. Purohith in strict compliance with the **Professional Portfolio Master Plan** (`Purohith_Professional_Portfolio_Master_Plan.pdf`).

The portfolio establishes a **"Biomedical Intelligence Lab"** aesthetic:
- **Art Direction**: Obsidian dark editorial background (`#07090e`), crisp telemetry grids, restrained electric teal & cyan glow accents (`#0df2c9`, `#38bdf8`), and glassmorphism HUD interfaces.
- **3D Procedural Visuals**:
  - **Neural Mesh**: Organic 3D neural cluster with dynamic synaptic node links and gentle mouse parallax.
  - **Medical Scan Rings**: Torus gantry rings and periodic axial CT/MRI volumetric scan planes.
  - **Physiological Pulse Waveform**: Real-time oscillating biosignal stream simulating cardiac/neural evoked potential bursts.
  - **Zero Heavy Assets**: Fast first render with no external 50MB GLTF assets, achieving instant 60 FPS loading.
  - **Accessible Mode**: Includes dedicated 3D toggle, automatic `prefers-reduced-motion` detection, and a pure SVG/CSS scientific fallback.

---

## 🛠️ Technology Stack

- **Framework**: React 19 + TypeScript + Vite
- **3D Graphics Engine**: Three.js + React Three Fiber (`@react-three/fiber`) + Drei (`@react-three/drei`)
- **Styling & HUD**: Tailwind CSS v4 + Custom Glassmorphism CSS Design Tokens
- **Icons**: Lucide React + Bespoke Vector Icons
- **Data Model**: Strictly separated, typed data structures (`src/data/`) ensuring modularity and recruiter-first readability.

---

## 📋 Verified Content & Evidence Map

In compliance with the content policy:
- **Excluded**: All non-professional narratives, personal chat logs, astrology, horoscope, and unrelated AI prompts.
- **No Fabrications**: No unverified metrics, fake customer reviews, or exaggerated clinical efficacy claims.
- **Evidence-Based Skills**: Categorized exclusively as `"Used in a project"`, `"Working knowledge"`, and `"Exploring"` (no misleading percentage bars).
- **Primary Featured Case Studies**:
  1. **Low-Cost Motor Imagery EEG-Based Prosthetic Hand Controller**: FBCSP spatial feature extraction, SVM/EEGNet pipelines, and interactive game validation.
  2. **Medical Imaging & Cine Desktop Application**: Qt C++ viewport rendering, smooth cine playback, and DICOM workflows at Suntrion Technosol Pvt Ltd.
  3. **Bilateral Muscle Synergy Analysis of Human Gait (sEMG)**: Surface electromyography filtering, Butterworth envelope extraction, and NMF coordination synergy analysis during research internship at DEBEL-DRDO.

---

## 🚀 Local Development

```bash
# Clone the repository
git clone https://github.com/purohith08/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

## 🌐 Deployment Instructions

### 1. GitHub Repository Setup & Push
```bash
# In your terminal inside d:\portfolio:
git remote add origin https://github.com/purohith08/portfolio.git
git branch -M main
git push -u origin main
```

### 2. Deploy to Vercel (Recommended)
1. Go to [vercel.com](https://vercel.com/) and sign in with your GitHub account (`purohith08`).
2. Click **"Add New Project"** $\rightarrow$ **"Import"** `portfolio`.
3. Framework Preset: **Vite**.
4. Root Directory: `./`.
5. Build Command: `npm run build`.
6. Output Directory: `dist`.
7. Click **"Deploy"**. Your 3D portfolio will be live with free global CDN and HTTPS in under 60 seconds!

### 3. Deploy to GitHub Pages (Alternative)
The `vite.config.ts` is configured with `base: './'` for full subpath compatibility.
1. In your GitHub repository, navigate to **Settings** $\rightarrow$ **Pages**.
2. Under **Build and deployment**, select **GitHub Actions** (or deploy the `dist` folder to the `gh-pages` branch).
