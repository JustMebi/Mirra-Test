import { StyleSheet, ViewStyle, TextStyle } from "react-native";
import { Colors, Gradients } from "@/constants/colors";

export const glow = StyleSheet.create({
  text: {
    color: Colors.accent,
  } as TextStyle,

  textGlow: {
    color: Colors.accent,
    textShadowColor: Colors.accentGlow,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 12,
  } as TextStyle,

  shadow: {
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.55,
    shadowRadius: 16,
    elevation: 12,
  } as ViewStyle,

  blueShadow: {
    shadowColor: "#1D4AFE",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 14,
    elevation: 10,
  } as ViewStyle,

  bgTint: {
    backgroundColor: Colors.accentGlowSoft,
  } as ViewStyle,

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.accent,
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 8,
  } as ViewStyle,
});

export const GlowTokens = {
  color: Colors.accent,
  colorAlt: Colors.accentAlt,
  colorDim: Colors.accentDim,
  glowColor: Colors.accentGlow,
  glowColorSoft: Colors.accentGlowSoft,
  blueColor: "#1D4AFE",
  blueColorAlt: "#26B7FF",
  sigmaInner: 6,
  sigmaOuter: 24,
  gradientStops: [...Gradients.accent] as string[],
  blueGradientStops: [...Gradients.blue] as string[],
} as const;
