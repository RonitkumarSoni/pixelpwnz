import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { Colors, Spacing } from '../constants/theme';

const DOT_SIZE = 8;
const BOUNCE_HEIGHT = -12;

function BouncingDot({ delay }: { delay: number }) {
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timeout = setTimeout(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(translateY, {
            toValue: BOUNCE_HEIGHT,
            duration: 300,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: 0,
            duration: 300,
            easing: Easing.in(Easing.quad),
            useNativeDriver: true,
          }),
        ])
      ).start();
    }, delay);

    return () => clearTimeout(timeout);
  }, [delay, translateY]);

  return (
    <Animated.View
      style={[styles.dot, { transform: [{ translateY }] }]}
    />
  );
}

export default function ThinkingDots() {
  return (
    <View style={styles.container}>
      <BouncingDot delay={0} />
      <BouncingDot delay={150} />
      <BouncingDot delay={300} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.base,
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    backgroundColor: Colors.textSecondary,
  },
});
