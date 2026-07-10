import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Typography, Spacing, Radii, Gradients } from '../constants/theme';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

/* ── Mock data ── */
const MY_PERSONAS = [
  { id: 'p1', name: 'Best Friend', lastMsg: 'haha yeah that was wild 😂', time: '2m ago', avatar: 'https://i.pravatar.cc/150?img=5', unread: 3 },
  { id: 'p2', name: 'Mom', lastMsg: 'Don\'t forget to eat lunch beta', time: '1h ago', avatar: 'https://i.pravatar.cc/150?img=9', unread: 0 },
  { id: 'p3', name: 'College Roommate', lastMsg: 'bro remember that night...', time: '3h ago', avatar: 'https://i.pravatar.cc/150?img=12', unread: 1 },
];

const RECENT_PERSONAS = [
  { id: 'r1', name: 'Best Friend', avatar: 'https://i.pravatar.cc/150?img=5' },
  { id: 'r2', name: 'Mom', avatar: 'https://i.pravatar.cc/150?img=9' },
  { id: 'r3', name: 'Roommate', avatar: 'https://i.pravatar.cc/150?img=12' },
  { id: 'r4', name: 'Create', avatar: '' },
];

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState('Recent');
  const navigation = useNavigation<NavigationProp>();

  const renderPersonaCircle = ({ item }: { item: typeof RECENT_PERSONAS[0] }) => {
    if (item.id === 'r4') {
      return (
        <TouchableOpacity style={styles.circleItem}>
          <LinearGradient
            colors={[...Gradients.primary]}
            style={styles.circleCreate}
          >
            <Feather name="plus" size={24} color="#FFF" />
          </LinearGradient>
          <Text style={styles.circleName}>Create</Text>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity style={styles.circleItem} onPress={() => navigation.navigate('Chat')}>
        <Image source={{ uri: item.avatar }} style={styles.circleAvatar} />
        <Text style={styles.circleName} numberOfLines={1}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const renderChatRow = ({ item }: { item: typeof MY_PERSONAS[0] }) => (
    <TouchableOpacity
      style={styles.chatRow}
      onPress={() => navigation.navigate('Chat')}
      activeOpacity={0.7}
    >
      <Image source={{ uri: item.avatar }} style={styles.chatAvatar} />
      <View style={styles.chatMid}>
        <Text style={styles.chatName}>{item.name}</Text>
        <Text style={styles.chatPreview} numberOfLines={1}>{item.lastMsg}</Text>
      </View>
      <View style={styles.chatMeta}>
        <Text style={styles.chatTime}>{item.time}</Text>
        {item.unread > 0 && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadText}>{item.unread}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Signet</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerIconBtn}>
            <Feather name="search" size={22} color={Colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIconBtn}>
            <Feather name="bell" size={22} color={Colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Quick-access persona circles */}
        <FlatList
          data={RECENT_PERSONAS}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.circlesContainer}
          renderItem={renderPersonaCircle}
        />

        {/* Filter pills */}
        <View style={styles.pillsContainer}>
          {['Recent', 'My Personas', 'Favorites'].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.pill, activeTab === tab && styles.pillActive]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.pillText, activeTab === tab && styles.pillTextActive]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Chat list */}
        {MY_PERSONAS.length > 0 ? (
          MY_PERSONAS.map((item) => (
            <View key={item.id}>{renderChatRow({ item })}</View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <Feather name="message-circle" size={32} color={Colors.textMuted} />
            </View>
            <Text style={styles.emptyTitle}>No conversations yet</Text>
            <Text style={styles.emptySub}>
              Create your first persona to start chatting with your AI clone.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.bg },

  /* Header */
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: Colors.primarySolid,
    letterSpacing: -0.5,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  headerIconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* Persona circles */
  circlesContainer: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    gap: 16,
  },
  circleItem: {
    alignItems: 'center',
    width: 64,
  },
  circleAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: Colors.primarySolid,
    marginBottom: 6,
  },
  circleCreate: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  circleName: {
    fontSize: 11,
    color: Colors.textMuted,
    textAlign: 'center',
  },

  /* Pills */
  pillsContainer: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.sm,
    gap: 8,
  },
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  pillActive: {
    backgroundColor: Colors.text,
    borderColor: Colors.text,
  },
  pillText: {
    fontSize: 13,
    color: Colors.textMuted,
    fontWeight: '600',
  },
  pillTextActive: {
    color: Colors.bg,
    fontWeight: 'bold',
  },

  /* Chat rows */
  chatRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: 12,
  },
  chatAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    marginRight: Spacing.md,
  },
  chatMid: {
    flex: 1,
  },
  chatName: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 3,
  },
  chatPreview: {
    fontSize: 13,
    color: Colors.textMuted,
  },
  chatMeta: {
    alignItems: 'flex-end',
    gap: 6,
  },
  chatTime: {
    fontSize: 11,
    color: Colors.textMuted,
  },
  unreadBadge: {
    backgroundColor: Colors.primarySolid,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unreadText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: 'bold',
  },

  /* Empty state */
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
    paddingHorizontal: Spacing.xl,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.glass.bg,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  emptyTitle: {
    ...Typography.h3,
    color: Colors.text,
    marginBottom: 8,
  },
  emptySub: {
    ...Typography.body,
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: 22,
  },
});
