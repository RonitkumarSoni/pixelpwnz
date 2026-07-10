import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, TextInput, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { Colors, Typography, Spacing, Radii } from '../constants/theme';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const CATEGORIES = ['Explore', 'Trending', 'Celebrities', 'Anime', 'Historical', 'Sports', 'Fictional'];

const MOCK_PERSONAS = [
  { id: '1', title: 'Elon Musk', sub: 'CEO of Tesla & SpaceX. Let\'s talk Mars.', author: '@signet', interactions: '4.2m', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80' },
  { id: '2', title: 'Naruto Uzumaki', sub: 'Believe it! Future Hokage of the Leaf.', author: '@signet', interactions: '8.5m', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80' },
  { id: '3', title: 'Iron Man', sub: 'Genius, billionaire, philanthropist.', author: '@signet', interactions: '6.1m', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80' },
  { id: '4', title: 'Cristiano Ronaldo', sub: 'SIUUUU! Legend of football.', author: '@signet', interactions: '12.6m', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80' },
  { id: '5', title: 'Albert Einstein', sub: 'Let me explain relativity simply.', author: '@signet', interactions: '3.8m', image: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=400&q=80' },
  { id: '6', title: 'Sherlock Holmes', sub: 'The game is afoot, Watson.', author: '@signet', interactions: '5.2m', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80' },
  { id: '7', title: 'Cleopatra', sub: 'Queen of Egypt. Ruler of Nile.', author: '@signet', interactions: '2.1m', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80' },
  { id: '8', title: 'Goku', sub: 'Always ready for a fight!', author: '@signet', interactions: '9.7m', image: 'https://images.unsplash.com/photo-1504257432389-523431e15ce3?w=400&q=80' },
];

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - Spacing.lg * 2 - 12) / 2;

export default function DiscoverScreen() {
  const [activeTab, setActiveTab] = useState('Explore');
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation<NavigationProp>();

  const filteredPersonas = searchQuery.trim()
    ? MOCK_PERSONAS.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : MOCK_PERSONAS;

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
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.pillsContainer}>
        {CATEGORIES.map((tab) => (
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
      </ScrollView>

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
            style={styles.card}
            onPress={() => navigation.navigate('Chat')}
            activeOpacity={0.8}
          >
            <Image source={{ uri: item.image }} style={styles.cardImage} />
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
  pillsContainer: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    gap: 8,
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
