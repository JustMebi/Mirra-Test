export const Colors = {
  bg: "#000000",
  bgCard: "#101116",
  bgSurface: "#171922",

  accent: "#D7FD1E",
  accentAlt: "#E1FF4F",
  accentDim: "#A8C700",
  accentGlow: "rgba(245, 255, 196, 1)",
  accentGlowSoft: "rgba(225, 255, 79, 1)",

  glassFill: "rgba(255, 255, 255, 0.075)",
  glassBorder: "rgba(255, 255, 255, 0.115)",
  glassBorderStrong: "rgba(255, 255, 255, 0.22)",

  textPrimary: "#FFFFFF",
  textSecondary: "rgba(255, 255, 255, 0.62)",
  textTertiary: "rgba(255, 255, 255, 0.38)",

  success: "#4ADE80",
  error: "#F87171",
  warning: "#FBBF24",

  transparent: "transparent",
} as const;

export const Gradients = {
  accent: ["#E1FF4F", "#D7FD1E"] as readonly [string, string],

  blue: ["#1D4AFE", "#26B7FF"] as readonly [string, string],
};

export const GradientDir = {
  vertical: { start: { x: 0.5, y: 0 }, end: { x: 0.5, y: 1 } },
  diagonal: { start: { x: 0, y: 0 }, end: { x: 1, y: 0.8 } },
} as const;
