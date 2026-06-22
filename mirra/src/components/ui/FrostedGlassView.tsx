import React, { useState } from "react";
import {
  LayoutChangeEvent,
  Platform,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { BlurView, BlurTint } from "expo-blur";
import { LiquidGlassOverlay } from "@/components/ui/LiquidGlassOverlay";

export type FrostLevel = "subtle" | "regular" | "dense";

interface FrostedGlassViewProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  borderRadius?: number;
  intensity?: number;
  tint?: BlurTint;
  frostLevel?: FrostLevel;
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
  animatedEdges = true,
  edgeCycleDuration = 5000,
  onLayout,
}: FrostedGlassViewProps) {
  const [size, setSize] = useState({ width: 0, height: 0 });

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
      intensity={intensity}
      tint={tint}
      blurReductionFactor={1}
      experimentalBlurMethod={Platform.OS === "android" ? "none" : undefined}
      style={[
        styles.surface,
        frostLevelStyles[frostLevel],
        { borderRadius },
        style,
      ]}
      onLayout={handleLayout}
    >
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

const styles = StyleSheet.create({
  surface: {
    overflow: "hidden",
    borderWidth: 1,
    borderTopColor: "rgba(255,255,255,0.08)",
    borderLeftColor: "rgba(255,255,255,0.04)",
    borderRightColor: "rgba(255,255,255,0.04)",
    borderBottomColor: "rgba(255,255,255,0.04)",
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
