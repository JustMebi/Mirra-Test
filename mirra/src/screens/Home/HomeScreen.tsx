import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';
import { mockDPConversations, mockDPConversationCount } from '@/data/mock';
import { HomeNavBar } from './components/HomeNavBar';
import { HeroProfileCard } from './components/HeroProfileCard';
import { DPConversationSection } from './components/DPConversationSection';

export function HomeScreen() {
  return (
    <View style={styles.root}>
      <HomeNavBar />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
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
