import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import Svg, { Ellipse, Path } from "react-native-svg";
import { AppIcon } from "./AppIcon";
import { Colors } from "@/constants/colors";

interface SearchButtonProps {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export function SearchButton({ onPress, style }: SearchButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.outer, style]}
      onPress={onPress}
    >
      <View style={styles.inner}>
        <Svg
          width={44}
          height={44}
          viewBox="0 0 44 44"
          style={styles.glowLayer}
        >
          <Ellipse
            cx="22"
            cy="44.9"
            rx="18.5"
            ry="5"
            fill="rgba(217, 217, 217, 1)"
            opacity={0.2}
          />
          <Ellipse
            cx="22"
            cy="44.8"
            rx="20.5"
            ry="8.6"
            fill="rgba(38, 183, 255, 1)"
            opacity={0.13}
          />
          <Ellipse
            cx="22"
            cy="44.2"
            rx="18.5"
            ry="5"
            fill="rgba(38, 183, 255, 1)"
            opacity={0.5}
          />
          <Ellipse
            cx="22"
            cy="46"
            rx="13.8"
            ry="3.2"
            fill="rgba(29, 74, 254, 1)"
            opacity={0.38}
          />
        </Svg>
        <AppIcon
          name="search"
          size={15}
          color={Colors.textPrimary}
          strokeWidth={1.4}
          opacity={0.86}
        />
        <View style={styles.premiumSparkle}>
          <PremiumSparkle />
        </View>
      </View>
    </TouchableOpacity>
  );
}

function PremiumSparkle() {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
      <Path
        d="M9.45 1.2 10.25 3.35l2.15.8-2.15.82-.8 2.13-.82-2.13-2.13-.82 2.13-.8.82-2.15Z"
        fill="#FFFFFF"
      />
      <Path
        d="M4.1 6.15 4.55 7.35l1.2.45-1.2.46-.45 1.19-.46-1.19-1.19-.46 1.19-.45.46-1.2Z"
        fill="#FFFFFF"
        opacity={0.86}
      />
    </Svg>
  );
}

const styles = StyleSheet.create({
  outer: {
    width: 44,
    height: 44,
    borderRadius: 16,
    shadowColor: "rgba(217, 217, 217, 1)",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.75,
    shadowRadius: 20,
    elevation: 50,
  },
  inner: {
    flex: 1,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.045)",
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.075)",
  },
  glowLayer: {
    position: "absolute",
    left: 0,
    top: 0,
  },
  premiumSparkle: {
    position: "absolute",
    top: -3,
    right: -1,
  },
});
