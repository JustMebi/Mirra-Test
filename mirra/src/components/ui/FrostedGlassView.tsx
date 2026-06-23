import React, { useState } from "react";
import {
  LayoutChangeEvent,
  Platform,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { BlurView, BlurTint } from "expo-blur";
import Svg, { Defs, RadialGradient, Rect, Stop } from "react-native-svg";
import { LiquidGlassOverlay } from "@/components/ui/LiquidGlassOverlay";

export type FrostLevel = "subtle" | "regular" | "dense";
export type FrostedGlassVariant =
  | "border"
  | "borderBlur"
  | "border1"
  | "borderless";
export type FrostedGlassBlurVariant =
  | "blur10"
  | "blur10Rim"
  | "blur20"
  | "blur20Rim"
  | "blur30"
  | "blur60Rim";

interface FrostedGlassViewProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  borderRadius?: number;
  intensity?: number;
  tint?: BlurTint;
  frostLevel?: FrostLevel;
  variant?: FrostedGlassVariant;
  blurVariant?: FrostedGlassBlurVariant;
  animatedEdges?: boolean;
  edgeCycleDuration?: number;
  onLayout?: (event: LayoutChangeEvent) => void;
}

export function FrostedGlassView({
  children,
  style,
  borderRadius = 22,
  intensity = 24,
  tint = "dark",
  frostLevel = "regular",
  variant = "border",
  blurVariant,
  animatedEdges = true,
  edgeCycleDuration = 5000,
  onLayout,
}: FrostedGlassViewProps) {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const blurRecipe = blurVariant != null ? blurVariantConfig[blurVariant] : null;
  const resolvedIntensity = intensity ?? blurRecipe?.intensity ?? 24;

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setSize((current) =>
      current.width === width && current.height === height
        ? current
        : { width, height },
    );
    onLayout?.(event);
  };

  return (
    <BlurView
      intensity={resolvedIntensity}
      tint={tint}
      blurReductionFactor={1}
      experimentalBlurMethod={Platform.OS === "android" ? "none" : undefined}
      style={[
        styles.surface,
        frostLevelStyles[frostLevel],
        variantStyles[variant],
        { borderRadius },
        style,
      ]}
      onLayout={handleLayout}
    >
      {variant === "borderBlur" && (
        <BorderGlowOverlay borderRadius={borderRadius} />
      )}
      {blurRecipe?.rim != null && <InsetRim height={blurRecipe.rim} />}
      {animatedEdges && size.width > 0 && size.height > 0 && (
        <LiquidGlassOverlay
          width={size.width}
          height={size.height}
          borderRadius={borderRadius}
          sweepDuration={edgeCycleDuration}
        />
      )}
      {children}
    </BlurView>
  );
}

function InsetRim({ height }: { height: number }) {
  return <View pointerEvents="none" style={[styles.insetRim, { height }]} />;
}

function BorderGlowOverlay({ borderRadius }: { borderRadius: number }) {
  return (
    <Svg
      width="100%"
      height="100%"
      fill="none"
      pointerEvents="none"
      style={StyleSheet.absoluteFill}
    >
      <Defs>
        <RadialGradient id="glassTopGlow" cx="50%" cy="-12%" r="66%">
          <Stop offset="0" stopColor="#FFFFFF" stopOpacity="0.2" />
          <Stop offset="0.38" stopColor="#FFFFFF" stopOpacity="0.08" />
          <Stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </RadialGradient>
        <RadialGradient id="glassBottomGlow" cx="50%" cy="112%" r="72%">
          <Stop offset="0" stopColor="#FFFFFF" stopOpacity="0.16" />
          <Stop offset="0.42" stopColor="#FFFFFF" stopOpacity="0.06" />
          <Stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </RadialGradient>
      </Defs>
      <Rect width="100%" height="100%" rx={borderRadius} fill="url(#glassTopGlow)" />
      <Rect width="100%" height="100%" rx={borderRadius} fill="url(#glassBottomGlow)" />
    </Svg>
  );
}

const styles = StyleSheet.create({
  surface: {
    overflow: "hidden",
  },
  insetRim: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(255,255,255,0.10)",
    zIndex: 1,
  },
});

const blurVariantConfig: Record<
  FrostedGlassBlurVariant,
  { intensity: number; rim?: number }
> = {
  blur10: { intensity: 10 },
  blur10Rim: { intensity: 10, rim: 0.5 },
  blur20: { intensity: 20 },
  blur20Rim: { intensity: 20, rim: 0.5 },
  blur30: { intensity: 30 },
  blur60Rim: { intensity: 60, rim: 1 },
};

const variantStyles = StyleSheet.create({
  border: {
    borderWidth: 0.5,
    borderTopColor: "rgba(255,255,255,0.10)",
    borderLeftColor: "rgba(255,255,255,0.05)",
    borderRightColor: "rgba(255,255,255,0.05)",
    borderBottomColor: "rgba(255,255,255,0.05)",
  },
  borderBlur: {
    borderWidth: 0.5,
    borderTopColor: "rgba(255,255,255,0.14)",
    borderLeftColor: "rgba(255,255,255,0.06)",
    borderRightColor: "rgba(255,255,255,0.06)",
    borderBottomColor: "rgba(255,255,255,0.10)",
  },
  border1: {
    borderWidth: 1,
    borderTopColor: "rgba(255,255,255,0.08)",
    borderLeftColor: "rgba(255,255,255,0.04)",
    borderRightColor: "rgba(255,255,255,0.04)",
    borderBottomColor: "rgba(255,255,255,0.04)",
  },
  borderless: {
    borderWidth: 0,
  },
});

const frostLevelStyles = StyleSheet.create({
  subtle: {
    backgroundColor: "rgba(250,248,248,0.035)",
  },
  regular: {
    backgroundColor: "rgba(250,248,248,0.05)",
  },
  dense: {
    backgroundColor: "rgba(255,255,255,0.1)",
  },
});
