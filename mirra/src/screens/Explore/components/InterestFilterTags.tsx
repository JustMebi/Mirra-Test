import React from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AppIcon } from '@/components/ui/AppIcon';
import { Colors } from '@/constants/colors';

const FILTERS = [
  { emoji: '🎾', label: 'Tennis' },
  { emoji: '⛳', label: 'Golf' },
  { emoji: '✈️', label: 'Travel' },
  { emoji: '🎥', label: 'Videography' },
  { emoji: '💻', label: 'Tech' },
];

interface InterestFilterTagsProps {
  active?: string;
  onSelect?: (label: string) => void;
}

export function InterestFilterTags({ active, onSelect }: InterestFilterTagsProps) {
  return (
    <View style={styles.outer}>
      <View style={styles.frame}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.scroll}
          contentContainerStyle={styles.row}
        >
          {FILTERS.map(({ emoji, label }) => {
            const isActive = active === label;
            return (
              <TouchableOpacity
                key={label}
                style={[styles.tag, isActive && styles.tagActive]}
                onPress={() => onSelect?.(label)}
                activeOpacity={0.7}
              >
                <Text style={styles.emoji}>{emoji}</Text>
                <Text style={[styles.label, isActive && styles.labelActive]}>{label}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <TouchableOpacity style={styles.searchBtn} activeOpacity={0.7}>
          <AppIcon name="search" size={15} color="rgba(255,255,255,0.80)" strokeWidth={1.4} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    width: '100%',
    height: 40,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  frame: {
    width: '100%',
    maxWidth: 408,
    height: 40,
    position: 'relative',
  },
  scroll: {
    height: 32,
    flexGrow: 0,
  },
  row: {
    height: 32,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingRight: 48,
  },
  tag: {
    minWidth: 85,
    height: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  tagActive: {
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  emoji: {
    width: 16,
    height: 16,
    fontSize: 14,
    lineHeight: 16,
    textAlign: 'center',
  },
  label: {
    color: 'rgba(255,255,255,0.80)',
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  labelActive: {
    color: Colors.textPrimary,
  },
  searchBtn: {
    position: 'absolute',
    top: -4,
    right: 0,
    width: 40,
    height: 40,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    backgroundColor: 'rgba(255,255,255,0.05)',
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.10,
    shadowRadius: 0,
  },
});
