import React from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Text } from '@/components/ui/Text';
import { AppIcon } from "@/components/ui/AppIcon";
import { PulsingDot } from "@/components/ui/PulsingDot";
import { Colors } from "@/constants/colors";
import { MediaAssets } from "@/constants/assets";
import type { Thread } from "@/data/mock";

interface ThreadRowProps {
  thread: Thread;
  onPress: () => void;
  onDPPress?: () => void;
}

export function ThreadRow({ thread, onPress, onDPPress }: ThreadRowProps) {
  const groupSender = thread.lastMessageIsOwn
    ? "You"
    : thread.lastMessageSenderName;
  const previewPrefix = thread.isGroup && groupSender ? `${groupSender}: ` : "";

  return (
    <TouchableOpacity style={styles.row} onPress={onPress} activeOpacity={0.78}>
      <View style={styles.avatarWrap}>
        {thread.isGroup ? (
          <GroupAvatar
            sources={thread.groupAvatars ?? []}
            fallback={thread.avatar}
          />
        ) : (
          <Image
            source={thread.avatar}
            style={styles.avatar}
            resizeMode="cover"
          />
        )}

        {!thread.isGroup && (
          thread.isOnline
            ? <PulsingDot size={8} style={{ position: 'absolute', right: 4, bottom: 8 }} />
            : <OfflineIndicator />
        )}
      </View>

      <View style={styles.content}>
        <View style={styles.nameRow}>
          <View style={styles.nameIdentity}>
            {thread.isGroup && (
              <AppIcon name="users" size={14} color={Colors.textPrimary} />
            )}
            <Text style={styles.name} numberOfLines={1}>
              {thread.name}
            </Text>
            {!thread.isGroup && thread.verified && (
              <AppIcon name="verified" size={13} />
            )}
          </View>
          <Text style={styles.time}>{thread.time}</Text>
        </View>

        {thread.isGroup ? (
          <View style={styles.groupPreviewRow}>
            <Text
              style={[styles.preview, styles.groupPreview]}
              numberOfLines={1}
            >
              {previewPrefix}
              {thread.lastMessage}
            </Text>
            {thread.lastMessageIsOwn && <DeliveredTicks />}
          </View>
        ) : (
          <Text style={styles.preview} numberOfLines={2}>
            {thread.lastMessage}
          </Text>
        )}

        {!thread.isGroup && (
          <View style={styles.directGrid}>
            <View style={styles.topPillsRow}>
              <View style={styles.chatPill}>
                <Text style={styles.chatText}>Chat</Text>
                {thread.unread > 0 && (
                  <View style={styles.smallBadge}>
                    <Text style={styles.smallBadgeText}>{thread.unread}</Text>
                  </View>
                )}
              </View>

              <TouchableOpacity
                style={styles.dpPill}
                onPress={onDPPress}
                activeOpacity={0.75}
              >
                <AppIcon
                  name="sparkles"
                  size={11}
                  color={Colors.textSecondary}
                />
                <Text style={styles.dpText} numberOfLines={1}>
                  {thread.dpLabel}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.locationRow}>
              <View style={styles.locationPill}>
                <AppIcon
                  name="navigation"
                  size={10}
                  color={Colors.textSecondary}
                />
                <Text style={styles.locationText} numberOfLines={1}>
                  {thread.city}
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

function OfflineIndicator() {
  return (
    <View style={offlineStyles.outer}>
      <View style={offlineStyles.middle} />
      <View style={offlineStyles.inner} />
    </View>
  );
}

const offlineStyles = StyleSheet.create({
  outer: {
    position: 'absolute',
    top: 108,
    left: 70,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(255,255,255,0.10)',
  },
  middle: {
    position: 'absolute',
    top: 1,
    left: 1,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(77,77,77,1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.50)',
  },
  inner: {
    position: 'absolute',
    top: 2,
    left: 2,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.20)',
  },
});

function DeliveredTicks() {
  return (
    <View style={styles.deliveredTicks}>
      <AppIcon
        name="double-check"
        size={16}
        color={Colors.textTertiary}
        strokeWidth={1.7}
      />
    </View>
  );
}

function GroupAvatar({ sources, fallback }: { sources: any[]; fallback: any }) {
  const shown = sources.slice(0, 3);

  if (!shown.length) {
    return (
      <View style={styles.avatar}>
        <Image
          source={fallback ?? MediaAssets.images.mirraLogoBigger}
          style={styles.mirraIcon}
          resizeMode="contain"
        />
      </View>
    );
  }

  return (
    <View style={styles.groupAvatarWrap}>
      {shown.map((source, index) => (
        <Image
          key={index}
          source={source}
          resizeMode="cover"
          style={[
            styles.groupAvatarImg,
            {
              left: index === 0 ? 0 : index * 18,
              top: index === 0 ? 0 : index * 15,
              zIndex: shown.length - index,
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    minHeight: 136,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 9,
  },
  avatarWrap: {
    position: "relative",
    width: 82,
    height: 118,
  },
  avatar: {
    width: 82,
    height: 118,
    borderRadius: 18,
    backgroundColor: Colors.bgSurface,
    alignItems: "center",
    justifyContent: "center",
  },
  groupAvatarWrap: {
    width: 82,
    height: 118,
    position: "relative",
  },
  groupAvatarImg: {
    width: 56,
    height: 76,
    borderRadius: 14,
    position: "absolute",
    borderWidth: 1.5,
    borderColor: Colors.bg,
    backgroundColor: Colors.bgSurface,
  },
  mirraIcon: {
    width: 32,
    height: 32,
  },
  content: {
    flex: 1,
    minHeight: 118,
    paddingTop: 3,
  },
  nameRow: {
    height: 22,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  nameIdentity: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  name: {
    color: Colors.textPrimary,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "700",
    flexShrink: 1,
  },
  time: {
    color: Colors.textTertiary,
    fontSize: 12,
    lineHeight: 15,
  },
  preview: {
    marginTop: 3,
    minHeight: 36,
    color: Colors.textSecondary,
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0,
  },
  groupPreviewRow: {
    marginTop: 3,
    minHeight: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  groupPreview: {
    marginTop: 0,
    minHeight: 18,
    flex: 1,
  },
  deliveredTicks: {
    width: 16,
    height: 14,
  },
  directGrid: {
    marginTop: 7,
    gap: 7,
  },
  topPillsRow: {
    width: "100%",
    height: 30,
    flexDirection: "row",
    gap: 7,
  },
  chatPill: {
    flex: 1,
    minWidth: 0,
    height: 30,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: "rgba(255,255,255,0.055)",
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.08)",
  },
  chatText: {
    color: Colors.textPrimary,
    fontSize: 11,
    lineHeight: 14,
    fontWeight: "700",
  },
  smallBadge: {
    minWidth: 17,
    height: 17,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
    backgroundColor: Colors.accentAlt,
  },
  smallBadgeText: {
    color: Colors.bg,
    fontSize: 9,
    lineHeight: 11,
    fontWeight: "800",
  },
  dpPill: {
    flex: 1,
    minWidth: 0,
    height: 30,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingHorizontal: 10,
    backgroundColor: "rgba(255,255,255,0.035)",
  },
  dpText: {
    color: Colors.textSecondary,
    fontSize: 10,
    lineHeight: 13,
    fontWeight: "600",
    flexShrink: 1,
  },
  locationRow: {
    width: "100%",
    minHeight: 28,
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  locationPill: {
    flexShrink: 1,
    maxWidth: 164,
    height: 28,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.055)",
  },
  locationText: {
    color: Colors.textSecondary,
    fontSize: 11,
    lineHeight: 14,
    fontWeight: "600",
    flexShrink: 1,
  },
});
