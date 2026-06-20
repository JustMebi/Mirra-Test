import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from '@/components/ui/Text';
import { LinearGradient } from 'expo-linear-gradient';
import { AppIcon, AppIconName } from '@/components/ui/AppIcon';
import { Colors, Gradients, GradientDir } from '@/constants/colors';

export type ViewMode = 'grid' | 'list' | 'map';

interface ContactFilterRowProps {
  location?: string;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

const VIEW_MODES: { key: ViewMode; icon: AppIconName; label: string }[] = [
  { key: 'grid', icon: 'grid', label: 'Grid' },
  { key: 'list', icon: 'list', label: 'List' },
  { key: 'map', icon: 'crosshair', label: 'Map' },
];

export function ContactFilterRow({
  location = 'Mission Beach, San Diego',
  viewMode,
  onViewModeChange,
}: ContactFilterRowProps) {
  return (
    <View style={styles.row}>
      <TouchableOpacity style={styles.locationInput} activeOpacity={0.7}>
        <AppIcon name="target" size={16} color="rgba(255,255,255,0.62)" strokeWidth={1.3} />
        <Text style={styles.locationText} numberOfLines={1}>
          {location}
        </Text>
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

      <View style={styles.toggle}>
        {VIEW_MODES.map(({ key, icon, label }) => {
          const isActive = viewMode === key;
          return (
            <TouchableOpacity
              key={key}
              style={[styles.toggleBtn, isActive && styles.toggleActive]}
              onPress={() => onViewModeChange(key)}
              activeOpacity={0.7}
            >
              <AppIcon
                name={icon}
                size={16}
                color={isActive ? Colors.textPrimary : 'rgba(255,255,255,0.50)'}
                strokeWidth={1.5}
              />
              <Text style={[styles.toggleText, isActive && styles.toggleTextActive]}>{label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
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
    shadowOpacity: 0.95,
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
    flex: 1,
    minWidth: 160,
    height: 32,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.05)',
    padding: 2,
    backgroundColor: 'rgba(255,255,255,0.05)',
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.10,
    shadowRadius: 0,
  },
  toggleBtn: {
    flex: 1,
    height: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  toggleActive: {
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.05)',
    backgroundColor: 'rgba(255,255,255,0.05)',
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.10,
    shadowRadius: 0,
  },
  toggleText: {
    color: 'rgba(255,255,255,0.50)',
    fontSize: 10,
    fontWeight: '500',
    lineHeight: 13.6,
    textAlign: 'center',
  },
  toggleTextActive: {
    color: Colors.textPrimary,
  },
});
