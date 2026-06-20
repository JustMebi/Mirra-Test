import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from '@/components/ui/Text';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SearchButton } from '@/components/ui/SearchButton';
import { Colors } from '@/constants/colors';
import { MediaAssets } from '@/constants/assets';

export function ExploreNavBar() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      <View style={styles.headerBlock}>
        <View style={styles.titleRow}>
          <View style={styles.titleGroup}>
            <Image source={MediaAssets.images.mirraLogo} style={styles.logo} resizeMode="contain" />
            <Text style={styles.title} numberOfLines={1}>MIRRA Network</Text>
            <View style={styles.countBadge}>
              <Text style={styles.countText}>120k</Text>
            </View>
          </View>

          <SearchButton />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    backgroundColor: Colors.bg,
  },
  headerBlock: {
    width: '100%',
    maxWidth: 408,
    height: 44,
    alignSelf: 'center',
  },
  titleRow: {
    width: '100%',
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
  },
  titleGroup: {
    flex: 1,
    height: 26,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    minWidth: 0,
  },
  logo: {
    width: 24,
    height: 24,
  },
  title: {
    color: Colors.textPrimary,
    fontSize: 24,
    lineHeight: 26.4,
    fontWeight: '500',
    letterSpacing: -0.2,
    flexShrink: 1,
  },
  countBadge: {
    width: 44,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 1,
    paddingRight: 7,
    paddingBottom: 2,
    paddingLeft: 7,
    borderRadius: 16,
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.05)',
    backgroundColor: 'rgba(255,255,255,0.10)',
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.10,
    shadowRadius: 0,
  },
  countText: {
    color: 'rgba(255,255,255,0.80)',
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
