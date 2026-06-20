import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Modal,
} from "react-native";
import { AppIcon } from "@/components/ui/AppIcon";
import { Colors } from "@/constants/colors";
import type { ChatMessage } from "@/data/mock";

interface Reaction {
  emoji: string;
  count: number;
  mine: boolean;
}

interface ChatBubbleProps {
  message: ChatMessage;
  showAvatar?: boolean;
  showSenderName?: boolean;
  reactions?: Reaction[];
  onReaction: (messageId: string, emoji: string) => void;
  onMentionPress: (mentionName: string, messageId: string) => void;
}

const REACTION_EMOJIS = [
  "\u2764\uFE0F",
  "\u{1F602}",
  "\u{1F62E}",
  "\u{1F622}",
  "\u{1F44D}",
  "\u{1F525}",
];

export function ChatBubble({
  message,
  showAvatar = true,
  showSenderName = false,
  reactions = [],
  onReaction,
  onMentionPress,
}: ChatBubbleProps) {
  const [pickerVisible, setPickerVisible] = useState(false);

  return (
    <View style={[styles.card, message.isOwn && styles.cardOwn]}>
      {!message.isOwn && (
        <View style={styles.avatarSide}>
          {showAvatar && (
            <Image
              source={message.senderAvatar}
              style={styles.avatar}
              resizeMode="cover"
            />
          )}
        </View>
      )}

      <View
        style={[styles.messageSide, message.isOwn && styles.messageSideOwn]}
      >
        {showSenderName && !message.isOwn && (
          <View style={styles.nameRow}>
            <Text style={styles.senderName} numberOfLines={1}>
              {message.senderName}
            </Text>
          </View>
        )}

        <TouchableWithoutFeedback onLongPress={() => setPickerVisible(true)}>
          <View
            style={[styles.bubbleWrap, message.isOwn && styles.bubbleWrapOwn]}
          >
            {!message.isOwn && <View style={styles.tail} />}
            {message.isOwn && <View style={styles.tailOwn} />}

            <View style={[styles.bubble, message.isOwn && styles.bubbleOwn]}>
              <ParsedText
                text={message.text}
                onMentionPress={(name) => onMentionPress(name, message.id)}
              />

              <View style={styles.metaRow}>
                <Text style={styles.time}>{message.time}</Text>
                {message.isOwn && <DeliveredTicks />}
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>

        {reactions.length > 0 && (
          <View
            style={[
              styles.reactionsRow,
              message.isOwn && styles.reactionsRowOwn,
            ]}
          >
            {reactions.map((reaction) => (
              <TouchableOpacity
                key={reaction.emoji}
                style={styles.reactionChip}
                onPress={() => onReaction(message.id, reaction.emoji)}
                activeOpacity={0.7}
              >
                <Text style={styles.reactionEmoji}>{reaction.emoji}</Text>
                <View
                  style={[
                    styles.reactionCount,
                    reaction.mine && styles.reactionCountMine,
                  ]}
                >
                  <Text style={styles.reactionCountText}>{reaction.count}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <Modal
        visible={pickerVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setPickerVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setPickerVisible(false)}>
          <View style={styles.pickerOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.picker}>
                {REACTION_EMOJIS.map((emoji) => (
                  <TouchableOpacity
                    key={emoji}
                    style={styles.pickerEmoji}
                    onPress={() => {
                      onReaction(message.id, emoji);
                      setPickerVisible(false);
                    }}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.pickerEmojiText}>{emoji}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

function DeliveredTicks() {
  return (
    <View style={styles.deliveredTicks}>
      <AppIcon
        name="double-check"
        size={18}
        color="rgba(255,255,255,0.60)"
        strokeWidth={1.7}
      />
    </View>
  );
}

function ParsedText({
  text,
  onMentionPress,
}: {
  text: string;
  onMentionPress: (name: string) => void;
}) {
  const parts = parseMentions(text);

  return (
    <Text style={styles.bubbleText}>
      {parts.map((part, index) =>
        part.type === "mention" ? (
          <Text
            key={`${part.content}-${index}`}
            style={styles.mention}
            onPress={() => onMentionPress(part.content.slice(1))}
          >
            {part.content}
          </Text>
        ) : (
          <Text key={`text-${index}`}>{part.content}</Text>
        ),
      )}
    </Text>
  );
}

function parseMentions(text: string) {
  const parts: Array<{ type: "text" | "mention"; content: string }> = [];
  const regex = /@[A-Z][a-z]+(?:\s[A-Z][a-z]+)?/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: "text", content: text.slice(lastIndex, match.index) });
    }
    parts.push({ type: "mention", content: match[0] });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push({ type: "text", content: text.slice(lastIndex) });
  }

  return parts;
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    maxWidth: 388,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    paddingHorizontal: 16,
  },
  cardOwn: {
    justifyContent: "flex-end",
  },
  avatarSide: {
    width: 46,
    minHeight: 126,
  },
  avatar: {
    width: 46,
    height: 68,
    borderRadius: 14,
    backgroundColor: Colors.bgSurface,
  },
  messageSide: {
    flex: 1,
    maxWidth: 302,
    // gap: 2,
  },
  messageSideOwn: {
    alignItems: "flex-end",
  },
  nameRow: {
    width: "100%",
    height: 20,
    paddingTop: 4,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 4,
  },
  senderName: {
    color: "rgba(255,255,255,0.60)",
    fontSize: 14,
    lineHeight: 16,
    fontWeight: "600",
    letterSpacing: -0.24,
  },
  bubbleWrap: {
    width: "100%",
    position: "relative",
  },
  bubbleWrapOwn: {
    maxWidth: 302,
  },
  bubble: {
    minHeight: 84,
    paddingTop: 12,
    paddingRight: 16,
    paddingBottom: 12,
    paddingLeft: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.03)",
    backgroundColor: "rgba(255,255,255,0.03)",
  },
  bubbleOwn: {
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 20,
  },
  tail: {
    position: "absolute",
    left: -5,
    bottom: 0,
    width: 14,
    height: 16,
    borderBottomRightRadius: 14,
    backgroundColor: "rgba(255,255,255,0.03)",
  },
  tailOwn: {
    position: "absolute",
    right: -5,
    bottom: 0,
    width: 14,
    height: 16,
    borderBottomLeftRadius: 14,
    backgroundColor: "rgba(255,255,255,0.03)",
  },
  bubbleText: {
    color: Colors.textPrimary,
    fontSize: 16,
    lineHeight: 20.5,
    fontWeight: "500",
  },
  mention: {
    color: Colors.accentAlt,
    fontWeight: "700",
  },
  metaRow: {
    alignSelf: "flex-end",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  time: {
    color: "rgba(255,255,255,0.60)",
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "400",
  },
  deliveredTicks: {
    width: 18,
    height: 14,
    transform: [{ scaleX: 1.15 }],
  },
  reactionsRow: {
    height: 24,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: -2,
    marginLeft: 12,
    zIndex: 2,
  },
  reactionsRowOwn: {
    alignSelf: "flex-end",
    marginLeft: 0,
    marginRight: 12,
  },
  reactionChip: {
    minWidth: 52,
    height: 24,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingTop: 4,
    paddingRight: 4,
    paddingBottom: 4,
    paddingLeft: 8,
    borderRadius: 16,
    backgroundColor: "#292A2C",
  },
  reactionEmoji: {
    width: 16,
    height: 16,
    fontSize: 13,
    lineHeight: 16,
    textAlign: "center",
  },
  reactionCount: {
    minWidth: 20,
    height: 16,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 1,
    paddingRight: 4,
    paddingBottom: 3,
    paddingLeft: 4,
    borderRadius: 16,
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.05)",
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  reactionCountMine: {
    borderColor: "rgba(225,255,79,0.20)",
  },
  reactionCountText: {
    color: "rgba(255,255,255,0.80)",
    fontSize: 10,
    lineHeight: 12,
    fontWeight: "600",
    textAlign: "center",
  },
  pickerOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    alignItems: "center",
    justifyContent: "center",
  },
  picker: {
    flexDirection: "row",
    gap: 6,
    backgroundColor: "rgba(30,30,40,0.95)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    borderRadius: 30,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  pickerEmoji: {
    padding: 4,
  },
  pickerEmojiText: {
    fontSize: 24,
  },
});
