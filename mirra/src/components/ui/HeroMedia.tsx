import React from 'react';
import { Image, StyleProp, StyleSheet, View } from 'react-native';
import { Colors } from '@/constants/colors';
import type { HeroMedia as HeroMediaType } from '@/data/mock';

interface HeroMediaProps {
  media: HeroMediaType;
  posterUri?: any;
  style?: StyleProp<any>;
  isActive?: boolean;
  contentPosition?: string;
  resizeMode?: 'cover' | 'contain';
}

export function HeroMedia({
  media,
  posterUri,
  style,
  contentPosition = 'center center',
  resizeMode = 'cover',
}: HeroMediaProps) {
  const imageStyle = [
    StyleSheet.absoluteFill,
    { objectPosition: contentPosition },
    style,
  ] as any;

  if (media.type === 'video') {
    if (posterUri) {
      return (
        <Image
          source={typeof posterUri === 'string' ? { uri: posterUri } : posterUri}
          style={imageStyle}
          resizeMode={resizeMode}
        />
      );
    }
    return <View style={[StyleSheet.absoluteFill, styles.videoPlaceholder, style]} />;
  }

  return (
    <Image
      source={typeof media.source === 'string' ? { uri: media.source } : media.source}
      style={imageStyle}
      resizeMode={resizeMode}
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
