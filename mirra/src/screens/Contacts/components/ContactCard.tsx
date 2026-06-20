import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ImageSourcePropType,
} from "react-native";
import { AppIcon } from "@/components/ui/AppIcon";
import { Colors } from "@/constants/colors";
import type { Interest, ProSkill, User } from "@/data/mock";

interface ContactCardProps {
  user: User;
  onDM?: () => void;
  onChatDP?: () => void;
  onVisitProfile?: () => void;
}

type ChipItem = Pick<Interest | ProSkill, "id" | "image">;

const CHIP_ROTATIONS = ["15deg", "-14deg", "15deg", "-14deg"];

export function ContactCard({
  user,
  onDM,
  onChatDP,
  onVisitProfile,
}: ContactCardProps) {
  const heroMedia = user.heroMedia;
  const imageSource =
    heroMedia?.type === "image" ? heroMedia.source : user.heroImage;

  return (
    <View style={styles.card}>
      <View style={styles.contactArea}>
        <Image source={imageSource} style={styles.photo} resizeMode="cover" />

        <View style={styles.content}>
          <View style={styles.nameRow}>
            <View style={styles.nameInner}>
              <Text style={styles.name} numberOfLines={1}>
                {user.name}
              </Text>
              {user.verified && <AppIcon name="verified" size={13} />}
            </View>
            <TouchableOpacity hitSlop={10} activeOpacity={0.7}>
              <AppIcon
                name="more-vertical"
                size={15}
                color={Colors.textTertiary}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.role} numberOfLines={2}>
            {user.role}
          </Text>

          <View style={styles.actionsRow}>
            <TouchableOpacity
              style={[styles.actionBtn, styles.dmBtn]}
              onPress={onDM}
              activeOpacity={0.72}
            >
              <AppIcon name="send" size={13} color={Colors.textPrimary} />
              <Text style={styles.actionText} numberOfLines={1}>
                DM
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionBtn, styles.dpBtn]}
              onPress={onChatDP}
              activeOpacity={0.72}
            >
              <AppIcon
                name="chat-dp"
                size={14}
                color={Colors.textPrimary}
                strokeWidth={1.35}
              />
              <Text style={styles.actionText} numberOfLines={1}>
                Chat with DP
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.personIconBtn} activeOpacity={0.7}>
              <AppIcon name="person-check" size={20} color={Colors.textPrimary} strokeWidth={1.35} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.actionBtn, styles.visitBtn]}
            onPress={onVisitProfile}
            activeOpacity={0.72}
          >
            <Text style={styles.visitText}>Visit Profile</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.lowerArea}>
        <View style={styles.lowerContent}>
          <View style={styles.commonSlot}>
            {user.thingsInCommon != null && user.thingsInCommon > 0 && (
              <View style={styles.commonBadge}>
                <View style={styles.commonDot} />
                <Text style={styles.commonText}>Things in Common</Text>
                <View style={styles.commonCountPill}>
                  <Text style={styles.commonCount}>{user.thingsInCommon}</Text>
                </View>
              </View>
            )}
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.metaScroll}
            contentContainerStyle={styles.metaRail}
          >
            <MetaSection label="Location" style={styles.locationSection}>
              <View style={styles.locationPill}>
                <View style={styles.locationCornerDot} />
                <AppIcon
                  name="map-pin"
                  size={11}
                  color="rgba(255,255,255,0.60)"
                  strokeWidth={1.4}
                />
                <Text style={styles.locationText} numberOfLines={1}>
                  {user.city}
                </Text>
              </View>
            </MetaSection>

            <MetaSection label="Interests" style={styles.emojiSection}>
              <TiltedEmojiRow items={user.interests} maxVisible={3} />
            </MetaSection>

            <MetaSection label="Pro Skills" style={styles.emojiSection}>
              <TiltedEmojiRow items={user.proSkills} maxVisible={3} />
            </MetaSection>

            <MetaSection label="Role" style={styles.roleSection}>
              <View style={styles.roleChip}>
                <AppIcon
                  name="target"
                  size={12}
                  color="rgba(255,255,255,0.60)"
                  strokeWidth={1.4}
                />
                <Text style={styles.roleChipText} numberOfLines={1}>
                  {user.roleType ?? "Member"}
                </Text>
              </View>
            </MetaSection>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

function MetaSection({
  label,
  children,
  style,
}: {
  label: string;
  children: React.ReactNode;
  style?: object;
}) {
  return (
    <View style={[styles.metaSection, style]}>
      <Text style={styles.metaLabel}>{label}</Text>
      <View style={styles.metaContent}>{children}</View>
    </View>
  );
}

function TiltedEmojiRow({
  items,
  maxVisible,
}: {
  items: ChipItem[];
  maxVisible: number;
}) {
  const visible = items.slice(0, maxVisible);
  const overflow = Math.max(0, items.length - maxVisible);

  return (
    <View style={styles.emojiRow}>
      {visible.map((item, index) => (
        <View
          key={item.id}
          style={[
            styles.emojiChip,
            {
              transform: [
                { rotate: CHIP_ROTATIONS[index % CHIP_ROTATIONS.length] },
              ],
            },
            index > 0 && styles.overlapChip,
          ]}
        >
          <Image
            source={item.image as ImageSourcePropType}
            style={styles.emojiImg}
            resizeMode="contain"
          />
        </View>
      ))}
      {overflow > 0 && (
        <View
          style={[
            styles.emojiChip,
            styles.overflowChip,
            visible.length > 0 && styles.overlapChip,
            { transform: [{ rotate: CHIP_ROTATIONS[3] }] },
          ]}
        >
          <Text style={styles.overflowText}>+{overflow}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 265,
    borderRadius: 20,
    overflow: "hidden",
    marginHorizontal: 16,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.055)",
  },
  contactArea: {
    height: 152,
    flexDirection: "row",
    gap: 10,
    paddingRight: 16,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.03)",
    borderTopWidth: 0.5,
    borderTopColor: "rgba(255,255,255,0.08)",
  },
  photo: {
    width: 112,
    height: 152,
    borderRadius: 15,
    backgroundColor: Colors.bgSurface,
  },
  content: {
    flex: 1,
    paddingTop: 14,
    paddingBottom: 12,
    gap: 7,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  nameInner: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  name: {
    flexShrink: 1,
    color: Colors.textPrimary,
    fontSize: 14,
    fontWeight: "700",
  },
  role: {
    color: Colors.textSecondary,
    fontSize: 11,
    lineHeight: 11,
  },
  actionsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 2,
  },
  actionBtn: {
    height: 36,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.05)",
    backgroundColor: "rgba(255,255,255,0.05)",
    paddingHorizontal: 16,
    shadowColor: "#FFFFFF",
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.1,
    shadowRadius: 0,
  },
  dmBtn: {},
  dpBtn: {
    flex: 1,
    paddingHorizontal: 8,
  },
  personIconBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.4,
  },
  actionText: {
    color: Colors.textPrimary,
    fontSize: 11,
    lineHeight: 13,
    fontWeight: "600",
    flexShrink: 1,
  },
  visitBtn: {
    width: "100%",
  },
  visitText: {
    color: Colors.textSecondary,
    fontSize: 12,
    fontWeight: "600",
  },
  lowerArea: {
    height: 113,
    paddingVertical: 12,
    gap: 16,
  },
  lowerContent: {
    height: 89,
    paddingHorizontal: 12,
    gap: 8,
  },
  commonSlot: {
    height: 16,
    justifyContent: "center",
  },
  commonBadge: {
    width: 133,
    height: 16,
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  commonDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#E1FF4F",
    borderWidth: 0.15,
    borderColor: "#E1FF4F",
    shadowColor: "#E1FF4F",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
  },
  commonText: {
    width: 103,
    height: 16,
    color: "rgba(255,255,255,0.80)",
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 15.84,
  },
  commonCount: {
    color: "rgba(255,255,255,0.80)",
    fontSize: 10,
    fontWeight: "600",
    lineHeight: 12,
    textAlign: "center",
  },
  commonCountPill: {
    width: 16,
    height: 16,
    borderRadius: 16,
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.05)",
    backgroundColor: "rgba(255,255,255,0.10)",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 1,
  },
  metaScroll: {
    width: "100%",
    height: 65,
  },
  metaRail: {
    height: 65,
    gap: 8,
  },
  metaSection: {
    height: 56,
    gap: 4,
  },
  locationSection: {
    width: 183,
  },
  emojiSection: {
    flexShrink: 0,
  },
  roleSection: {
    width: 150,
  },
  metaLabel: {
    color: "rgba(255,255,255,0.60)",
    fontSize: 10,
    fontWeight: "400",
    lineHeight: 12,
    letterSpacing: -0.08,
  },
  metaContent: {
    height: 40,
    justifyContent: "center",
  },
  locationPill: {
    width: 183,
    height: 40,
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 2.5,
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  locationCornerDot: {
    position: "absolute",
    top: 5,
    left: 7,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#E1FF4F",
    borderWidth: 0.15,
    borderColor: "#E1FF4F",
    shadowColor: "#E1FF4F",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
  },
  locationText: {
    color: "rgba(255,255,255,0.60)",
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 15.84,
    maxWidth: 130,
  },
  emojiRow: {
    height: 49,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 5,
  },
  emojiChip: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
    paddingVertical: 2.5,
    backgroundColor: "rgba(255,255,255,0.065)",
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.05)",
  },
  overlapChip: {
    marginLeft: -6,
  },
  emojiImg: {
    width: 24,
    height: 24,
  },
  overflowChip: {
    backgroundColor: "rgba(255,255,255,0.075)",
  },
  overflowText: {
    color: Colors.textSecondary,
    fontSize: 11,
    fontWeight: "800",
  },
  roleChip: {
    width: 150,
    height: 40,
    flexDirection: "row",
    gap: 6,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "flex-start",
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.055)",
  },
  roleChipText: {
    flex: 1,
    color: "rgba(255,255,255,0.60)",
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 15.84,
  },
});
