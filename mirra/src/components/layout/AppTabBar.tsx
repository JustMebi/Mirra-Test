import React from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Text } from "@/components/ui/Text";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Defs, RadialGradient, Rect, Stop } from "react-native-svg";
import { AppIcon } from "@/components/ui/AppIcon";
import { FrostedGlassView } from "@/components/ui/FrostedGlassView";
import { Colors, Gradients, GradientDir } from "@/constants/colors";
import { MediaAssets } from "@/constants/assets";

const BAR_BORDER_RADIUS = 22;

const TAB_SLOT_WIDTH = 80;
const TAB_SLOT_HEIGHT = 48;

export function AppTabBar({
  state,
  navigation,
  descriptors,
}: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const focusedOptions = descriptors[state.routes[state.index].key]?.options;
  const tabBarStyle = StyleSheet.flatten(focusedOptions?.tabBarStyle) as
    | { display?: string }
    | undefined;

  if (tabBarStyle?.display === "none") {
    return null;
  }

  const goToTab = (index: number) => {
    const route = state.routes[index];
    if (state.index !== index) {
      navigation.navigate(route.name);
    }
  };

  return (
    <View
      style={[styles.wrapper, { bottom: Math.max(insets.bottom, 12) }]}
      pointerEvents="box-none"
    >
      <FrostedGlassView
        borderRadius={BAR_BORDER_RADIUS}
        animatedEdges={false}
        style={styles.bar}
        frostLevel="subtle"
      >
        <View style={styles.innerRail}>
          <TabItem
            onPress={() => goToTab(0)}
            isActive={state.index === 0}
            badge={2}
          >
            <Image
              source={MediaAssets.images.homeIcon}
              style={styles.homeIcon}
              resizeMode="cover"
            />
          </TabItem>

          <TabItem
            onPress={() => goToTab(1)}
            isActive={state.index === 1}
            badge={2}
          >
            <AppIcon
              name="users"
              size={22}
              color="#FFFFFF"
              opacity={state.index === 1 ? 1 : 0.66}
            />
          </TabItem>

          <TabItem
            onPress={() => goToTab(2)}
            isActive={state.index === 2}
            badge={12}
          >
            <AppIcon
              name="send"
              size={22}
              color="#FFFFFF"
              opacity={state.index === 2 ? 1 : 0.5}
            />
          </TabItem>

          <TabItem
            onPress={() => router.push("/(modal)/chatbot")}
            isActive={false}
            badge={2}
          >
            <AppIcon name="chat" size={22} color="#FFFFFF" opacity={0.66} />
          </TabItem>

          <TabItem onPress={() => goToTab(3)} isActive={state.index === 3}>
            <AppIcon
              name="search"
              size={22}
              color="#FFFFFF"
              opacity={state.index === 3 ? 1 : 0.5}
              strokeWidth={2}
            />
          </TabItem>
        </View>
      </FrostedGlassView>
    </View>
  );
}

interface TabItemProps {
  onPress: () => void;
  isActive: boolean;
  badge?: number;
  children: React.ReactNode;
}

function TabItem({ onPress, isActive, badge, children }: TabItemProps) {
  return (
    <TouchableOpacity
      style={styles.tabSlot}
      onPress={onPress}
      activeOpacity={0.72}
    >
      {isActive && <ActiveCapsule />}
      <View style={styles.contentLayer}>{children}</View>
      {badge != null && badge > 0 && <Badge count={badge} />}
    </TouchableOpacity>
  );
}

function ActiveCapsule() {
  return (
    <View style={styles.activeCapsule}>
      <Svg
        width="100%"
        height="100%"
        viewBox="0 0 80 48"
        fill="none"
        style={StyleSheet.absoluteFill}
      >
        <Defs>
          <RadialGradient
            id="activeGlassLight"
            cx="58"
            cy="52"
            r="48"
            gradientUnits="userSpaceOnUse"
          >
            <Stop offset="0" stopColor="#FFFFFF" stopOpacity="0.2" />
            <Stop offset="0.62" stopColor="#FFFFFF" stopOpacity="0.07" />
            <Stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
          </RadialGradient>
        </Defs>
        <Rect width="80" height="48" rx="18" fill="rgba(255,255,255,0.02)" />
        <Rect width="80" height="48" rx="18" fill="url(#activeGlassLight)" />
      </Svg>
      <View style={styles.activeTopHighlight} />
    </View>
  );
}

function Badge({ count }: { count: number }) {
  return (
    <LinearGradient
      colors={Gradients.accent}
      {...GradientDir.vertical}
      style={styles.badge}
    >
      <Text style={styles.badgeText}>{count}</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
    height: 56,
    paddingHorizontal: 16,
    zIndex: 100,
    elevation: 100,
    pointerEvents: "box-none",
  },
  bar: {
    width: "100%",
    maxWidth: 408,
    height: 56,
    borderRadius: BAR_BORDER_RADIUS,
    elevation: 8,
  },
  innerRail: {
    width: "100%",
    height: "100%",
    padding: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tabSlot: {
    flex: 1,
    height: TAB_SLOT_HEIGHT,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  activeCapsule: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 18,
    overflow: "hidden",
  },
  activeTopHighlight: {
    position: "absolute",
    top: 1,
    left: 10,
    right: 10,
    height: 1,
    borderRadius: 1,
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  contentLayer: {
    width: "100%",
    height: TAB_SLOT_HEIGHT,
    paddingHorizontal: 8,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  homeIcon: {
    width: 24,
    height: 24,
    borderRadius: 7,
    opacity: 1,
  },
  badge: {
    position: "absolute",
    right: 6,
    top: 6,
    minWidth: 16,
    height: 16,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
    shadowColor: Colors.accentAlt,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 4,
    zIndex: 2,
  },
  badgeText: {
    color: "rgba(0,0,0,0.6)",
    fontSize: 10,
    lineHeight: 12,
    fontWeight: "700",
    textAlign: "center",
  },
});
