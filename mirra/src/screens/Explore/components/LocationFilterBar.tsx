import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { glass } from '@/styles/glass';
import { Colors, Gradients, GradientDir } from '@/constants/colors';
import { glow } from '@/styles/glow';

type ViewMode = 'card' | 'map';

interface LocationFilterBarProps {
  location?: string;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  filterActive?: boolean;
}

export function LocationFilterBar({
  location = 'Mission Beach, San Diego',
  viewMode,
  onViewModeChange,
  filterActive = true,
}: LocationFilterBarProps) {
  return (
    <View style={styles.row}>

      {/* Location pill */}
      <TouchableOpacity style={[glass.pill, styles.locationPill]} activeOpacity={0.7}>
        <Feather name="map-pin" size={11} color={Colors.textSecondary} />
        <Text style={styles.locationText} numberOfLines={1}>{location}</Text>
      </TouchableOpacity>

      {/* Active filter button — blue glow when active */}
      <TouchableOpacity
        activeOpacity={0.8}
        style={filterActive ? glow.blueShadow : undefined}
      >
        {filterActive ? (
          <LinearGradient
            colors={Gradients.blue}
            {...GradientDir.diagonal}
            style={styles.filterBtn}
          >
            <Feather name="filter" size={13} color="#fff" />
          </LinearGradient>
        ) : (
          <View style={[glass.pill, styles.filterBtn]}>
            <Feather name="filter" size={13} color={Colors.textSecondary} />
          </View>
        )}
      </TouchableOpacity>

      {/* Sort / list button */}
      <TouchableOpacity style={[glass.pill, styles.iconBtn]} activeOpacity={0.7}>
        <Feather name="list" size={13} color={Colors.textSecondary} />
      </TouchableOpacity>

      {/* Card / Map segmented control */}
      <View style={[glass.pill, styles.toggle]}>
        <TouchableOpacity
          style={[styles.toggleBtn, viewMode === 'card' && styles.toggleActive]}
          onPress={() => onViewModeChange('card')}
          activeOpacity={0.7}
        >
          <Feather name="credit-card" size={11} color={viewMode === 'card' ? Colors.textPrimary : Colors.textSecondary} />
          <Text style={[styles.toggleText, viewMode === 'card' && styles.toggleTextActive]}>Card</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleBtn, viewMode === 'map' && styles.toggleActive]}
          onPress={() => onViewModeChange('map')}
          activeOpacity={0.7}
        >
          <Feather name="crosshair" size={11} color={viewMode === 'map' ? Colors.textPrimary : Colors.textSecondary} />
          <Text style={[styles.toggleText, viewMode === 'map' && styles.toggleTextActive]}>Map</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  locationPill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 11,
    paddingVertical: 8,
  },
  locationText: {
    color: Colors.textSecondary,
    fontSize: 11.5,
    flex: 1,
  },
  filterBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggle: {
    flexDirection: 'row',
    padding: 3,
    gap: 2,
  },
  toggleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  toggleActive: {
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  toggleText: {
    color: Colors.textSecondary,
    fontSize: 11,
    fontWeight: '500',
  },
  toggleTextActive: {
    color: Colors.textPrimary,
    fontWeight: '600',
  },
});
