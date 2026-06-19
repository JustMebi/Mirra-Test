import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Modal,
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';
import type { User } from '@/data/mock';

interface MentionProfileCardProps {
  user: User | null;
  visible: boolean;
  anchor: { x: number; y: number } | null;
  onClose: () => void;
  onDM: (user: User) => void;
}

const FRAME_W = 348;
const FRAME_H = 128;
const POINTER_Y = 119;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function MentionProfileCard({ user, visible, anchor, onClose, onDM }: MentionProfileCardProps) {
  const { width: screenW, height: screenH } = useWindowDimensions();
  const dot = useRef(new Animated.Value(0)).current;
  const tail = useRef(new Animated.Value(0)).current;
  const body = useRef(new Animated.Value(0)).current;
  const content = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!visible || !user) return;

    dot.setValue(0);
    tail.setValue(0);
    body.setValue(0);
    content.setValue(0);

    Animated.sequence([
      Animated.timing(dot, {
        toValue: 1,
        duration: 42,
        useNativeDriver: true,
      }),
      Animated.timing(tail, {
        toValue: 1,
        duration: 48,
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
  }, [body, content, dot, tail, user, visible]);

  if (!user) return null;

  const anchorX = anchor?.x ?? screenW / 2;
  const anchorY = anchor?.y ?? screenH - 180;
  const frameLeft = clamp(anchorX - 118, 6, Math.max(6, screenW - FRAME_W - 6));
  const frameTop = anchorY - FRAME_H - 8 > 24 ? anchorY - FRAME_H - 8 : anchorY + 22;
  const rawPointerLeft = anchorX - frameLeft;
  const pointerLeft = clamp(rawPointerLeft, 26, FRAME_W - 28);
  const pointerTop = frameTop > anchorY ? -2 : POINTER_Y;

  const dotStyle = {
    opacity: dot,
    transform: [
      { scale: dot.interpolate({ inputRange: [0, 0.7, 1], outputRange: [0.1, 1.22, 1] }) },
      { translateY: dot.interpolate({ inputRange: [0, 1], outputRange: [4, 0] }) },
    ],
  };
  const tailStyle = {
    opacity: tail,
    transform: [
      { rotate: '45deg' },
      { scale: tail.interpolate({ inputRange: [0, 0.75, 1], outputRange: [0.1, 1.14, 1] }) },
      { translateY: tail.interpolate({ inputRange: [0, 1], outputRange: [3, 0] }) },
    ],
  };
  const bodyStyle = {
    opacity: body,
    transform: [
      { scale: body.interpolate({ inputRange: [0, 0.75, 1], outputRange: [0.92, 1.025, 1] }) },
      { translateY: body.interpolate({ inputRange: [0, 1], outputRange: [7, 0] }) },
    ],
  };
  const contentStyle = {
    opacity: content,
    transform: [{ translateY: content.interpolate({ inputRange: [0, 1], outputRange: [4, 0] }) }],
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={[styles.bubbleFrame, { left: frameLeft, top: frameTop }]}>
              <Animated.View
                style={[
                  styles.dot,
                  { left: pointerLeft - 3, top: pointerTop },
                  dotStyle,
                ]}
              />
              <Animated.View
                style={[
                  styles.tail,
                  { left: pointerLeft - 9, top: pointerTop - 18 },
                  tailStyle,
                ]}
              />

              <Animated.View style={[styles.cardShell, bodyStyle]}>
                <View style={styles.bodyRect}>
                  <Animated.View style={[styles.content, contentStyle]}>
                    <Image source={user.avatar} style={styles.avatar} resizeMode="cover" />

                    <View style={styles.infoBlock}>
                      <View style={styles.topRow}>
                        <View style={styles.nameRole}>
                          <View style={styles.nameRow}>
                            <Text style={styles.name} numberOfLines={1}>{user.name}</Text>
                            {user.verified && (
                              <Ionicons name="checkmark-circle" size={12} color="#159BFF" />
                            )}
                          </View>

                          <View style={styles.rolePill}>
                            <Text style={styles.roleText} numberOfLines={1}>
                              {user.roleType ?? user.role}
                            </Text>
                          </View>
                        </View>

                        <TouchableOpacity style={styles.profileBtn} activeOpacity={0.7}>
                          <Text style={styles.profileText}>Profile</Text>
                          <Feather name="arrow-up-right" size={12} color={Colors.textPrimary} strokeWidth={1.2} />
                        </TouchableOpacity>
                      </View>

                      <View style={styles.metaRow}>
                        <View style={styles.locationChip}>
                          <Feather name="navigation" size={11} color="rgba(255,255,255,0.60)" />
                          <Text style={styles.metaText} numberOfLines={1}>{user.city}</Text>
                        </View>

                        <View style={styles.emojiRow}>
                          {user.interests.slice(0, 2).map((interest) => (
                            <Text key={interest.id} style={styles.emoji}>{interest.emoji}</Text>
                          ))}
                          {user.proSkills.slice(0, 2).map((skill) => (
                            <Text key={skill.id} style={styles.emoji}>{skill.emoji}</Text>
                          ))}
                        </View>

                        <TouchableOpacity
                          style={styles.dmIcon}
                          onPress={() => {
                            onDM(user);
                            onClose();
                          }}
                          activeOpacity={0.7}
                        >
                          <Feather name="send" size={13} color={Colors.textPrimary} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </Animated.View>
                </View>
              </Animated.View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.08)',
  },
  bubbleFrame: {
    position: 'absolute',
    width: FRAME_W,
    height: 128,
  },
  cardShell: {
    position: 'absolute',
    left: 6,
    top: 0,
    width: 336,
    height: 122,
    borderRadius: 12.5,
    backgroundColor: 'rgba(255,255,255,0.10)',
    overflow: 'visible',
  },
  bodyRect: {
    width: 336,
    height: 110,
    padding: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.10)',
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  tail: {
    position: 'absolute',
    width: 18,
    height: 10,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.10)',
  },
  dot: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.10)',
  },
  content: {
    width: '100%',
    height: 82,
    flexDirection: 'row',
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
    alignSelf: 'center',
    gap: 8,
  },
  topRow: {
    height: 36,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 4,
  },
  nameRole: {
    flex: 1,
    height: 36,
    gap: 4,
  },
  nameRow: {
    height: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  name: {
    color: Colors.textPrimary,
    fontSize: 14,
    lineHeight: 16,
    fontWeight: '600',
    letterSpacing: -0.24,
    flexShrink: 1,
  },
  rolePill: {
    maxWidth: 92,
    height: 16,
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 2,
    paddingRight: 8,
    paddingBottom: 3,
    paddingLeft: 8,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.05)',
    backgroundColor: 'rgba(255,255,255,0.10)',
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.10,
    shadowRadius: 0,
  },
  roleText: {
    color: 'rgba(255,255,255,0.80)',
    fontSize: 10,
    lineHeight: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  profileBtn: {
    width: 79,
    height: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.05)',
    backgroundColor: 'rgba(255,255,255,0.05)',
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.10,
    shadowRadius: 0,
  },
  profileText: {
    color: 'rgba(255,255,255,0.80)',
    fontSize: 12,
    lineHeight: 12,
    fontWeight: '400',
    textAlign: 'center',
  },
  metaRow: {
    height: 28,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  locationChip: {
    maxWidth: 102,
    height: 28,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    borderRadius: 9,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  metaText: {
    color: 'rgba(255,255,255,0.60)',
    fontSize: 10,
    lineHeight: 12,
    fontWeight: '500',
    flexShrink: 1,
  },
  emojiRow: {
    flex: 1,
    height: 28,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  emoji: {
    width: 22,
    height: 22,
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  dmIcon: {
    width: 28,
    height: 28,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
});
