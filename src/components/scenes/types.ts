/**
 * Typed visual state definition for the 5-stage procedural 3D instrument
 */
export type SceneVisualState = 
  | 'BIOPOTENTIAL_CORE'          // State A: Hero section
  | 'MEDICAL_IMAGING_GANTRY'     // State B: DICOM viewport
  | 'BIOSIGNAL_OSCILLOSCOPE'     // State C: EEG workbench
  | 'CIRCUIT_LATTICE'            // State D: Instrumentation workshop
  | 'KNOWLEDGE_CONSTELLATION';   // State E: Projects, Experience, Skills, Education

export interface SceneScrollProgress {
  /** Overall normalized progress [0..1] through the document */
  scrollProgress: number;
  /** Active primary visual state */
  activeState: SceneVisualState;
  /** Normalized progress within the active state transition [0..1] */
  stateProgress: number;
  /** Interpolated camera coordinates */
  cameraPos: [number, number, number];
  /** Target point for camera lookAt */
  cameraLookAt: [number, number, number];
  /** Sub-component weights/opacities for smooth morphing */
  coreOpacity: number;
  ringsOpacity: number;
  waveformOpacity: number;
  latticeProgress: number;
  constellationSpread: number;
}
