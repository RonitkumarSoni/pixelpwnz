import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import MaskedView from '@react-native-masked-view/masked-view';
import { Colors, Spacing, Typography, Radii, Gradients } from '../constants/theme';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

const { width } = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParamList, 'Landing'>;

export default function LandingScreen({ navigation }: Props) {
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [floatAnim]);

  const translateY = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -14],
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* Soft Radial Glow Background Illusion using LinearGradient */}
        <LinearGradient
          colors={['rgba(108, 92, 231, 0.08)', 'transparent']}
          style={styles.bgGlow}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        />

        {/* Top Tag */}
        <View style={styles.topTagContainer}>
          <View style={styles.tag}>
            <Text style={styles.tagIcon}>✦</Text>
            <Text style={styles.tagText}>Your Conversations, Your AI</Text>
          </View>
        </View>

        {/* Hero Text & Content */}
        <View style={styles.heroTextContainer}>

          <Text style={styles.title}>Meet Your</Text>
          
          <MaskedView
            style={{ height: 60, width: '100%', alignItems: 'center' }}
            maskElement={<Text style={styles.titleMask}>AI Persona</Text>}
          >
            <LinearGradient
              colors={['#5F5AFF', '#9155FF']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={StyleSheet.absoluteFill}
            />
          </MaskedView>

          {/* 3D Orb Section */}
          <View style={styles.orbContainer}>
            {/* Concentric Platforms */}
            <View style={styles.platform1} />
            <View style={styles.platform2} />
            <View style={styles.platform3} />

            {/* Animated Orb */}
            <Animated.View style={[styles.orbWrapper, { transform: [{ translateY }] }]}>
              <LinearGradient
                colors={['#C5B8FF', '#7560F0', '#2E1A9E']}
                start={{ x: 0.2, y: 0.1 }}
                end={{ x: 0.9, y: 0.9 }}
                style={styles.orb}
              >
                {/* Specular Highlight */}
                <LinearGradient
                  colors={['rgba(255, 255, 255, 0.7)', 'transparent']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.orbHighlight}
                />
                {/* Eyes */}
                <View style={styles.orbEyes}>
                  <View style={styles.orbEye} />
                  <View style={styles.orbEye} />
                </View>
              </LinearGradient>
            </Animated.View>

            {/* Glass Cards (Positioned around Orb) */}
            <View style={[styles.glassCardWrapper, { top: 20, left: 10 }]}>
              <BlurView intensity={40} tint="light" style={styles.glassCard}>
                <View style={styles.glassCardBg} />
                <View style={styles.glassCardIcon}><Feather name="message-circle" size={16} color={Colors.primarySolid} /></View>
                <View>
                  <Text style={styles.glassCardTitle}>Your Chat</Text>
                  <Text style={styles.glassCardDesc}>Upload your{'\n'}conversations</Text>
                </View>
              </BlurView>
            </View>

            <View style={[styles.glassCardWrapper, { bottom: 60, right: 10 }]}>
              <BlurView intensity={40} tint="light" style={styles.glassCard}>
                <View style={styles.glassCardBg} />
                <View style={styles.glassCardIcon}><Feather name="cpu" size={16} color={Colors.primarySolid} /></View>
                <View>
                  <Text style={styles.glassCardTitle}>Smart AI</Text>
                  <Text style={styles.glassCardDesc}>Analyzes tone,{'\n'}pattern & style</Text>
                </View>
              </BlurView>
            </View>
          </View>

          <Text style={styles.subtitle}>
            Signet creates a personalized AI clone from your chat history, built to reflect the way they truly talk.
          </Text>

          {/* CTA Buttons */}
          <View style={styles.ctaRow}>
            <TouchableOpacity
              style={styles.btnPrimary}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Upload')}
            >
              <Feather name="upload" size={18} color="#FFF" />
              <Text style={styles.btnPrimaryText}>Upload Your Chat</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btnGhost}
              activeOpacity={0.8}
            >
              <Feather name="play" size={16} color={Colors.primarySolid} />
              <Text style={styles.btnGhostText}>Watch Demo</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.privacyNote}>
            <Feather name="shield" size={18} color={Colors.primarySolid} style={{ marginTop: 2 }} />
            <Text style={styles.privacyNoteText}>
              Your data stays private and secure.{'\n'}We never store your conversations.
            </Text>
          </View>
        </View>

        {/* Feature Badges */}
        <View style={styles.badgeSection}>
          <View style={styles.glassBadgeWrapper}>
            <BlurView intensity={40} tint="light" style={styles.glassBadge}>
              <View style={styles.glassCardBg} />
              <View style={styles.glassBadgeIcon}><Feather name="shield" size={20} color={Colors.primarySolid} /></View>
              <View>
                <Text style={styles.glassBadgeTitle}>100% Private</Text>
                <Text style={styles.glassBadgeDesc}>Your chats stay on your device.</Text>
              </View>
            </BlurView>
          </View>

          <View style={styles.glassBadgeWrapper}>
            <BlurView intensity={40} tint="light" style={styles.glassBadge}>
              <View style={styles.glassCardBg} />
              <View style={styles.glassBadgeIcon}><Feather name="user-check" size={20} color={Colors.primarySolid} /></View>
              <View>
                <Text style={styles.glassBadgeTitle}>AI Clone</Text>
                <Text style={styles.glassBadgeDesc}>AI that talks like your person.</Text>
              </View>
            </BlurView>
          </View>

          <View style={styles.glassBadgeWrapper}>
            <BlurView intensity={40} tint="light" style={styles.glassBadge}>
              <View style={styles.glassCardBg} />
              <View style={styles.glassBadgeIcon}><Feather name="lock" size={20} color={Colors.primarySolid} /></View>
              <View>
                <Text style={styles.glassBadgeTitle}>Secure & Safe</Text>
                <Text style={styles.glassBadgeDesc}>We never store your data.</Text>
              </View>
            </BlurView>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FDFDFD', // Much lighter, closer to web F5F4FA
  },
  container: {
    flexGrow: 1,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing['5xl'],
    alignItems: 'center',
  },
  bgGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 600,
    zIndex: -1,
  },
  topTagContainer: {
    paddingHorizontal: Spacing.xl,
    alignItems: 'center',
    width: '100%',
    zIndex: 10,
    marginTop: Spacing.sm,
  },
  heroTextContainer: {
    paddingHorizontal: Spacing.xl,
    alignItems: 'center',
    width: '100%',
    marginBottom: Spacing.md,
    zIndex: 10,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(108, 92, 231, 0.08)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 99,
    borderWidth: 1,
    borderColor: 'rgba(108, 92, 231, 0.12)',
    marginBottom: Spacing.xl,
    gap: 8,
  },
  tagIcon: {
    color: Colors.primarySolid,
    fontSize: 14,
  },
  tagText: {
    color: Colors.primarySolid,
    fontWeight: '600',
    fontSize: 14,
  },
  title: {
    fontSize: 46,
    lineHeight: 52,
    fontWeight: '800',
    letterSpacing: -1,
    color: Colors.text,
    textAlign: 'center',
  },
  titleMask: {
    fontSize: 46,
    lineHeight: 52,
    fontWeight: '800',
    letterSpacing: -1,
    textAlign: 'center',
    color: '#000',
  },
  subtitle: {
    ...Typography.bodyLarge,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: Spacing.md,
    marginBottom: Spacing.xl,
    paddingHorizontal: Spacing.md,
  },
  ctaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    marginBottom: Spacing.xl,
    width: '100%',
    paddingHorizontal: Spacing.md,
  },
  btnPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primarySolid,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 14,
    shadowColor: Colors.primarySolid,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 4,
    gap: 6,
  },
  btnPrimaryText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 14,
  },
  btnGhost: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 14,
    gap: 6,
  },
  btnGhostText: {
    color: Colors.text,
    fontWeight: '600',
    fontSize: 14,
  },
  privacyNote: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    maxWidth: 300,
  },
  privacyNoteText: {
    fontSize: 13,
    lineHeight: 20,
    color: Colors.textSecondary,
    textAlign: 'left',
  },
  orbContainer: {
    position: 'relative',
    height: 420,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing['xl'],
    zIndex: 5,
  },
  orbWrapper: {
    zIndex: 10,
    shadowColor: Colors.primarySolid,
    shadowOffset: { width: 0, height: 25 },
    shadowOpacity: 0.45,
    shadowRadius: 40,
    elevation: 15,
  },
  orb: {
    width: 240,
    height: 240,
    borderRadius: 120,
    overflow: 'hidden',
  },
  orbHighlight: {
    position: 'absolute',
    top: '8%',
    left: '14%',
    width: '50%',
    height: '45%',
    borderRadius: 60,
    transform: [{ rotate: '-25deg' }],
  },
  orbEyes: {
    position: 'absolute',
    top: '44%',
    left: '50%',
    transform: [{ translateX: -24 }], // 11 + 11 + 26 spacing = 48 / 2 = 24
    flexDirection: 'row',
    gap: 26,
    zIndex: 20,
  },
  orbEye: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 5,
    elevation: 4,
  },
  platform1: {
    position: 'absolute',
    bottom: 40,
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderColor: 'rgba(255, 255, 255, 0.85)',
    borderWidth: 1,
    transform: [{ scaleY: 0.2 }],
    zIndex: 4,
  },
  platform2: {
    position: 'absolute',
    bottom: 50,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: 'rgba(248, 247, 255, 0.8)',
    borderColor: 'rgba(237, 237, 245, 0.9)',
    borderWidth: 1,
    transform: [{ scaleY: 0.2 }],
    zIndex: 5,
  },
  platform3: {
    position: 'absolute',
    bottom: 55,
    width: 190,
    height: 190,
    borderRadius: 95,
    backgroundColor: 'rgba(108, 92, 231, 0.08)',
    transform: [{ scaleY: 0.2 }],
    zIndex: 6,
  },
  glassCardWrapper: {
    position: 'absolute',
    zIndex: 20,
    borderRadius: Radii.card,
    overflow: 'hidden',
    shadowColor: Colors.primarySolid,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.07,
    shadowRadius: 24,
    elevation: 5,
    borderWidth: 1,
    borderColor: Colors.glass.border,
  },
  glassCard: {
    paddingVertical: 14,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  glassCardBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.glass.bg,
  },
  glassCardIcon: {
    width: 44,
    height: 44,
    borderRadius: 11,
    backgroundColor: 'rgba(108, 92, 231, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  glassCardTitle: {
    fontWeight: '700',
    fontSize: 14,
    color: Colors.text,
    marginBottom: 2,
  },
  glassCardDesc: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 16,
  },
  badgeSection: {
    width: '100%',
    paddingHorizontal: Spacing.xl,
    gap: Spacing.base,
    backgroundColor: Colors.bgLavender,
    borderRadius: 24,
    paddingVertical: 28,
    marginHorizontal: Spacing.xl,
    width: width - (Spacing.xl * 2), // constrain width to screen minus padding
  },
  glassBadgeWrapper: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.glass.border,
    shadowColor: Colors.primarySolid,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.07,
    shadowRadius: 24,
    elevation: 3,
  },
  glassBadge: {
    padding: 22,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  glassBadgeIcon: {
    width: 50,
    height: 50,
    borderRadius: 13,
    backgroundColor: 'rgba(108, 92, 231, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  glassBadgeTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 3,
  },
  glassBadgeDesc: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
  }
});
