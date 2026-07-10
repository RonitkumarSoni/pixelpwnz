import React, { useRef, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Animated,
  Easing,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as Haptics from 'expo-haptics';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setSession, setUploading, setUploadProgress } from '../store/sessionSlice';
import apiClient from '../api/client';
import { Colors, Spacing, Typography, Radii, Gradients, MIN_TOUCH_TARGET } from '../constants/theme';
import { RootStackParamList } from '../navigation/AppNavigator';

type UploadNavProp = NativeStackNavigationProp<RootStackParamList, 'Upload'>;

export default function UploadScreen() {
  const dispatch = useAppDispatch();
  const { isUploading, uploadProgress } = useAppSelector((s) => s.session);
  const navigation = useNavigation<UploadNavProp>();

  // Animated progress width
  const progressAnim = useRef(new Animated.Value(0)).current;

  const animateProgress = useCallback((toValue: number) => {
    Animated.timing(progressAnim, {
      toValue,
      duration: 300,
      easing: Easing.out(Easing.quad),
      useNativeDriver: false,
    }).start();
  }, [progressAnim]);

  const pickAndUpload = async () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

      const result = await DocumentPicker.getDocumentAsync({
        type: 'text/plain',
        copyToCacheDirectory: true,
      });

      if (result.canceled || !result.assets || result.assets.length === 0) return;

      const file = result.assets[0];
      if (!file.name.endsWith('.txt')) {
        Alert.alert('Invalid File', 'Please select a valid .txt WhatsApp export file.');
        return;
      }

      dispatch(setUploading(true));
      dispatch(setUploadProgress(0));
      animateProgress(0);

      // Upload using expo-file-system for multipart/form-data
      const uploadResult = await FileSystem.uploadAsync(
        `${apiClient.defaults.baseURL}/upload`,
        file.uri,
        {
          fieldName: 'file',
          httpMethod: 'POST',
          // @ts-ignore
          uploadType: FileSystem.FileSystemUploadType.MULTIPART,
          headers: {
            Accept: 'application/json',
          },
        }
      );

      // Simulate progress animation since FileSystem doesn't provide granular progress
      animateProgress(0.5);
      dispatch(setUploadProgress(0.5));

      if (uploadResult.status >= 200 && uploadResult.status < 300) {
        animateProgress(1);
        dispatch(setUploadProgress(1));

        const data = JSON.parse(uploadResult.body);

        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

        dispatch(setSession({
          sessionId: data.session_id,
          userName: data.user_name || 'User',
          pairCount: data.pair_count || 0,
        }));

        dispatch(setUploading(false));

        // Navigate to Chat
        navigation.navigate('Chat');
      } else {
        throw new Error(`Upload failed with status ${uploadResult.status}`);
      }
    } catch (error: any) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      dispatch(setUploading(false));
      dispatch(setUploadProgress(0));
      animateProgress(0);
      Alert.alert('Upload Failed', error?.message || 'Something went wrong. Please try again.');
    }
  };

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      {/* AI Glow Orb */}
      <View style={styles.glowOrb} />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          {/* Branding */}
          <View style={styles.branding}>
            <Text style={styles.logo}>Signet</Text>
            <Text style={styles.tagline}>Your digital twin. Write like you.</Text>
          </View>

          {/* Upload Dropzone Card */}
          <TouchableOpacity
            onPress={pickAndUpload}
            disabled={isUploading}
            activeOpacity={0.75}
            style={[styles.dropzone, isUploading && styles.dropzoneUploading]}
          >
            <Feather
              name="upload-cloud"
              size={48}
              color={isUploading ? Colors.primarySolid : Colors.textSecondary}
            />
            <Text style={styles.dropzoneTitle}>
              {isUploading ? 'Uploading...' : 'Tap to Upload'}
            </Text>
            <Text style={styles.dropzoneSubtitle}>
              Select your WhatsApp .txt export file
            </Text>

            {/* Progress Bar */}
            {isUploading && (
              <View style={styles.progressTrack}>
                <Animated.View style={[styles.progressBarContainer, { width: progressWidth }]}>
                  <LinearGradient
                    colors={[...Gradients.primary]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.progressBar}
                  />
                </Animated.View>
              </View>
            )}
          </TouchableOpacity>

          {/* Footer */}
          <Text style={styles.footer}>
            Your data is processed securely and never stored permanently.{'\n'}
            You can delete everything at any time.
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  glowOrb: {
    position: 'absolute',
    top: -60,
    right: -60,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(139,92,246,0.15)',
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
  },
  branding: {
    alignItems: 'center',
    marginBottom: Spacing['4xl'],
  },
  logo: {
    ...Typography.h1,
    color: Colors.primarySolid,
    marginBottom: Spacing.sm,
  },
  tagline: {
    ...Typography.bodyLarge,
    color: Colors.textSecondary,
  },
  dropzone: {
    width: '100%',
    backgroundColor: Colors.surface,
    borderRadius: Radii.md,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: Colors.border,
    paddingVertical: Spacing['4xl'],
    paddingHorizontal: Spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing['2xl'],
  },
  dropzoneUploading: {
    borderColor: Colors.primarySolid,
    borderStyle: 'solid',
    backgroundColor: 'rgba(139,92,246,0.03)',
  },
  dropzoneTitle: {
    ...Typography.h3,
    color: Colors.text,
    marginTop: Spacing.base,
    marginBottom: Spacing.xs,
  },
  dropzoneSubtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginBottom: Spacing.base,
  },
  progressTrack: {
    width: '100%',
    height: 4,
    backgroundColor: Colors.border,
    borderRadius: 2,
    overflow: 'hidden',
    marginTop: Spacing.md,
  },
  progressBarContainer: {
    height: '100%',
  },
  progressBar: {
    flex: 1,
    borderRadius: 2,
  },
  footer: {
    ...Typography.small,
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: 18,
  },
});
