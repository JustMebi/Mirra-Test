import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Text } from '@/components/ui/Text';
import { LinearGradient } from "expo-linear-gradient";
import { AppIcon, AppIconName } from "@/components/ui/AppIcon";
import { FrostedGlassView } from "@/components/ui/FrostedGlassView";
import { Colors, Gradients, GradientDir } from "@/constants/colors";

export type ContactTab = "saved" | "mirra";

interface ContactTabBarProps {
  active: ContactTab;
  savedCount?: number;
  mirraCount?: number;
  onChange: (tab: ContactTab) => void;
}

export function ContactTabBar({
  active,
  savedCount = 2,
  mirraCount = 7,
  onChange,
}: ContactTabBarProps) {
  return (
    <FrostedGlassView
      style={styles.segmented}
      borderRadius={14}
      animatedEdges={false}
    >
      <Segment
        icon="users-outline"
        label="Saved Contacts"
        count={savedCount}
        isActive={active === "saved"}
        accentBadge={false}
        onPress={() => onChange("saved")}
      />
      <Segment
        icon="user-plus"
        label="MIRRA Connections"
        count={mirraCount}
        isActive={active === "mirra"}
        accentBadge
        onPress={() => onChange("mirra")}
      />
    </FrostedGlassView>
  );
}

function Segment({
  icon,
  label,
  count,
  isActive,
  accentBadge,
  onPress,
}: {
  icon: AppIconName;
  label: string;
  count: number;
  isActive: boolean;
  accentBadge: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={[styles.segment, isActive && styles.segmentActive]}
      onPress={onPress}
      activeOpacity={0.75}
    >
      <AppIcon
        name={icon}
        size={16}
        color={isActive ? Colors.textPrimary : Colors.textSecondary}
        strokeWidth={1.4}
        opacity={isActive ? 1 : 0.72}
      />
      <Text style={[styles.label, isActive && styles.labelActive]} numberOfLines={1}>
        {label}
      </Text>
      {accentBadge ? (
        <LinearGradient
          colors={Gradients.accent}
          {...GradientDir.vertical}
          style={styles.badge}
        >
          <Text style={styles.badgeTextDark}>{count}</Text>
        </LinearGradient>
      ) : (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{count}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  segmented: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginBottom: 10,
    borderRadius: 14,
    padding: 3,
    gap: 3,
  },
  segment: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 11,
  },
  segmentActive: {
    backgroundColor: "rgba(255,255,255,0.10)",
  },
  label: {
    color: Colors.textTertiary,
    fontSize: 12,
    fontWeight: "500",
    flexShrink: 1,
  },
  labelActive: {
    color: Colors.textPrimary,
    fontWeight: "600",
  },
  badge: {
    minWidth: 18,
    height: 18,
    borderRadius: 9,
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
    fontWeight: "700",
  },
});
