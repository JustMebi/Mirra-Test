import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Colors } from '@/constants/colors';
import { mockUsers } from '@/data/mock';
import { ExploreNavBar } from './components/ExploreNavBar';
import { LocationFilterBar } from './components/LocationFilterBar';
import { InterestFilterTags } from './components/InterestFilterTags';
import { ExploreProfileCard } from './components/ExploreProfileCard';

const { height: SCREEN_H } = Dimensions.get('window');

export function ExploreScreen() {
  const [viewMode, setViewMode] = useState<'card' | 'map'>('card');
  const [activeFilter, setActiveFilter] = useState<string | undefined>(undefined);

  // Logan is front card (index 0), Darin is peek card (index 3)
  const frontUser = mockUsers[0];
  const peekUser = mockUsers[3];

  return (
    <View style={styles.root}>
      <ExploreNavBar />
      <LocationFilterBar viewMode={viewMode} onViewModeChange={setViewMode} />
      <InterestFilterTags active={activeFilter} onSelect={setActiveFilter} />

      {/* Card stack */}
      <View style={styles.stack}>
        {/* Front card */}
        <ExploreProfileCard user={frontUser} isActive style={styles.frontCard} />

        {/* Peek card — clipped to header height, shown below front card */}
        <View style={styles.peekWrap}>
          <ExploreProfileCard user={peekUser} isActive={false} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  stack: {
    flex: 1,
    paddingHorizontal: 16,
    position: 'relative',
    paddingBottom: 108,
  },
  frontCard: {
    zIndex: 2,
  },
  peekWrap: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 88,
    height: 142,
    overflow: 'hidden',
    borderRadius: 24,
    zIndex: 1,
    opacity: 0.88,
  },
});
