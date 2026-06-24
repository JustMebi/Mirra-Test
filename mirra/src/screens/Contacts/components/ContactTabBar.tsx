import React from "react";
import { StyleSheet } from "react-native";
import { SegmentedTabs, SegmentedTabItem } from "@/components/ui/SegmentedTabs";

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
  const tabs: Array<SegmentedTabItem<ContactTab>> = [
    {
      value: "saved",
      label: "Saved Contacts",
      icon: "users-outline",
      badge: savedCount,
    },
    {
      value: "mirra",
      label: "MIRRA Connections",
      icon: "user-plus",
      badge: mirraCount,
      badgeTone: "accent",
    },
  ];

  return (
    <SegmentedTabs
      value={active}
      tabs={tabs}
      onChange={onChange}
      size="large"
      style={styles.segmented}
      borderRadius={14}
      blurVariant="rimOnly"
    />
  );
}

const styles = StyleSheet.create({
  segmented: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginBottom: 10,
    borderRadius: 14,
  },
});
