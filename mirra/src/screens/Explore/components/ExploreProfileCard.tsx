import React from 'react';
import {
  View, Text, Image, TouchableOpacity,
  StyleSheet, Dimensions,
} from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { glass } from '@/styles/glass';
import { Colors } from '@/constants/colors';
import { MediaAssets } from '@/constants/assets';
import { HeroMedia } from '@/components/ui/HeroMedia';
import type { User } from '@/data/mock';

const { height: SCREEN_H } = Dimensions.get('window');
const HERO_H = Math.round(SCREEN_H * 0.44);
const MAX_ICONS = 3;

interface ExploreProfileCardProps {
  user: User;
  isActive?: boolean;
  style?: object;
}

export function ExploreProfileCard({ user, isActive = true, style }: ExploreProfileCardProps) {
  const heroMedia = user.heroMedia ?? { type: 'image' as const, source: { uri: user.heroImage } };
  const extraInterests = Math.max(0, user.interests.length - MAX_ICONS);
  const extraSkills = Math.max(0, user.proSkills.length - MAX_ICONS);

  return (
    <View style={[styles.card, style]}>

      {/* ── Hero image section ───────────────────────────── */}
      <View style={styles.heroWrap}>
        <HeroMedia media={heroMedia} isActive={isActive} posterUri={user.heroImage} />

        {/* Dark scrim — top and bottom */}
        <LinearGradient
          colors={['rgba(0,0,0,0.55)', 'transparent']}
          style={styles.topScrim}
          pointerEvents="none"
        />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.70)']}
          style={styles.bottomScrim}
          pointerEvents="none"
        />

        {/* ── Header overlaid on top of image ──────────── */}
        <View style={styles.headerOverlay}>
          <View style={styles.headerLeft}>
            <Image source={user.avatar} style={styles.avatar} />
            <View style={styles.nameBlock}>
              <View style={styles.nameLine}>
                <Text style={styles.name} numberOfLines={1}>{user.name}</Text>
                {user.verified && <Ionicons name="checkmark-circle" size={14} color="#4A9EFF" />}
              </View>
              <Text style={styles.role} numberOfLines={1}>{user.role}</Text>
            </View>
          </View>

          <View style={styles.connectionsBlock}>
            <Image
              source={MediaAssets.images.mirraLogoBigger}
              style={styles.mirraIcon}
              resizeMode="contain"
            />
            <Text style={styles.connectionsCount}>{user.connections}</Text>
            <Text style={styles.connectionsLabel}>Connections</Text>
          </View>
        </View>

        {/* ── Pagination dots ───────────────────────────── */}
        <View style={styles.dotsRow} pointerEvents="none">
          {[0, 1, 2].map((i) => (
            <View key={i} style={[styles.dot, i === 0 && styles.dotActive]} />
          ))}
        </View>

        {/* ── Bottom of image: location + action buttons ── */}
        <View style={styles.imageBottom}>
          <View style={[glass.pill, styles.locationPill]}>
            <View style={styles.locationGlow} />
            <Feather name="navigation" size={11} color={Colors.textPrimary} />
            <Text style={styles.locationText} numberOfLines={1}>{user.location}</Text>
          </View>

          <View style={styles.imageActions}>
            <TouchableOpacity style={[glass.pill, styles.connectBtn]} activeOpacity={0.7}>
              <Ionicons name="person-add-outline" size={13} color={Colors.textPrimary} />
              <Text style={styles.btnText}>Connect</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[glass.pill, styles.dmBtn]} activeOpacity={0.7}>
              <Feather name="send" size={13} color={Colors.textPrimary} />
              <Text style={styles.btnText}>DM</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* ── Info tray below image ────────────────────────── */}
      <View style={styles.infoTray}>

        {/* Interests */}
        <View style={styles.infoCol}>
          <Text style={styles.infoLabel}>Interests</Text>
          <View style={styles.iconRow}>
            {user.interests.slice(0, MAX_ICONS).map((i) => (
              <View key={i.id} style={styles.emojiBubble}>
                <Text style={styles.emoji}>{i.emoji}</Text>
              </View>
            ))}
            {extraInterests > 0 && (
              <View style={[glass.pill, styles.overflow]}>
                <Text style={styles.overflowText}>+{extraInterests}</Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.colDivider} />

        {/* Pro Skills */}
        <View style={styles.infoCol}>
          <Text style={styles.infoLabel}>Pro Skills</Text>
          <View style={styles.iconRow}>
            {user.proSkills.slice(0, MAX_ICONS).map((s) => (
              <View key={s.id} style={styles.emojiBubble}>
                <Text style={styles.emoji}>{s.emoji}</Text>
              </View>
            ))}
            {extraSkills > 0 && (
              <View style={[glass.pill, styles.overflow]}>
                <Text style={styles.overflowText}>+{extraSkills}</Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.colDivider} />

        {/* Role */}
        <View style={styles.infoCol}>
          <Text style={styles.infoLabel}>Role</Text>
          <Text style={styles.roleType} numberOfLines={2}>{user.roleType}</Text>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
    borderRadius: 22,
    overflow: 'hidden',
  },

  // Hero image area
  heroWrap: {
    height: HERO_H,
    backgroundColor: Colors.bgSurface,
  },
  topScrim: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    height: 100,
  },
  bottomScrim: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    height: 130,
  },

  // Header overlaid at image top
  headerOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 8,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  nameBlock: {
    gap: 1,
    flex: 1,
  },
  nameLine: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  name: {
    color: Colors.textPrimary,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: -0.2,
    flexShrink: 1,
  },
  role: {
    color: 'rgba(255,255,255,0.65)',
    fontSize: 11,
  },
  connectionsBlock: {
    alignItems: 'flex-end',
    gap: 1,
    backgroundColor: 'rgba(18,13,12,0.54)',
    borderRadius: 14,
    paddingHorizontal: 13,
    paddingVertical: 8,
  },
  mirraIcon: {
    width: 14,
    height: 14,
    marginBottom: 1,
  },
  connectionsCount: {
    color: Colors.textPrimary,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: -0.3,
    textAlign: 'right',
  },
  connectionsLabel: {
    color: 'rgba(255,255,255,0.55)',
    fontSize: 9,
    textAlign: 'right',
  },

  // Pagination dots
  dotsRow: {
    position: 'absolute',
    bottom: 88,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: 'rgba(255,255,255,0.35)',
  },
  dotActive: {
    width: 14,
    backgroundColor: Colors.textPrimary,
  },

  // Bottom of image: location + buttons
  imageBottom: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    paddingHorizontal: 12,
    paddingBottom: 12,
    gap: 8,
  },
  locationPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignSelf: 'flex-start',
    maxWidth: '90%',
  },
  locationGlow: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.accent,
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.95,
    shadowRadius: 7,
  },
  locationText: {
    color: Colors.textPrimary,
    fontSize: 11,
    fontWeight: '500',
  },
  imageActions: {
    flexDirection: 'row',
    gap: 8,
  },
  connectBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
  },
  dmBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 22,
  },
  btnText: {
    color: Colors.textPrimary,
    fontSize: 13,
    fontWeight: '500',
  },

  // Info tray
  infoTray: {
    flexDirection: 'row',
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 0,
    backgroundColor: 'rgba(255,255,255,0.045)',
  },
  infoCol: {
    flex: 1,
    gap: 5,
  },
  colDivider: {
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.07)',
    marginHorizontal: 10,
  },
  infoLabel: {
    color: Colors.textTertiary,
    fontSize: 9,
    fontWeight: '600',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flexWrap: 'nowrap',
  },
  emojiBubble: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 13,
  },
  overflow: {
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  overflowText: {
    color: Colors.textSecondary,
    fontSize: 10,
    fontWeight: '600',
  },
  roleType: {
    color: Colors.textPrimary,
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 16,
  },
});
