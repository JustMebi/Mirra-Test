import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import {
  Canvas,
  RoundedRect,
  LinearGradient,
  vec,
  Paint,
  BlurMask,
  Group,
} from '@shopify/react-native-skia';
import { Radius } from '@/constants/spacing';
import { GlassTokens } from '@/styles/glass';
import { GlowTokens } from '@/styles/glow';

interface GradientBorderCardProps {
  width: number;
  height: number;
  borderRadius?: number;
  borderWidth?: number;
  /** 'accent' = glowing yellow gradient border  |  'glass' = subtle white glass border */
  variant?: 'accent' | 'glass';
  children?: React.ReactNode;
  style?: ViewStyle;
}

export function GradientBorderCard({
  width,
  height,
  borderRadius = Radius.xl,
  borderWidth = 1.5,
  variant = 'glass',
  children,
  style,
}: GradientBorderCardProps) {
  const isAccent = variant === 'accent';

  const gradientColors = isAccent
    ? GlowTokens.gradientStops
    : ['rgba(255,255,255,0.18)', 'rgba(255,255,255,0.06)', 'rgba(255,255,255,0.18)'];

  return (
    <View style={[{ width, height }, style]}>
      {/* Skia canvas renders ONLY the border ring */}
      <Canvas style={StyleSheet.absoluteFill}>
        <Group>
          {/* Outer glow halo (accent only) */}
          {isAccent && (
            <RoundedRect
              x={borderWidth}
              y={borderWidth}
              width={width - borderWidth * 2}
              height={height - borderWidth * 2}
              r={borderRadius}
            >
              <Paint>
                <LinearGradient
                  start={vec(0, 0)}
                  end={vec(width, height)}
                  colors={gradientColors}
                />
                <BlurMask blur={GlowTokens.sigmaOuter} style="outer" />
              </Paint>
            </RoundedRect>
          )}

          {/* Border stroke */}
          <RoundedRect
            x={borderWidth / 2}
            y={borderWidth / 2}
            width={width - borderWidth}
            height={height - borderWidth}
            r={borderRadius}
            style="stroke"
            strokeWidth={borderWidth}
          >
            <LinearGradient
              start={vec(0, 0)}
              end={vec(width, height)}
              colors={gradientColors}
            />
          </RoundedRect>
        </Group>
      </Canvas>

      {/* Card fill sits on top of the canvas */}
      <View
        style={[
          StyleSheet.absoluteFill,
          {
            margin: borderWidth,
            borderRadius: borderRadius - borderWidth,
            backgroundColor: GlassTokens.fillColor,
            overflow: 'hidden',
          },
        ]}
      >
        {children}
      </View>
    </View>
  );
}
