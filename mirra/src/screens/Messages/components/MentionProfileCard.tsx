import React, { useEffect, useRef } from "react";
import {
  Animated,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageSourcePropType,
} from "react-native";
import { Text } from "@/components/ui/Text";
import { AppIcon } from "@/components/ui/AppIcon";
import { Colors } from "@/constants/colors";
import type { Interest, ProSkill, User } from "@/data/mock";

interface MentionProfileCardProps {
  user: User;
  onClose: () => void;
}

type BubbleRotation = `${number}deg` | `${number}rad`;

function makeBubbleStyle(
  anim: Animated.Value,
  rotation: BubbleRotation = "0deg",
) {
  return {
    opacity: anim,
    transform: [
      { rotate: rotation },
      {
        scale: anim.interpolate({
          inputRange: [0, 0.7, 1],
          outputRange: [0.1, 1.3, 1],
        }),
      },
      {
        translateY: anim.interpolate({
          inputRange: [0, 1],
          outputRange: [3, 0],
        }),
      },
    ],
  };
}

export function MentionProfileCard({ user, onClose }: MentionProfileCardProps) {
  const bubbleS = useRef(new Animated.Value(0)).current;
  const bubbleM = useRef(new Animated.Value(0)).current;
  const bubbleL = useRef(new Animated.Value(0)).current;
  const body = useRef(new Animated.Value(0)).current;
  const content = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    bubbleS.setValue(0);
    bubbleM.setValue(0);
    bubbleL.setValue(0);
    body.setValue(0);
    content.setValue(0);

    Animated.sequence([
      Animated.timing(bubbleS, {
        toValue: 1,
        duration: 45,
        useNativeDriver: true,
      }),
      Animated.timing(bubbleM, {
        toValue: 1,
        duration: 45,
        useNativeDriver: true,
      }),
      Animated.timing(bubbleL, {
        toValue: 1,
        duration: 45,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.spring(body, {
          toValue: 1,
          friction: 5,
          tension: 230,
          useNativeDriver: true,
        }),
        Animated.timing(content, {
          toValue: 1,
          duration: 90,
          delay: 20,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  const bodyStyle = {
    opacity: body,
    transform: [
      {
        scale: body.interpolate({
          inputRange: [0, 0.75, 1],
          outputRange: [0.92, 1.025, 1],
        }),
      },
      {
        translateY: body.interpolate({
          inputRange: [0, 1],
          outputRange: [7, 0],
        }),
      },
    ],
  };
  const contentStyle = {
    opacity: content,
    transform: [
      {
        translateY: content.interpolate({
          inputRange: [0, 1],
          outputRange: [4, 0],
        }),
      },
    ],
  };

  return (
    <View style={styles.wrapper}>
      <Animated.View style={[styles.cardShell, bodyStyle]}>
        <View style={styles.bodyRect}>
          <Animated.View style={[styles.content, contentStyle]}>
            <Image
              source={user.avatar}
              style={styles.avatar}
              resizeMode="cover"
            />

            <View style={styles.infoBlock}>
              <View style={styles.topRow}>
                <View style={styles.nameRole}>
                  <View style={styles.nameRow}>
                    <Text style={styles.name} numberOfLines={1}>
                      {user.name}
                    </Text>
                    {user.verified && <AppIcon name="verified" size={12} />}
                  </View>
                  <View style={styles.rolePill}>
                    <Text style={styles.roleText} numberOfLines={1}>
                      {user.roleType ?? user.role}
                    </Text>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.profileBtn}
                  activeOpacity={0.7}
                  onPress={onClose}
                >
                  <Text style={styles.profileText}>Profile</Text>
                  <AppIcon
                    name="arrow-up-right"
                    size={12}
                    color={Colors.textPrimary}
                    strokeWidth={1.2}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.metaRow}>
                <View style={styles.locationChip}>
                  <AppIcon
                    name="navigation"
                    size={11}
                    color="rgba(255,255,255,0.60)"
                  />
                  <Text style={styles.metaText} numberOfLines={1}>
                    {user.city}
                  </Text>
                </View>

                <View style={styles.emojiGroups}>
                  <MentionEmojiGroup items={user.interests.slice(0, 2)} />
                  <MentionEmojiGroup items={user.proSkills.slice(0, 2)} />
                </View>
              </View>
            </View>
          </Animated.View>
        </View>
      </Animated.View>

      {/* Thought-bubble trail pointing down toward the message */}
      <View style={styles.pointerArea}>
        <Animated.View
          style={[styles.bubbleL, makeBubbleStyle(bubbleL, "25deg")]}
        />
        <Animated.View style={[styles.bubbleM, makeBubbleStyle(bubbleM)]} />
        <Animated.View style={[styles.bubbleS, makeBubbleStyle(bubbleS)]} />
      </View>
    </View>
  );
}

type MentionEmojiItem = Pick<Interest | ProSkill, "id" | "image">;

function MentionEmojiGroup({ items }: { items: MentionEmojiItem[] }) {
  return (
    <View style={styles.emojiRow}>
      {items.map((item, index) => {
        const rotate = index % 2 === 0 ? "15deg" : "-14deg";
        const counterRotate = index % 2 === 0 ? "-15deg" : "14deg";

        return (
          <View
            key={item.id}
            style={[
              styles.emojiSquare,
              index > 0 && styles.emojiOverlap,
              { transform: [{ rotate }] },
            ]}
          >
            <View style={styles.emojiDot} />
            <Image
              source={item.image as ImageSourcePropType}
              style={[styles.emoji, { transform: [{ rotate: counterRotate }] }]}
              resizeMode="contain"
            />
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 0,
    marginBottom: -40,
  },
  pointerArea: {
    alignItems: "center",
    gap: 4,
    paddingTop: 0,
    paddingBottom: 0,
    transform: [{ translateX: -34 }],
  },
  bubbleL: {
    width: 16,
    height: 12,
    borderRadius: 6,
    backgroundColor: "rgba(255,255,255,0.10)",
  },
  bubbleM: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.10)",
  },
  bubbleS: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: "rgba(255,255,255,0.10)",
  },
  cardShell: {
    width: 336,
    alignSelf: "center",
    borderRadius: 12.5,
    backgroundColor: "rgba(255,255,255,0.02)",
    overflow: "visible",
  },
  bodyRect: {
    width: 336,
    height: 110,
    padding: 8,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.10)",
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.07)",
  },
  content: {
    width: "100%",
    height: 82,
    flexDirection: "row",
    gap: 8,
    borderRadius: 12,
  },
  avatar: {
    width: 56,
    height: 82,
    borderRadius: 12,
    backgroundColor: Colors.bgSurface,
  },
  infoBlock: {
    flex: 1,
    height: 72,
    alignSelf: "center",
    gap: 8,
  },
  topRow: {
    height: 36,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 4,
  },
  nameRole: {
    flex: 1,
    height: 36,
    gap: 4,
  },
  nameRow: {
    height: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  name: {
    color: Colors.textPrimary,
    fontSize: 14,
    lineHeight: 16,
    fontWeight: "600",
    letterSpacing: -0.24,
    flexShrink: 1,
  },
  rolePill: {
    maxWidth: 92,
    height: 16,
    alignSelf: "flex-start",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 2,
    paddingRight: 8,
    paddingBottom: 3,
    paddingLeft: 8,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.05)",
    backgroundColor: "rgba(255,255,255,0.10)",
    shadowColor: "#FFFFFF",
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.1,
    shadowRadius: 0,
  },
  roleText: {
    color: "rgba(255,255,255,0.80)",
    fontSize: 10,
    lineHeight: 12,
    fontWeight: "500",
    textAlign: "center",
  },
  profileBtn: {
    width: 79,
    height: 32,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.05)",
    backgroundColor: "rgba(255,255,255,0.05)",
    shadowColor: "#FFFFFF",
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.1,
    shadowRadius: 0,
  },
  profileText: {
    color: "rgba(255,255,255,0.80)",
    fontSize: 12,
    lineHeight: 12,
    fontWeight: "400",
    textAlign: "center",
  },
  metaRow: {
    height: 28,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  locationChip: {
    maxWidth: 102,
    height: 28,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    borderRadius: 9,
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  metaText: {
    color: "rgba(255,255,255,0.60)",
    fontSize: 10,
    lineHeight: 12,
    fontWeight: "500",
    flexShrink: 1,
  },
  emojiGroups: {
    flex: 1,
    height: 28,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingLeft: 2,
  },
  emojiRow: {
    height: 28,
    flexDirection: "row",
    alignItems: "center",
  },
  emojiSquare: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.05)",
  },
  emojiOverlap: {
    marginLeft: -5,
  },
  emoji: {
    width: 17,
    height: 17,
  },
  emojiDot: {
    position: "absolute",
    top: 4,
    left: 4,
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: Colors.accent,
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
});
