import React from 'react';
import { Image, StyleProp, StyleSheet, View } from 'react-native';
import { Colors } from '@/constants/colors';
import type { HeroMedia as HeroMediaType } from '@/data/mock';

interface HeroMediaProps {
  media: HeroMediaType;
  posterUri?: any;
  style?: StyleProp<any>;
  isActive?: boolean;
}

export function HeroMedia({ media, posterUri, style }: HeroMediaProps) {
  if (media.type === 'video') {
    if (posterUri) {
      return (
        <Image
          source={typeof posterUri === 'string' ? { uri: posterUri } : posterUri}
          style={[StyleSheet.absoluteFill, style]}
          resizeMode="cover"
        />
      );
    }
    return <View style={[StyleSheet.absoluteFill, styles.videoPlaceholder, style]} />;
  }

  return (
    <Image
      source={typeof media.source === 'string' ? { uri: media.source } : media.source}
      style={[StyleSheet.absoluteFill, style]}
      resizeMode="cover"
    />
  );
}

export function HeroMediaFallback({ style }: { style?: StyleProp<any> }) {
  return <View style={[StyleSheet.absoluteFill, styles.videoPlaceholder, style]} />;
}

const styles = StyleSheet.create({
  videoPlaceholder: {
    backgroundColor: Colors.bgSurface,
  },
});
