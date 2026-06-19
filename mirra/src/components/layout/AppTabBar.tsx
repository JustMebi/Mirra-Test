import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Text } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GlassView } from '@/components/ui/GlassView';
import { Colors, Gradients, GradientDir } from '@/constants/colors';
import { mockCurrentUser } from '@/data/mock';

// Tab order matches app/(tabs)/_layout.tsx:
//   0 = index (home)
//   1 = contacts
//   2 = messages
//   3 = explore
// Position 3 (chatbot) is a non-tab button that opens the DP modal.

export function AppTabBar({ state, navigation, descriptors }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const focusedOptions = descriptors[state.routes[state.index].key]?.options;
  const tabBarStyle = StyleSheet.flatten(focusedOptions?.tabBarStyle) as { display?: string } | undefined;

  if (tabBarStyle?.display === 'none') {
    return null;
  }

  const goToTab = (index: number) => {
    const route = state.routes[index];
    if (state.index !== index) {
      navigation.navigate(route.name);
    }
  };

  return (
    <View style={[styles.wrapper, { bottom: Math.max(insets.bottom, 12) }]} pointerEvents="box-none">
      <GlassView variant="pill" style={styles.bar}>

        {/* 1 — Home: current user avatar */}
        <TabItem onPress={() => goToTab(0)} isActive={state.index === 0} badge={2}>
          <View style={styles.avatarWrap}>
            <Image source={mockCurrentUser.avatar} style={styles.avatarImg} />
          </View>
        </TabItem>

        {/* 2 — Contacts: people icon */}
        <TabItem onPress={() => goToTab(1)} isActive={state.index === 1} badge={2}>
          <Feather
            name="users"
            size={20}
            color={state.index === 1 ? Colors.textPrimary : Colors.textSecondary}
          />
        </TabItem>

        {/* 3 — Messages: send / paper-plane icon */}
        <TabItem onPress={() => goToTab(2)} isActive={state.index === 2} badge={12}>
          <Feather
            name="send"
            size={20}
            color={state.index === 2 ? Colors.textPrimary : Colors.textSecondary}
          />
        </TabItem>

        {/* 4 — DP Chatbot: chat bubble icon (opens modal, no active state) */}
        <TabItem onPress={() => router.push('/(modal)/chatbot')} isActive={false} badge={2}>
          <Feather
            name="message-circle"
            size={20}
            color={Colors.textSecondary}
          />
        </TabItem>

        {/* 5 — Explore: search icon */}
        <TabItem onPress={() => goToTab(3)} isActive={state.index === 3}>
          <Feather
            name="search"
            size={20}
            color={state.index === 3 ? Colors.textPrimary : Colors.textSecondary}
          />
        </TabItem>

      </GlassView>
    </View>
  );
}

// ─── Tab Item ────────────────────────────────────────────────────────────────

interface TabItemProps {
  onPress: () => void;
  isActive: boolean;
  badge?: number;
  children: React.ReactNode;
}

function TabItem({ onPress, isActive, badge, children }: TabItemProps) {
  return (
    <TouchableOpacity style={styles.tab} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.iconWrap, isActive && styles.iconWrapActive]}>
        {isActive && (
          <>
            <View style={styles.activeBase} />
            <View style={styles.activeBloom} />
          </>
        )}
        {children}
        {badge != null && badge > 0 && (
          <LinearGradient
            colors={Gradients.accent}
            {...GradientDir.vertical}
            style={styles.badge}
          >
            <Text style={styles.badgeText}>{badge}</Text>
          </LinearGradient>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    height: 56,
    paddingHorizontal: 16,
    zIndex: 100,
    elevation: 100,
    pointerEvents: 'box-none',
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    maxWidth: 408,
    height: 56,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    padding: 4,
    gap: 10,
    backgroundColor: 'rgba(255,255,255,0.05)',
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.10,
    shadowRadius: 0,
    elevation: 8,
  },
  tab: {
    flex: 1,
    minWidth: 0,
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrap: {
    width: 52,
    height: 40,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapActive: {
    width: 80,
    height: 48,
    paddingHorizontal: 18,
    paddingVertical: 8,
    gap: 4,
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.22,
    shadowRadius: 14,
    overflow: 'hidden',
  },
  activeBase: {
    position: 'absolute',
    inset: 0,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.055)',
    zIndex: 0,
  },
  activeBloom: {
    position: 'absolute',
    width: 54,
    height: 42,
    right: 2,
    bottom: -10,
    borderRadius: 27,
    backgroundColor: 'rgba(255,255,255,0.18)',
    zIndex: 0,
  },
  avatarWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: 'hidden',
  },
  avatarImg: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  badge: {
    position: 'absolute',
    top: 2,
    right: 7,
    minWidth: 15,
    height: 15,
    borderRadius: 7.5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
    borderWidth: 1.5,
    borderColor: Colors.bg,
  },
  badgeText: {
    color: Colors.bg,
    fontSize: 8,
    fontWeight: '800',
  },
});
