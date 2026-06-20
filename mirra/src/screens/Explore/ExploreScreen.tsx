import React, { useCallback, useMemo, useRef, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Colors } from '@/constants/colors';
import { mockUsers } from '@/data/mock';
import { ExploreNavBar } from './components/ExploreNavBar';
import { LocationFilterBar } from './components/LocationFilterBar';
import { InterestFilterTags } from './components/InterestFilterTags';
import { ExploreProfileCard } from './components/ExploreProfileCard';

const VIEWABILITY_CONFIG = { itemVisiblePercentThreshold: 60 };

export function ExploreScreen() {
  const [viewMode, setViewMode] = useState<'card' | 'map'>('card');
  const [activeFilter, setActiveFilter] = useState<string | undefined>(undefined);
  const [activeId, setActiveId] = useState<string>(mockUsers[0]?.id ?? '');

  const onViewableItemsChanged = useCallback(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      const topId = viewableItems[0].item.id;
      console.log('[ExploreScreen] visible card:', topId, '— total visible:', viewableItems.length);
      setActiveId(topId);
    }
  }, []);

  const viewabilityConfigCallbackPairs = useRef([
    { viewabilityConfig: VIEWABILITY_CONFIG, onViewableItemsChanged },
  ]);

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
        renderItem={useCallback(({ item }: { item: typeof mockUsers[0] }) => (
          <ExploreProfileCard user={item} isActive={item.id === activeId} />
        ), [activeId])}
        extraData={activeId}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        contentContainerStyle={styles.feed}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews
        maxToRenderPerBatch={2}
        windowSize={3}
        initialNumToRender={2}
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
