import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppIcon } from '@/components/ui/AppIcon';
import { Colors } from '@/constants/colors';

interface ChatInputProps {
  value: string;
  onChange: (text: string) => void;
  onSend: () => void;
  placeholder?: string;
}

export function ChatInput({
  value,
  onChange,
  onSend,
  placeholder = 'Write a message...',
}: ChatInputProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrapper, { paddingBottom: Math.max(insets.bottom, 8) }]}>
      <View style={styles.inner}>
        <View style={styles.messageBox}>
          <TouchableOpacity style={styles.iconBox} activeOpacity={0.7}>
            <AppIcon name="plus" size={18} color={Colors.textPrimary} strokeWidth={1.6} />
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChange}
            placeholder={placeholder}
            placeholderTextColor="rgba(255,255,255,0.62)"
            multiline
            returnKeyType="default"
          />

          <View style={styles.actions}>
            <TouchableOpacity style={styles.iconBox} activeOpacity={0.7}>
              <AppIcon name="mic" size={18} color="rgba(255,255,255,0.92)" strokeWidth={1.6} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconBox} onPress={onSend} activeOpacity={0.75}>
              <AppIcon name="arrow-up" size={18} color="rgba(255,255,255,0.92)" strokeWidth={1.6} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    minHeight: 98,
    backgroundColor: Colors.bg,
  },
  inner: {
    width: '100%',
    minHeight: 64,
    paddingHorizontal: 16,
    paddingBottom: 8,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  messageBox: {
    width: '100%',
    maxWidth: 408,
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    backgroundColor: 'rgba(0,0,0,0.20)',
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.10,
    shadowRadius: 0,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  input: {
    flex: 1,
    minWidth: 0,
    height: 44,
    color: Colors.textPrimary,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '500',
    paddingTop: 13,
    paddingBottom: 13,
    paddingHorizontal: 0,
    textAlignVertical: 'center',
  },
  actions: {
    width: 90,
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
});
