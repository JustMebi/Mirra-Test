import React, { useCallback, useRef, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Colors } from "@/constants/colors";
import { mockUsers } from "@/data/mock";
import { ExploreNavBar } from "./components/ExploreNavBar";
import { LocationFilterBar } from "./components/LocationFilterBar";
import { InterestFilterTags } from "./components/InterestFilterTags";
import { ExploreProfileCard } from "./components/ExploreProfileCard";

const VIEWABILITY_CONFIG = { itemVisiblePercentThreshold: 60 };
const HEADER_OVERLAY_FALLBACK_HEIGHT = 164;
const HEADER_FEED_GAP = 8;

export function ExploreScreen() {
  const [viewMode, setViewMode] = useState<"card" | "map">("card");
  const [activeFilter, setActiveFilter] = useState<string | undefined>(
    undefined,
  );
  const [activeId, setActiveId] = useState<string>(mockUsers[0]?.id ?? "");
  const [headerHeight, setHeaderHeight] = useState(0);

  const onViewableItemsChanged = useCallback(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      const topId = viewableItems[0].item.id;
      console.log(
        "[ExploreScreen] visible card:",
        topId,
        "— total visible:",
        viewableItems.length,
      );
      setActiveId(topId);
    }
  }, []);

  const viewabilityConfigCallbackPairs = useRef([
    { viewabilityConfig: VIEWABILITY_CONFIG, onViewableItemsChanged },
  ]);
  const feedTopPadding =
    (headerHeight || HEADER_OVERLAY_FALLBACK_HEIGHT) + HEADER_FEED_GAP;

  return (
    <View style={styles.root}>
      <View
        style={styles.headerArea}
        onLayout={(event) => {
          const nextHeight = event.nativeEvent.layout.height;
          setHeaderHeight((current) =>
            Math.abs(current - nextHeight) < 1 ? current : nextHeight,
          );
        }}
      >
        <ExploreNavBar />
        <View style={styles.filterBlock}>
          <LocationFilterBar
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />
          <InterestFilterTags
            active={activeFilter}
            onSelect={setActiveFilter}
          />
        </View>
      </View>

      <FlatList
        data={mockUsers}
        keyExtractor={(user) => user.id}
        renderItem={useCallback(
          ({ item }: { item: (typeof mockUsers)[0] }) => (
            <ExploreProfileCard user={item} isActive={item.id === activeId} />
          ),
          [activeId],
        )}
        extraData={activeId}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        contentContainerStyle={[styles.feed, { paddingTop: feedTopPadding }]}
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
  },
  headerArea: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    gap: 24,
  },
  filterBlock: {
    height: 80,
    gap: 16,
  },
  feed: {
    width: "100%",
    maxWidth: 408,
    alignSelf: "center",
    gap: 20,
    paddingBottom: 108,
  },
});
