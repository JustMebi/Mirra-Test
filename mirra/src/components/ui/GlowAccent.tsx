import React from 'react';
import { View, ViewStyle, TextStyle } from 'react-native';
import { Text } from '@/components/ui/Text';
import { Canvas, Circle, RadialGradient, vec } from '@shopify/react-native-skia';
import { glow, GlowTokens } from '@/styles/glow';

// ─── Glow Halo (ambient light blob behind an element) ──────────────────────

interface GlowHaloProps {
  size?: number;
  intensity?: number;
  style?: ViewStyle;
}

export function GlowHalo({ size = 200, intensity = 0.4, style }: GlowHaloProps) {
  const r = size / 2;
  return (
    <View style={[{ width: size, height: size }, style]} pointerEvents="none">
      <Canvas style={{ flex: 1 }}>
        <Circle cx={r} cy={r} r={r}>
          <RadialGradient
            c={vec(r, r)}
            r={r}
            colors={[
              GlowTokens.glowColor.replace('0.25', String(intensity)),
              'transparent',
            ]}
          />
        </Circle>
      </Canvas>
    </View>
  );
}

// ─── Glow Text ──────────────────────────────────────────────────────────────

interface GlowTextProps {
  children: React.ReactNode;
  style?: TextStyle;
  soft?: boolean;
}

export function GlowText({ children, style, soft = false }: GlowTextProps) {
  return (
    <Text style={[soft ? glow.textGlow : glow.text, style]}>{children}</Text>
  );
}

// ─── Glow Dot ───────────────────────────────────────────────────────────────

interface GlowDotProps {
  size?: number;
  style?: ViewStyle;
}

export function GlowDot({ size = 8, style }: GlowDotProps) {
  return (
    <View
      style={[
        glow.dot,
        { width: size, height: size, borderRadius: size / 2 },
        style,
      ]}
    />
  );
}
