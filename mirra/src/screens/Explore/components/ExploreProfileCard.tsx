import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { PulsingDot } from '@/components/ui/PulsingDot';
import { AppIcon, AppIconName } from '@/components/ui/AppIcon';
import { Colors } from '@/constants/colors';
import { MediaAssets } from '@/constants/assets';
import { HeroMedia } from '@/components/ui/HeroMedia';
import type { User } from '@/data/mock';

const MAX_ICONS = 3;

interface ExploreProfileCardProps {
  user: User;
  isActive?: boolean;
  style?: object;
}

export const ExploreProfileCard = React.memo(function ExploreProfileCard({ user, isActive = true, style }: ExploreProfileCardProps) {
  const heroMedia = user.heroMedia ?? { type: 'image' as const, source: user.heroImage };
  const extraInterests = Math.max(0, user.interests.length - MAX_ICONS);
  const extraSkills = Math.max(0, user.proSkills.length - MAX_ICONS);
  const mediaPosition = getExploreMediaPosition(user.id);
  const mediaResizeMode = user.id === 'u4' ? 'contain' : 'cover';

  return (
    <View style={[styles.card, style]}>
      <HeroMedia
        media={heroMedia}
        isActive={isActive}
        posterUri={user.heroImage}
        contentPosition={mediaPosition}
        resizeMode={mediaResizeMode}
      />

      <LinearGradient
        colors={['rgba(0,0,0,0.01)', 'rgba(0,0,0,0.80)']}
        style={styles.topBlur}
        pointerEvents="none"
      />
      <LinearGradient
        colors={['rgba(0,0,0,0.01)', 'rgba(0,0,0,0.80)']}
        style={styles.bottomBlur}
        pointerEvents="none"
      />

      <View style={styles.topContent}>
        <View style={styles.identity}>
          <Image source={user.avatar} style={styles.avatar} resizeMode="cover" />
          <View style={styles.nameBlock}>
            <View style={styles.nameLine}>
              <Text style={styles.name} numberOfLines={1}>{user.name}</Text>
              {user.verified && <AppIcon name="verified" size={12} />}
            </View>
            <Text style={styles.role} numberOfLines={1}>{user.role}</Text>
          </View>
        </View>

        <View style={styles.statsBar}>
          <Image source={MediaAssets.images.mirraLogoBigger} style={styles.statsLogo} resizeMode="contain" />
          <View style={styles.statsTextBlock}>
            <Text style={styles.connectionsCount}>{user.connections}</Text>
            <Text style={styles.connectionsLabel}>Connections</Text>
          </View>
        </View>
      </View>

      <View style={styles.bottomContent}>
        <View style={styles.indicatorBlock}>
          <View style={styles.indicators}>
            <View style={styles.indicatorActive} />
            <View style={[styles.indicatorDot, { width: 6, height: 6, borderRadius: 3 }]} />
            <View style={[styles.indicatorDot, { width: 5, height: 5, borderRadius: 2.5 }]} />
          </View>
        </View>

        <View style={styles.locationPill}>
          <PulsingDot size={6} />
          <AppIcon name="navigation" size={14} color="rgba(255,255,255,0.80)" />
          <Text style={styles.locationText} numberOfLines={1}>{user.location}</Text>
        </View>

        <View style={styles.imageActions}>
          <TouchableOpacity style={styles.connectBtn} activeOpacity={0.7}>
            <AppIcon name="person-add" size={16} color={Colors.textPrimary} strokeWidth={1.5} />
            <Text style={styles.btnText}>Connect</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dmBtn} activeOpacity={0.7}>
            <AppIcon name="send" size={16} color={Colors.textPrimary} />
            <Text style={styles.btnText}>DM</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoTray}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.infoRail}
          >
            <EmojiSection
              title="Interests"
              items={user.interests.map((interest) => interest.image)}
              extra={extraInterests}
            />
            <EmojiSection
              title="Pro Skills"
              items={user.proSkills.map((skill) => skill.image)}
              extra={extraSkills}
            />
            <MetadataSection title="Role" icon="user" value={user.roleType ?? user.role} />
            <MetadataSection title="Education" icon="book-open" value={getEducationLabel(user.id)} />
          </ScrollView>
        </View>
      </View>
    </View>
  );
});

function EmojiSection({
  title,
  items,
  extra,
}: {
  title: string;
  items: any[];
  extra: number;
}) {
  const shown = items.slice(0, MAX_ICONS);

  return (
    <View style={styles.emojiSection}>
      <Text style={styles.metaTitle}>{title}</Text>
      <View style={styles.crisscrossRow}>
        {shown.map((image, index) => {
          const rotate = index % 2 === 0 ? '15deg' : '-14deg';
          const counterRotate = index % 2 === 0 ? '-15deg' : '14deg';

          return (
            <View
              key={index}
              style={[
                styles.crisscrossSquare,
                index > 0 && styles.crisscrossOverlap,
                { transform: [{ rotate }] },
              ]}
            >
              <View style={styles.emojiDot} />
              <Image
                source={image}
                style={[styles.crisscrossEmoji, { transform: [{ rotate: counterRotate }] }]}
                resizeMode="contain"
              />
            </View>
          );
        })}

        {extra > 0 && (
          <View
            style={[
              styles.crisscrossSquare,
              styles.crisscrossOverlap,
              { transform: [{ rotate: '-14deg' }] },
            ]}
          >
            <Text style={[styles.extraText, { transform: [{ rotate: '14deg' }] }]}>+{extra}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

function MetadataSection({
  title,
  icon,
  value,
}: {
  title: string;
  icon: AppIconName;
  value: string;
}) {
  return (
    <View style={styles.metadataSection}>
      <Text style={styles.metaTitle}>{title}</Text>
      <View style={styles.metadataPill}>
        <AppIcon name={icon} size={14} color="rgba(255,255,255,0.60)" strokeWidth={1.2} />
        <Text style={styles.metadataText} numberOfLines={1}>{value}</Text>
      </View>
    </View>
  );
}

function getExploreMediaPosition(userId: string) {
  switch (userId) {
    case 'u1':
      return 'center 34%';
    case 'u2':
      return 'center 30%';
    case 'u3':
      return 'center 26%';
    case 'u4':
      return 'center 38%';
    case 'u5':
      return 'center 28%';
    case 'u6':
      return 'center 34%';
    case 'u7':
      return 'center 32%';
    default:
      return 'center 35%';
  }
}

function getEducationLabel(userId: string) {
  switch (userId) {
    case 'u1':
      return 'University of Texas';
    case 'u2':
      return 'San Diego State University';
    case 'u3':
      return 'Bastyr University';
    case 'u4':
      return 'UC San Diego';
    case 'u5':
      return 'Stanford University';
    case 'u6':
      return 'San Francisco State';
    case 'u7':
      return 'Academy of Art University';
    default:
      return 'Mirra Network';
  }
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: 510,
    justifyContent: 'space-between',
    borderRadius: 24,
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.10)',
    overflow: 'hidden',
    backgroundColor: Colors.bgSurface,
  },
  topBlur: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 80,
    transform: [{ rotate: '180deg' }],
  },
  bottomBlur: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 180,
  },
  topContent: {
    width: '100%',
    height: 38,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  identity: {
    flex: 1,
    maxWidth: 260,
    height: 38,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 4,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.20)',
  },
  nameBlock: {
    flex: 1,
    minWidth: 0,
    height: 38,
    paddingBottom: 4,
  },
  nameLine: {
    height: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  name: {
    color: Colors.textPrimary,
    fontSize: 16,
    lineHeight: 17.6,
    fontWeight: '600',
    flexShrink: 1,
  },
  role: {
    color: 'rgba(255,255,255,0.60)',
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
  },
  statsBar: {
    width: 114,
    height: 38,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingTop: 4,
    paddingRight: 12,
    paddingBottom: 4,
    paddingLeft: 16,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  statsLogo: {
    width: 20,
    height: 20,
  },
  statsTextBlock: {
    width: 58,
    height: 30,
    justifyContent: 'center',
  },
  connectionsCount: {
    color: Colors.textPrimary,
    fontSize: 14,
    lineHeight: 16,
    fontWeight: '600',
    letterSpacing: -0.24,
  },
  connectionsLabel: {
    color: 'rgba(255,255,255,0.80)',
    fontSize: 10,
    lineHeight: 14,
    fontWeight: '500',
  },
  bottomContent: {
    width: '100%',
    height: 181,
    gap: 4,
  },
  indicatorBlock: {
    width: '100%',
    height: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicators: {
    height: 22,
    minWidth: 74,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  indicatorActive: {
    width: 16,
    height: 6,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.80)',
  },
  indicatorDot: {
    backgroundColor: 'rgba(255,255,255,0.20)',
  },
  locationPill: {
    width: '100%',
    height: 34,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 24,
  },
  locationText: {
    color: 'rgba(255,255,255,0.80)',
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '600',
    flexShrink: 1,
  },
  imageActions: {
    width: '100%',
    height: 36,
    flexDirection: 'row',
    gap: 4,
  },
  connectBtn: {
    flex: 1,
    height: 36,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.05)',
    backgroundColor: 'rgba(255,255,255,0.05)',
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.10,
    shadowRadius: 0,
  },
  dmBtn: {
    flex: 1,
    height: 36,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.05)',
    backgroundColor: 'rgba(255,255,255,0.05)',
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.10,
    shadowRadius: 0,
  },
  btnText: {
    color: 'rgba(255,255,255,0.80)',
    fontSize: 12,
    lineHeight: 12,
    fontWeight: '400',
    textAlign: 'center',
  },
  infoTray: {
    width: '100%',
    height: 77,
    gap: 2,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.07)',
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.10,
    shadowRadius: 0,
    overflow: 'hidden',
  },
  infoRail: {
    minHeight: 77,
    flexDirection: 'row',
    gap: 8,
    paddingTop: 8,
    paddingRight: 12,
    paddingBottom: 4,
    paddingLeft: 12,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  emojiSection: {
    flexShrink: 0,
    height: 65,
    gap: 4,
  },
  metaTitle: {
    color: 'rgba(255,255,255,0.60)',
    fontSize: 10,
    lineHeight: 12,
    fontWeight: '400',
    letterSpacing: -0.08,
  },
  crisscrossRow: {
    height: 49,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 3,
  },
  crisscrossSquare: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 2.5,
    paddingRight: 5,
    paddingBottom: 2.5,
    paddingLeft: 5,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  crisscrossOverlap: {
    marginLeft: -6,
  },
  crisscrossEmoji: {
    width: 22,
    height: 22,
  },
  emojiDot: {
    position: 'absolute',
    top: 6,
    left: 7,
    width: 4,
    height: 4,
    borderRadius: 2,
    borderWidth: 0.15,
    borderColor: Colors.accent,
    backgroundColor: Colors.accent,
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
  },
  extraText: {
    color: 'rgba(255,255,255,0.80)',
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '700',
  },
  metadataSection: {
    minWidth: 132,
    maxWidth: 220,
    flexShrink: 0,
    height: 56,
    gap: 4,
  },
  metadataPill: {
    minWidth: 132,
    maxWidth: 220,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingTop: 2.5,
    paddingRight: 12,
    paddingBottom: 2.5,
    paddingLeft: 12,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  metadataText: {
    flex: 1,
    color: 'rgba(255,255,255,0.60)',
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
  },
});
