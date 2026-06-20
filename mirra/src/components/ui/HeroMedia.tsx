import React, { useEffect } from 'react';
import { StyleProp, StyleSheet, View } from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { VideoView, useVideoPlayer } from 'expo-video';
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
  isActive = true,
  contentPosition = 'top',
  resizeMode = 'cover',
}: HeroMediaProps) {
  if (media.type === 'video') {
    if (!isActive) return null;
    return (
      <VideoHero
        source={media.source}
        style={style}
        resizeMode={resizeMode}
      />
    );
  }

  return (
    <ExpoImage
      source={typeof media.source === 'string' ? { uri: media.source } : media.source}
      style={[StyleSheet.absoluteFill, style]}
      contentFit={resizeMode}
      contentPosition={contentPosition as any}
    />
  );
}

function VideoHero({
  source,
  style,
  resizeMode,
}: {
  source: any;
  style?: StyleProp<any>;
  resizeMode: 'cover' | 'contain';
}) {
  const player = useVideoPlayer(source, (instance) => {
    instance.loop = true;
    instance.muted = true;
    instance.play();
  });

  useEffect(() => {
    return () => {
      try { player.pause(); } catch (_) {}
    };
  }, []);

  return (
    <VideoView
      player={player}
      style={[StyleSheet.absoluteFill, style]}
      contentFit={resizeMode}
      nativeControls={false}
      allowsFullscreen={false}
      allowsPictureInPicture={false}
    />
  );
}

export function HeroMediaFallback({ style }: { style?: StyleProp<any> }) {
  return <View style={[StyleSheet.absoluteFill, styles.placeholder, style]} />;
}

const styles = StyleSheet.create({
  placeholder: {
    backgroundColor: Colors.bgSurface,
  },
});
