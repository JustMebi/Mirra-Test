import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppIcon } from "@/components/ui/AppIcon";
import { SearchButton } from "@/components/ui/SearchButton";
import { glass } from "@/styles/glass";
import { Colors } from "@/constants/colors";

export function ContactsNavBar() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 6 }]}>
      <Text style={styles.title}>Contacts</Text>
      <View style={styles.actions}>
        <SearchButton />

        {/* Plus — glass pill */}
        <TouchableOpacity
          style={[glass.pill, styles.iconBtn]}
          activeOpacity={0.7}
        >
          <AppIcon
            name="plus"
            size={18}
            color={Colors.textSecondary}
            strokeWidth={1.6}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: Colors.bg,
  },
  title: {
    color: Colors.textPrimary,
    fontSize: 28,
    fontWeight: "700",
    letterSpacing: -0.5,
  },
  actions: {
    flexDirection: "row",
    gap: 8,
  },
  iconBtn: {
    width: 44,
    height: 44,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});
