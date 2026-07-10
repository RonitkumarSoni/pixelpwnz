import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Colors, Spacing, Typography, Radii } from '../constants/theme';

interface StatsHeaderProps {
  userName: string;
  pairCount: number;
  avatarUrl?: string | null;
}

export default function StatsHeader({ userName, pairCount, avatarUrl }: StatsHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        {avatarUrl && (
          <Image source={{ uri: avatarUrl }} style={styles.avatar} />
        )}
        <View style={styles.textStack}>
          <Text style={styles.title} numberOfLines={1}>
            {avatarUrl ? 'Conversing with ' : 'Conversing as '}
            <Text style={styles.userName}>{userName}</Text>
          </Text>
          {pairCount > 0 && (
            <Text style={styles.badgeText}>
              {pairCount} {pairCount === 1 ? 'memory' : 'memories'} loaded
            </Text>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: Spacing.sm,
  },
  textStack: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    ...Typography.body,
    color: Colors.textSecondary,
    flexShrink: 1,
  },
  userName: {
    color: Colors.text,
    fontWeight: '600',
  },
  badge: {
    backgroundColor: 'rgba(139,92,246,0.12)',
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.md,
    borderRadius: Radii.button,
    marginLeft: Spacing.sm,
  },
  badgeText: {
    ...Typography.small,
    color: Colors.primarySolid,
  },
});
