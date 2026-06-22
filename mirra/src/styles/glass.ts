import { StyleSheet, ViewStyle } from "react-native";
import { Colors } from "@/constants/colors";
import { Radius } from "@/constants/spacing";

export const glass = StyleSheet.create({
  base: {
    backgroundColor: Colors.glassFill,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
  } as ViewStyle,

  card: {
    backgroundColor: Colors.glassFill,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
    borderRadius: Radius.xl,
  } as ViewStyle,

  pill: {
    backgroundColor: Colors.glassFill,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
    borderRadius: Radius.full,
  } as ViewStyle,

  elevated: {
    backgroundColor: "rgba(255, 255, 255, 0.105)",
    borderWidth: 1,
    borderColor: Colors.glassBorderStrong,
    borderRadius: Radius.xl,
  } as ViewStyle,

  innerHighlight: {
    position: "absolute",
    top: 0,
    left: 16,
    right: 16,
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: Radius.full,
  } as ViewStyle,
});

export const GlassTokens = {
  fillColor: Colors.glassFill,
  borderColor: Colors.glassBorder,
  borderColorStrong: Colors.glassBorderStrong,
  blurIntensity: 28,
} as const;
