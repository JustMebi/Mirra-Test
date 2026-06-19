import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Colors } from '@/constants/colors';
import { mockUsers } from '@/data/mock';
import { ContactsNavBar } from './components/ContactsNavBar';
import { ContactTabBar, ContactTab } from './components/ContactTabBar';
import { ContactFilterRow, ViewMode } from './components/ContactFilterRow';
import { ContactInterestTags } from './components/ContactInterestTags';
import { ConnectionRequestBanner } from './components/ConnectionRequestBanner';
import { ContactCard } from './components/ContactCard';

export function ContactsScreen() {
  const [tab, setTab] = useState<ContactTab>('mirra');
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [activeFilter, setActiveFilter] = useState<string | undefined>();

  // Evan (index 1) appears first per design
  const contacts = [mockUsers[1], mockUsers[0], ...mockUsers.slice(2)];

  return (
    <View style={styles.root}>
      <ContactsNavBar />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <ContactTabBar active={tab} onChange={setTab} savedCount={2} mirraCount={7} />
        <ContactFilterRow viewMode={viewMode} onViewModeChange={setViewMode} />
        <ContactInterestTags active={activeFilter} onSelect={setActiveFilter} />

        <ConnectionRequestBanner count={2} />

        {contacts.map((user, i) => (
          <React.Fragment key={user.id}>
            <ContactCard
              user={user}
              onDM={() => {}}
              onChatDP={() =>
                router.push({ pathname: '/(modal)/chatbot', params: { userId: user.id } })
              }
              onVisitProfile={() => {}}
            />
            {i < contacts.length - 1 && <View style={styles.cardGap} />}
          </React.Fragment>
        ))}

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
    paddingTop: 4,
  },
  cardGap: {
    height: 12,
  },
  bottomPad: {
    height: 110,
  },
});
