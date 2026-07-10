import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, TextInput, ScrollView, Dimensions, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { Colors, Typography, Spacing, Radii } from '../constants/theme';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setSession } from '../store/sessionSlice';
import { clearMessages } from '../store/chatSlice';
import { addBookmark, removeBookmark } from '../store/bookmarksSlice';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const CATEGORIES = ['Explore', 'Trending', 'Celebrities', 'Anime', 'Historical', 'Sports', 'Fictional'];

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - Spacing.lg * 2 - 12) / 2;

export default function DiscoverScreen() {
  const [activeTab, setActiveTab] = useState('Explore');
  const [searchQuery, setSearchQuery] = useState('');
  const [personas, setPersonas] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [startingSessionId, setStartingSessionId] = React.useState<string | null>(null);
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useAppDispatch();
  const bookmarks = useAppSelector((s) => s.bookmarks.bookmarks);

  React.useEffect(() => {
    const fetchPersonas = async () => {
      try {
        const { getPersonas } = require('../api/client');
        const data = await getPersonas();
        if (data.success && data.personas) {
          const mapped = data.personas.map((p: any) => {
            let image = 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80';
            let sub = 'Public Persona';
            if (p.id === 'pirate') {
              image = 'https://images.unsplash.com/photo-1549488344-c6c747971775?w=400&q=80';
              sub = 'Ahoy there, matey!';
            } else if (p.id === 'shakespeare') {
              image = 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=400&q=80';
              sub = 'To be, or not to be...';
            } else if (p.id === 'bro') {
              image = 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&q=80';
              sub = 'Do you even lift, bro?';
            }
            return {
              id: p.id,
              title: p.name,
              sub,
              author: '@signet',
              interactions: (Math.random() * 10).toFixed(1) + 'm',
              image
            };
          });
          setPersonas(mapped);
        }
      } catch (err) {
        console.error('Failed to fetch personas:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPersonas();
  }, []);

  const filteredPersonas = searchQuery.trim()
    ? personas.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : personas;

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.headerLogo}>Explore</Text>
        </View>

        {/* Search */}
        <View style={styles.searchBar}>
          <Feather name="search" size={20} color={Colors.textMuted} style={{ marginRight: 8 }} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search public personas..."
            placeholderTextColor={Colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Feather name="x" size={18} color={Colors.textMuted} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Category pills */}
      <View style={styles.pillsWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.pillsContainer}>
          {CATEGORIES.map((tab, index) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.pill,
                activeTab === tab && styles.pillActive,
                { marginRight: index === CATEGORIES.length - 1 ? 0 : 8 }
              ]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.pillText, activeTab === tab && styles.pillTextActive]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Grid */}
      <FlatList
        data={filteredPersonas}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View style={styles.emptyState}>
            <Feather name="search" size={32} color={Colors.textMuted} />
            <Text style={styles.emptyText}>No personas found for "{searchQuery}"</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.card, startingSessionId === item.id && { opacity: 0.5 }]}
            onPress={async () => {
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
                alert('Could not start chat session. Please check your connection.');
              } finally {
                setStartingSessionId(null);
              }
            }}
            activeOpacity={0.8}
            disabled={startingSessionId !== null}
          >
            <Image source={{ uri: item.image }} style={styles.cardImage} />
            <TouchableOpacity 
              style={[styles.bookmarkBtn, bookmarks.some(b => b.id === item.id) && styles.bookmarkBtnActive]}
              onPress={(e) => {
                e.stopPropagation(); // prevent card press
                const isBookmarked = bookmarks.some(b => b.id === item.id);
                if (isBookmarked) {
                  dispatch(removeBookmark(item.id));
                } else {
                  dispatch(addBookmark({ ...item, type: 'public' }));
                }
              }}
            >
              <FontAwesome5 
                name="bookmark" 
                solid={bookmarks.some(b => b.id === item.id)}
                size={16} 
                color={bookmarks.some(b => b.id === item.id) ? Colors.primarySolid : '#FFF'} 
              />
            </TouchableOpacity>
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
              <Text style={styles.cardSub} numberOfLines={2}>{item.sub}</Text>
              <View style={styles.cardFooter}>
                <View style={styles.interactionRow}>
                  <Feather name="message-circle" size={11} color={Colors.textMuted} />
                  <Text style={styles.cardInteractions}>{item.interactions}</Text>
                </View>
                <Text style={styles.cardAuthor} numberOfLines={1}>{item.author}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.bg },

  /* Header */
  header: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xs,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  headerLogo: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1E1E28',
    letterSpacing: -0.5,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 24,
    paddingHorizontal: 16,
    height: 48,
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },
  searchInput: {
    flex: 1,
    color: '#1E1E28',
    fontSize: 15,
  },

  /* Pills */
  pillsWrapper: {
    height: 52,
    marginBottom: Spacing.sm,
  },
  pillsContainer: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: 4,
  },
  pill: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    backgroundColor: '#FFF',
  },
  pillActive: {
    backgroundColor: '#1E1E28',
    borderColor: '#1E1E28',
  },
  pillText: {
    fontSize: 13,
    color: '#8E8E9F',
    fontWeight: '600',
  },
  pillTextActive: {
    color: '#FFF',
    fontWeight: 'bold',
  },

  /* Grid */
  listContent: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: 100,
    paddingTop: 8,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  card: {
    width: CARD_WIDTH,
    marginBottom: Spacing.lg,
    borderRadius: 20,
    backgroundColor: '#FFF',
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
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 180,
    backgroundColor: Colors.surfaceElevated,
    position: 'relative',
  },
  bookmarkBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  bookmarkBtnActive: {
    backgroundColor: '#FFF',
    borderColor: '#FFF',
    ...Platform.select({
      ios: {
        shadowColor: Colors.primarySolid,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  cardInfo: {
    padding: 12,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1E1E28',
    marginBottom: 4,
  },
  cardSub: {
    fontSize: 12,
    color: '#8E8E9F',
    marginBottom: 12,
    lineHeight: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  interactionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  cardInteractions: {
    fontSize: 11,
    color: '#A1A1AA',
    fontWeight: '500',
  },
  cardAuthor: {
    fontSize: 11,
    color: Colors.primarySolid, // purple
    fontWeight: '700',
  },

  /* Empty */
  emptyState: {
    alignItems: 'center',
    paddingTop: 80,
    gap: 12,
  },
  emptyText: {
    ...Typography.body,
    color: Colors.textMuted,
    textAlign: 'center',
  },
});
