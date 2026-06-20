import React from 'react';
import {
  View, Text, Image, TouchableOpacity,
  ScrollView, StyleSheet, Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AppIcon } from '@/components/ui/AppIcon';
import { Colors } from '@/constants/colors';
import { MediaAssets } from '@/constants/assets';
import { mockCurrentUser, mockStats, type Stat } from '@/data/mock';
import { HeroMedia } from '@/components/ui/HeroMedia';
import { PulsingDot } from '@/components/ui/PulsingDot';

const { height: SCREEN_H } = Dimensions.get('window');
const CARD_H = Math.min(626, Math.max(520, Math.round(SCREEN_H * 0.655)));


// ─── Stat card ────────────────────────────────────────────────────────────────

function StatCard({ value, label, period, growth, positive }: Stat) {
  return (
    <View style={statStyles.card}>
      <Text style={statStyles.value}>{value}</Text>
      <View style={statStyles.textBlock}>
        <Text style={statStyles.label}>{label}</Text>
        <View style={statStyles.metaRow}>
          {period != null && <Text style={statStyles.period}>{period}</Text>}
          {growth != null && (
            <Text style={[statStyles.growth, { color: positive ? Colors.accent : Colors.error }]}>
              {growth}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
}

const statStyles = StyleSheet.create({
  card: {
    flexShrink: 0,
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
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  textBlock: {
    gap: 2,
  },
  label: {
    color: 'rgba(255,255,255,0.80)',
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  period: {
    color: 'rgba(255,255,255,0.60)',
    fontSize: 9,
  },
  growth: {
    fontSize: 9,
    fontWeight: '700',
  },
});

// ─── Hero profile card ────────────────────────────────────────────────────────

export function HeroProfileCard() {
  const user = mockCurrentUser;
  const heroMedia = user.heroMedia ?? { type: 'image' as const, source: { uri: user.heroImage } };

  return (
    <View style={styles.card}>
      {/* Hero image/video fills entire card */}
      <HeroMedia media={heroMedia} posterUri={user.heroImage} isActive />

      {/* Top gradient — darkens behind stats for readability */}
      <LinearGradient
        colors={['rgba(0,0,0,0.58)', 'transparent']}
        style={styles.topGradient}
        pointerEvents="none"
      />

      {/* Bottom gradient — darkens behind profile info */}
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.48)', 'rgba(0,0,0,0.92)']}
        locations={[0.28, 0.60, 1]}
        style={styles.bottomGradient}
        pointerEvents="none"
      />

      {/* Layered content */}
      <View style={styles.content}>

        {/* Stats row overlaid on top portion */}
        <View style={styles.statsClip}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.statsRow}
          >
            {mockStats.map((s) => (
              <StatCard key={s.label} {...s} />
            ))}
          </ScrollView>
        </View>

        {/* Bottom cluster */}
        <View style={styles.bottomCluster}>

          {/* Location badge + settings */}
          <View style={styles.locationRow}>
            <View style={styles.locationBadge}>
              <PulsingDot size={6} />
              <AppIcon name="navigation" size={12} color="rgba(255,255,255,0.8)" />
              <Text style={styles.locationText} numberOfLines={1}>{user.location}</Text>
            </View>
            <TouchableOpacity style={styles.settingsBtn} activeOpacity={0.7}>
              <AppIcon name="sliders" size={12} color={Colors.textPrimary} strokeWidth={1.5} />
            </TouchableOpacity>
          </View>

          {/* Profile info bar */}
          <View style={styles.infoBar}>
            <View style={styles.avatarNameRow}>
              <Image source={MediaAssets.images.homeIcon} style={styles.avatar} resizeMode="cover" />
              <View style={styles.nameBlock}>
                <View style={styles.nameLine}>
                  <Text style={styles.name} numberOfLines={1}>{user.name}</Text>
                  <AppIcon name="verified" size={13} />
                </View>
                <Text style={styles.roleText}>{user.role}</Text>
              </View>
            </View>

            {/* Followers chip */}
            <View style={styles.followersChip}>
              <View style={styles.followersBlock}>
                <Text style={styles.followersCount}>{user.followersFormatted}</Text>
                <Text style={styles.followersLabel}>Followers</Text>
              </View>
              <Image source={MediaAssets.images.instagram} style={styles.instagramIcon} resizeMode="contain" />
            </View>
          </View>

          {/* Action buttons */}
          <View style={styles.actionsRow}>
            <TouchableOpacity style={styles.actionBtn} activeOpacity={0.7}>
              <AppIcon name="eye" size={13} color="rgba(255,255,255,0.8)" strokeWidth={1.5} />
              <Text style={styles.actionText}>View Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn} activeOpacity={0.7}>
              <AppIcon name="layers" size={13} color="rgba(255,255,255,0.8)" strokeWidth={1.5} />
              <Text style={styles.actionText}>All Cards</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn} activeOpacity={0.7}>
              <AppIcon name="share" size={13} color="rgba(255,255,255,0.8)" strokeWidth={1.5} />
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
  topGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 90,
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
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
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
    gap: 6,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  locationBadge: {
    height: 32,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingLeft: 8,
    paddingRight: 12,
    paddingVertical: 6,
    backgroundColor: 'rgba(255,255,255,0.10)',
    borderRadius: 12,
    overflow: 'hidden',
    maxWidth: '86%',
  },
  locationText: {
    flexShrink: 1,
    color: 'rgba(255,255,255,0.80)',
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: -0.2,
  },
  settingsBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.10)',
    borderRadius: 12,
  },
  infoBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.075)',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  avatarNameRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    minWidth: 0,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.20)',
  },
  nameBlock: {
    flex: 1,
    gap: 2,
    minWidth: 0,
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
  followersChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 10,
    paddingLeft: 12,
    paddingRight: 10,
    paddingVertical: 5,
    flexShrink: 0,
  },
  followersBlock: {
    alignItems: 'flex-start',
    gap: 1,
  },
  instagramIcon: {
    width: 13,
    height: 13,
    opacity: 0.72,
  },
  followersCount: {
    color: Colors.textPrimary,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  followersLabel: {
    color: Colors.textSecondary,
    fontSize: 9,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 4,
  },
  actionBtn: {
    flex: 1,
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    borderTopWidth: 0.5,
    borderTopColor: 'rgba(255,255,255,0.10)',
    borderLeftWidth: 0.5,
    borderLeftColor: 'rgba(255,255,255,0.05)',
    borderRightWidth: 0.5,
    borderRightColor: 'rgba(255,255,255,0.05)',
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  actionText: {
    color: 'rgba(255,255,255,0.80)',
    fontSize: 13,
    fontWeight: '400',
    letterSpacing: -0.2,
  },
});
