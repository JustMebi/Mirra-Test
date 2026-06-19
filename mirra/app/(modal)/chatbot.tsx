import React, { useState, useRef, useEffect } from 'react';
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
  Image,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Gradients, GradientDir } from '@/constants/colors';
import { glass } from '@/styles/glass';
import { glow } from '@/styles/glow';
import { mockUsers, mockCurrentUser, mockDPMessages, type ChatMessage } from '@/data/mock';

// ─── Typing indicator ─────────────────────────────────────────────────────────

function TypingDots() {
  const a1 = useRef(new Animated.Value(0)).current;
  const a2 = useRef(new Animated.Value(0)).current;
  const a3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const bounce = (a: Animated.Value, delay: number) =>
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(a, { toValue: -4, duration: 220, useNativeDriver: true }),
        Animated.timing(a, { toValue: 0, duration: 220, useNativeDriver: true }),
      ]);

    const loop = Animated.loop(
      Animated.parallel([bounce(a1, 0), bounce(a2, 140), bounce(a3, 280)])
    );
    loop.start();
    return () => loop.stop();
  }, []);

  return (
    <View style={dotStyles.row}>
      {[a1, a2, a3].map((a, i) => (
        <Animated.View
          key={i}
          style={[dotStyles.dot, { transform: [{ translateY: a }] }]}
        />
      ))}
    </View>
  );
}

const dotStyles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  dot: { width: 5, height: 5, borderRadius: 2.5, backgroundColor: Colors.textTertiary },
});

// ─── Main modal ───────────────────────────────────────────────────────────────

export default function ChatbotModal() {
  const { userId } = useLocalSearchParams<{ userId?: string }>();
  const insets = useSafeAreaInsets();

  const dpUser = mockUsers.find((u) => u.id === userId) ?? mockUsers[1];
  const firstName = dpUser.name.split(' ')[0];

  const [activeTab, setActiveTab] = useState<'chat' | 'dp'>('dp');
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>(() =>
    mockDPMessages.map((m) => ({
      ...m,
      senderName: m.senderId.startsWith('dp-') ? `${firstName}'s DP` : m.senderName,
      senderAvatar: m.senderId.startsWith('dp-') ? dpUser.avatar : m.senderAvatar,
    }))
  );

  const listRef = useRef<FlatList>(null);

  const handleSend = () => {
    const text = inputText.trim();
    if (!text) return;
    const msg: ChatMessage = {
      id: `u-${Date.now()}`,
      senderId: mockCurrentUser.id,
      senderName: 'Me',
      senderAvatar: mockCurrentUser.avatar,
      text,
      time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).toLowerCase(),
      isOwn: true,
    };
    setMessages((prev) => [...prev, msg]);
    setInputText('');
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 2200);
  };

  const renderItem = ({ item, index }: { item: ChatMessage; index: number }) => {
    // Show timestamp only after last message in a same-sender run or isOwn
    const nextMsg = messages[index + 1];
    const showTime = !nextMsg || nextMsg.senderId !== item.senderId || item.isOwn;

    if (item.isChoiceBubble) {
      return (
        <View style={msgStyles.choiceWrap}>
          <View style={[glass.pill, msgStyles.choicePill]}>
            <Text style={msgStyles.choiceText}>{item.text}</Text>
          </View>
          {showTime && <Text style={msgStyles.timeLabel}>{item.time}</Text>}
        </View>
      );
    }

    if (item.isOwn) {
      return (
        <View style={msgStyles.ownWrap}>
          <View style={msgStyles.ownBubble}>
            <Text style={msgStyles.ownText}>{item.text}</Text>
          </View>
          {showTime && <Text style={msgStyles.timeLabel}>{item.time}</Text>}
        </View>
      );
    }

    return (
      <View style={msgStyles.dpWrap}>
        <Image source={item.senderAvatar} style={msgStyles.dpAvatar} />
        <View style={msgStyles.dpBubble}>
          <Text style={msgStyles.dpText}>{item.text}</Text>
          {showTime && <Text style={msgStyles.dpTime}>{item.time}</Text>}
        </View>
      </View>
    );
  };

  const TypingRow = () => (
    <View style={msgStyles.typingWrap}>
      <Image source={dpUser.avatar} style={msgStyles.typingAvatar} />
      <View style={[glass.pill, msgStyles.typingPill]}>
        <Text style={msgStyles.typingLabel}>Typing</Text>
        <TypingDots />
      </View>
    </View>
  );

  return (
    <View style={[styles.root, { paddingTop: insets.top + 16 }]}>
      <View style={styles.dragHandle} />

      {/* ── Ghost watermark ─────────────────────────────── */}
      <View style={styles.watermarkWrap} pointerEvents="none">
        <Text style={styles.watermark}>
          Hey, you're chatting with{'\n'}{firstName}'s digital persona.
        </Text>
      </View>

      {/* ── Header ──────────────────────────────────────── */}
      <View style={styles.header}>
        <View style={styles.headerCenter}>
          <Image source={dpUser.avatar} style={styles.headerAvatar} />
          <View style={styles.headerLabelPill}>
            <Text style={styles.headerLabel}>{firstName}'s Digital Persona</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.closeBtn}
          onPress={() => router.back()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          activeOpacity={0.7}
        >
          <Feather name="x" size={16} color={Colors.textSecondary} />
        </TouchableOpacity>
      </View>

      {/* ── Tab pill ────────────────────────────────────── */}
      <View style={styles.tabWrap}>
        <View style={[glass.pill, styles.tabPill]}>
          <TouchableOpacity
            style={[styles.tabBtn, activeTab === 'chat' && styles.tabBtnActive]}
            onPress={() => setActiveTab('chat')}
            activeOpacity={0.8}
          >
            <Image source={dpUser.avatar} style={styles.tabAvatar} />
            <Text style={[styles.tabText, activeTab === 'chat' && styles.tabTextActive]}>
              Chat with {firstName}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabBtn, activeTab === 'dp' && styles.tabBtnActive]}
            onPress={() => setActiveTab('dp')}
            activeOpacity={0.8}
          >
            <Text style={[styles.tabText, activeTab === 'dp' && styles.tabTextActive]}>
              Digital Persona
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ── Messages + input ────────────────────────────── */}
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: false })}
          ListFooterComponent={isTyping ? <TypingRow /> : null}
        />

        {/* ── Input area ────────────────────────────────── */}
        <LinearGradient
          colors={['rgba(11,41,116,0.05)', 'rgba(18,84,222,0.78)', 'rgba(0,191,214,0.72)']}
          locations={[0, 0.54, 1]}
          style={[styles.inputArea, { paddingBottom: insets.bottom > 0 ? 0 : 8 }]}
        >
          <View style={[glass.base, styles.inputRow]}>
            <TextInput
              style={styles.input}
              placeholder="Ask me anything"
              placeholderTextColor={Colors.textTertiary}
              value={inputText}
              onChangeText={setInputText}
              multiline
              onSubmitEditing={handleSend}
              blurOnSubmit
            />
            <TouchableOpacity style={styles.micBtn} activeOpacity={0.7}>
              <Feather name="mic" size={17} color={Colors.textTertiary} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSend}
              activeOpacity={0.8}
              style={glow.blueShadow}
            >
              <LinearGradient
                colors={Gradients.blue}
                {...GradientDir.diagonal}
                style={styles.sendBtn}
              >
                <Feather name="arrow-up" size={16} color="#fff" />
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Anonymous mode bar */}
          <View style={styles.anonBar}>
            <Feather name="sliders" size={13} color="rgba(255,255,255,0.72)" />
            <Text style={styles.anonText}>Anonymous Mode is on</Text>
            <Feather name="info" size={12} color="rgba(255,255,255,0.72)" />
          </View>
        </LinearGradient>
      </KeyboardAvoidingView>
    </View>
  );
}

// ─── Message styles ───────────────────────────────────────────────────────────

const msgStyles = StyleSheet.create({
  // DP received
  dpWrap: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
    marginBottom: 10,
    paddingHorizontal: 16,
    maxWidth: '88%',
  },
  dpAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    flexShrink: 0,
  },
  dpBubble: {
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderRadius: 16,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
    padding: 12,
    gap: 6,
    flex: 1,
  },
  dpText: {
    color: Colors.textPrimary,
    fontSize: 14,
    lineHeight: 20,
  },
  dpTime: {
    color: Colors.textTertiary,
    fontSize: 10,
    alignSelf: 'flex-end',
  },

  // Own message
  ownWrap: {
    alignItems: 'flex-end',
    marginBottom: 10,
    paddingHorizontal: 16,
  },
  ownBubble: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 16,
    borderBottomRightRadius: 4,
    borderWidth: 1,
    borderColor: Colors.glassBorderStrong,
    paddingHorizontal: 14,
    paddingVertical: 10,
    maxWidth: '78%',
  },
  ownText: {
    color: Colors.textPrimary,
    fontSize: 14,
    lineHeight: 20,
  },

  // Choice bubble (Stay Anonymous)
  choiceWrap: {
    alignItems: 'flex-end',
    marginBottom: 10,
    gap: 6,
    paddingHorizontal: 16,
  },
  choicePill: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  choiceText: {
    color: Colors.textPrimary,
    fontSize: 14,
    fontWeight: '500',
  },

  // Shared time label
  timeLabel: {
    color: Colors.textTertiary,
    fontSize: 10,
    marginTop: 2,
  },

  // Typing indicator
  typingWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  typingAvatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  typingPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  typingLabel: {
    color: Colors.textTertiary,
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
    overflow: 'hidden',
    borderTopWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  flex: { flex: 1 },
  dragHandle: {
    position: 'absolute',
    top: 8,
    alignSelf: 'center',
    width: 34,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.72)',
    zIndex: 10,
  },

  // Watermark
  watermarkWrap: {
    position: 'absolute',
    top: 118,
    left: 16,
    right: 16,
    zIndex: 0,
  },
  watermark: {
    color: 'rgba(255,255,255,0.18)',
    fontSize: 36,
    fontWeight: '800',
    lineHeight: 44,
    letterSpacing: -0.5,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 14,
    position: 'relative',
    zIndex: 1,
  },
  headerCenter: {
    alignItems: 'center',
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
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
  },
  headerLabel: {
    color: Colors.textSecondary,
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0.1,
  },
  closeBtn: {
    position: 'absolute',
    right: 20,
    top: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.glassFill,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Tab pill
  tabWrap: {
    alignItems: 'center',
    paddingBottom: 12,
    zIndex: 1,
  },
  tabPill: {
    flexDirection: 'row',
    padding: 3,
    gap: 2,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  tabBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 999,
  },
  tabBtnActive: {
    backgroundColor: 'rgba(255,255,255,0.10)',
    borderWidth: 1,
    borderColor: Colors.glassBorderStrong,
  },
  tabText: {
    color: Colors.textTertiary,
    fontSize: 12,
    fontWeight: '500',
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
    paddingTop: 26,
    gap: 0,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 28,
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8,
  },
  input: {
    flex: 1,
    color: Colors.textPrimary,
    fontSize: 14,
    maxHeight: 100,
    paddingTop: 0,
    paddingBottom: 0,
  },
  micBtn: {
    padding: 2,
  },
  sendBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Anonymous mode bar
  anonBar: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 9,
    backgroundColor: 'rgba(0, 0, 0, 0.12)',
    borderTopWidth: 0,
    marginTop: 1,
  },
  anonText: {
    color: 'rgba(255,255,255,0.76)',
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0.1,
  },
});
