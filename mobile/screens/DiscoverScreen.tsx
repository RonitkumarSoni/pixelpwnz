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
  { id: '1', title: 'Elon Musk', sub: 'CEO of Tesla & SpaceX. Let\'s talk Mars.', author: '@signet', interactions: '4.2m', image: 'https://i.pravatar.cc/400?img=68' },
  { id: '2', title: 'Naruto Uzumaki', sub: 'Believe it! Future Hokage of the Leaf.', author: '@signet', interactions: '8.5m', image: 'https://i.pravatar.cc/400?img=33' },
  { id: '3', title: 'Iron Man', sub: 'Genius, billionaire, philanthropist.', author: '@signet', interactions: '6.1m', image: 'https://i.pravatar.cc/400?img=51' },
  { id: '4', title: 'Cristiano Ronaldo', sub: 'SIUUUU! Legend of football.', author: '@signet', interactions: '12.6m', image: 'https://i.pravatar.cc/400?img=59' },
  { id: '5', title: 'Albert Einstein', sub: 'Let me explain relativity simply.', author: '@signet', interactions: '3.8m', image: 'https://i.pravatar.cc/400?img=60' },
  { id: '6', title: 'Sherlock Holmes', sub: 'The game is afoot, Watson.', author: '@signet', interactions: '5.2m', image: 'https://i.pravatar.cc/400?img=14' },
  { id: '7', title: 'Cleopatra', sub: 'Queen of Egypt. Ruler of Nile.', author: '@signet', interactions: '2.1m', image: 'https://i.pravatar.cc/400?img=47' },
  { id: '8', title: 'Goku', sub: 'Always ready for a fight!', author: '@signet', interactions: '9.7m', image: 'https://i.pravatar.cc/400?img=52' },
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
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.headerIconBtn}>
              <Feather name="bell" size={22} color={Colors.text} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search */}
        <View style={styles.searchBar}>
          <Feather name="search" size={18} color={Colors.textMuted} />
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
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xs,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  headerLogo: {
    fontSize: 26,
    fontWeight: '800',
    color: Colors.text,
    letterSpacing: -0.5,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.glass.bg,
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 42,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    color: Colors.text,
    fontSize: 15,
  },

  /* Pills */
  pillsContainer: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
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

  /* Grid */
  listContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: 100,
    paddingTop: 4,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  card: {
    width: CARD_WIDTH,
    marginBottom: Spacing.lg,
    borderRadius: Radii.lg,
    backgroundColor: Colors.glass.bg,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 160,
  },
  cardInfo: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 3,
  },
  cardSub: {
    fontSize: 12,
    color: Colors.textMuted,
    marginBottom: 8,
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
    gap: 3,
  },
  cardInteractions: {
    fontSize: 11,
    color: Colors.textMuted,
  },
  cardAuthor: {
    fontSize: 11,
    color: Colors.primarySolid,
    fontWeight: '600',
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
