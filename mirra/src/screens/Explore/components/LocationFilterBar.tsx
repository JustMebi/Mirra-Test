import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from '@/components/ui/Text';
import { LinearGradient } from 'expo-linear-gradient';
import { AppIcon } from '@/components/ui/AppIcon';
import { SegmentedTabs, SegmentedTabItem } from '@/components/ui/SegmentedTabs';
import { Gradients, GradientDir } from '@/constants/colors';

type ViewMode = 'card' | 'map';

interface LocationFilterBarProps {
  location?: string;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

const VIEW_MODES: Array<SegmentedTabItem<ViewMode>> = [
  { value: 'card', icon: 'card', label: 'Card' },
  { value: 'map', icon: 'crosshair', label: 'Map' },
];

export function LocationFilterBar({
  location = 'Mission Beach, San Diego',
  viewMode,
  onViewModeChange,
}: LocationFilterBarProps) {
  return (
    <View style={styles.outer}>
      <View style={styles.row}>
        <TouchableOpacity style={styles.locationInput} activeOpacity={0.7}>
          <AppIcon name="target" size={16} color="rgba(255,255,255,0.62)" strokeWidth={1.3} />
          <Text style={styles.locationText} numberOfLines={1}>{location}</Text>
        </TouchableOpacity>

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

        <TouchableOpacity activeOpacity={0.7} style={styles.sortBtn}>
            <AppIcon name="sort-lines" size={16} color="rgba(255,255,255,0.62)" strokeWidth={1.35} />
        </TouchableOpacity>
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
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    width: '100%',
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  row: {
    width: '100%',
    maxWidth: 408,
    height: 32,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  locationInput: {
    flex: 1,
    minWidth: 0,
    height: 32,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingLeft: 12,
    paddingRight: 2,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.05)',
    backgroundColor: 'rgba(255,255,255,0.05)',
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.10,
    shadowRadius: 0,
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
    shadowOpacity: 0.72,
    shadowRadius: 6,
    elevation: 6,
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
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.10,
    shadowRadius: 0,
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
    width: 130,
    borderRadius: 10,
  },
});
