import React from "react";
import { View, ViewStyle, LayoutChangeEvent, Platform } from "react-native";
import { BlurView } from "expo-blur";
import { glass } from "@/styles/glass";

interface GlassViewProps {
  children?: React.ReactNode;
  style?: ViewStyle;
  intensity?: number;
  variant?: keyof typeof glass;
  blur?: boolean;
  onLayout?: (e: LayoutChangeEvent) => void;
}

export function GlassView({
  children,
  style,
  intensity = 20,
  variant = "card",
  blur = false,
  onLayout,
}: GlassViewProps) {
  const baseStyle = glass[variant];

  if (blur) {
    return (
      <BlurView
        intensity={intensity}
        tint="dark"
        blurReductionFactor={1}
        experimentalBlurMethod={Platform.OS === "android" ? "none" : undefined}
        style={[baseStyle, style]}
        onLayout={onLayout}
      >
        {children}
      </BlurView>
    );
  }

  return (
    <View style={[baseStyle, style]} onLayout={onLayout}>
      {children}
    </View>
  );
}
