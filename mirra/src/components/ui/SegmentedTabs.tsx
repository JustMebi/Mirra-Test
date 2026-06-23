import React from "react";
import {
  Image,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Text } from "@/components/ui/Text";
import { AppIcon, AppIconName } from "@/components/ui/AppIcon";
import {
  FrostedGlassVariant,
  FrostLevel,
  FrostedGlassView,
} from "@/components/ui/FrostedGlassView";
import { Colors, Gradients, GradientDir } from "@/constants/colors";

export type SegmentedTabSize = "large" | "small";

export interface SegmentedTabItem<T extends string> {
  value: T;
  label: string;
  icon?: AppIconName;
  image?: ImageSourcePropType;
  badge?: number;
  badgeTone?: "default" | "accent";
  flex?: number;
}

interface SegmentedTabsProps<T extends string> {
  value: T;
  tabs: Array<SegmentedTabItem<T>>;
  onChange: (value: T) => void;
  size?: SegmentedTabSize;
  style?: StyleProp<ViewStyle>;
  tabStyle?: StyleProp<ViewStyle>;
  activeTabStyle?: StyleProp<ViewStyle>;
  frostLevel?: FrostLevel;
  variant?: FrostedGlassVariant;
  borderRadius?: number;
  iconSize?: number;
}

export function SegmentedTabs<T extends string>({
  value,
  tabs,
  onChange,
  size = "large",
  style,
  tabStyle,
  activeTabStyle,
  frostLevel = "regular",
  variant = "border",
  borderRadius = size === "large" ? 12 : 10,
  iconSize = size === "large" ? 16 : 12,
}: SegmentedTabsProps<T>) {
  const isLarge = size === "large";

  return (
    <FrostedGlassView
      style={[
        styles.container,
        isLarge ? styles.containerLarge : styles.containerSmall,
        { borderRadius },
        style,
      ]}
      borderRadius={borderRadius}
      frostLevel={frostLevel}
      variant={variant}
      animatedEdges={false}
    >
      {tabs.map((tab) => {
        const isActive = tab.value === value;
        const tone = tab.badgeTone ?? "default";

        return (
          <TouchableOpacity
            key={tab.value}
            style={[
              styles.tab,
              isLarge ? styles.tabLarge : styles.tabSmall,
              tab.flex != null && { flex: tab.flex },
              tabStyle,
              isActive && styles.tabActive,
              isActive && activeTabStyle,
            ]}
            onPress={() => onChange(tab.value)}
            activeOpacity={0.72}
          >
            {tab.image != null && (
              <Image source={tab.image} style={isLarge ? styles.imageLarge : styles.imageSmall} />
            )}
            {tab.icon != null && (
              <AppIcon
                name={tab.icon}
                size={iconSize}
                color={isActive ? Colors.textPrimary : Colors.textSecondary}
                strokeWidth={isLarge ? 1.4 : 1.35}
                opacity={isActive ? 1 : 0.72}
              />
            )}
            <Text
              style={[
                styles.label,
                isLarge ? styles.labelLarge : styles.labelSmall,
                isActive && styles.labelActive,
              ]}
              numberOfLines={1}
            >
              {tab.label}
            </Text>
            {tab.badge != null && (
              tone === "accent" ? (
                <LinearGradient
                  colors={Gradients.accent}
                  {...GradientDir.vertical}
                  style={isLarge ? styles.badgeLarge : styles.badgeSmall}
                >
                  <Text style={styles.badgeTextDark}>{tab.badge}</Text>
                </LinearGradient>
              ) : (
                <View style={isLarge ? styles.badgeLarge : styles.badgeSmall}>
                  <Text style={styles.badgeText}>{tab.badge}</Text>
                </View>
              )
            )}
          </TouchableOpacity>
        );
      })}
    </FrostedGlassView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  containerLarge: {
    height: 40,
    gap: 4,
    padding: 4,
  },
  containerSmall: {
    height: 32,
    gap: 4,
    padding: 2,
  },
  tab: {
    flex: 1,
    minWidth: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  tabLarge: {
    height: 32,
    gap: 6,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  tabSmall: {
    height: 28,
    gap: 6,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  tabActive: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.05)",
  },
  label: {
    color: Colors.textTertiary,
    fontWeight: "500",
    textAlign: "center",
    flexShrink: 1,
  },
  labelLarge: {
    fontSize: 12,
    lineHeight: 14,
  },
  labelSmall: {
    fontSize: 10,
    lineHeight: 14,
  },
  labelActive: {
    color: Colors.textPrimary,
    fontWeight: "600",
  },
  imageLarge: {
    width: 20,
    height: 20,
    borderRadius: 6,
  },
  imageSmall: {
    width: 16,
    height: 16,
    borderRadius: 5,
  },
  badgeLarge: {
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "rgba(255,255,255,0.10)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
  },
  badgeSmall: {
    minWidth: 16,
    height: 16,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.10)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
  },
  badgeText: {
    color: Colors.textSecondary,
    fontSize: 10,
    fontWeight: "700",
  },
  badgeTextDark: {
    color: Colors.bg,
    fontSize: 10,
    fontWeight: "800",
  },
});
