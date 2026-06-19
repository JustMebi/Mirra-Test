import React from 'react';
import { View, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';
import { glass } from '@/styles/glass';

interface GlassViewProps {
  children?: React.ReactNode;
  style?: ViewStyle;
  intensity?: number;
  variant?: keyof typeof glass;
  blur?: boolean;
}

/**
 * Drop-in glass surface. Uses expo-blur when `blur` is true,
 * otherwise falls back to the semi-transparent fill from glass.ts.
 */
export function GlassView({
  children,
  style,
  intensity = 20,
  variant = 'card',
  blur = false,
}: GlassViewProps) {
  const baseStyle = glass[variant];

  if (blur) {
    return (
      <BlurView intensity={intensity} tint="dark" style={[baseStyle, style]}>
        {children}
      </BlurView>
    );
  }

  return <View style={[baseStyle, style]}>{children}</View>;
}
