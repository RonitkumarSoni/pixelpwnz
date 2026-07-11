import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Alert, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { Colors, Typography, Spacing, Radii } from '../constants/theme';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { clearSession, setUserName, setAvatarUrl } from '../store/sessionSlice';
import { logout, updateUser } from '../store/authSlice';
import Modal from 'react-native-modal';
import * as ImagePicker from 'expo-image-picker';
import * as Haptics from 'expo-haptics';

export default function ProfileScreen() {
  const dispatch = useAppDispatch();
  const { userName, avatarUrl } = useAppSelector((s) => s.session);
  const { user } = useAppSelector((s) => s.auth);
  const bookmarks = useAppSelector((s) => s.bookmarks.bookmarks);

  const displayName = user?.name || userName || 'Guest';
  const displayAvatar = user?.avatarUrl || avatarUrl || 'https://i.pravatar.cc/150?img=11';

  // State for edit modal
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editName, setEditName] = useState(displayName);
  const [editAvatar, setEditAvatar] = useState<string | null>(displayAvatar);

  const handleSettings = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Alert.alert('Settings', 'Account options', [
      {
        text: 'Log Out',
        style: 'destructive',
        onPress: () => {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
          dispatch(clearSession());
          dispatch(logout());
        }
      },
      { text: 'Cancel', style: 'cancel' }
    ]);
  };

  const openEditModal = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setEditName(displayName);
    setEditAvatar(displayAvatar);
    setIsEditModalVisible(true);
  };

  const pickImage = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        // Handle both SDK versions: assets array or direct uri
        const uri = (result as any).assets?.[0]?.uri || (result as any).uri;
        if (uri) {
          setEditAvatar(uri);
        }
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const saveProfile = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    if (user) {
      dispatch(updateUser({ name: editName, avatarUrl: editAvatar }));
    }
    dispatch(setUserName(editName));
    if (editAvatar) {
      dispatch(setAvatarUrl(editAvatar));
    }
    setIsEditModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile Info */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: displayAvatar }} style={styles.avatarImage} />
            <TouchableOpacity style={styles.editAvatarButton} onPress={openEditModal}>
              <Feather name="camera" size={20} color={Colors.text} />
            </TouchableOpacity>
          </View>
          <Text style={styles.username}>{displayName}</Text>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>0</Text>
              <Text style={styles.statLabel}>personas</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{bookmarks.length}</Text>
              <Text style={styles.statLabel}>bookmarks</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>0</Text>
              <Text style={styles.statLabel}>interactions</Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionsRow}>
            <TouchableOpacity style={styles.btnSecondary} onPress={openEditModal}>
              <Text style={styles.btnSecondaryText}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnSecondary}>
              <Text style={styles.btnSecondaryText}>Share Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnIcon} onPress={handleSettings}>
              <Feather name="settings" size={20} color={Colors.text} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Edit Profile Modal */}
      <Modal
        isVisible={isEditModalVisible}
        onBackdropPress={() => setIsEditModalVisible(false)}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Edit Profile</Text>

          <TouchableOpacity style={styles.editAvatarContainer} onPress={pickImage}>
            <Image source={{ uri: editAvatar || displayAvatar }} style={styles.editAvatar} />
            <View style={styles.editAvatarOverlay}>
              <Feather name="camera" size={24} color="#fff" />
            </View>
          </TouchableOpacity>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Name</Text>
            <TextInput
              style={styles.input}
              value={editName}
              onChangeText={setEditName}
              placeholder="Enter your name"
              placeholderTextColor={Colors.textMuted}
            />
          </View>

          <View style={styles.modalActions}>
            <TouchableOpacity
              style={[styles.modalButton, styles.modalButtonCancel]}
              onPress={() => setIsEditModalVisible(false)}
            >
              <Text style={styles.modalButtonCancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalButton, styles.modalButtonSave]} onPress={saveProfile}>
              <Text style={styles.modalButtonSaveText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.bg },
  scrollContent: { paddingBottom: 100, paddingTop: Spacing.lg },
  profileSection: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: Spacing.md,
  },
  avatarImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: Colors.surfaceElevated,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  username: {
    ...Typography.h2,
    color: Colors.text,
    marginBottom: Spacing.lg,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 32,
    marginBottom: Spacing.xl,
    justifyContent: 'center',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    ...Typography.h3,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: Colors.textMuted,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  btnSecondary: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surfaceElevated,
  },
  btnSecondaryText: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: '600',
  },
  btnIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Modal styles
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: Colors.surface,
    padding: Spacing.xl,
    borderTopLeftRadius: Radii.card,
    borderTopRightRadius: Radii.card,
  },
  modalTitle: {
    ...Typography.h2,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
  editAvatarContainer: {
    alignSelf: 'center',
    marginBottom: Spacing.xl,
    position: 'relative',
  },
  editAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.surfaceElevated,
  },
  editAvatarOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputGroup: {
    marginBottom: Spacing.lg,
  },
  inputLabel: {
    ...Typography.body,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  input: {
    backgroundColor: Colors.surfaceElevated,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radii.input,
    paddingHorizontal: Spacing.md,
    paddingVertical: 14,
    color: Colors.text,
    fontSize: 16,
  },
  modalActions: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginTop: Spacing.xl,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: Radii.card,
    alignItems: 'center',
  },
  modalButtonCancel: {
    backgroundColor: Colors.surfaceElevated,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  modalButtonCancelText: {
    ...Typography.body,
    fontWeight: '600',
    color: Colors.text,
  },
  modalButtonSave: {
    backgroundColor: Colors.primarySolid,
  },
  modalButtonSaveText: {
    ...Typography.body,
    fontWeight: '600',
    color: '#fff',
  },
});
