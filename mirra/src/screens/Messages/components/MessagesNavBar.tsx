import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Text } from "@/components/ui/Text";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppIcon, AppIconName } from "@/components/ui/AppIcon";
import { SegmentedTabs } from "@/components/ui/SegmentedTabs";
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
  value: FilterTab;
  label: string;
  icon?: AppIconName;
  badge?: number;
}> = [
  { value: "all", label: "All", badge: 2 },
  { value: "direct", label: "Direct", icon: "send-outline", badge: 2 },
  { value: "dp", label: "Digital Persona", icon: "sparkles-outline" },
];

const PRIMARY_TABS: Array<{ value: PrimaryTab; label: string }> = [
  { value: "primary", label: "Primary" },
  { value: "requests", label: "Requests" },
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
            <AppIcon
              name="search"
              size={18}
              color={Colors.textPrimary}
              strokeWidth={1.6}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton} activeOpacity={0.7}>
            <AppIcon
              name="compose"
              size={18}
              color={Colors.textPrimary}
              strokeWidth={1.45}
            />
          </TouchableOpacity>
        </View>
      </View>

      <SegmentedTabs
        value={activeTab}
        tabs={PRIMARY_TABS}
        onChange={onTabChange}
        size="large"
        style={styles.segmented}
      />

      <View style={styles.filterRow}>
        <SegmentedTabs
          value={activeFilter}
          tabs={FILTERS}
          onChange={(next) => onFilterChange?.(next)}
          size="small"
          style={styles.filterTabs}
        />
        <TouchableOpacity style={styles.slidersBtn} activeOpacity={0.7}>
          <AppIcon
            name="sliders"
            size={16}
            color={Colors.textSecondary}
            strokeWidth={1.5}
          />
        </TouchableOpacity>
      </View>
    </View>
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
    fontSize: 20,
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
    borderRadius: 12,
  },
  filterRow: {
    height: 32,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  filterTabs: {
    flex: 1,
    borderRadius: 10,
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
