import React, { useEffect } from 'react';
import { Image, StyleProp, StyleSheet, View } from 'react-native';
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
  contentPosition = 'center center',
  resizeMode = 'cover',
}: HeroMediaProps) {
  // For images: extend box below card so cover-mode anchors to top (shows faces, not walls).
  const imageStyle = [
    { position: 'absolute' as const, top: 0, left: 0, right: 0, bottom: -120 },
    style,
  ];

  if (media.type === 'video') {
    // Only mount a native video player when this card is the active/visible one.
    // Off-screen cards show the poster image to avoid simultaneous players draining memory.
    if (!isActive) {
      const posterSource = posterUri
        ? (typeof posterUri === 'string' ? { uri: posterUri } : posterUri)
        : null;
      if (posterSource) {
        console.log('[HeroMedia] inactive video card — showing poster instead of player');
        return <Image source={posterSource} style={imageStyle} resizeMode={resizeMode} />;
      }
    }
    return (
      <VideoHero
        source={media.source}
        style={style}
        resizeMode={resizeMode}
      />
    );
  }

  return (
    <Image
      source={typeof media.source === 'string' ? { uri: media.source } : media.source}
      style={imageStyle}
      resizeMode={resizeMode}
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
    console.log('[VideoHero] player mounted — source:', source);
    return () => {
      console.log('[VideoHero] player unmounted — pausing');
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
