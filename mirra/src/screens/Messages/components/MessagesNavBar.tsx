import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/colors";

type PrimaryTab = "primary" | "requests";
type FilterTab = "all" | "direct" | "dp";

interface MessagesNavBarProps {
  activeTab: PrimaryTab;
  onTabChange: (tab: PrimaryTab) => void;
  activeFilter?: FilterTab;
  onFilterChange?: (filter: FilterTab) => void;
}

const FILTERS: Array<{
  key: FilterTab;
  label: string;
  icon?: "send" | "sparkles";
  badge?: number;
}> = [
  { key: "all", label: "All", badge: 2 },
  { key: "direct", label: "Direct", icon: "send", badge: 2 },
  { key: "dp", label: "Digital Persona", icon: "sparkles" },
];

export function MessagesNavBar({
  activeTab,
  onTabChange,
  activeFilter = "all",
  onFilterChange,
}: MessagesNavBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      <View style={styles.titleRow}>
        <Text style={styles.title}>Messages</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton} activeOpacity={0.7}>
            <Feather name="search" size={18} color={Colors.textPrimary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton} activeOpacity={0.7}>
            <Feather name="edit-3" size={18} color={Colors.textPrimary} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.segmented}>
        <PrimaryButton
          label="Primary"
          active={activeTab === "primary"}
          onPress={() => onTabChange("primary")}
        />
        <PrimaryButton
          label="Requests"
          active={activeTab === "requests"}
          onPress={() => onTabChange("requests")}
        />
      </View>

      <View style={styles.filterRow}>
        <View style={styles.filterTabs}>
          {FILTERS.map((filter) => (
            <FilterChip
              key={filter.key}
              active={activeFilter === filter.key}
              label={filter.label}
              icon={filter.icon}
              badge={filter.badge}
              onPress={() => onFilterChange?.(filter.key)}
            />
          ))}
        </View>
        <TouchableOpacity style={styles.slidersBtn} activeOpacity={0.7}>
          <Feather name="sliders" size={16} color={Colors.textSecondary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

function PrimaryButton({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={[styles.segment, active && styles.segmentActive]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.segmentText, active && styles.segmentTextActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

function FilterChip({
  active,
  label,
  icon,
  badge,
  onPress,
}: {
  active: boolean;
  label: string;
  icon?: "send" | "sparkles";
  badge?: number;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={[styles.filterChip, active && styles.filterChipActive]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {icon === "send" && (
        <Feather
          name="send"
          size={12}
          color={active ? Colors.textPrimary : Colors.textSecondary}
        />
      )}
      {icon === "sparkles" && (
        <Ionicons
          name="sparkles-outline"
          size={12}
          color={active ? Colors.textPrimary : Colors.textSecondary}
        />
      )}
      <Text
        style={[styles.filterText, active && styles.filterTextActive]}
        numberOfLines={1}
      >
        {label}
      </Text>
      {badge != null && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badge}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    backgroundColor: Colors.bg,
    gap: 10,
  },
  titleRow: {
    height: 44,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    color: Colors.textPrimary,
    fontSize: 24,
    lineHeight: 29,
    fontWeight: "700",
  },
  headerActions: {
    flexDirection: "row",
    gap: 8,
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.08)",
  },
  segmented: {
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    padding: 4,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.08)",
  },
  segment: {
    flex: 1,
    height: 32,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 18,
  },
  segmentActive: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.05)",
  },
  segmentText: {
    color: Colors.textTertiary,
    fontSize: 12,
    lineHeight: 12,
    fontWeight: "500",
    textAlign: "center",
  },
  segmentTextActive: {
    color: Colors.textPrimary,
  },
  filterRow: {
    height: 32,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  filterTabs: {
    flex: 1,
    height: 32,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    padding: 2,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.08)",
  },
  filterChip: {
    flex: 1,
    minWidth: 0,
    height: 28,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  filterChipActive: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.05)",
  },
  filterText: {
    color: "rgba(255,255,255,0.50)",
    fontSize: 10,
    lineHeight: 14,
    fontWeight: "500",
    textAlign: "center",
    flexShrink: 1,
  },
  filterTextActive: {
    color: Colors.textPrimary,
  },
  badge: {
    minWidth: 16,
    height: 16,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
    backgroundColor: Colors.accentAlt,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.10)",
    shadowColor: Colors.accentAlt,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 4,
  },
  badgeText: {
    color: Colors.bg,
    fontSize: 9,
    lineHeight: 12,
    fontWeight: "800",
  },
  slidersBtn: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.08)",
  },
});
