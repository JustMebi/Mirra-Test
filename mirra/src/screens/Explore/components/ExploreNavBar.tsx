import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { glass } from '@/styles/glass';
import { Colors, Gradients, GradientDir } from '@/constants/colors';
import { glow } from '@/styles/glow';
import { MediaAssets } from '@/constants/assets';

export function ExploreNavBar() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 6 }]}>
      <View style={styles.row}>
        {/* Logo + title */}
        <View style={styles.titleGroup}>
          <Image source={MediaAssets.images.mirraLogo} style={styles.logo} resizeMode="contain" />
          <Text style={styles.title}>
            <Text style={styles.titleBold}>MIRRA </Text>
            <Text style={styles.titleLight}>Network</Text>
          </Text>
          <View style={[glass.pill, styles.countBadge]}>
            <Text style={styles.countText}>120k</Text>
          </View>
        </View>

        {/* Search — blue gradient pill */}
        <TouchableOpacity activeOpacity={0.8} style={glow.blueShadow}>
          <LinearGradient
            colors={Gradients.blue}
            {...GradientDir.diagonal}
            style={styles.searchBtn}
          >
            <Feather name="search" size={16} color="#fff" />
            <Feather name="zap" size={9} color="#fff" style={styles.searchSparkle} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 10,
    backgroundColor: Colors.bg,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logo: {
    width: 22,
    height: 22,
  },
  title: {
    fontSize: 23,
    letterSpacing: -0.3,
  },
  titleBold: {
    color: Colors.textPrimary,
    fontWeight: '800',
  },
  titleLight: {
    color: Colors.textPrimary,
    fontWeight: '400',
  },
  countBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  countText: {
    color: Colors.textSecondary,
    fontSize: 11,
    fontWeight: '600',
  },
  searchBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchSparkle: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
});
