import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Typography, Spacing, Radii, Gradients } from '../constants/theme';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useAppSelector } from '../store/hooks';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

/* ── Mock data ── */
const MY_PERSONAS = [
  { id: 'p1', name: 'My AI Clone', desc: 'Chats based on your personality', metaType: 'badge', metaText: 'Most used', avatar: 'https://i.pravatar.cc/150?img=11' },
  { id: 'p2', name: 'Best Friend', desc: 'Fun • Sarcastic • Always there', metaType: 'text', metaText: 'Last chat 2h ago', avatar: 'https://i.pravatar.cc/150?img=5' },
  { id: 'p3', name: 'College Buddy', desc: 'Study • Memes • Late night talks', metaType: 'text', metaText: 'Last chat yesterday', avatar: 'https://i.pravatar.cc/150?img=12' },
];

export default function HomeScreen() {
  const { userName } = useAppSelector((s) => s.session);
  const navigation = useNavigation<NavigationProp>();

  const displayName = userName || 'Daksh';

  const renderPersonaCard = ({ item }: { item: typeof MY_PERSONAS[0] }) => (
    <TouchableOpacity
      style={styles.personaCard}
      onPress={() => navigation.navigate('Chat')}
      activeOpacity={0.7}
    >
      <View style={styles.cardAvatarContainer}>
        <Image source={{ uri: item.avatar }} style={styles.cardAvatar} />
        <View style={styles.onlineDot} />
      </View>
      <View style={styles.cardMid}>
        <Text style={styles.cardName}>{item.name}</Text>
        <Text style={styles.cardDesc} numberOfLines={1}>{item.desc}</Text>
        {item.metaType === 'badge' ? (
          <View style={styles.cardBadge}>
            <Feather name="bar-chart-2" size={10} color={Colors.primarySolid} style={{ marginRight: 4 }} />
            <Text style={styles.cardBadgeText}>{item.metaText}</Text>
          </View>
        ) : (
          <Text style={styles.cardMetaText}>{item.metaText}</Text>
        )}
      </View>
      <Feather name="chevron-right" size={20} color={Colors.textMuted} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* TOP HEADER */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <FontAwesome5 name="sparkles" size={20} color={Colors.primarySolid} style={{ marginRight: 8 }} />
            <Text style={styles.headerTitle}>Signet</Text>
          </View>
          <TouchableOpacity style={styles.searchBtn}>
            <Feather name="search" size={20} color={Colors.text} />
          </TouchableOpacity>
        </View>

        {/* USER PROFILE SECTION */}
        <View style={styles.userSection}>
          <View style={styles.mainAvatarContainer}>
            <Image source={{ uri: 'https://i.pravatar.cc/150?img=11' }} style={styles.mainAvatar} />
            <View style={styles.mainOnlineDot} />
          </View>
          <View style={styles.userSectionText}>
            <Text style={styles.greetingText}>Good evening,</Text>
            <Text style={styles.userNameText}>{displayName} <Text style={{fontSize: 20}}>👋</Text></Text>
            <Text style={styles.taglineText}>Build. Chat. Be yourself.</Text>
          </View>
        </View>

        {/* YOUR PERSONAS HEADER */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionHeaderLeft}>
            <Text style={styles.sectionTitle}>Your Personas</Text>
            <View style={styles.countBadge}>
              <Text style={styles.countBadgeText}>{MY_PERSONAS.length}</Text>
            </View>
          </View>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>View all <Feather name="chevron-right" size={14} /></Text>
          </TouchableOpacity>
        </View>

        {/* PERSONAS LIST */}
        <View style={styles.personasContainer}>
          {MY_PERSONAS.length > 0 ? (
            MY_PERSONAS.map((item) => (
              <View key={item.id}>{renderPersonaCard({ item })}</View>
            ))
          ) : (
            <View style={styles.emptyState}>
              <View style={styles.emptyIcon}>
                <FontAwesome5 name="user-astronaut" size={32} color={Colors.textMuted} />
              </View>
              <Text style={styles.emptyTitle}>No Personas Yet</Text>
              <Text style={styles.emptySub}>
                You haven't created any personas. Tap the '+' button below to train your first AI clone!
              </Text>
            </View>
          )}
        </View>

        {/* WHATSAPP BANNER */}
        <LinearGradient
          colors={['#F5F3FF', '#EEECFC']}
          style={styles.waBanner}
        >
          <View style={styles.waIconContainer}>
            <View style={styles.waIconBg}>
              <FontAwesome5 name="whatsapp" size={26} color="#FFF" />
            </View>
            <FontAwesome5 name="sparkles" size={12} color="#A78BFA" style={{position: 'absolute', top: -5, left: -5}} />
          </View>
          <View style={styles.waTextContainer}>
            <Text style={styles.waTitle}>Talk with your persona on WhatsApp</Text>
            <Text style={styles.waDesc}>Integrate your AI clone and chat seamlessly on WhatsApp.</Text>
          </View>
          <TouchableOpacity style={styles.waBtn}>
            <Text style={styles.waBtnText}>Integrate Now</Text>
            <Feather name="chevron-right" size={14} color="#FFF" />
          </TouchableOpacity>
        </LinearGradient>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FAFAFF' },
  scrollContent: { paddingBottom: 100 },

  /* Top Header */
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.md,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1E1E28',
  },
  searchBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },

  /* User Profile Section */
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
  },
  mainAvatarContainer: {
    position: 'relative',
    marginRight: Spacing.lg,
  },
  mainAvatar: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 3,
    borderColor: Colors.primarySolid,
  },
  mainOnlineDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#34D399',
    borderWidth: 3,
    borderColor: '#FAFAFF',
  },
  userSectionText: {
    justifyContent: 'center',
  },
  greetingText: {
    fontSize: 14,
    color: '#8E8E9F',
    marginBottom: 2,
  },
  userNameText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1E1E28',
    marginBottom: 4,
  },
  taglineText: {
    fontSize: 13,
    color: '#8E8E9F',
  },

  /* Section Header */
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    marginTop: Spacing.xl,
    marginBottom: Spacing.md,
  },
  sectionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1E1E28',
  },
  countBadge: {
    backgroundColor: '#E0E7FF',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  countBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.primarySolid,
  },
  viewAllText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.primarySolid,
  },

  /* Personas Container */
  personasContainer: {
    paddingHorizontal: Spacing.xl,
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
    position: 'relative',
    marginRight: 16,
  },
  cardAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  onlineDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#34D399',
    borderWidth: 2,
    borderColor: '#FFF',
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
  cardBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  cardBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.primarySolid,
  },
  cardMetaText: {
    fontSize: 12,
    color: '#A1A1AA',
    fontWeight: '500',
  },

  /* Empty State */
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E1E28',
    marginBottom: 8,
  },
  emptySub: {
    fontSize: 14,
    color: '#8E8E9F',
    textAlign: 'center',
    paddingHorizontal: 32,
    lineHeight: 20,
  },

  /* WhatsApp Banner */
  waBanner: {
    marginHorizontal: Spacing.xl,
    marginTop: 24,
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  waIconContainer: {
    marginRight: 16,
    position: 'relative',
  },
  waIconBg: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#25D366',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#25D366',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  waTextContainer: {
    flex: 1,
    marginRight: 12,
  },
  waTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1E1E28',
    marginBottom: 4,
  },
  waDesc: {
    fontSize: 11,
    color: '#6B7280',
    lineHeight: 16,
  },
  waBtn: {
    backgroundColor: Colors.primarySolid,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  waBtnText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '700',
  },
});
