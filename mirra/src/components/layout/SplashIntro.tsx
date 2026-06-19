import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { Colors } from '@/constants/colors';

interface SplashIntroProps {
  onDone: () => void;
}

export function SplashIntro({ onDone }: SplashIntroProps) {
  const left = useRef(new Animated.Value(0)).current;
  const down = useRef(new Animated.Value(0)).current;
  const up = useRef(new Animated.Value(0)).current;
  const right = useRef(new Animated.Value(0)).current;
  const mark = useRef(new Animated.Value(0)).current;
  const exit = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const fallback = setTimeout(onDone, 2200);

    const drawStroke = (value: Animated.Value) =>
      Animated.spring(value, {
        toValue: 1,
        friction: 7,
        tension: 150,
        useNativeDriver: true,
      });

    Animated.sequence([
      Animated.delay(120),
      Animated.stagger(105, [
        drawStroke(left),
        drawStroke(down),
        drawStroke(up),
        drawStroke(right),
      ]),
      Animated.spring(mark, {
        toValue: 1,
        friction: 6,
        tension: 130,
        useNativeDriver: true,
      }),
      Animated.delay(360),
      Animated.timing(exit, {
        toValue: 0,
        duration: 240,
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => {
      if (finished) onDone();
    });

    return () => clearTimeout(fallback);
  }, [down, exit, left, mark, onDone, right, up]);

  return (
    <Animated.View style={[styles.overlay, { opacity: exit }]}>
      <View style={styles.center}>
        <View style={styles.drawMark}>
          <Stroke value={left} rotate="-11deg" style={[styles.stroke, styles.leftStroke]} />
          <Stroke value={down} rotate="-31deg" style={[styles.stroke, styles.downStroke]} />
          <Stroke value={up} rotate="31deg" style={[styles.stroke, styles.upStroke]} />
          <Stroke value={right} rotate="11deg" style={[styles.stroke, styles.rightStroke]} />
        </View>

        <Animated.View
          style={[
            styles.logoLockup,
            {
              opacity: mark,
              transform: [
                { translateY: mark.interpolate({ inputRange: [0, 1], outputRange: [8, 0] }) },
                { scale: mark.interpolate({ inputRange: [0, 0.75, 1], outputRange: [0.94, 1.04, 1] }) },
              ],
            },
          ]}
        >
          <Text style={styles.wordmark}>MIRRA</Text>
        </Animated.View>
      </View>
    </Animated.View>
  );
}

function Stroke({
  value,
  rotate,
  style,
}: {
  value: Animated.Value;
  rotate: `${number}deg`;
  style: object;
}) {
  return (
    <Animated.View
      style={[
        style,
        {
          opacity: value,
          transform: [
            { rotate },
            { scaleY: value.interpolate({ inputRange: [0, 0.8, 1], outputRange: [0.02, 1.08, 1] }) },
          ],
        },
      ]}
    />
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
    justifyContent: 'center',
    gap: 28,
  },
  drawMark: {
    width: 126,
    height: 100,
    position: 'relative',
  },
  stroke: {
    position: 'absolute',
    width: 9,
    height: 90,
    borderRadius: 999,
    backgroundColor: Colors.textPrimary,
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.28,
    shadowRadius: 12,
  },
  leftStroke: {
    left: 18,
    top: 6,
  },
  downStroke: {
    left: 46,
    top: 10,
    height: 78,
  },
  upStroke: {
    right: 46,
    top: 10,
    height: 78,
  },
  rightStroke: {
    right: 18,
    top: 6,
  },
  logoLockup: {
    alignItems: 'center',
    gap: 12,
  },
  wordmark: {
    color: Colors.textPrimary,
    fontSize: 20,
    lineHeight: 24,
    fontWeight: '700',
    letterSpacing: 3,
  },
});
