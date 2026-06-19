import React from 'react';
import { View, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GlassView } from '@/components/ui/GlassView';
import { GlowDot } from '@/components/ui/GlowAccent';
import { Colors } from '@/constants/colors';
import { Spacing, Radius } from '@/constants/spacing';

export interface TabItem {
  key: string;
  icon: React.ReactNode;
  label?: string;
}

interface TabBarProps {
  tabs: TabItem[];
  activeKey: string;
  onPress: (key: string) => void;
  style?: ViewStyle;
}

/**
 * Shared footer tab bar. Floats above the safe-area with glass backing.
 * Replace icon props with whatever icon library the Figma uses.
 */
export function TabBar({ tabs, activeKey, onPress, style }: TabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrapper, { paddingBottom: insets.bottom || Spacing[4] }, style]}>
      <GlassView variant="pill" style={styles.bar}>
        {tabs.map((tab) => {
          const isActive = tab.key === activeKey;
          return (
            <TouchableOpacity
              key={tab.key}
              style={styles.tab}
              onPress={() => onPress(tab.key)}
              activeOpacity={0.7}
            >
              <View style={styles.iconWrap}>
                {tab.icon}
                {isActive && <GlowDot style={styles.activeDot} />}
              </View>
            </TouchableOpacity>
          );
        })}
      </GlassView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: Spacing[5],
  },
  bar: {
    flexDirection: 'row',
    paddingVertical: Spacing[3],
    paddingHorizontal: Spacing[4],
    gap: Spacing[2],
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
  },
  iconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  activeDot: {
    marginTop: 2,
  },
});
