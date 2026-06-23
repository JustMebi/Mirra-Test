import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Text } from "@/components/ui/Text";
import { LinearGradient } from "expo-linear-gradient";
import { AppIcon } from "@/components/ui/AppIcon";
import { FrostedGlassPressable } from "@/components/ui/FrostedGlassPressable";
import { Colors, Gradients } from "@/constants/colors";

export function ElinkActions() {
  return (
    <View style={styles.row}>
      <FrostedGlassPressable
        style={[styles.labelBtn, styles.trainBtn]}
        contentStyle={styles.buttonContent}
        borderRadius={10}
        frostLevel="regular"
        variant="borderBlur"
        activeOpacity={0.7}
      >
        <AppIcon name="sparkles" size={15} color={Colors.textPrimary} />
        <Text style={styles.btnText} numberOfLines={1}>Train AI Chat</Text>
      </FrostedGlassPressable>

      <TouchableOpacity
        style={[
          styles.labelBtn,
          styles.buttonContent,
          styles.standardButton,
          styles.editBtn,
        ]}
        activeOpacity={0.7}
      >
        <AppIcon
          name="edit"
          size={18}
          color={Colors.textPrimary}
          strokeWidth={1.5}
        />
        <Text style={styles.btnText} numberOfLines={1}>Edit</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
        <AppIcon
          name="sliders"
          size={18}
          color={Colors.textPrimary}
          strokeWidth={1.5}
        />
      </TouchableOpacity>

      <View>
        <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
          <AppIcon
            name="bell"
            size={18}
            color="rgba(255,255,255,0.8)"
            strokeWidth={1.5}
          />
        </TouchableOpacity>
        <LinearGradient
          colors={Gradients.accent}
          style={styles.badge}
          pointerEvents="none"
        >
          <Text style={styles.badgeText}>2</Text>
        </LinearGradient>
      </View>

      <TouchableOpacity
        style={[styles.iconBtn, styles.iconBtnRound]}
        activeOpacity={0.7}
      >
        <AppIcon
          name="three-lines-vertical"
          size={18}
          color={Colors.textPrimary}
          strokeWidth={1.6}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  labelBtn: {
    height: 44,
    borderRadius: 10,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    paddingHorizontal: 14,
  },
  trainBtn: {
    flex: 1.45,
  },
  editBtn: {
    flex: 0.75,
    paddingHorizontal: 10,
  },
  standardButton: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderTopWidth: 0.5,
    borderTopColor: "rgba(255,255,255,0.10)",
    borderLeftWidth: 0.5,
    borderLeftColor: "rgba(255,255,255,0.05)",
    borderRightWidth: 0.5,
    borderRightColor: "rgba(255,255,255,0.05)",
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(255,255,255,0.05)",
  },
  btnText: {
    color: "rgba(255,255,255,0.80)",
    fontSize: 14,
    fontWeight: "400",
    letterSpacing: -0.25,
  },
  iconBtn: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 10,
    borderTopWidth: 0.5,
    borderTopColor: "rgba(255,255,255,0.10)",
    borderLeftWidth: 0.5,
    borderLeftColor: "rgba(255,255,255,0.05)",
    borderRightWidth: 0.5,
    borderRightColor: "rgba(255,255,255,0.05)",
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(255,255,255,0.05)",
  },
  iconBtnRound: {
    borderRadius: 16,
  },
  badge: {
    position: "absolute",
    left: 24,
    top: -3,
    width: 20,
    height: 20,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  badgeText: {
    color: "rgba(0,0,0,0.6)",
    fontSize: 10,
    fontWeight: "600",
    textAlign: "center",
    lineHeight: 12,
  },
});
