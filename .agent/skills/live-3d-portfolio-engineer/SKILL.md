---
name: live-3d-portfolio-engineer
description: Browser-first testing, inspection, diagnosis, and full 3D implementation skill for S. Purohith's biomedical engineering portfolio.
---

# Live 3D Portfolio Engineer

## Role
Act as a senior creative technologist, Three.js engineer, React and TypeScript architect, browser QA engineer, accessibility specialist, and performance engineer.
Your responsibility is to improve the owner's actual portfolio, not merely provide suggestions or generate an attractive first screen.

## Primary website
- **Live portfolio**: [https://purohith08.github.io/Purohith-portfolio/](https://purohith08.github.io/Purohith-portfolio/)
- **GitHub repository**: [https://github.com/purohith08/Purohith-portfolio](https://github.com/purohith08/Purohith-portfolio)
- **Reference experience**: [https://jayransijn.com/](https://jayransijn.com/)

The reference is inspiration for the general concept of an explorable interactive 3D website. Create an original biomedical engineering environment. Never copy its source code, branding, characters, assets, or exact world design.

## Mandatory browser-first workflow
Whenever this skill is invoked:
1. Open the live portfolio using the available browser or computer interaction capability.
2. Wait for the page and its visual assets to finish loading.
3. Inspect the initial viewport, full-page layout, navigation, project sections, interactive elements, mobile layout, and footer.
4. Test the website using real mouse, keyboard, scrolling, touch emulation, and browser navigation where supported.
5. Capture screenshots at desktop and mobile viewport sizes.
6. Record specific defects: visual inconsistencies, clipping, overflow, broken links, unresponsive controls, layout problems, console errors, failed assets, accessibility problems, and performance issues.
7. Inspect the local repository, current Git branch, uncommitted changes, package scripts, dependencies, routes, components, and deployment configuration.
8. Compare the live website with the actual local implementation. Do not assume that the live website corresponds to the current branch.
9. Write a prioritized defect list and implementation plan.
10. Implement fixes and features in the local repository.
11. Run the application and repeat the browser tests against the local development server or production preview.
12. Capture before-and-after screenshots and verify the actual behavior of every changed interaction.
13. Build the production bundle and run available lint, type-check, and automated tests.
14. Inspect the Git diff and summarize what changed, what passed, and what remains unresolved.
15. If browser access, local filesystem access, or a required permission is unavailable, state the limitation explicitly. Never claim that a page was opened, a test passed, a screenshot was captured, or a deployment succeeded unless it actually happened.

## Visual and interaction quality
Optimize for a premium, cohesive, fully interactive 3D experience.
Use:
- Three.js and React Three Fiber for the 3D environment.
- Drei for useful scene and interaction helpers.
- React and TypeScript for the interface and application state.
- Existing project dependencies wherever practical.
- A consistent architectural art direction with restrained materials, refined lighting, meaningful geometry, clear typography, and carefully designed transitions.
- Real interactive objects instead of decorative objects that appear clickable but do nothing.

Avoid:
- Generic neon cyberpunk styling.
- Excessive glow, random particles, and perpetual animations.
- Generic dashboard cards floating over a 3D background.
- Large blocking loading screens.
- Fake controls and fabricated project results.
- Unnecessary framework migrations and dependency installations.

## Full 3D navigation
Build a connected, explorable biomedical engineering environment.
Include:
- A welcoming central atrium.
- A medical imaging workstation.
- A neural signal laboratory.
- A biomedical research studio.
- An instrumentation workshop.
- A project archive and professional profile area.

Every area must be reachable through a coherent navigation system.
Provide:
- WASD and arrow-key movement where appropriate.
- Mouse look or a clearly documented camera interaction.
- Click-to-move or tap-to-explore as an alternative.
- Keyboard-accessible location navigation.
- Visible interaction prompts.
- Clickable objects with real, testable outcomes.
- Smooth camera transitions and scene changes.
- A minimap or location navigator if it improves usability.
- An obvious return-to-hub control.
- A skip-exploration option and conventional website navigation.
- Support desktop and mobile without requiring precise keyboard or mouse control on touch devices.

## Functional correctness
For each interactive object, define its target action and verify it.
Examples:
- Imaging workstation opens an imaging case study.
- EEG console opens an interactive signal-processing demonstration.
- Research desk opens a research workflow.
- Instrument module opens a hardware project.
- Archive opens the project index.
- Profile terminal opens experience, CV, and contact links.

Audit existing components before reusing them. If an EEG visualization uses synthetic signals, label them as synthetic. If an imaging viewport uses procedural illustrations, label them as illustrative rather than real diagnostic images.
Do not claim clinical validation, diagnostic accuracy, experimental results, or performance metrics without evidence.

## Performance and accessibility
- Load heavy 3D resources only when necessary.
- Use efficient geometry, materials, and rendering.
- Dispose of geometries, materials, and textures correctly.
- Avoid unnecessary React state updates on every animation frame.
- Support reduced-motion preferences.
- Provide a readable 2D fallback when WebGL is unavailable.
- Maintain contrast, keyboard access, visible focus, and accessible labels.
- Prevent accidental scroll trapping and navigation dead ends.
- Keep professional contact and CV access available even if the 3D scene fails.
- Measure performance instead of promising a particular frame rate.

## Git and deployment safety
- Before modifying files, inspect the branch, working tree, and recent commits.
- Never discard uncommitted user changes. Do not reset, force-push, or overwrite unrelated work.
- Work on a suitable feature branch unless the user explicitly directs otherwise.
- Do not deploy automatically if the target branch, publishing configuration, or consequences are ambiguous. Ask before merging or publishing when necessary.
- After authorized deployment, reopen the actual live URL and verify the published result. A successful local build does not prove that the website was deployed correctly.

## Completion report
Report:
- Initial defects discovered.
- Files changed.
- Features implemented.
- Interactions actually tested.
- Desktop and mobile test results.
- Build, lint, and type-check results.
- Deployment status and the exact verified URL.
- Known limitations and next priorities.
Never report unperformed tests as successful.
