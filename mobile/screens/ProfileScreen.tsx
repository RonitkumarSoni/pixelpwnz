import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { Colors, Typography, Spacing, Radii } from '../constants/theme';
import { useAppDispatch } from '../store/hooks';
import { clearSession } from '../store/sessionSlice';

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState('liked');
  const dispatch = useAppDispatch();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle} numberOfLines={1}>GorgeousBadger7462</Text>
          <View style={styles.headerRight}>
            <Feather name="search" size={24} color={Colors.text} style={{ marginRight: 16 }} />
            <Feather name="bell" size={24} color={Colors.text} />
          </View>
        </View>

        {/* Profile Info */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Feather name="user" size={48} color={Colors.bg} />
          </View>
          <Text style={styles.username}>GorgeousBadger7462</Text>
          
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>0</Text>
              <Text style={styles.statLabel}>followers</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>0</Text>
              <Text style={styles.statLabel}>following</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>0</Text>
              <Text style={styles.statLabel}>interactions</Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionsRow}>
            <TouchableOpacity style={styles.btnSecondary}>
              <Text style={styles.btnSecondaryText}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnSecondary}>
              <Text style={styles.btnSecondaryText}>Share Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnIcon}>
              <Feather name="trending-up" size={16} color={Colors.text} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnIcon} onPress={() => dispatch(clearSession())}>
              <Feather name="log-out" size={16} color={Colors.text} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Profile Tabs */}
        <View style={styles.tabsRow}>
          <TouchableOpacity style={styles.tabItem} onPress={() => setActiveTab('personas')}>
            <Feather name="user" size={20} color={activeTab === 'personas' ? Colors.text : Colors.textMuted} />
            {activeTab === 'personas' && <View style={styles.activeTabIndicator} />}
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => setActiveTab('liked')}>
            <Feather name="heart" size={20} color={activeTab === 'liked' ? Colors.text : Colors.textMuted} />
            {activeTab === 'liked' && <View style={styles.activeTabIndicator} />}
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        <View style={styles.tabContent}>
          <View style={styles.emptyStateIconContainer}>
            <Feather name="heart" size={24} color={Colors.textMuted} />
          </View>
          <Text style={styles.emptyStateTitle}>No liked yet</Text>
          <Text style={styles.emptyStateSub}>You can like characters and they'll{'\n'}appear here.</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.bg },
  scrollContent: { paddingBottom: 100 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.md,
  },
  headerTitle: {
    ...Typography.h2,
    color: Colors.text,
    flex: 1,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileSection: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.text,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  username: {
    ...Typography.h2,
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 24,
    marginBottom: Spacing.lg,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    ...Typography.body,
    fontWeight: 'bold',
    color: Colors.text,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  btnSecondary: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  btnSecondaryText: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: '600',
  },
  btnIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabsRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    paddingHorizontal: Spacing.lg,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
    position: 'relative',
  },
  activeTabIndicator: {
    position: 'absolute',
    bottom: -1,
    left: '20%',
    right: '20%',
    height: 2,
    backgroundColor: Colors.text,
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
    paddingHorizontal: Spacing.xl,
  },
  emptyStateIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  emptyStateTitle: {
    ...Typography.h3,
    color: Colors.text,
    marginBottom: 8,
  },
  emptyStateSub: {
    ...Typography.body,
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: 20,
  }
});
