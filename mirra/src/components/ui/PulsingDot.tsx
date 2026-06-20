import React, { useRef, useEffect } from 'react';
import { View, Animated, ViewStyle } from 'react-native';
import { Colors } from '@/constants/colors';

interface PulsingDotProps {
  size?: number;
  color?: string;
  style?: ViewStyle;
}

export function PulsingDot({ size = 8, color = Colors.accent, style }: PulsingDotProps) {
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(pulse, {
        toValue: 1,
        duration: 1400,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const ringScale = pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 2.8] });
  const ringOpacity = pulse.interpolate({ inputRange: [0, 0.4, 1], outputRange: [0.7, 0.3, 0] });

  return (
    <View
      style={[
        { width: size, height: size, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
        style,
      ]}
    >
      <Animated.View
        style={{
          position: 'absolute',
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
          transform: [{ scale: ringScale }],
          opacity: ringOpacity,
        }}
      />
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
          shadowColor: color,
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.9,
          shadowRadius: size * 0.75,
        }}
      />
    </View>
  );
}
