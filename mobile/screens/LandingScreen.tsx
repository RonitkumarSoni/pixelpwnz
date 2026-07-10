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
import type { RootStackParamList } from '../navigation/AppNavigator';
import { useAppDispatch } from '../store/hooks';
import { setIsLoggedIn } from '../store/sessionSlice';

const { width } = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParamList, 'Landing'>;

export default function LandingScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const floatAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
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
  }, [floatAnim]);

  const translateY = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -12],
  });

  const handleRobotPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1.1,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
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
              colors={['#7E6CFF', '#9155FF']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
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

          {/* Central Robot */}
          <TouchableOpacity activeOpacity={1} onPress={handleRobotPress} style={styles.robotTouchArea}>
            <Animated.View style={[styles.robotWrapper, { transform: [{ translateY }, { scale: scaleAnim }] }]}>
              <Image 
                source={{ uri: 'https://cdn3d.iconscout.com/3d/premium/thumb/robot-6987747-5735414.png' }} 
                style={styles.robotImage}
                resizeMode="contain"
              />
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
            <FontAwesome5 name="google" size={18} color="#EA4335" />
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
    paddingTop: Spacing.xl,
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
    width: 180,
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
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
