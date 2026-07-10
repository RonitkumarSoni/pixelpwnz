import React, { useEffect, useRef } from 'react';
import { 
  View, Text, StyleSheet, ScrollView, Animated, TouchableOpacity, SafeAreaView, Dimensions, Image, Easing 
} from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import MaskedView from '@react-native-masked-view/masked-view';
import * as Haptics from 'expo-haptics';
import { Colors, Spacing, Typography, Radii } from '../constants/theme';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../navigation/AuthNavigator';
import { useAppDispatch } from '../store/hooks';
import { setIsLoggedIn } from '../store/sessionSlice';

const { width } = Dimensions.get('window');

type Props = NativeStackScreenProps<AuthStackParamList, 'Landing'>;

export default function LandingScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const floatAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const eyeBlinkAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Floating animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 3000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 3000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Blinking animation
    const blink = () => {
      Animated.sequence([
        Animated.timing(eyeBlinkAnim, {
          toValue: 0.1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(eyeBlinkAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
      
      // Randomize next blink (between 2s and 6s)
      const nextBlink = Math.random() * 4000 + 2000;
      setTimeout(blink, nextBlink);
    };
    
    const timeout = setTimeout(blink, 2000);
    return () => clearTimeout(timeout);
  }, [floatAnim, eyeBlinkAnim]);

  const translateY = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -12],
  });

  const handleRobotPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    
    // Manual Blink + Bounce
    Animated.parallel([
      Animated.sequence([
        Animated.timing(scaleAnim, { toValue: 0.9, duration: 100, useNativeDriver: true }),
        Animated.timing(scaleAnim, { toValue: 1.1, duration: 150, useNativeDriver: true }),
        Animated.timing(scaleAnim, { toValue: 1, duration: 150, useNativeDriver: true }),
      ]),
      Animated.sequence([
        Animated.timing(eyeBlinkAnim, { toValue: 0.1, duration: 100, useNativeDriver: true }),
        Animated.timing(eyeBlinkAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
      ])
    ]).start();
  };

  const handleGuestLogin = () => {
    dispatch(setIsLoggedIn(true));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* Soft Radial Glow */}
        <LinearGradient
          colors={['rgba(108, 92, 231, 0.05)', 'transparent']}
          style={styles.bgGlow}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        />

        {/* Top Tag */}
        <View style={styles.topTagContainer}>
          <View style={styles.tag}>
            <Text style={styles.tagIcon}>✦</Text>
            <Text style={styles.tagText}>Your digital twin. Written in your hand.</Text>
          </View>
        </View>

        {/* Hero Text */}
        <View style={styles.heroTextContainer}>
          <Text style={styles.title}>Meet Your</Text>
          <MaskedView
            style={{ height: 56, width: '100%', alignItems: 'center' }}
            maskElement={<Text style={styles.titleMask}>Personal Clone</Text>}
          >
            <LinearGradient
              colors={['#8B7CF7', '#6C5CE7']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={StyleSheet.absoluteFill}
            />
          </MaskedView>

          <Text style={styles.subtitle}>
            Upload a chat export and Signet learns exactly how you talk, think and reply to create an AI that sounds just like you.
          </Text>
        </View>

        {/* Interactive Robot Section */}
        <View style={styles.robotSection}>
          {/* Faint dashed circles background (approximated with borders) */}
          <View style={styles.bgCircleLarge} />
          <View style={styles.bgCircleSmall} />

          {/* 4 Floating Cards */}
          <View style={[styles.floatingCard, { top: 10, left: 0 }]}>
            <View style={styles.cardIconBox}><Feather name="message-circle" size={14} color={Colors.primarySolid} /></View>
            <View>
              <Text style={styles.cardTitle}>Your Chat</Text>
              <Text style={styles.cardDesc}>Upload your{'\n'}conversations</Text>
            </View>
          </View>

          <View style={[styles.floatingCard, { top: 10, right: 0 }]}>
            <View style={styles.cardIconBox}><Feather name="cpu" size={14} color={Colors.primarySolid} /></View>
            <View>
              <Text style={styles.cardTitle}>AI Processing</Text>
              <Text style={styles.cardDesc}>We analyze tone,{'\n'}pattern & style</Text>
            </View>
          </View>

          <View style={[styles.floatingCard, { bottom: 10, left: 0 }]}>
            <View style={styles.cardIconBox}><Feather name="zap" size={14} color={Colors.primarySolid} /></View>
            <View>
              <Text style={styles.cardTitle}>Smart Learning</Text>
              <Text style={styles.cardDesc}>Advanced AI creates{'\n'}your unique clone</Text>
            </View>
          </View>

          <View style={[styles.floatingCard, { bottom: 10, right: 0 }]}>
            <View style={styles.cardIconBox}><Feather name="user" size={14} color={Colors.primarySolid} /></View>
            <View>
              <Text style={styles.cardTitle}>Your AI Clone</Text>
              <Text style={styles.cardDesc}>Talk like you.{'\n'}Respond like you.</Text>
            </View>
          </View>

          {/* Central Robot (Pure React Native) */}
          <TouchableOpacity activeOpacity={1} onPress={handleRobotPress} style={styles.robotTouchArea}>
            <Animated.View style={[styles.robotWrapper, { transform: [{ translateY }, { scale: scaleAnim }] }]}>
              
              <View style={styles.robotContainer}>
                {/* Robot Head */}
                <View style={styles.robotHead}>
                  {/* Antennas/Ears */}
                  <View style={styles.robotEarLeft} />
                  <View style={styles.robotEarRight} />
                  
                  {/* Face/Screen */}
                  <LinearGradient
                    colors={['#1E1B4B', '#0F172A']}
                    style={styles.robotFace}
                  >
                    {/* Eyes */}
                    <View style={styles.robotEyesContainer}>
                      <Animated.View style={[styles.robotEye, { transform: [{ scaleY: eyeBlinkAnim }] }]} />
                      <Animated.View style={[styles.robotEye, { transform: [{ scaleY: eyeBlinkAnim }] }]} />
                    </View>
                    
                    {/* Little smile / cheek details */}
                    <View style={styles.robotCheekLeft} />
                    <View style={styles.robotCheekRight} />
                  </LinearGradient>
                </View>

                {/* Robot Body */}
                <View style={styles.robotBodyWrapper}>
                  <View style={styles.robotArmLeft} />
                  <View style={styles.robotTorso}>
                    <View style={styles.robotChestLight} />
                  </View>
                  <View style={styles.robotArmRight} />
                </View>
              </View>
              
              {/* Floating Shadow */}
              <View style={styles.robotShadow} />
            </Animated.View>
          </TouchableOpacity>
        </View>

        {/* Auth Buttons */}
        <View style={styles.authContainer}>
          <TouchableOpacity style={styles.btnGuest} activeOpacity={0.7} onPress={handleGuestLogin}>
            <Feather name="user" size={18} color={Colors.primarySolid} />
            <Text style={styles.btnGuestText}>Continue as Guest</Text>
          </TouchableOpacity>

          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or continue with</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity style={styles.btnOutline} activeOpacity={0.7} onPress={handleGuestLogin}>
            <FontAwesome5 name="google" size={18} color="#000" />
            <Text style={styles.btnOutlineText}>Continue with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnOutline} activeOpacity={0.7} onPress={handleGuestLogin}>
            <FontAwesome5 name="apple" size={20} color="#000" />
            <Text style={styles.btnOutlineText}>Continue with Apple</Text>
          </TouchableOpacity>
        </View>

        {/* Features Row */}
        <View style={styles.featuresRow}>
          <View style={styles.featureItem}>
            <View style={styles.featureIconBox}><Feather name="shield" size={18} color={Colors.primarySolid} /></View>
            <Text style={styles.featureTitle}>100% Private</Text>
            <Text style={styles.featureDesc}>Your chats stay{'\n'}only on your device.</Text>
          </View>
          <View style={styles.featureItem}>
            <View style={styles.featureIconBox}><Feather name="cpu" size={18} color={Colors.primarySolid} /></View>
            <Text style={styles.featureTitle}>Learns Your Style</Text>
            <Text style={styles.featureDesc}>Tone, emojis, slang{'\n'}and reply patterns.</Text>
          </View>
          <View style={styles.featureItem}>
            <View style={styles.featureIconBox}><Feather name="zap" size={18} color={Colors.primarySolid} /></View>
            <Text style={styles.featureTitle}>Ready in Minutes</Text>
            <Text style={styles.featureDesc}>Build your AI twin{'\n'}in less than a minute.</Text>
          </View>
        </View>

        {/* Footer Privacy Note */}
        <View style={styles.footerNote}>
          <Feather name="shield" size={16} color={Colors.primarySolid} style={{ marginTop: 2 }} />
          <Text style={styles.footerNoteText}>
            Your data stays private and secure.{'\n'}We never store your conversations.
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F8FC', 
  },
  container: {
    flexGrow: 1,
    paddingTop: 60, // Added substantial top padding for notches
    paddingBottom: Spacing['4xl'],
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
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(108, 92, 231, 0.08)',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 99,
    marginBottom: Spacing.xl,
    gap: 8,
  },
  tagIcon: {
    color: Colors.primarySolid,
    fontSize: 12,
  },
  tagText: {
    color: Colors.primarySolid,
    fontWeight: '600',
    fontSize: 12,
  },
  heroTextContainer: {
    paddingHorizontal: Spacing.xl,
    alignItems: 'center',
    width: '100%',
    zIndex: 10,
  },
  title: {
    fontSize: 44,
    lineHeight: 48,
    fontWeight: '800',
    letterSpacing: -1,
    color: '#111',
    textAlign: 'center',
  },
  titleMask: {
    fontSize: 44,
    lineHeight: 48,
    fontWeight: '800',
    letterSpacing: -1,
    textAlign: 'center',
    color: '#000',
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: Spacing.md,
    paddingHorizontal: Spacing.sm,
    lineHeight: 22,
  },
  
  /* Robot Section */
  robotSection: {
    position: 'relative',
    height: 300,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: Spacing.xl,
  },
  bgCircleLarge: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 140,
    borderWidth: 1,
    borderColor: 'rgba(108, 92, 231, 0.1)',
    borderStyle: 'dashed',
  },
  bgCircleSmall: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'rgba(108, 92, 231, 0.15)',
    borderStyle: 'dashed',
  },
  robotTouchArea: {
    zIndex: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  robotWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  robotContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  robotHead: {
    width: 120,
    height: 100,
    backgroundColor: '#E2E8F0',
    borderRadius: 40,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primarySolid,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
    position: 'relative',
    zIndex: 2,
  },
  robotBodyWrapper: {
    position: 'relative',
    alignItems: 'center',
    marginTop: -15, // Overlap under head
    zIndex: 1,
  },
  robotTorso: {
    width: 70,
    height: 60,
    backgroundColor: '#E2E8F0',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.8)',
    alignItems: 'center',
    paddingTop: 25,
  },
  robotChestLight: {
    width: 24,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#38BDF8',
    opacity: 0.8,
    shadowColor: '#38BDF8',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 2,
  },
  robotArmLeft: {
    position: 'absolute',
    left: -15,
    top: 15,
    width: 18,
    height: 45,
    backgroundColor: '#cbd5e1',
    borderRadius: 9,
    transform: [{ rotate: '25deg' }],
    zIndex: 0,
  },
  robotArmRight: {
    position: 'absolute',
    right: -15,
    top: 15,
    width: 18,
    height: 45,
    backgroundColor: '#cbd5e1',
    borderRadius: 9,
    transform: [{ rotate: '-25deg' }],
    zIndex: 0,
  },
  robotFace: {
    width: 90,
    height: 60,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  robotEyesContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  robotEye: {
    width: 12,
    height: 24,
    backgroundColor: '#38BDF8',
    borderRadius: 6,
    shadowColor: '#38BDF8',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 5,
  },
  robotEarLeft: {
    position: 'absolute',
    left: -10,
    top: 30,
    width: 14,
    height: 40,
    backgroundColor: '#94A3B8',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  robotEarRight: {
    position: 'absolute',
    right: -10,
    top: 30,
    width: 14,
    height: 40,
    backgroundColor: '#94A3B8',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  robotCheekLeft: {
    position: 'absolute',
    left: 10,
    bottom: 12,
    width: 12,
    height: 6,
    backgroundColor: '#F472B6',
    borderRadius: 3,
    opacity: 0.6,
  },
  robotCheekRight: {
    position: 'absolute',
    right: 10,
    bottom: 12,
    width: 12,
    height: 6,
    backgroundColor: '#F472B6',
    borderRadius: 3,
    opacity: 0.6,
  },
  robotShadow: {
    width: 80,
    height: 10,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 50,
    marginTop: 30,
  },
  robotImage: {
    width: '100%',
    height: '100%',
  },
  
  /* Floating Cards */
  floatingCard: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 14,
    gap: 10,
    shadowColor: Colors.primarySolid,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    borderWidth: 1,
    borderColor: Colors.border,
    zIndex: 15,
    width: 145,
  },
  cardIconBox: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: 'rgba(108, 92, 231, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#111',
    marginBottom: 2,
  },
  cardDesc: {
    fontSize: 9,
    color: Colors.textSecondary,
    lineHeight: 12,
  },

  /* Auth Container */
  authContainer: {
    width: '100%',
    paddingHorizontal: Spacing.xl,
    gap: 12,
    marginBottom: Spacing.xl,
  },
  btnGuest: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(108, 92, 231, 0.08)',
    paddingVertical: 14,
    borderRadius: 14,
    gap: 8,
  },
  btnGuestText: {
    color: Colors.primarySolid,
    fontWeight: '700',
    fontSize: 15,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },
  dividerText: {
    color: Colors.textMuted,
    paddingHorizontal: 10,
    fontSize: 13,
  },
  btnOutline: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: Colors.border,
    paddingVertical: 14,
    borderRadius: 14,
    gap: 10,
  },
  btnOutlineText: {
    color: '#111',
    fontWeight: '600',
    fontSize: 15,
  },

  /* Features */
  featuresRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: Spacing.lg,
    backgroundColor: '#FFF',
    paddingVertical: 24,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    marginHorizontal: Spacing.xl,
    marginBottom: Spacing.xl,
  },
  featureItem: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  featureIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(108, 92, 231, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  featureTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#111',
    marginBottom: 4,
    textAlign: 'center',
  },
  featureDesc: {
    fontSize: 10,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 14,
  },

  /* Footer */
  footerNote: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: Spacing.xl,
  },
  footerNoteText: {
    fontSize: 12,
    lineHeight: 18,
    color: Colors.textSecondary,
    textAlign: 'left',
  },
});
