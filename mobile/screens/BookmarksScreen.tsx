import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { Colors, Typography, Spacing, Radii } from '../constants/theme';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { removeBookmark } from '../store/bookmarksSlice';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { setSession } from '../store/sessionSlice';
import { clearMessages } from '../store/chatSlice';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function BookmarksScreen() {
  const bookmarks = useAppSelector((s) => s.bookmarks.bookmarks);
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp>();
  const [startingSessionId, setStartingSessionId] = React.useState<string | null>(null);

  const handlePress = async (item: any) => {
    if (item.type === 'public') {
      try {
        if (startingSessionId) return;
        setStartingSessionId(item.id);
        const { createPersonaSession } = require('../api/client');
        const res = await createPersonaSession(item.id);
        if (res.success && res.session_id) {
          dispatch(clearMessages());
          dispatch(setSession({
            sessionId: res.session_id,
            userName: item.title,
            pairCount: res.total_pairs_extracted || 0,
            avatarUrl: item.image,
          }));
          navigation.navigate('Chat');
        }
      } catch (err) {
        console.error('Failed to start persona session', err);
        alert('Could not start chat session.');
      } finally {
        setStartingSessionId(null);
      }
    } else {
      // Personal personas just navigate to Chat for now (assuming session is already active or handled differently)
      navigation.navigate('Chat');
    }
  };

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[styles.personaCard, startingSessionId === item.id && { opacity: 0.5 }]}
      onPress={() => handlePress(item)}
      activeOpacity={0.7}
      disabled={startingSessionId !== null}
    >
      <View style={styles.cardAvatarContainer}>
        <Image source={{ uri: item.image }} style={styles.cardAvatar} />
      </View>
      <View style={styles.cardMid}>
        <Text style={styles.cardName}>{item.title}</Text>
        <Text style={styles.cardDesc} numberOfLines={2}>{item.sub}</Text>
        <View style={styles.tag}>
          <Text style={styles.tagText}>{item.type === 'public' ? 'Public' : 'Personal'}</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={(e) => {
          e.stopPropagation();
          dispatch(removeBookmark(item.id));
        }}
        style={{ padding: Spacing.sm }}
      >
        <Feather name="bookmark" size={20} color={Colors.primarySolid} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Bookmarks</Text>
      </View>
      
      {bookmarks.length === 0 ? (
        <View style={styles.emptyState}>
          <View style={styles.emptyStateIconContainer}>
            <Feather name="bookmark" size={32} color={Colors.textMuted} />
          </View>
          <Text style={styles.emptyStateTitle}>No Bookmarks</Text>
          <Text style={styles.emptyStateSub}>
            Save your favorite personas and they will appear here for quick access.
          </Text>
        </View>
      ) : (
        <FlatList
          data={bookmarks}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.bg },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTitle: {
    ...Typography.h2,
    color: Colors.text,
  },
  listContent: {
    padding: Spacing.xl,
    paddingBottom: 80,
    gap: 16,
  },
  personaCard: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.04,
        shadowRadius: 12,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  cardAvatarContainer: {
    marginRight: 16,
  },
  cardAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.surfaceElevated,
  },
  cardMid: {
    flex: 1,
  },
  cardName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1E1E28',
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 12,
    color: '#8E8E9F',
    marginBottom: 8,
  },
  tag: {
    alignSelf: 'flex-start',
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  tagText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.primarySolid,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
    paddingBottom: 60,
  },
  emptyStateIconContainer: {
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
  emptyStateTitle: {
    ...Typography.h3,
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  emptyStateSub: {
    ...Typography.body,
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: 22,
  }
});
