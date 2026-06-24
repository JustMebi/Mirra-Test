import React from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { Text } from '@/components/ui/Text';
import { AppIcon } from "@/components/ui/AppIcon";
import { FrostedGlassPressable } from "@/components/ui/FrostedGlassPressable";
import { Colors } from "@/constants/colors";
import { MediaAssets } from "@/constants/assets";

const FILTERS = [
  { image: MediaAssets.emojis.interests.tennis, label: "Tennis" },
  { image: MediaAssets.emojis.interests.golf, label: "Golf" },
  { image: MediaAssets.emojis.interests.travel, label: "Travel" },
  { image: MediaAssets.emojis.interests.sportscar, label: "Sports Cars" },
];

interface ContactInterestTagsProps {
  active?: string;
  onSelect?: (label: string) => void;
}

export function ContactInterestTags({
  active,
  onSelect,
}: ContactInterestTagsProps) {
  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row}
        style={styles.scroll}
      >
        {FILTERS.map(({ image, label }) => {
          const isActive = active === label;
          return (
            <TouchableOpacity
              key={label}
              style={[styles.tag, isActive && styles.tagActive]}
              onPress={() => onSelect?.(label)}
              activeOpacity={0.7}
            >
              <Image
                source={image}
                style={styles.emojiImg}
                resizeMode="contain"
              />
              <Text
                style={[styles.label, isActive && styles.labelActive]}
                numberOfLines={1}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <FrostedGlassPressable
        style={styles.searchTag}
        contentStyle={styles.searchTagContent}
        borderRadius={10}
        frostLevel="regular"
        variant="border"
        blurVariant="blur20Rim"
      >
        <AppIcon
          name="search"
          size={15}
          color="rgba(255,255,255,0.80)"
          strokeWidth={1.4}
        />
      </FrostedGlassPressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: 40,
    marginHorizontal: 16,
    marginBottom: 12,
    position: "relative",
  },
  scroll: {
    height: 32,
    flexGrow: 0,
  },
  row: {
    height: 32,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingRight: 48,
  },
  tag: {
    minWidth: 85,
    height: 32,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
    backgroundColor: "rgba(255,255,255,0.025)",
  },
  tagActive: {
    backgroundColor: "rgba(255,255,255,0.10)",
    borderColor: "rgba(255,255,255,0.16)",
  },
  emojiImg: {
    width: 16,
    height: 16,
  },
  label: {
    color: Colors.textSecondary,
    fontSize: 12,
    fontWeight: "600",
  },
  labelActive: {
    color: Colors.textPrimary,
  },
  searchTag: {
    position: "absolute",
    top: -4,
    right: 0,
    width: 40,
    height: 40,
    borderRadius: 10,
  },
  searchTagContent: {
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});
