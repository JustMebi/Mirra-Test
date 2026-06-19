import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { glass } from '@/styles/glass';
import { Colors, Gradients, GradientDir } from '@/constants/colors';
import { mockCurrentUser } from '@/data/mock';

export function HomeNavBar() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 6 }]}>
      <View style={styles.row}>
        <View style={styles.leftGroup}>
          <TouchableOpacity style={[glass.pill, styles.pill]} activeOpacity={0.7}>
            <Ionicons name="sparkles-outline" size={12} color={Colors.textSecondary} />
            <Text style={styles.pillText}>Train AI Chat</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[glass.pill, styles.pill]} activeOpacity={0.7}>
            <Feather name="edit-2" size={12} color={Colors.textSecondary} />
            <Text style={styles.pillText}>Edit</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.rightGroup}>
          <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
            <Feather name="sliders" size={16} color={Colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
            <View>
              <Feather name="bell" size={17} color={Colors.textPrimary} />
              <LinearGradient
                colors={Gradients.accent}
                {...GradientDir.vertical}
                style={styles.bellBadge}
              >
                <Text style={styles.bellBadgeText}>2</Text>
              </LinearGradient>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
            {/* Story ring: gradient approximated with solid accent */}
            <LinearGradient
              colors={Gradients.accent}
              {...GradientDir.vertical}
              style={styles.storyRing}
            >
              <Image source={mockCurrentUser.avatar} style={styles.storyAvatar} />
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
            <Feather name="more-vertical" size={17} color={Colors.textSecondary} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: Colors.bg,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  pillText: {
    color: Colors.textSecondary,
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: -0.2,
  },
  rightGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  iconBtn: {
    minWidth: 36,
    minHeight: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.045)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bellBadge: {
    position: 'absolute',
    top: -3,
    right: -3,
    width: 14,
    height: 14,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: Colors.bg,
  },
  bellBadgeText: {
    color: Colors.bg,
    fontSize: 7,
    fontWeight: '800',
  },
  storyRing: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2,
  },
  storyAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
});
