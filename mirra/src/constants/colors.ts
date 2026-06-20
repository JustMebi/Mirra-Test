export const Colors = {
  // Backgrounds
  bg: "#000000",
  bgCard: "#101116",
  bgSurface: "#171922",

  // Yellow-green accent (solid anchor for text / shadows)
  accent: "#D7FD1E",
  accentAlt: "#E1FF4F",
  accentDim: "#A8C700",
  accentGlow: "rgba(245, 255, 196, 1)",
  accentGlowSoft: "rgba(225, 255, 79, 1)",

  // Glass
  glassFill: "rgba(255, 255, 255, 0.075)",
  glassBorder: "rgba(255, 255, 255, 0.115)",
  glassBorderStrong: "rgba(255, 255, 255, 0.22)",

  // Text
  textPrimary: "#FFFFFF",
  textSecondary: "rgba(255, 255, 255, 0.62)",
  textTertiary: "rgba(255, 255, 255, 0.38)",

  // Semantic
  success: "#4ADE80",
  error: "#F87171",
  warning: "#FBBF24",

  // Transparent
  transparent: "transparent",
} as const;

// ── Gradient definitions ──────────────────────────────────────────────────────
// Use these with expo-linear-gradient <LinearGradient colors={Gradients.accent} />

export const Gradients = {
  // Yellow-green — badges, dots, Mirra button, active states
  // CSS: linear-gradient(180deg, #E1FF4F 0%, #D7FD1E 100%)
  accent: ["#E1FF4F", "#D7FD1E"] as readonly [string, string],

  // Blue — search icons, DP chatbot send button
  // CSS: linear-gradient(107.92deg, #1D4AFE 5.62%, #26B7FF 85.47%)
  blue: ["#1D4AFE", "#26B7FF"] as readonly [string, string],
};

// Direction helpers for expo-linear-gradient
export const GradientDir = {
  // 180deg = top → bottom
  vertical: { start: { x: 0.5, y: 0 }, end: { x: 0.5, y: 1 } },
  // 107.92deg ≈ upper-left → lower-right (mostly horizontal)
  diagonal: { start: { x: 0, y: 0 }, end: { x: 1, y: 0.8 } },
} as const;
