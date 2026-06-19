import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Colors, Gradients } from '@/constants/colors';

/**
 * Yellow-green accent glow system.
 * Solid-color styles for View/Text. For gradient fills use <LinearGradient colors={Gradients.accent}>.
 * For Skia-rendered glow halos use GlowTokens directly.
 */

export const glow = StyleSheet.create({
  // Accent text
  text: {
    color: Colors.accent,
  } as TextStyle,

  // Soft glowing text (shadow approximation)
  textGlow: {
    color: Colors.accent,
    textShadowColor: Colors.accentGlow,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 12,
  } as TextStyle,

  // View with glow shadow
  shadow: {
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.55,
    shadowRadius: 16,
    elevation: 12,
  } as ViewStyle,

  // Blue glow shadow (for blue-gradient elements)
  blueShadow: {
    shadowColor: '#1D4AFE',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 14,
    elevation: 10,
  } as ViewStyle,

  // Subtle background glow tint
  bgTint: {
    backgroundColor: Colors.accentGlowSoft,
  } as ViewStyle,

  // Dot / indicator (use as base; wrap with LinearGradient for gradient fill)
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

// Raw tokens for Skia blur / paint layers
export const GlowTokens = {
  color: Colors.accent,
  colorAlt: Colors.accentAlt,
  colorDim: Colors.accentDim,
  glowColor: Colors.accentGlow,
  glowColorSoft: Colors.accentGlowSoft,
  blueColor: '#1D4AFE',
  blueColorAlt: '#26B7FF',
  // Skia blur sigma for a tight glow
  sigmaInner: 6,
  // Skia blur sigma for a wide ambient halo
  sigmaOuter: 24,
  // Gradient stop colors
  gradientStops: [...Gradients.accent] as string[],
  blueGradientStops: [...Gradients.blue] as string[],
} as const;
