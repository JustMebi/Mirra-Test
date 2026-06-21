import React from "react";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";
import { BlurTint } from "expo-blur";
import {
  FrostedGlassView,
  FrostLevel,
} from "@/components/ui/FrostedGlassView";

interface FrostedGlassPressableProps
  extends Omit<TouchableOpacityProps, "style"> {
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  borderRadius?: number;
  intensity?: number;
  tint?: BlurTint;
  frostLevel?: FrostLevel;
  animatedEdges?: boolean;
}

/** Touchable companion to FrostedGlassView for glass buttons and controls. */
export function FrostedGlassPressable({
  children,
  style,
  contentStyle,
  borderRadius = 16,
  intensity,
  tint,
  frostLevel,
  animatedEdges = false,
  activeOpacity = 0.72,
  ...touchableProps
}: FrostedGlassPressableProps) {
  return (
    <FrostedGlassView
      style={style}
      borderRadius={borderRadius}
      intensity={intensity}
      tint={tint}
      frostLevel={frostLevel}
      animatedEdges={animatedEdges}
    >
      <TouchableOpacity
        {...touchableProps}
        activeOpacity={activeOpacity}
        style={[styles.content, contentStyle]}
      >
        {children}
      </TouchableOpacity>
    </FrostedGlassView>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
});
