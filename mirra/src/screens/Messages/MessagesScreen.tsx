import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from 'expo-router';
import { Colors } from '@/constants/colors';
import { mockThreads } from '@/data/mock';
import { MessagesNavBar } from './components/MessagesNavBar';
import { ThreadRow } from './components/ThreadRow';
import { ChatView } from './ChatView';
import type { Thread } from '@/data/mock';

export function MessagesScreen() {
  const navigation = useNavigation();
  const [tab, setTab] = useState<'primary' | 'requests'>('primary');
  const [filter, setFilter] = useState<'all' | 'direct' | 'dp'>('all');
  const [openThread, setOpenThread] = useState<Thread | null>(null);

  useEffect(() => {
    navigation.setOptions({
      tabBarStyle: openThread ? { display: 'none' } : undefined,
    });

    return () => {
      navigation.setOptions({ tabBarStyle: undefined });
    };
  }, [navigation, openThread]);

  if (openThread) {
    return <ChatView thread={openThread} onBack={() => setOpenThread(null)} />;
  }

  return (
    <View style={styles.root}>
      <MessagesNavBar
        activeTab={tab}
        onTabChange={setTab}
        activeFilter={filter}
        onFilterChange={setFilter}
      />
      <FlatList
        data={mockThreads}
        keyExtractor={(t) => t.id}
        renderItem={({ item }) => (
          <ThreadRow thread={item} onPress={() => setOpenThread(item)} />
        )}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  list: {
    paddingBottom: 110,
    paddingTop: 6,
  },
  separator: {
    height: 1,
    marginHorizontal: 16,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
});
