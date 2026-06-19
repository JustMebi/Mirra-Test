import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { glass } from '@/styles/glass';
import { Colors, Gradients, GradientDir } from '@/constants/colors';
import { glow } from '@/styles/glow';

export function ContactsNavBar() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 6 }]}>
      <Text style={styles.title}>Contacts</Text>
      <View style={styles.actions}>
        {/* Search — blue gradient */}
        <TouchableOpacity activeOpacity={0.8} style={glow.blueShadow}>
          <LinearGradient
            colors={Gradients.blue}
            {...GradientDir.diagonal}
            style={styles.iconBtn}
          >
            <Feather name="search" size={15} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>

        {/* Plus — glass pill */}
        <TouchableOpacity style={[glass.pill, styles.iconBtn]} activeOpacity={0.7}>
          <Feather name="plus" size={15} color={Colors.textSecondary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: Colors.bg,
  },
  title: {
    color: Colors.textPrimary,
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  iconBtn: {
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 17,
  },
});
