import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { glass } from '@/styles/glass';
import { Colors } from '@/constants/colors';

const FILTERS = [
  { emoji: '🎾', label: 'Tennis' },
  { emoji: '⛳', label: 'Golf' },
  { emoji: '✈️', label: 'Travel' },
  { emoji: '🎥', label: 'Videography' },
];

interface InterestFilterTagsProps {
  active?: string;
  onSelect?: (label: string) => void;
}

export function InterestFilterTags({ active, onSelect }: InterestFilterTagsProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
      style={styles.scroll}
    >
      {FILTERS.map(({ emoji, label }) => {
        const isActive = active === label;
        return (
          <TouchableOpacity
            key={label}
            style={[glass.pill, styles.tag, isActive && styles.tagActive]}
            onPress={() => onSelect?.(label)}
            activeOpacity={0.7}
          >
            <Text style={styles.emoji}>{emoji}</Text>
            <Text style={[styles.label, isActive && styles.labelActive]}>{label}</Text>
          </TouchableOpacity>
        );
      })}

      <TouchableOpacity style={[glass.pill, styles.searchTag]} activeOpacity={0.7}>
        <Feather name="search" size={14} color={Colors.textSecondary} />
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 0,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  tagActive: {
    backgroundColor: 'rgba(255,255,255,0.10)',
    borderColor: 'rgba(255,255,255,0.20)',
  },
  emoji: {
    fontSize: 13,
  },
  label: {
    color: Colors.textSecondary,
    fontSize: 12,
    fontWeight: '500',
  },
  labelActive: {
    color: Colors.textPrimary,
  },
  searchTag: {
    paddingHorizontal: 11,
    paddingVertical: 7,
  },
});
