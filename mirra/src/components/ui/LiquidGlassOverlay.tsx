import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  cancelAnimation,
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

interface LiquidGlassOverlayProps {
  width: number;
  height: number;
  borderRadius: number;
  sweepDuration?: number;
}

/** Transparent highlights layered over the blur/fallback glass surface. */
export function LiquidGlassOverlay({
  width,
  height,
  borderRadius,
  sweepDuration = 5000,
}: LiquidGlassOverlayProps) {
  const phase = useSharedValue(0);

  useEffect(() => {
    phase.value = 0;
    phase.value = withRepeat(
      withTiming(1, {
        duration: sweepDuration,
        easing: Easing.inOut(Easing.quad),
      }),
      -1,
      true,
    );

    return () => cancelAnimation(phase);
  }, [phase, sweepDuration]);

  const topLensStyle = useAnimatedStyle(() => ({
    opacity: interpolate(phase.value, [0, 1], [0.5, 0.9]),
    transform: [
      { translateX: interpolate(phase.value, [0, 1], [-width * 0.12, width * 0.12]) },
      { scaleX: interpolate(phase.value, [0, 1], [0.92, 1.08]) },
    ],
  }));

  const bottomLensStyle = useAnimatedStyle(() => ({
    opacity: interpolate(phase.value, [0, 1], [0.75, 0.4]),
    transform: [
      { translateX: interpolate(phase.value, [0, 1], [width * 0.1, -width * 0.1]) },
      { scaleX: interpolate(phase.value, [0, 1], [1.06, 0.94]) },
    ],
  }));

  const sideLensStyle = useAnimatedStyle(() => ({
    opacity: interpolate(phase.value, [0, 0.5, 1], [0.35, 0.7, 0.35]),
    transform: [{ scaleY: interpolate(phase.value, [0, 1], [0.82, 1.08]) }],
  }));

  if (width <= 0 || height <= 0) return null;

  return (
    <View
      pointerEvents="none"
      style={[StyleSheet.absoluteFill, { borderRadius, overflow: "hidden" }]}
    >
      <LinearGradient
        colors={["rgba(255,255,255,0.065)", "rgba(255,255,255,0)"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.topHighlight}
      />
      <LinearGradient
        colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.07)"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.bottomFalloff}
      />
      <Animated.View style={[styles.topLens, topLensStyle]}>
        <LinearGradient
          colors={[
            "rgba(255,255,255,0)",
            "rgba(255,255,255,0.18)",
            "rgba(255,255,255,0)",
          ]}
          locations={[0, 0.5, 1]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
      <Animated.View style={[styles.bottomLens, bottomLensStyle]}>
        <LinearGradient
          colors={[
            "rgba(255,255,255,0)",
            "rgba(255,255,255,0.10)",
            "rgba(255,255,255,0)",
          ]}
          locations={[0, 0.5, 1]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
      <Animated.View style={[styles.leftLens, sideLensStyle]} />
      <Animated.View style={[styles.rightLens, sideLensStyle]} />
    </View>
  );
}

const styles = StyleSheet.create({
  topHighlight: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "42%",
  },
  bottomFalloff: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "45%",
  },
  topLens: {
    position: "absolute",
    top: 0,
    left: "18%",
    width: "64%",
    height: 3,
  },
  bottomLens: {
    position: "absolute",
    bottom: 0,
    left: "22%",
    width: "56%",
    height: 2,
  },
  leftLens: {
    position: "absolute",
    top: "22%",
    bottom: "22%",
    left: 0,
    width: 2,
    borderRadius: 2,
    backgroundColor: "rgba(255,255,255,0.16)",
  },
  rightLens: {
    position: "absolute",
    top: "22%",
    bottom: "22%",
    right: 0,
    width: 2,
    borderRadius: 2,
    backgroundColor: "rgba(255,255,255,0.10)",
  },
});
