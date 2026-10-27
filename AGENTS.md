# AGENTS.md — Development & Engineering Guidelines

This repository follows strict standards for building a premium, responsive biomedical engineering and medical software portfolio for S. Purohith.

## 1. Operating Rules for AI Agents

1. **Safety First**:
   - Never push directly to remote branches without explicit user authorization.
   - Never rewrite git history, delete backup branches (`backup/*`), or drop uncommitted files.
   - Maintain strict Git hygiene. Always verify working branches before making changes.

2. **Domain Rigor & Truthfulness**:
   - Present **only verified** accomplishments, degrees, employment details, and project metrics.
   - Never hallucinate clinical clearance, diagnostic certifications, or commercial partnerships.
   - State synthetic or illustrative visualizations clearly (e.g. "illustrative DICOM cine loop", "synthetic EEG waveform stream").

3. **Design & Aesthetic Direction: *Biomedical Intelligence Lab***:
   - Palette: Deep space navy background (`#060911`), obsidian lab blue (`#0A1120`), laser cyan (`#00F2FE`), precision teal (`#0AE4BA`), and cobalt signal blue (`#4E80EE`).
   - Typography: Clean headings (`Space Grotesk`), legible body (`Inter`), and monospace telemetry (`JetBrains Mono`).
   - No 3D human character models.
   - No Blender dependencies or pre-rendered MP4 video animations.
   - 3D elements must be procedural using Three.js and React Three Fiber.

4. **Performance & Accessibility**:
   - DPR must be clamped: `dpr={[1, 1.75]}`.
   - Clean unmounting and memory disposal on WebGL objects.
   - Maintain accessible 2D fallback when WebGL is unavailable or when `prefers-reduced-motion` is active.
   - All core text content, project details, and contact nodes must be rendered in semantic HTML.

5. **Build & Quality Gates**:
   - Run `npm run build` (`tsc -b && vite build`) and `npm run lint` (`oxlint`) to ensure zero errors and zero warnings.
