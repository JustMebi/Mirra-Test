import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from '@/components/ui/Text';
import { Colors } from "@/constants/colors";
import { PulsingDot } from "@/components/ui/PulsingDot";
import { FrostedGlassView } from "@/components/ui/FrostedGlassView";
import Svg, { Defs, RadialGradient, Rect, Stop } from "react-native-svg";
import type { DPConversation } from "@/data/mock";

interface DPConversationSectionProps {
  count: number;
  conversations: DPConversation[];
  onSeeAll?: () => void;
}

export function DPConversationSection({
  count,
  conversations,
  onSeeAll,
}: DPConversationSectionProps) {
  const first = conversations[0];

  return (
    <View style={styles.wrapper}>
      {/* Section header */}
      <View style={styles.header}>
        <Text style={styles.headerLabel}>
          DP Conversations <Text style={styles.headerCount}>{count}</Text>
        </Text>
        <TouchableOpacity onPress={onSeeAll} activeOpacity={0.7}>
          <Text style={styles.seeAll}>See all &rsaquo;</Text>
        </TouchableOpacity>
      </View>

      {first && (
        <View style={styles.stack}>
          <FrostedGlassView
            style={[styles.backCard, styles.backCardTwo]}
            borderRadius={18}
            frostLevel="dense"
            animatedEdges={false}
          />
          <FrostedGlassView
            style={[styles.backCard, styles.backCardOne]}
            borderRadius={18}
            frostLevel="dense"
            animatedEdges={false}
          />
          <TouchableOpacity style={styles.cardTouch} activeOpacity={0.8}>
            <FrostedGlassView
              style={styles.card}
              borderRadius={12}
              frostLevel="dense"
              animatedEdges={false}
            >
              <AnonymousGlassLight />
              <PulsingDot />
              <Text style={styles.cardText} numberOfLines={1}>
                <Text style={styles.anonLabel}>
                  {first.isAnonymous
                    ? "Anonymous Ask: "
                    : `${first.preview.split(":")[0]}: `}
                </Text>
                {first.isAnonymous
                  ? first.preview
                  : first.preview.split(":").slice(1).join(":").trim()}
              </Text>
            </FrostedGlassView>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

function AnonymousGlassLight() {
  return (
    <Svg
      width="100%"
      height="100%"
      fill="none"
      style={StyleSheet.absoluteFill}
    >
      <Defs>
        <RadialGradient
          id="anonymousGlassLight"
          cx="88%"
          cy="110%"
          r="88%"
        >
          <Stop offset="0" stopColor="#FFFFFF" stopOpacity="0.16" />
          <Stop offset="0.62" stopColor="#FFFFFF" stopOpacity="0.05" />
          <Stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </RadialGradient>
      </Defs>
      <Rect width="100%" height="100%" rx="12" fill="rgba(255,255,255,0.025)" />
      <Rect width="100%" height="100%" rx="12" fill="url(#anonymousGlassLight)" />
    </Svg>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerLabel: {
    color: Colors.textSecondary,
    fontSize: 12,
    fontWeight: "500",
  },
  headerCount: {
    color: Colors.textPrimary,
    fontWeight: "700",
  },
  seeAll: {
    color: Colors.textSecondary,
    fontSize: 12,
    fontWeight: "500",
  },
  stack: {
    height: 60,
    position: "relative",
  },
  backCard: {
    position: "absolute",
    left: 16,
    right: 16,
    height: 36,
    borderRadius: 18,
  },
  backCardOne: {
    top: 10,
  },
  backCardTwo: {
    top: 16,
    left: 34,
    right: 34,
    opacity: 0.65,
  },
  cardTouch: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    shadowColor: "rgb(31,30,135)",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.37,
    shadowRadius: 16,
    elevation: 8,
  },
  card: {
    width: "100%",
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
  },
  cardText: {
    color: Colors.textPrimary,
    fontSize: 13,
    flex: 1,
    lineHeight: 18,
  },
  anonLabel: {
    color: Colors.textPrimary,
    fontWeight: "600",
  },
});
