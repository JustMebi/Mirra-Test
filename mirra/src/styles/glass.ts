import { StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '@/constants/colors';
import { Radius } from '@/constants/spacing';

/**
 * Glass morphism style system.
 * All glass surfaces in the app pull from here — never hardcode glass values inline.
 *
 * Usage:
 *   <View style={[glass.card, { height: 120 }]}>
 *   For gradient borders use the <GlassBorderCard> component (Skia-based).
 */

export const glass = StyleSheet.create({
  // Base glass surface — no border radius opinion
  base: {
    backgroundColor: Colors.glassFill,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
  } as ViewStyle,

  // Rounded card (most common)
  card: {
    backgroundColor: Colors.glassFill,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
    borderRadius: Radius.xl,
  } as ViewStyle,

  // Pill / chip shape
  pill: {
    backgroundColor: Colors.glassFill,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
    borderRadius: Radius.full,
  } as ViewStyle,

  // Stronger border for elevated surfaces
  elevated: {
    backgroundColor: 'rgba(255, 255, 255, 0.105)',
    borderWidth: 1,
    borderColor: Colors.glassBorderStrong,
    borderRadius: Radius.xl,
  } as ViewStyle,

  // Inner highlight stripe (top edge shimmer)
  innerHighlight: {
    position: 'absolute',
    top: 0,
    left: 16,
    right: 16,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: Radius.full,
  } as ViewStyle,
});

// Raw token values for use in Skia / Animated contexts where StyleSheet won't work
export const GlassTokens = {
  fillColor: Colors.glassFill,
  borderColor: Colors.glassBorder,
  borderColorStrong: Colors.glassBorderStrong,
  blurIntensity: 28,
} as const;
