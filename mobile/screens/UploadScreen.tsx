import React, { useRef, useCallback, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Animated,
  Easing,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
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
import { Colors, Spacing, Typography, Radii, Gradients } from '../constants/theme';
import { RootStackParamList } from '../navigation/AppNavigator';
import MaskedView from '@react-native-masked-view/masked-view';

type UploadNavProp = NativeStackNavigationProp<RootStackParamList, 'Upload'>;

export default function UploadScreen() {
  const dispatch = useAppDispatch();
  const { isUploading, uploadProgress } = useAppSelector((s) => s.session);
  const navigation = useNavigation<UploadNavProp>();
  const [userName, setUserName] = useState('');
  const [selectedFile, setSelectedFile] = useState<DocumentPicker.DocumentPickerAsset | null>(null);

  const progressAnim = useRef(new Animated.Value(0)).current;

  const animateProgress = useCallback((toValue: number) => {
    Animated.timing(progressAnim, {
      toValue,
      duration: 300,
      easing: Easing.out(Easing.quad),
      useNativeDriver: false,
    }).start();
  }, [progressAnim]);

  const pickFile = async () => {
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
      setSelectedFile(file);
    } catch (err) {
      console.log(err);
    }
  };

  const doUpload = async () => {
    if (!selectedFile) return;
    if (!userName.trim()) {
      Alert.alert('Name Required', 'Please enter a name for your persona.');
      return;
    }

    try {
      dispatch(setUploading(true));
      dispatch(setUploadProgress(0));
      animateProgress(0);

      const uploadResult = await FileSystem.uploadAsync(
        `${apiClient.defaults.baseURL}/upload`,
        selectedFile.uri,
        {
          fieldName: 'chatFile',
          httpMethod: 'POST',
          // @ts-ignore
          uploadType: FileSystem.FileSystemUploadType.MULTIPART,
          parameters: { user_name: userName.trim() },
          headers: { Accept: 'application/json' },
        }
      );

      animateProgress(0.5);
      dispatch(setUploadProgress(0.5));

      if (uploadResult.status >= 200 && uploadResult.status < 300) {
        animateProgress(1);
        dispatch(setUploadProgress(1));
        const data = JSON.parse(uploadResult.body);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        dispatch(setSession({
          sessionId: data.session_id,
          userName: data.user_name || userName,
          pairCount: data.pair_count || 0,
        }));
        dispatch(setUploading(false));
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
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Header Title */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Create Persona</Text>
          </View>

          {/* Intro Text */}
          <View style={styles.introContainer}>
            <MaskedView
              maskElement={<Text style={styles.gradientTitle}>Upload Your Chat</Text>}
            >
              <LinearGradient
                colors={[...Gradients.primary]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={[styles.gradientTitle, { opacity: 0 }]}>Upload Your Chat</Text>
              </LinearGradient>
            </MaskedView>
            <Text style={styles.subText}>Export your WhatsApp chat as a .txt file without media and upload it here.</Text>
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            <Text style={styles.inputLabel}>Persona Name</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. John Doe"
              placeholderTextColor={Colors.textMuted}
              value={userName}
              onChangeText={setUserName}
              editable={!isUploading}
            />

            <Text style={styles.inputLabel}>Chat File</Text>
            <TouchableOpacity
              onPress={pickFile}
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
                {selectedFile ? 'File Selected' : (isUploading ? 'Uploading...' : 'Tap to Select File')}
              </Text>
              <Text style={styles.dropzoneSubtitle}>
                {selectedFile ? selectedFile.name : 'Must be a .txt export'}
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

            {/* Submit Button */}
            {selectedFile && !isUploading && (
              <TouchableOpacity style={styles.submitBtn} onPress={doUpload}>
                <LinearGradient
                  colors={[...Gradients.primary]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.submitBtnGradient}
                >
                  <Text style={styles.submitBtnText}>Create Clone</Text>
                  <Feather name="arrow-right" size={20} color="#FFF" />
                </LinearGradient>
              </TouchableOpacity>
            )}
          </View>

          {/* Instructions */}
          <View style={styles.instructionsCard}>
            <Text style={styles.instructionsTitle}>How to export from WhatsApp</Text>
            <View style={styles.instructionStep}>
              <Text style={styles.stepNum}>1</Text>
              <Text style={styles.stepText}>Open WhatsApp chat</Text>
            </View>
            <View style={styles.instructionStep}>
              <Text style={styles.stepNum}>2</Text>
              <Text style={styles.stepText}>Tap the contact name / menu</Text>
            </View>
            <View style={styles.instructionStep}>
              <Text style={styles.stepNum}>3</Text>
              <Text style={styles.stepText}>Select "Export Chat"</Text>
            </View>
            <View style={styles.instructionStep}>
              <Text style={styles.stepNum}>4</Text>
              <Text style={styles.stepText}>Choose "Without Media"</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.bg },
  scrollContent: { paddingHorizontal: Spacing.xl, paddingBottom: 100 },
  header: {
    paddingVertical: Spacing.md,
    alignItems: 'center',
  },
  headerTitle: {
    ...Typography.h2,
    color: Colors.text,
  },
  introContainer: {
    marginTop: Spacing.lg,
    marginBottom: Spacing.xl,
    alignItems: 'center',
  },
  gradientTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  subText: {
    ...Typography.body,
    color: Colors.textMuted,
    textAlign: 'center',
  },
  formContainer: {
    marginBottom: Spacing.xl,
  },
  inputLabel: {
    ...Typography.body,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  input: {
    backgroundColor: Colors.glass.bg,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radii.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: 14,
    color: Colors.text,
    fontSize: 16,
    marginBottom: Spacing.lg,
  },
  dropzone: {
    width: '100%',
    backgroundColor: Colors.glass.bg,
    borderRadius: Radii.md,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: Colors.border,
    paddingVertical: Spacing['2xl'],
    paddingHorizontal: Spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  dropzoneUploading: {
    borderColor: Colors.primarySolid,
    borderStyle: 'solid',
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
  submitBtn: {
    width: '100%',
    borderRadius: Radii.md,
    overflow: 'hidden',
  },
  submitBtnGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 12,
  },
  submitBtnText: {
    ...Typography.h3,
    color: '#FFF',
  },
  instructionsCard: {
    backgroundColor: Colors.glass.bg,
    borderRadius: Radii.lg,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  instructionsTitle: {
    ...Typography.h3,
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  instructionStep: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  stepNum: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.border,
    color: Colors.text,
    textAlign: 'center',
    lineHeight: 24,
    fontSize: 12,
    fontWeight: 'bold',
    marginRight: Spacing.sm,
  },
  stepText: {
    ...Typography.body,
    color: Colors.textMuted,
  }
});
