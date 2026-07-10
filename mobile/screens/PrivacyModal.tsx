import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { Colors, Spacing, Typography, Radii, Gradients } from '../constants/theme';

interface PrivacyModalProps {
  onAgree: () => void;
}

export default function PrivacyModal({ onAgree }: PrivacyModalProps) {
  const handleAgree = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onAgree();
  };

  return (
    <View style={styles.overlay}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          {/* Glow orb */}
          <View style={styles.glowOrb} />

          <View style={styles.card}>
            <Text style={styles.icon}>🔒</Text>
            <Text style={styles.title}>Privacy & Data Agreement</Text>
            <Text style={styles.subtitle}>
              Before you begin, please review how Signet handles your data.
            </Text>

            <ScrollView style={styles.scrollArea} showsVerticalScrollIndicator={false}>
              <Text style={styles.sectionTitle}>What we process</Text>
              <Text style={styles.bodyText}>
                • Your exported WhatsApp chat (.txt file) is parsed to extract message pairs.{'\n'}
                • Messages are converted into embeddings and stored temporarily to power your digital clone.
              </Text>

              <Text style={styles.sectionTitle}>What we DON'T do</Text>
              <Text style={styles.bodyText}>
                • We never store your raw chat file permanently.{'\n'}
                • We never share your data with third parties.{'\n'}
                • We never use your data for training external AI models.
              </Text>

              <Text style={styles.sectionTitle}>Your control</Text>
              <Text style={styles.bodyText}>
                • You can delete all your data at any time using the "Clear Data" button.{'\n'}
                • Sessions auto-expire after inactivity.{'\n'}
                • All processing happens within your session scope only.
              </Text>

              <Text style={styles.sectionTitle}>WhatsApp Compliance</Text>
              <Text style={styles.bodyText}>
                This app processes your own exported chat data per WhatsApp's terms. You are responsible for having appropriate consent from other participants in the chat.
              </Text>
            </ScrollView>

            <TouchableOpacity
              onPress={handleAgree}
              activeOpacity={0.85}
              style={styles.buttonContainer}
            >
              <LinearGradient
                colors={[...Gradients.primary]}
                start={Gradients.primaryStart}
                end={Gradients.primaryEnd}
                style={styles.agreeButton}
              >
                <Text style={styles.agreeButtonText}>I Agree & Continue</Text>
              </LinearGradient>
            </TouchableOpacity>

            <Text style={styles.footerText}>
              By tapping "I Agree", you acknowledge that you have read and understood our data handling practices.
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.bg,
    zIndex: 100,
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  glowOrb: {
    position: 'absolute',
    top: -40,
    right: -40,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(139,92,246,0.12)',
    opacity: 0.6,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radii.card,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.xl,
    width: '100%',
    maxHeight: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 32,
    elevation: 16,
  },
  icon: {
    fontSize: 40,
    textAlign: 'center',
    marginBottom: Spacing.base,
  },
  title: {
    ...Typography.h2,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
  scrollArea: {
    maxHeight: 280,
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    ...Typography.h3,
    color: Colors.text,
    marginTop: Spacing.base,
    marginBottom: Spacing.sm,
  },
  bodyText: {
    ...Typography.body,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  buttonContainer: {
    marginBottom: Spacing.md,
  },
  agreeButton: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing['2xl'],
    borderRadius: Radii.button,
    alignItems: 'center',
  },
  agreeButtonText: {
    ...Typography.bodyLarge,
    color: Colors.text,
    fontWeight: '700',
  },
  footerText: {
    ...Typography.small,
    color: Colors.textMuted,
    textAlign: 'center',
  },
});
