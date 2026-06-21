import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "@/components/ui/Text";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppIcon } from "@/components/ui/AppIcon";
import { SearchButton } from "@/components/ui/SearchButton";
import { FrostedGlassPressable } from "@/components/ui/FrostedGlassPressable";
import { Colors } from "@/constants/colors";

export function ContactsNavBar() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 6 }]}>
      <Text style={styles.title}>Contacts</Text>
      <View style={styles.actions}>
        <SearchButton />

        {/* Plus — glass pill */}
        <FrostedGlassPressable
          style={styles.iconBtn}
          contentStyle={styles.iconBtnContent}
          borderRadius={16}
          intensity={28}
          tint="systemUltraThinMaterialDark"
        >
          <AppIcon
            name="plus"
            size={18}
            color={Colors.textSecondary}
            strokeWidth={1.6}
          />
        </FrostedGlassPressable>
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
    fontSize: 24,
    fontWeight: "500",
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
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  iconBtnContent: {
    alignItems: "center",
    justifyContent: "center",
  },
});
