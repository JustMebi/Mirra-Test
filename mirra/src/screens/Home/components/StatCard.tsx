import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { glass } from '@/styles/glass';
import { Colors } from '@/constants/colors';
import type { Stat } from '@/data/mock';

interface StatCardProps {
  stat: Stat;
}

export function StatCard({ stat }: StatCardProps) {
  return (
    <View style={[glass.base, styles.card]}>
      <Text style={styles.value}>{stat.value}</Text>
      <Text style={styles.label} numberOfLines={1}>{stat.label}</Text>
      <View style={styles.metaRow}>
        <Text style={styles.period} numberOfLines={1}>{stat.period}</Text>
        <View style={[styles.growthBadge, stat.positive ? styles.growthPos : styles.growthNeg]}>
          <Text style={[styles.growthText, { color: stat.positive ? Colors.success : Colors.error }]}>
            {stat.growth}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 14,
    padding: 12,
    paddingBottom: 10,
    gap: 3,
  },
  value: {
    color: Colors.textPrimary,
    fontSize: 26,
    fontWeight: '700',
    letterSpacing: -0.5,
    lineHeight: 30,
  },
  label: {
    color: Colors.textSecondary,
    fontSize: 8.5,
    fontWeight: '600',
    letterSpacing: 0.6,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flexWrap: 'wrap',
  },
  period: {
    color: Colors.textTertiary,
    fontSize: 8.5,
    flex: 1,
  },
  growthBadge: {
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 1,
  },
  growthPos: {
    backgroundColor: 'rgba(74, 222, 128, 0.15)',
  },
  growthNeg: {
    backgroundColor: 'rgba(248, 113, 113, 0.15)',
  },
  growthText: {
    fontSize: 8.5,
    fontWeight: '700',
  },
});
