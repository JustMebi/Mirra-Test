import React, { useState, useRef, useEffect } from "react";
import {
  View,
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
import { Text } from '@/components/ui/Text';
import { router, useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Circle, Defs, Ellipse, RadialGradient, Stop, Path } from "react-native-svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppIcon } from "@/components/ui/AppIcon";
import { FrostedGlassPressable } from "@/components/ui/FrostedGlassPressable";
import { FrostedGlassView } from "@/components/ui/FrostedGlassView";
import { SegmentedTabs, SegmentedTabItem } from "@/components/ui/SegmentedTabs";
import { Colors } from "@/constants/colors";
import {
  mockUsers,
  mockCurrentUser,
  mockDPMessages,
  type ChatMessage,
} from "@/data/mock";

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
            d="M8 1.9C9 4.22 10.38 4.59 12.54 3.46C11.98 5.83 12.75 7 15 8C12.75 9 11.98 10.17 12.54 12.54C10.38 11.41 9 11.78 8 14.1C7 11.78 5.62 11.41 3.46 12.54C4.02 10.17 3.25 9 1 8C3.25 7 4.02 5.83 3.46 3.46C5.62 4.59 7 4.22 8 1.9Z"
            fill="none"
            stroke="rgba(255,255,255,0.62)"
            strokeWidth={1.1}
            strokeLinecap="round"
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

function HazeFlowBlob() {
  const drift = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(drift, {
          toValue: 1,
          duration: 6200,
          useNativeDriver: true,
        }),
        Animated.timing(drift, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ]),
    );

    loop.start();
    return () => loop.stop();
  }, [drift]);

  const translateX = drift.interpolate({
    inputRange: [0, 1],
    outputRange: [190, -220],
  });
  const translateY = drift.interpolate({
    inputRange: [0, 0.28, 0.62, 1],
    outputRange: [0, -18, -8, 2],
  });
  const scale = drift.interpolate({
    inputRange: [0, 0.45, 1],
    outputRange: [0.94, 1.08, 0.98],
  });
  const opacity = drift.interpolate({
    inputRange: [0, 0.18, 0.72, 1],
    outputRange: [0, 0.5, 0.44, 0],
  });

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.hazeBlob,
        {
          opacity,
          transform: [{ translateX }, { translateY }, { scale }],
        },
      ]}
    >
      <Svg width="100%" height="100%" viewBox="0 0 240 96" fill="none">
        <Defs>
          <RadialGradient id="hazeBlobCore" cx="48%" cy="52%" r="70%">
            <Stop offset="0" stopColor="#1E76D4" stopOpacity="0.3" />
            <Stop offset="0.46" stopColor="#1A67C6" stopOpacity="0.2" />
            <Stop offset="1" stopColor="#1A67C6" stopOpacity="0" />
          </RadialGradient>
          <RadialGradient id="hazeBlobWake" cx="55%" cy="50%" r="76%">
            <Stop offset="0" stopColor="#144CD4" stopOpacity="0.22" />
            <Stop offset="0.58" stopColor="#00B4D2" stopOpacity="0.12" />
            <Stop offset="1" stopColor="#144CD4" stopOpacity="0" />
          </RadialGradient>
        </Defs>
        <Ellipse cx="114" cy="50" rx="116" ry="34" fill="url(#hazeBlobWake)" />
        <Ellipse cx="126" cy="48" rx="88" ry="28" fill="url(#hazeBlobCore)" />
        <Ellipse cx="74" cy="54" rx="64" ry="24" fill="url(#hazeBlobCore)" opacity="0.42" />
      </Svg>
    </Animated.View>
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

export default function ChatbotModal() {
  const { userId } = useLocalSearchParams<{ userId?: string }>();
  const insets = useSafeAreaInsets();

  const dpUser = mockUsers.find((u) => u.id === userId) ?? mockUsers[1];
  const firstName = dpUser.name.split(" ")[0];

  const [activeTab, setActiveTab] = useState<"chat" | "dp">("dp");
  const [inputText, setInputText] = useState("");
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
  const personaTabs: Array<SegmentedTabItem<"chat" | "dp">> = [
    {
      value: "chat",
      label: `Chat with ${firstName}`,
      image: dpUser.avatar,
    },
    {
      value: "dp",
      label: "Digital Persona",
    },
  ];

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
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: ChatMessage;
    index: number;
  }) => {
    const nextMsg = messages[index + 1];
    const showTime =
      !nextMsg || nextMsg.senderId !== item.senderId || item.isOwn;

    if (item.isChoiceBubble) {
      return (
        <View style={msgStyles.choiceWrap}>
          <FrostedGlassView
            style={msgStyles.choicePill}
            borderRadius={16}
            frostLevel="dense"
            variant="borderless"
            blurVariant="blur60"
            animatedEdges={false}
          >
            <Text style={msgStyles.choiceText}>{item.text}</Text>
            {showTime && <Text style={msgStyles.choiceTime}>{item.time}</Text>}
          </FrostedGlassView>
        </View>
      );
    }

    if (item.isOwn) {
      return (
        <View style={msgStyles.ownWrap}>
          <FrostedGlassView
            style={msgStyles.ownBubble}
            borderRadius={16}
            frostLevel="dense"
            variant="borderless"
            blurVariant="blur60"
            animatedEdges={false}
          >
            <Text style={msgStyles.ownText}>{item.text}</Text>
            {showTime && <Text style={msgStyles.ownTime}>{item.time}</Text>}
          </FrostedGlassView>
        </View>
      );
    }

    return (
      <View style={msgStyles.dpWrap}>
        <FrostedGlassView
          style={msgStyles.dpBubble}
          borderRadius={16}
          frostLevel="subtle"
          variant="borderWhite3"
          blurVariant="blur60"
          animatedEdges={false}
        >
          <Text style={msgStyles.dpText}>{item.text}</Text>
          {showTime && <Text style={msgStyles.dpTime}>{item.time}</Text>}
        </FrostedGlassView>
      </View>
    );
  };

  const showInputTyping = inputText.trim().length > 0;

  const InputTypingRow = () => (
    <View style={styles.inputTypingWrap}>
      <View style={styles.inputTypingPill}>
        <TypingGlyph />
        <Text style={styles.inputTypingLabel}>Typing...</Text>
      </View>
    </View>
  );

  return (
    <Animated.View style={[styles.root, { paddingTop: insets.top - 5, transform: [{ translateY }] }]}>
      <View style={styles.dragHandle} {...panResponder.panHandlers}>
        <View style={styles.dragHandlePill} />
      </View>

      <View style={styles.watermarkWrap} pointerEvents="none">
        <Text style={styles.watermark}>
          Hey, you're chatting with{"\n"}
          {firstName}'s digital persona.
        </Text>
      </View>

      <View style={styles.header}>
        <View style={styles.headerCenter}>
          <Image source={dpUser.avatar} style={styles.headerAvatar} />
          <FrostedGlassView
            style={styles.headerLabelPill}
            borderRadius={10}
            frostLevel="dense"
            variant="border"
            blurVariant="blur10Rim"
            animatedEdges={false}
          >
            <Text style={styles.headerLabel}>
              {firstName}'s Digital Persona
            </Text>
          </FrostedGlassView>
        </View>
        <FrostedGlassPressable
          style={styles.closeBtn}
          contentStyle={styles.closeBtnContent}
          borderRadius={12}
          frostLevel="regular"
          variant="border"
          blurVariant="rimOnly"
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
        </FrostedGlassPressable>
      </View>

      <View style={styles.tabWrap}>
        <View style={styles.tabInner}>
          <SegmentedTabs
            value={activeTab}
            tabs={personaTabs}
            onChange={(next) => {
              if (next === "chat") {
                router.back();
                return;
              }
              setActiveTab(next);
            }}
            size="large"
            style={styles.tabPill}
            borderRadius={12}
            frostLevel="regular"
            variant="border"
            blurVariant="blur20Rim"
          />
        </View>
      </View>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={0}
      >
        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          style={styles.list}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          onContentSizeChange={() =>
            listRef.current?.scrollToEnd({ animated: false })
          }
        />

        <LinearGradient
          colors={[
            "rgba(20,76,212,0.34)",
            "rgba(20,76,212,0.78)",
            "rgba(0,180,210,0.9)",
          ]}
          locations={[0, 0.56, 1]}
          style={[
            styles.inputArea,
            { paddingBottom: insets.bottom > 0 ? 0 : 8 },
          ]}
        >
          <LinearGradient
            pointerEvents="none"
            colors={[
              "rgba(20,76,212,0)",
              "rgba(20,76,212,0.18)",
              "rgba(20,76,212,0.34)",
            ]}
            locations={[0, 0.5, 1]}
            style={styles.inputTopFeather}
          />
          <HazeFlowBlob />

          {showInputTyping && <InputTypingRow />}

          <FrostedGlassView
            style={styles.inputRow}
            borderRadius={20}
            fillVariant="inputBlack50"
            variant="inputGradientBorder"
            blurVariant="blur60"
            animatedEdges={false}
          >
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
            <FrostedGlassPressable
              onPress={handleSend}
              activeOpacity={0.8}
              style={styles.sendBtn}
              contentStyle={styles.sendBtnContent}
              borderRadius={16}
              frostLevel="regular"
              variant="border"
              blurVariant="rimOnly"
            >
              <AppIcon
                name="arrow-up"
                size={18}
                color={Colors.textPrimary}
                strokeWidth={1.6}
              />
            </FrostedGlassPressable>
          </FrostedGlassView>

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

const msgStyles = StyleSheet.create({
  dpWrap: {
    alignItems: "flex-start",
    marginBottom: 10,
    paddingHorizontal: 16,
    maxWidth: "80%",
  },
  dpBubble: {
    borderRadius: 16,
    borderBottomLeftRadius: 4,
    borderTopColor: "rgba(255,255,255,0.03)",
    borderLeftColor: "rgba(255,255,255,0.03)",
    borderRightColor: "rgba(255,255,255,0.03)",
    borderBottomColor: "rgba(255,255,255,0.03)",
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

  ownWrap: {
    alignItems: "flex-end",
    marginBottom: 10,
    paddingHorizontal: 16,
  },
  ownBubble: {
    borderRadius: 16,
    borderBottomRightRadius: 4,
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

  timeLabel: {
    color: Colors.textTertiary,
    fontSize: 10,
    marginTop: 2,
  },

});

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
    borderRadius: 12,
  },
  closeBtnContent: {
    alignItems: "center",
    justifyContent: "center",
  },

  tabWrap: {
    alignItems: "center",
    paddingBottom: 12,
    zIndex: 1,
  },
  tabInner: {
    width: "100%",
    paddingHorizontal: 16,
    alignItems: "center",
  },
  tabPill: {
    width: "100%",
    maxWidth: 408,
    borderRadius: 12,
  },

  listContent: {
    paddingTop: 8,
    paddingBottom: 4,
    zIndex: 1,
  },
  list: {
    marginHorizontal: 16,
  },

  inputArea: {
    position: "relative",
    paddingHorizontal: 16,
    paddingTop: 22,
    gap: 4,
  },
  inputTopFeather: {
    position: "absolute",
    left: 0,
    right: 0,
    top: -42,
    height: 62,
  },
  hazeBlob: {
    position: "absolute",
    right: -120,
    top: -34,
    width: 280,
    height: 78,
  },
  inputTypingWrap: {
    minHeight: 28,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  inputTypingPill: {
    minHeight: 24,
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    paddingLeft: 11,
    paddingRight: 4,
  },
  inputTypingLabel: {
    color: "rgba(255,255,255,0.66)",
    fontSize: 12,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    height: 56,
    borderRadius: 20,
    paddingLeft: 18,
    paddingRight: 4,
    gap: 8,
    shadowColor: "#2E9EFF",
    shadowOpacity: 0.18,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 0 },
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
  },
  sendBtnContent: {
    alignItems: "center",
    justifyContent: "center",
  },

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
