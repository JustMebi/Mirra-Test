import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Animated,
  PanResponder,
  Image,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Circle, Path } from "react-native-svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppIcon } from "@/components/ui/AppIcon";
import { Colors } from "@/constants/colors";
import { glass } from "@/styles/glass";
import {
  mockUsers,
  mockCurrentUser,
  mockDPMessages,
  type ChatMessage,
} from "@/data/mock";

// ─── Typing indicator ─────────────────────────────────────────────────────────

function TypingGlyph() {
  const pulse = useRef(new Animated.Value(0)).current;
  const rotate = useRef(new Animated.Value(0)).current;
  const clover = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 1150,
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: 1150,
          useNativeDriver: true,
        }),
      ]),
    );
    const rotateLoop = Animated.loop(
      Animated.timing(rotate, {
        toValue: 1,
        duration: 2600,
        useNativeDriver: true,
      }),
    );
    const cloverLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(clover, {
          toValue: 1,
          duration: 680,
          useNativeDriver: true,
        }),
        Animated.timing(clover, {
          toValue: 0,
          duration: 680,
          useNativeDriver: true,
        }),
      ]),
    );

    pulseLoop.start();
    rotateLoop.start();
    cloverLoop.start();
    return () => {
      pulseLoop.stop();
      rotateLoop.stop();
      cloverLoop.stop();
    };
  }, []);

  const pulseScale = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.9, 1.22],
  });
  const pulseOpacity = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.26, 0.08],
  });
  const spin = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });
  const cloverScale = clover.interpolate({
    inputRange: [0, 1],
    outputRange: [0.82, 1.05],
  });

  return (
    <View style={glyphStyles.row}>
      <Animated.View
        style={[
          glyphStyles.pulseCircle,
          {
            opacity: pulseOpacity,
            transform: [{ scale: pulseScale }],
          },
        ]}
      />
      <Animated.View
        style={[glyphStyles.flower, { transform: [{ rotate: spin }] }]}
      >
        <Svg width={16} height={16} viewBox="0 0 16 16">
          <Path
            d="M8 1.7C8.7 4.4 9.9 5.1 12.5 4.2C11.6 6.8 12.2 8 14.9 8.8C12.2 9.5 11.5 10.7 12.4 13.3C9.9 12.4 8.7 13.1 8 15.8C7.3 13.1 6.1 12.4 3.6 13.3C4.5 10.7 3.8 9.5 1.1 8.8C3.8 8 4.4 6.8 3.5 4.2C6.1 5.1 7.3 4.4 8 1.7Z"
            fill="none"
            stroke="rgba(255,255,255,0.62)"
            strokeWidth={1.1}
            strokeLinejoin="round"
          />
        </Svg>
      </Animated.View>
      <Animated.View
        style={[glyphStyles.clover, { transform: [{ scale: cloverScale }] }]}
      >
        <Svg width={16} height={16} viewBox="0 0 16 16">
          <Circle cx={5.35} cy={5.35} r={2.75} fill="rgba(255,255,255,0.96)" />
          <Circle cx={10.65} cy={5.35} r={2.75} fill="rgba(255,255,255,0.96)" />
          <Circle cx={5.35} cy={10.65} r={2.75} fill="rgba(255,255,255,0.96)" />
          <Circle
            cx={10.65}
            cy={10.65}
            r={2.75}
            fill="rgba(255,255,255,0.96)"
          />
          <Circle cx={8} cy={8} r={1.65} fill="#FFFFFF" />
        </Svg>
      </Animated.View>
    </View>
  );
}

function AnonymousModeIcon() {
  return (
    <Svg width={14} height={14} viewBox="0 0 14 14">
      <Path
        d="M3.15 5.55L4.12 2.6H9.88L10.85 5.55"
        fill="none"
        stroke="rgba(255,255,255,0.82)"
        strokeWidth={1.35}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M2 5.55H12"
        fill="none"
        stroke="rgba(255,255,255,0.82)"
        strokeWidth={1.35}
        strokeLinecap="round"
      />
      <Circle
        cx={4.7}
        cy={8.65}
        r={1.75}
        fill="none"
        stroke="rgba(255,255,255,0.82)"
        strokeWidth={1.25}
      />
      <Circle
        cx={9.3}
        cy={8.65}
        r={1.75}
        fill="none"
        stroke="rgba(255,255,255,0.82)"
        strokeWidth={1.25}
      />
      <Path
        d="M6.45 8.65H7.55"
        fill="none"
        stroke="rgba(255,255,255,0.82)"
        strokeWidth={1.15}
        strokeLinecap="round"
      />
    </Svg>
  );
}

const glyphStyles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  pulseCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "rgba(255,255,255,0.38)",
    shadowColor: "#FFFFFF",
    shadowOpacity: 0.24,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
  },
  flower: {
    width: 16,
    height: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  clover: {
    width: 16,
    height: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});

// ─── Main modal ───────────────────────────────────────────────────────────────

export default function ChatbotModal() {
  const { userId } = useLocalSearchParams<{ userId?: string }>();
  const insets = useSafeAreaInsets();

  const dpUser = mockUsers.find((u) => u.id === userId) ?? mockUsers[1];
  const firstName = dpUser.name.split(" ")[0];

  const [activeTab, setActiveTab] = useState<"chat" | "dp">("dp");
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>(() =>
    mockDPMessages.map((m) => ({
      ...m,
      senderName: m.senderId.startsWith("dp-")
        ? `${firstName}'s DP`
        : m.senderName,
      senderAvatar: m.senderId.startsWith("dp-")
        ? dpUser.avatar
        : m.senderAvatar,
    })),
  );

  const listRef = useRef<FlatList>(null);

  const translateY = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, { dy }) => {
        if (dy > 0) translateY.setValue(dy);
      },
      onPanResponderRelease: (_, { dy, vy }) => {
        if (dy > 120 || vy > 0.8) {
          Animated.timing(translateY, {
            toValue: 800,
            duration: 220,
            useNativeDriver: true,
          }).start(() => router.back());
        } else {
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
            damping: 20,
            stiffness: 200,
          }).start();
        }
      },
    }),
  ).current;

  const handleSend = () => {
    const text = inputText.trim();
    if (!text) return;
    const msg: ChatMessage = {
      id: `u-${Date.now()}`,
      senderId: mockCurrentUser.id,
      senderName: "Me",
      senderAvatar: mockCurrentUser.avatar,
      text,
      time: new Date()
        .toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
        .toLowerCase(),
      isOwn: true,
    };
    setMessages((prev) => [...prev, msg]);
    setInputText("");
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 2200);
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: ChatMessage;
    index: number;
  }) => {
    // Show timestamp only after last message in a same-sender run or isOwn
    const nextMsg = messages[index + 1];
    const showTime =
      !nextMsg || nextMsg.senderId !== item.senderId || item.isOwn;

    if (item.isChoiceBubble) {
      return (
        <View style={msgStyles.choiceWrap}>
          <View style={msgStyles.choicePill}>
            <Text style={msgStyles.choiceText}>{item.text}</Text>
            {showTime && <Text style={msgStyles.choiceTime}>{item.time}</Text>}
          </View>
        </View>
      );
    }

    if (item.isOwn) {
      return (
        <View style={msgStyles.ownWrap}>
          <View style={msgStyles.ownBubble}>
            <Text style={msgStyles.ownText}>{item.text}</Text>
            {showTime && <Text style={msgStyles.ownTime}>{item.time}</Text>}
          </View>
        </View>
      );
    }

    return (
      <View style={msgStyles.dpWrap}>
        <View style={msgStyles.dpBubble}>
          <Text style={msgStyles.dpText}>{item.text}</Text>
          {showTime && <Text style={msgStyles.dpTime}>{item.time}</Text>}
        </View>
      </View>
    );
  };

  const TypingRow = () => (
    <View style={msgStyles.typingWrap}>
      <View style={msgStyles.typingPill}>
        <TypingGlyph />
        <Text style={msgStyles.typingLabel}>Typing...</Text>
      </View>
    </View>
  );

  return (
    <Animated.View style={[styles.root, { paddingTop: insets.top - 5, transform: [{ translateY }] }]}>
      <View style={styles.dragHandle} {...panResponder.panHandlers}>
        <View style={styles.dragHandlePill} />
      </View>

      {/* ── Ghost watermark ─────────────────────────────── */}
      <View style={styles.watermarkWrap} pointerEvents="none">
        <Text style={styles.watermark}>
          Hey, you're chatting with{"\n"}
          {firstName}'s digital persona.
        </Text>
      </View>

      {/* ── Header ──────────────────────────────────────── */}
      <View style={styles.header}>
        <View style={styles.headerCenter}>
          <Image source={dpUser.avatar} style={styles.headerAvatar} />
          <View style={styles.headerLabelPill}>
            <Text style={styles.headerLabel}>
              {firstName}'s Digital Persona
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.closeBtn}
          onPress={() => router.back()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          activeOpacity={0.7}
        >
          <AppIcon
            name="x"
            size={16}
            color={Colors.textSecondary}
            strokeWidth={1.7}
          />
        </TouchableOpacity>
      </View>

      {/* ── Tab pill ────────────────────────────────────── */}
      <View style={styles.tabWrap}>
        <View style={[glass.pill, styles.tabPill]}>
          <TouchableOpacity
            style={[styles.tabBtn, activeTab === "chat" && styles.tabBtnActive]}
            onPress={() => router.back()}
            activeOpacity={0.8}
          >
            <Image source={dpUser.avatar} style={styles.tabAvatar} />
            <Text
              style={[
                styles.tabText,
                activeTab === "chat" && styles.tabTextActive,
              ]}
            >
              Chat with {firstName}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabBtn, activeTab === "dp" && styles.tabBtnActive]}
            onPress={() => setActiveTab("dp")}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "dp" && styles.tabTextActive,
              ]}
            >
              Digital Persona
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ── Messages + input ────────────────────────────── */}
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={0}
      >
        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() =>
            listRef.current?.scrollToEnd({ animated: false })
          }
          ListFooterComponent={isTyping ? <TypingRow /> : null}
        />

        {/* ── Input area ────────────────────────────────── */}
        <LinearGradient
          colors={[
            "rgba(129, 157, 222, 0)",
            "rgba(20,76,212,0.82)",
            "rgba(0,180,210,0.9)",
          ]}
          locations={[0, 0.5, 1]}
          style={[
            styles.inputArea,
            { paddingBottom: insets.bottom > 0 ? 0 : 8 },
          ]}
        >
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Ask me anything"
              placeholderTextColor="rgba(146,184,226,0.88)"
              cursorColor="#1D8BFF"
              selectionColor="rgba(29,139,255,0.35)"
              value={inputText}
              onChangeText={setInputText}
              multiline
              onSubmitEditing={handleSend}
              blurOnSubmit
            />
            <TouchableOpacity style={styles.micBtn} activeOpacity={0.7}>
              <AppIcon
                name="mic"
                size={18}
                color={Colors.textPrimary}
                strokeWidth={1.6}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSend}
              activeOpacity={0.8}
              style={styles.sendBtn}
            >
              <AppIcon
                name="arrow-up"
                size={18}
                color={Colors.textPrimary}
                strokeWidth={1.6}
              />
            </TouchableOpacity>
          </View>

          {/* Anonymous mode bar */}
          <View style={styles.anonBar}>
            <AnonymousModeIcon />
            <Text style={styles.anonText}>Anonymous Mode is on</Text>
            <AppIcon
              name="info"
              size={12}
              color="rgba(255,255,255,0.72)"
              strokeWidth={1.5}
            />
          </View>
        </LinearGradient>
      </KeyboardAvoidingView>
    </Animated.View>
  );
}

// ─── Message styles ───────────────────────────────────────────────────────────

const msgStyles = StyleSheet.create({
  // DP received
  dpWrap: {
    alignItems: "flex-start",
    marginBottom: 10,
    paddingHorizontal: 16,
    maxWidth: "80%",
  },
  dpBubble: {
    backgroundColor: "rgba(255,255,255,0.07)",
    borderRadius: 16,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
    padding: 12,
    gap: 6,
  },
  dpText: {
    color: Colors.textPrimary,
    fontSize: 14,
    lineHeight: 20,
  },
  dpTime: {
    color: Colors.textTertiary,
    fontSize: 10,
    alignSelf: "flex-end",
  },

  // Own message
  ownWrap: {
    alignItems: "flex-end",
    marginBottom: 10,
    paddingHorizontal: 16,
  },
  ownBubble: {
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 16,
    borderBottomRightRadius: 4,
    borderWidth: 1,
    borderColor: Colors.glassBorderStrong,
    paddingHorizontal: 14,
    paddingVertical: 10,
    maxWidth: "78%",
    gap: 4,
  },
  ownText: {
    color: Colors.textPrimary,
    fontSize: 14,
    lineHeight: 20,
  },

  // Choice bubble (Stay Anonymous)
  choiceWrap: {
    alignItems: "flex-end",
    marginBottom: 10,
    gap: 6,
    paddingHorizontal: 16,
  },
  choicePill: {
    minWidth: 296,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 7,
    borderRadius: 16,
    borderBottomRightRadius: 4,
    backgroundColor: "rgba(255,255,255,0.12)",
    borderWidth: 1,
    borderColor: Colors.glassBorderStrong,
  },
  choiceText: {
    color: Colors.textPrimary,
    fontSize: 14,
    fontWeight: "500",
  },
  choiceTime: {
    color: Colors.textTertiary,
    fontSize: 10,
    alignSelf: "flex-end",
  },
  ownTime: {
    color: Colors.textTertiary,
    fontSize: 10,
    alignSelf: "flex-end",
  },

  // Shared time label
  timeLabel: {
    color: Colors.textTertiary,
    fontSize: 10,
    marginTop: 2,
  },

  // Typing indicator
  typingWrap: {
    paddingHorizontal: 16,
    marginBottom: 10,
    alignItems: "flex-start",
  },
  typingPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    paddingLeft: 11,
    paddingRight: 4,
    paddingVertical: 0,
    minHeight: 24,
  },
  typingLabel: {
    color: "rgba(255,255,255,0.66)",
    fontSize: 12,
  },
});

// ─── Screen styles ────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.bg,
    marginTop: 54,
    borderTopLeftRadius: 34,
    borderTopRightRadius: 34,
    overflow: "hidden",
    borderTopWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  flex: { flex: 1 },
  dragHandle: {
    position: "absolute",
    top: 4,
    alignSelf: "center",
    width: 80,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  dragHandlePill: {
    width: 34,
    height: 4,
    borderRadius: 2,
    backgroundColor: "rgba(255,255,255,0.72)",
  },

  // Watermark
  watermarkWrap: {
    position: "absolute",
    top: 118,
    left: 16,
    right: 16,
    zIndex: 0,
  },
  watermark: {
    color: "rgba(255,255,255,0.18)",
    fontSize: 30,
    fontWeight: "800",
    lineHeight: 44,
    letterSpacing: -0.5,
  },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingBottom: 14,
    position: "relative",
    zIndex: 1,
  },
  headerCenter: {
    alignItems: "center",
    gap: 6,
  },
  headerAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1.5,
    borderColor: Colors.glassBorder,
    marginBottom: -4,
  },
  headerLabelPill: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
  },
  headerLabel: {
    color: Colors.textSecondary,
    fontSize: 12,
    fontWeight: "500",
    letterSpacing: 0.1,
  },
  closeBtn: {
    position: "absolute",
    right: 20,
    top: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.glassFill,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
    alignItems: "center",
    justifyContent: "center",
  },

  // Tab pill
  tabWrap: {
    alignItems: "center",
    paddingBottom: 12,
    zIndex: 1,
  },
  tabPill: {
    flexDirection: "row",
    padding: 3,
    gap: 2,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.12)",
  },
  tabBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 12,
  },
  tabBtnActive: {
    backgroundColor: "rgba(255,255,255,0.10)",
    borderWidth: 1,
    borderColor: Colors.glassBorderStrong,
  },
  tabText: {
    color: Colors.textTertiary,
    fontSize: 12,
    fontWeight: "500",
  },
  tabTextActive: {
    color: Colors.textPrimary,
  },
  tabAvatar: {
    width: 20,
    height: 20,
    borderRadius: 6,
  },

  // Message list
  listContent: {
    paddingTop: 8,
    paddingBottom: 4,
    zIndex: 1,
  },

  // Input area
  inputArea: {
    paddingHorizontal: 16,
    paddingTop: 18,
    gap: 4,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    height: 56,
    borderRadius: 20,
    paddingLeft: 18,
    paddingRight: 4,
    gap: 8,
    backgroundColor: "rgba(0,0,0,0.33)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    shadowColor: "#FFFFFF",
    shadowOpacity: 0.1,
    shadowRadius: 0,
    shadowOffset: { width: 0, height: 1 },
  },
  input: {
    flex: 1,
    color: Colors.textPrimary,
    fontSize: 14,
    fontWeight: "500",
    maxHeight: 44,
    paddingTop: 0,
    paddingBottom: 0,
    lineHeight: 18,
  },
  micBtn: {
    width: 36,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.08)",
  },

  // Anonymous mode bar
  anonBar: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 26,
    paddingTop: 2,
    paddingBottom: 6,
    backgroundColor: "transparent",
    borderTopWidth: 0,
  },
  anonText: {
    color: "rgba(255,255,255,0.76)",
    fontSize: 12,
    fontWeight: "500",
    letterSpacing: 0.1,
  },
});
