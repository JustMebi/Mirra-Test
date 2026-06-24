import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from '@/components/ui/Text';
import { LinearGradient } from 'expo-linear-gradient';
import { AppIcon } from '@/components/ui/AppIcon';
import { FrostedGlassPressable } from '@/components/ui/FrostedGlassPressable';
import { SegmentedTabs, SegmentedTabItem } from '@/components/ui/SegmentedTabs';
import { Gradients, GradientDir } from '@/constants/colors';

export type ViewMode = 'grid' | 'list' | 'map';

interface ContactFilterRowProps {
  location?: string;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

const VIEW_MODES: Array<SegmentedTabItem<ViewMode>> = [
  { value: 'grid', icon: 'grid', label: 'Grid' },
  { value: 'list', icon: 'list', label: 'List' },
  { value: 'map', icon: 'crosshair', label: 'Map' },
];

export function ContactFilterRow({
  location = 'Mission Beach, San Diego',
  viewMode,
  onViewModeChange,
}: ContactFilterRowProps) {
  return (
    <View style={styles.row}>
      <FrostedGlassPressable
        style={styles.locationInput}
        contentStyle={styles.locationInputContent}
        borderRadius={10}
        frostLevel="regular"
        variant="border"
        blurVariant="rimOnly"
      >
        <AppIcon name="target" size={16} color="rgba(255,255,255,0.62)" strokeWidth={1.3} />
        <Text style={styles.locationText} numberOfLines={1}>
          {location}
        </Text>
      </FrostedGlassPressable>

      <View style={styles.actions}>
        <TouchableOpacity activeOpacity={0.8} style={styles.filterGlow}>
          <LinearGradient
            colors={Gradients.blue}
            {...GradientDir.diagonal}
            style={styles.filterBorder}
          >
            <View style={styles.filterBtn}>
              <AppIcon name="filter" size={16} color="#FFFFFF" strokeWidth={1.5} />
            </View>
          </LinearGradient>
        </TouchableOpacity>

        <FrostedGlassPressable
          style={styles.sortBtn}
          contentStyle={styles.sortBtnContent}
          borderRadius={10}
          frostLevel="regular"
          variant="border"
          blurVariant="rimOnly"
        >
          <AppIcon name="sort-lines" size={16} color="rgba(255,255,255,0.62)" strokeWidth={1.35} />
        </FrostedGlassPressable>
      </View>

      <View style={styles.dividerWrap}>
        <LinearGradient
          colors={['rgba(255,255,255,0.01)', 'rgba(255,255,255,0.80)', 'rgba(255,255,255,0.01)']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.divider}
        />
      </View>

      <SegmentedTabs
        value={viewMode}
        tabs={VIEW_MODES}
        onChange={onViewModeChange}
        size="small"
        style={styles.toggle}
        borderRadius={10}
        iconSize={16}
        blurVariant="rimOnly"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    width: '100%',
    height: 32,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  locationInput: {
    flex: 1,
    height: 32,
    borderRadius: 10,
  },
  locationInputContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingLeft: 12,
    paddingRight: 2,
  },
  locationText: {
    flex: 1,
    color: 'rgba(255,255,255,0.50)',
    fontSize: 11,
    fontWeight: '500',
  },
  actions: {
    width: 72,
    height: 32,
    flexDirection: 'row',
    gap: 8,
  },
  filterGlow: {
    width: 32,
    height: 32,
    borderRadius: 10,
    shadowColor: '#26B7FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 8,
  },
  filterBorder: {
    width: 32,
    height: 32,
    borderRadius: 10,
    padding: 1,
  },
  filterBtn: {
    flex: 1,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1A1A1A',
  },
  sortBtn: {
    width: 32,
    height: 32,
    borderRadius: 10,
  },
  sortBtnContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  dividerWrap: {
    width: 1,
    height: 32,
    opacity: 0.2,
    overflow: 'hidden',
  },
  divider: {
    position: 'absolute',
    width: 32,
    height: 1,
    left: -15.5,
    top: 15.5,
    transform: [{ rotate: '90deg' }],
  },
  toggle: {
    flex: 1,
    minWidth: 160,
    borderRadius: 10,
  },
});
