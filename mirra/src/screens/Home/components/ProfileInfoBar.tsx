import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, FontAwesome, Feather } from '@expo/vector-icons';
import { glass } from '@/styles/glass';
import { Colors } from '@/constants/colors';
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
            <Ionicons name="checkmark-circle" size={15} color="#4A9EFF" />
          </View>
          <Text style={styles.role}>{user.role}</Text>
        </View>

        <View style={styles.followersBlock}>
          <Text style={styles.followersCount}>{user.followersFormatted}</Text>
          <Text style={styles.followersLabel}>Followers</Text>
          <FontAwesome name="instagram" size={11} color="#C13584" style={styles.socialIcon} />
        </View>
      </View>

      {/* Action buttons */}
      <View style={styles.actionsRow}>
        {ACTIONS.map(({ icon, label }) => (
          <TouchableOpacity key={label} style={[glass.pill, styles.actionBtn]} activeOpacity={0.7}>
            <Feather name={icon as any} size={12} color={Colors.textSecondary} />
            <Text style={styles.actionText}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const ACTIONS = [
  { icon: 'eye', label: 'View Profile' },
  { icon: 'layers', label: 'All Cards' },
  { icon: 'share-2', label: 'Share' },
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
