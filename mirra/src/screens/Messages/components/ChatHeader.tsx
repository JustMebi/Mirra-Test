import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/colors';
import { MediaAssets } from '@/constants/assets';
import type { Thread } from '@/data/mock';

interface ChatHeaderProps {
  thread: Thread;
  onBack: () => void;
}

export function ChatHeader({ thread, onBack }: ChatHeaderProps) {
  const insets = useSafeAreaInsets();
  const isGroup = thread.isGroup;

  return (
    <View style={[styles.safeArea, { paddingTop: insets.top + 10 }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.iconButton} activeOpacity={0.7}>
          <Feather name="arrow-left" size={18} color={Colors.textPrimary} strokeWidth={1.6} />
        </TouchableOpacity>

        <View style={styles.identityBlock} pointerEvents="box-none">
          <Image
            source={thread.avatar ?? MediaAssets.images.californiaExplorers}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.infoPill}>
            <View style={styles.titleRow}>
              {isGroup ? (
                <Ionicons name="people-outline" size={16} color={Colors.textPrimary} />
              ) : thread.verified ? (
                <Ionicons name="checkmark-circle" size={16} color="#159BFF" />
              ) : null}
              <Text style={styles.title} numberOfLines={1}>{thread.name}</Text>
            </View>

            <View style={styles.statsRow}>
              {isGroup ? (
                <>
                  <Text style={styles.statMuted}>12.8K members</Text>
                  <Text style={styles.statMuted}>.</Text>
                  <Text style={styles.statStrong}>285</Text>
                  <Text style={styles.statMuted}>Online</Text>
                </>
              ) : (
                <Text style={styles.statMuted}>Online</Text>
              )}
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.iconButton} activeOpacity={0.7}>
          <Feather name="more-vertical" size={18} color={Colors.textPrimary} strokeWidth={1.6} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    width: '100%',
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: Colors.bg,
    alignItems: 'center',
  },
  header: {
    width: '100%',
    maxWidth: 408,
    height: 113,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    position: 'relative',
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 16,
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.05)',
    backgroundColor: 'rgba(255,255,255,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.10,
    shadowRadius: 0,
  },
  identityBlock: {
    position: 'absolute',
    top: 0,
    left: '50%',
    width: 123,
    height: 113,
    marginLeft: -61.5,
    alignItems: 'center',
  },
  heroImage: {
    width: 82,
    height: 82,
    borderRadius: 16,
    backgroundColor: Colors.bgSurface,
  },
  infoPill: {
    position: 'absolute',
    bottom: 0,
    width: 287,
    height: 39,
    paddingTop: 5,
    paddingRight: 20,
    paddingBottom: 6,
    paddingLeft: 20,
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.05)',
    backgroundColor: 'rgba(255,255,255,0.07)',
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.10,
    shadowRadius: 0,
  },
  titleRow: {
    height: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  title: {
    color: 'rgba(255,255,255,0.80)',
    fontSize: 14,
    lineHeight: 16,
    fontWeight: '600',
    letterSpacing: -0.24,
    flexShrink: 1,
  },
  statsRow: {
    height: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  statMuted: {
    color: 'rgba(255,255,255,0.30)',
    fontSize: 10,
    lineHeight: 12,
    fontWeight: '400',
    letterSpacing: -0.08,
  },
  statStrong: {
    color: 'rgba(255,255,255,0.60)',
    fontSize: 10,
    lineHeight: 12,
    fontWeight: '500',
  },
});
