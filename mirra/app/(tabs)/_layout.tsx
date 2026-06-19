import { Tabs } from 'expo-router';
import { AppTabBar } from '@/components/layout/AppTabBar';

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <AppTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="contacts" />
      <Tabs.Screen name="messages" />
      <Tabs.Screen name="explore" />
    </Tabs>
  );
}
