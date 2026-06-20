import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StyleSheet, View } from "react-native";
import { Colors } from "@/constants/colors";

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    "Switzer-Thin": require("../assets/fonts/switzer/Switzer-Thin.otf"),
    "Switzer-Extralight": require("../assets/fonts/switzer/Switzer-Extralight.otf"),
    "Switzer-Light": require("../assets/fonts/switzer/Switzer-Light.otf"),
    "Switzer-Regular": require("../assets/fonts/switzer/Switzer-Regular.otf"),
    "Switzer-Medium": require("../assets/fonts/switzer/Switzer-Medium.otf"),
    "Switzer-Semibold": require("../assets/fonts/switzer/Switzer-Semibold.otf"),
    "Switzer-Bold": require("../assets/fonts/switzer/Switzer-Bold.otf"),
    "Switzer-Extrabold": require("../assets/fonts/switzer/Switzer-Extrabold.otf"),
    "Switzer-Black": require("../assets/fonts/switzer/Switzer-Black.otf"),
  });

  if (!fontsLoaded && !fontError) {
    return <View style={styles.root} />;
  }

  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <StatusBar style="light" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: Colors.bg },
          }}
        >
          <Stack.Screen name="(tabs)" />
          <Stack.Screen
            name="(modal)/chatbot"
            options={{ presentation: "modal", animation: "slide_from_bottom" }}
          />
        </Stack>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
});
