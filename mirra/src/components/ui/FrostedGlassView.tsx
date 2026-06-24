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
import Svg, {
  Defs,
  LinearGradient as SvgLinearGradient,
  RadialGradient,
  Rect,
  Stop,
} from "react-native-svg";
import { LiquidGlassOverlay } from "@/components/ui/LiquidGlassOverlay";

export type FrostLevel = "subtle" | "regular" | "dense" | "subtleExtra";
export type FrostedGlassVariant =
  | "border"
  | "borderBlur"
  | "border1"
  | "borderWhite3"
  | "borderWhite5"
  | "inputGradientBorder"
  | "borderless";
export type FrostedGlassBlurVariant =
  | "rimOnly"
  | "blur10"
  | "blur10Rim"
  | "blur20"
  | "blur20Rim"
  | "blur30"
  | "blur60"
  | "blur60HalfRim"
  | "blur60Rim"
  | "blur132";
export type FrostedGlassFillVariant =
  | "black5"
  | "darkGray60"
  | "inputBlack50"
  | "exploreBottomGradient";

interface FrostedGlassViewProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  borderRadius?: number;
  intensity?: number;
  tint?: BlurTint;
  frostLevel?: FrostLevel;
  variant?: FrostedGlassVariant;
  blurVariant?: FrostedGlassBlurVariant;
  fillVariant?: FrostedGlassFillVariant;
  animatedEdges?: boolean;
  edgeCycleDuration?: number;
  onLayout?: (event: LayoutChangeEvent) => void;
}

export function FrostedGlassView({
  children,
  style,
  borderRadius = 22,
  intensity,
  tint = "dark",
  frostLevel = "regular",
  variant = "border",
  blurVariant,
  fillVariant,
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
      {fillVariant != null && (
        <FillOverlay fillVariant={fillVariant} borderRadius={borderRadius} />
      )}
      {variant === "borderBlur" && (
        <BorderGlowOverlay borderRadius={borderRadius} />
      )}
      {variant === "inputGradientBorder" && size.width > 0 && size.height > 0 && (
        <InputGradientBorderOverlay
          borderRadius={borderRadius}
          width={size.width}
          height={size.height}
        />
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

function FillOverlay({
  fillVariant,
  borderRadius,
}: {
  fillVariant: FrostedGlassFillVariant;
  borderRadius: number;
}) {
  if (fillVariant === "exploreBottomGradient") {
    return (
      <Svg
        width="100%"
        height="100%"
        fill="none"
        pointerEvents="none"
        style={StyleSheet.absoluteFill}
      >
        <Defs>
          <SvgLinearGradient id="exploreBottomFill" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#000000" stopOpacity="0.01" />
            <Stop offset="1" stopColor="#000000" stopOpacity="0.8" />
          </SvgLinearGradient>
        </Defs>
        <Rect width="100%" height="100%" rx={borderRadius} fill="url(#exploreBottomFill)" />
      </Svg>
    );
  }

  return (
    <View
      pointerEvents="none"
      style={[
        StyleSheet.absoluteFill,
        fillVariantStyles[fillVariant],
        { borderRadius },
      ]}
    />
  );
}

function InsetRim({ height }: { height: number }) {
  return <View pointerEvents="none" style={[styles.insetRim, { height }]} />;
}

function InputGradientBorderOverlay({
  borderRadius,
  width,
  height,
}: {
  borderRadius: number;
  width: number;
  height: number;
}) {
  return (
    <Svg
      width="100%"
      height="100%"
      fill="none"
      pointerEvents="none"
      style={StyleSheet.absoluteFill}
    >
      <Defs>
        <SvgLinearGradient id="inputBorderGradient" x1="0.0147" y1="0" x2="0.9825" y2="1">
          <Stop offset="0" stopColor="#FFFFFF" stopOpacity="0.1" />
          <Stop offset="1" stopColor="#FFFFFF" stopOpacity="0.04" />
        </SvgLinearGradient>
      </Defs>
      <Rect
        x="0.5"
        y="0.5"
        width={Math.max(width - 1, 0)}
        height={Math.max(height - 1, 0)}
        rx={Math.max(borderRadius - 0.5, 0)}
        stroke="url(#inputBorderGradient)"
        strokeWidth="1"
      />
    </Svg>
  );
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
  rimOnly: { intensity: 0, rim: 0.5 },
  blur10: { intensity: 10 },
  blur10Rim: { intensity: 10, rim: 0.5 },
  blur20: { intensity: 20 },
  blur20Rim: { intensity: 20, rim: 0.5 },
  blur30: { intensity: 30 },
  blur60: { intensity: 60 },
  blur60HalfRim: { intensity: 60, rim: 0.5 },
  blur60Rim: { intensity: 60, rim: 1 },
  blur132: { intensity: 132 },
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
  borderWhite3: {
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.03)",
  },
  borderWhite5: {
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  inputGradientBorder: {
    borderWidth: 0,
  },
  borderless: {
    borderWidth: 0,
  },
});

const fillVariantStyles = StyleSheet.create({
  black5: {
    backgroundColor: "rgba(0,0,0,0.05)",
  },
  darkGray60: {
    backgroundColor: "rgba(41,42,44,1)",
  },
  inputBlack50: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  exploreBottomGradient: {
    backgroundColor: "transparent",
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
  subtleExtra: {
    backgroundColor: "rgba(255,255,255,0.1)",
  },
});
