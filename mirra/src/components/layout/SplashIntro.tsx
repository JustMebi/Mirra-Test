import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { Colors } from '@/constants/colors';

interface SplashIntroProps {
  onDone: () => void;
}

export function SplashIntro({ onDone }: SplashIntroProps) {
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.88)).current;
  const screenOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      // Fade + scale logo in
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 380,
          useNativeDriver: true,
        }),
        Animated.timing(logoScale, {
          toValue: 1,
          duration: 420,
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(520),
      // Fade whole screen out
      Animated.timing(screenOpacity, {
        toValue: 0,
        duration: 280,
        useNativeDriver: true,
      }),
    ]).start(() => onDone());

    // Hard fallback — always dismiss by 1.8s regardless
    const fallback = setTimeout(onDone, 1800);
    return () => clearTimeout(fallback);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Animated.View style={[styles.overlay, { opacity: screenOpacity }]} pointerEvents="none">
      <Animated.View
        style={[
          styles.center,
          { opacity: logoOpacity, transform: [{ scale: logoScale }] },
        ]}
      >
        <View style={styles.markRow}>
          <View style={styles.strokeLeft} />
          <View style={styles.strokeDownUp} />
          <View style={styles.strokeDownUp} />
          <View style={styles.strokeRight} />
        </View>
        <Text style={styles.wordmark}>MIRRA</Text>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
    elevation: 1000,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.bg,
  },
  center: {
    alignItems: 'center',
    gap: 24,
  },
  markRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 5,
    height: 80,
  },
  strokeLeft: {
    width: 8,
    height: 80,
    borderRadius: 999,
    backgroundColor: Colors.textPrimary,
    transform: [{ rotate: '-11deg' }],
  },
  strokeDownUp: {
    width: 8,
    height: 66,
    borderRadius: 999,
    backgroundColor: Colors.textPrimary,
    marginTop: 6,
    transform: [{ rotate: '-31deg' }],
  },
  strokeRight: {
    width: 8,
    height: 80,
    borderRadius: 999,
    backgroundColor: Colors.textPrimary,
    transform: [{ rotate: '11deg' }],
  },
  wordmark: {
    color: Colors.textPrimary,
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 4,
  },
});
