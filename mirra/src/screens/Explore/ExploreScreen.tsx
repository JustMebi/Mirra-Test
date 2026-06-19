import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Colors } from '@/constants/colors';
import { mockUsers } from '@/data/mock';
import { ExploreNavBar } from './components/ExploreNavBar';
import { LocationFilterBar } from './components/LocationFilterBar';
import { InterestFilterTags } from './components/InterestFilterTags';
import { ExploreProfileCard } from './components/ExploreProfileCard';

export function ExploreScreen() {
  const [viewMode, setViewMode] = useState<'card' | 'map'>('card');
  const [activeFilter, setActiveFilter] = useState<string | undefined>(undefined);

  return (
    <View style={styles.root}>
      <View style={styles.headerArea}>
        <ExploreNavBar />
        <View style={styles.filterBlock}>
          <LocationFilterBar viewMode={viewMode} onViewModeChange={setViewMode} />
          <InterestFilterTags active={activeFilter} onSelect={setActiveFilter} />
        </View>
      </View>

      <FlatList
        data={mockUsers}
        keyExtractor={(user) => user.id}
        renderItem={({ item, index }) => (
          <ExploreProfileCard user={item} isActive={index === 0} />
        )}
        contentContainerStyle={styles.feed}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.bg,
    gap: 16,
  },
  headerArea: {
    gap: 24,
  },
  filterBlock: {
    height: 80,
    gap: 16,
  },
  feed: {
    width: '100%',
    maxWidth: 408,
    alignSelf: 'center',
    gap: 20,
    paddingBottom: 108,
  },
});
