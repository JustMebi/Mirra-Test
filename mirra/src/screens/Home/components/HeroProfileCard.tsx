import React from 'react';
import {
  View, Text, Image, TouchableOpacity,
  ScrollView, StyleSheet, Dimensions,
} from 'react-native';
import { Feather, FontAwesome, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { glass } from '@/styles/glass';
import { Colors } from '@/constants/colors';
import { mockCurrentUser, mockStats, type Stat } from '@/data/mock';
import { HeroMedia } from '@/components/ui/HeroMedia';

const { height: SCREEN_H } = Dimensions.get('window');
const CARD_H = Math.min(626, Math.max(520, Math.round(SCREEN_H * 0.655)));

// ─── Stat overlay ─────────────────────────────────────────────────────────────

function StatOverlay({ value, label, period, growth, positive }: Stat) {
  return (
    <View style={statStyles.card}>
      <Text style={statStyles.value}>{value}</Text>
      <View style={statStyles.textBlock}>
        <Text style={statStyles.label}>{label}</Text>
        <View style={statStyles.metaRow}>
          <Text style={statStyles.period}>{period}</Text>
          <Text style={[statStyles.badgeText, { color: positive ? Colors.accent : Colors.error }]}>
            {growth}
          </Text>
        </View>
      </View>
    </View>
  );
}

const statStyles = StyleSheet.create({
  card: {
    width: 150,
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.09)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 10,
  },
  value: {
    color: Colors.textPrimary,
    fontSize: 21,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  textBlock: {
    flex: 1,
    gap: 1,
  },
  label: {
    color: 'rgba(255,255,255,0.80)',
    fontSize: 7.5,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  period: {
    color: 'rgba(255,255,255,0.62)',
    fontSize: 8.5,
    flexShrink: 0,
  },
  badgeText: {
    fontSize: 8.5,
    fontWeight: '700',
  },
});

// ─── Integrated hero card ─────────────────────────────────────────────────────

export function HeroProfileCard() {
  const user = mockCurrentUser;
  const heroMedia = user.heroMedia ?? { type: 'image' as const, source: { uri: user.heroImage } };

  return (
    <View style={styles.card}>

      {/* Hero image/video — fills entire card as background */}
      <HeroMedia media={heroMedia} posterUri={user.heroImage} isActive />

      {/* Gradient darkens bottom of image for readability */}
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.45)', 'rgba(0,0,0,0.90)']}
        locations={[0.3, 0.62, 1]}
        style={styles.bottomGradient}
        pointerEvents="none"
      />

      {/* Layered content */}
      <View style={styles.content}>

        {/* Stats row — overlaid on top portion of image */}
        <View style={styles.statsClip}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.statsRow}
          >
            {mockStats.map((s) => (
              <StatOverlay key={s.label} {...s} />
            ))}
          </ScrollView>
        </View>

        {/* Bottom cluster */}
        <View style={styles.bottomCluster}>

          {/* Location + filter */}
          <View style={styles.locationRow}>
            <View style={[glass.pill, styles.locationPill]}>
              <Feather name="navigation" size={11} color={Colors.textSecondary} />
              <Text style={styles.locationText} numberOfLines={1}>{user.location}</Text>
            </View>
            <TouchableOpacity style={[glass.pill, styles.filterBtn]} activeOpacity={0.7}>
              <Feather name="sliders" size={13} color={Colors.textSecondary} />
            </TouchableOpacity>
          </View>

          {/* Avatar + name + followers */}
          <View style={styles.nameRow}>
            <Image source={user.avatar} style={styles.avatar} />
            <View style={styles.nameBlock}>
              <View style={styles.nameLine}>
                <Text style={styles.name} numberOfLines={1}>{user.name}</Text>
                <Ionicons name="checkmark-circle" size={14} color="#4A9EFF" />
              </View>
              <Text style={styles.roleText}>{user.role}</Text>
            </View>
            <View style={styles.followersBlock}>
              <Text style={styles.followersCount}>{user.followersFormatted}</Text>
              <Text style={styles.followersLabel}>Followers</Text>
              <FontAwesome name="instagram" size={12} color={Colors.textSecondary} />
            </View>
          </View>

          {/* Action buttons */}
          <View style={styles.actionsRow}>
            <TouchableOpacity style={[glass.pill, styles.actionBtn]} activeOpacity={0.7}>
              <Feather name="eye" size={12} color={Colors.textSecondary} />
              <Text style={styles.actionText}>View Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[glass.pill, styles.actionBtn]} activeOpacity={0.7}>
              <Feather name="layers" size={12} color={Colors.textSecondary} />
              <Text style={styles.actionText}>All Cards</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[glass.pill, styles.actionBtn]} activeOpacity={0.7}>
              <Feather name="share-2" size={12} color={Colors.textSecondary} />
              <Text style={styles.actionText}>Share</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: CARD_H,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: Colors.bgSurface,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.10)',
  },
  bottomGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: CARD_H * 0.58,
  },
  content: {
    position: 'absolute',
    inset: 0,
    padding: 12,
    justifyContent: 'space-between',
  },
  statsClip: {
    marginHorizontal: 2,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 4,
    paddingRight: 24,
  },
  bottomCluster: {
    gap: 8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 32,
  },
  locationPill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  locationText: {
    color: Colors.textPrimary,
    fontSize: 11,
    fontWeight: '500',
    flex: 1,
  },
  filterBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: -32,
  },
  nameRow: {
    width: '100%',
    height: 58,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.075)',
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: -2,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  nameBlock: {
    flex: 1,
    gap: 2,
  },
  nameLine: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  name: {
    color: Colors.textPrimary,
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  roleText: {
    color: Colors.textSecondary,
    fontSize: 11,
  },
  followersBlock: {
    alignItems: 'flex-end',
    gap: 2,
  },
  followersCount: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.4,
  },
  followersLabel: {
    color: Colors.textSecondary,
    fontSize: 9,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 5,
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    paddingVertical: 9,
  },
  actionText: {
    color: Colors.textSecondary,
    fontSize: 11,
    fontWeight: '500',
  },
});
