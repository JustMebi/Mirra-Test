import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { Colors } from '@/constants/colors';
import { SplashIntro } from '@/components/layout/SplashIntro';

export default function RootLayout() {
  const [showSplash, setShowSplash] = useState(true);
  const [fontsLoaded] = useFonts({
    ...Feather.font,
    ...FontAwesome.font,
    ...Ionicons.font,
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingRoot}>
        <Text style={styles.loadingText}>MIRRA</Text>
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <StatusBar style="light" />
        <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: Colors.bg } }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen
            name="(modal)/chatbot"
            options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
          />
        </Stack>
        {showSplash && <SplashIntro onDone={() => setShowSplash(false)} />}
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  loadingRoot: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.bg,
  },
  loadingText: {
    color: Colors.textPrimary,
    fontSize: 20,
    lineHeight: 24,
    fontWeight: '700',
    letterSpacing: 3,
  },
});
