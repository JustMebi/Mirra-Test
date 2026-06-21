import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import Svg, { Defs, Path, RadialGradient, Rect, Stop } from "react-native-svg";
import { AppIcon } from "./AppIcon";
import { FrostedGlassView, FrostLevel } from "./FrostedGlassView";
import { Colors } from "@/constants/colors";

interface SearchButtonProps {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  frostLevel?: FrostLevel;
}

export function SearchButton({
  onPress,
  style,
  frostLevel = "regular",
}: SearchButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.outer, style]}
      onPress={onPress}
    >
      <FrostedGlassView
        style={styles.inner}
        borderRadius={16}
        intensity={28}
        tint="systemUltraThinMaterialDark"
        frostLevel={frostLevel}
        animatedEdges={false}
      >
        <Svg
          width={44}
          height={22}
          viewBox="0 0 44 22"
          style={styles.glowLayer}
        >
          <Defs>
            <RadialGradient
              id="searchBlueGlow"
              cx="22"
              cy="30"
              rx="22"
              ry="16"
              gradientUnits="userSpaceOnUse"
            >
              <Stop offset="0" stopColor="#26B7FF" stopOpacity="0.52" />
              <Stop offset="0.42" stopColor="#26B7FF" stopOpacity="0.24" />
              <Stop offset="1" stopColor="#26B7FF" stopOpacity="0" />
            </RadialGradient>
            <RadialGradient
              id="searchBlueCore"
              cx="22"
              cy="32"
              rx="14"
              ry="9"
              gradientUnits="userSpaceOnUse"
            >
              <Stop offset="0" stopColor="#1D4AFE" stopOpacity="0.42" />
              <Stop offset="1" stopColor="#1D4AFE" stopOpacity="0" />
            </RadialGradient>
          </Defs>
          <Rect width="44" height="22" fill="url(#searchBlueGlow)" />
          <Rect width="44" height="22" fill="url(#searchBlueCore)" />
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
      </FrostedGlassView>
    </TouchableOpacity>
  );
}

function PremiumSparkle() {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
      <Path
        d="M4.1 6.15 4.55 7.35l1.2.45-1.2.46-.45 1.19-.46-1.19-1.19-.46 1.19-.45.46-1.2Z"
        fill="#FFFFFF"
        opacity={0.86}
      />
      <Path
        d="M9.45 1.2 10.25 3.35l2.15.8-2.15.82-.8 2.13-.82-2.13-2.13-.82 2.13-.8.82-2.15Z"
        fill="#FFFFFF"
      />
    </Svg>
  );
}

const styles = StyleSheet.create({
  outer: {
    width: 44,
    height: 44,
    borderRadius: 16,
  },
  inner: {
    flex: 1,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  glowLayer: {
    position: "absolute",
    left: 0,
    bottom: 0,
  },
  premiumSparkle: {
    position: "absolute",
    top: 2,
    right: 2,
  },
});
