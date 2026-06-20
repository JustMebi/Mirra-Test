import React from 'react';
import { Text as RNText, TextProps, StyleSheet } from 'react-native';
import { switzerForWeight } from '@/constants/fonts';

export function Text({ style, ...props }: TextProps) {
  const flat = StyleSheet.flatten(style) ?? {};
  const fontFamily = switzerForWeight((flat.fontWeight as string) ?? '400');
  return <RNText style={[style, { fontFamily, fontWeight: 'normal' }]} {...props} />;
}
