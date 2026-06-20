import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/colors';
import { mockDPConversations, mockDPConversationCount } from '@/data/mock';
import { ElinkActions } from './components/ElinkActions';
import { HeroProfileCard } from './components/HeroProfileCard';
import { DPConversationSection } from './components/DPConversationSection';

export function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.content, { paddingTop: insets.top + 8 }]}
      >
        <ElinkActions />
        <HeroProfileCard />

        <DPConversationSection
          count={mockDPConversationCount}
          conversations={mockDPConversations}
        />

        <View style={styles.bottomPad} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 4,
    gap: 14,
    paddingBottom: 0,
  },
  bottomPad: {
    height: 110,
  },
});
