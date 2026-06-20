import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from '@/components/ui/Text';
import { AppIcon, AppIconName } from '@/components/ui/AppIcon';
import { glass } from '@/styles/glass';
import { Colors } from '@/constants/colors';
import { MediaAssets } from '@/constants/assets';
import type { User } from '@/data/mock';

interface ProfileInfoBarProps {
  user: User;
}

export function ProfileInfoBar({ user }: ProfileInfoBarProps) {
  return (
    <View style={styles.wrapper}>
      {/* Name / role / followers row */}
      <View style={styles.topRow}>
        <Image source={user.avatar} style={styles.avatar} />

        <View style={styles.nameBlock}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{user.name}</Text>
            <AppIcon name="verified" size={15} />
          </View>
          <Text style={styles.role}>{user.role}</Text>
        </View>

        <View style={styles.followersBlock}>
          <Text style={styles.followersCount}>{user.followersFormatted}</Text>
          <Text style={styles.followersLabel}>Followers</Text>
          <View style={styles.socialIcon}>
            <Image source={MediaAssets.images.instagram} style={styles.instagramIcon} resizeMode="contain" />
          </View>
        </View>
      </View>

      {/* Action buttons */}
      <View style={styles.actionsRow}>
        {ACTIONS.map(({ icon, label }) => (
          <TouchableOpacity key={label} style={[glass.pill, styles.actionBtn]} activeOpacity={0.7}>
            <AppIcon name={icon} size={12} color={Colors.textSecondary} strokeWidth={1.5} />
            <Text style={styles.actionText}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const ACTIONS: Array<{ icon: AppIconName; label: string }> = [
  { icon: 'eye', label: 'View Profile' },
  { icon: 'layers', label: 'All Cards' },
  { icon: 'share', label: 'Share' },
];

const styles = StyleSheet.create({
  wrapper: {
    gap: 10,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: Colors.glassBorderStrong,
  },
  nameBlock: {
    flex: 1,
    gap: 2,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  name: {
    color: Colors.textPrimary,
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
  role: {
    color: Colors.textSecondary,
    fontSize: 11,
  },
  followersBlock: {
    alignItems: 'flex-end',
    gap: 1,
  },
  followersCount: {
    color: Colors.textPrimary,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  followersLabel: {
    color: Colors.textSecondary,
    fontSize: 10,
  },
  socialIcon: {
    marginTop: 1,
  },
  instagramIcon: {
    width: 11,
    height: 11,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    paddingVertical: 9,
    paddingHorizontal: 4,
  },
  actionText: {
    color: Colors.textSecondary,
    fontSize: 11.5,
    fontWeight: '500',
  },
});
