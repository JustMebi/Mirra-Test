import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { Text } from "@/components/ui/Text";
import { FrostedGlassPressable } from "@/components/ui/FrostedGlassPressable";
import { Colors } from "@/constants/colors";
import { mockUsers } from "@/data/mock";

interface ConnectionRequestBannerProps {
  count?: number;
  onPress?: () => void;
}

export function ConnectionRequestBanner({
  count = 2,
  onPress,
}: ConnectionRequestBannerProps) {
  const faceAvatars = [mockUsers[1].avatar, mockUsers[2].avatar];

  return (
    <FrostedGlassPressable
      style={styles.banner}
      contentStyle={styles.bannerContent}
      borderRadius={16}
      variant="borderless"
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.textBlock}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>Connection Requests</Text>
          <View style={styles.greenDot} />
        </View>
        <Text style={styles.subtitle}>
          You have {count} new connection requests
        </Text>
      </View>

      <View style={styles.facePile}>
        {faceAvatars.map((source, i) => (
          <View
            key={i}
            style={[
              styles.faceWrap,
              { right: i * 16, zIndex: faceAvatars.length - i },
            ]}
          >
            <Image source={source} style={styles.face} />
          </View>
        ))}
      </View>
    </FrostedGlassPressable>
  );
}

const styles = StyleSheet.create({
  banner: {
    marginHorizontal: 16,
    marginBottom: 12,
    height: 56,
  },
  bannerContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  textBlock: { flex: 1, gap: 3 },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  title: {
    color: Colors.textPrimary,
    fontSize: 13,
    fontWeight: "700",
  },
  greenDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.accent,
    shadowColor: Colors.accent,
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.85,
    shadowRadius: 8,
  },
  subtitle: {
    color: Colors.textSecondary,
    fontSize: 11,
  },
  facePile: {
    width: 52,
    height: 32,
    position: "relative",
  },
  faceWrap: {
    position: "absolute",
    top: 0,
  },
  face: {
    width: 32,
    height: 32,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: Colors.bgCard,
  },
});
