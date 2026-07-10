import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlashList } from '@shopify/flash-list';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addMessage, setThinking, clearMessages, Message } from '../store/chatSlice';
import { clearSession } from '../store/sessionSlice';
import apiClient from '../api/client';
import ThinkingDots from '../components/ThinkingDots';
import StatsHeader from '../components/StatsHeader';
import { Colors, Spacing, Typography, Radii, Gradients, MIN_TOUCH_TARGET } from '../constants/theme';
import { RootStackParamList } from '../navigation/AppNavigator';

type ChatNavProp = NativeStackNavigationProp<RootStackParamList, 'Chat'>;

export default function ChatScreen() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<ChatNavProp>();
  const { sessionId, userName, pairCount } = useAppSelector((s) => s.session);
  const { messages, isThinking } = useAppSelector((s) => s.chat);
  const [inputText, setInputText] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  // @ts-ignore
  const listRef = useRef<any>(null);

  const sendMessage = useCallback(async () => {
    const text = inputText.trim();
    if (!text || !sessionId || isThinking) return;

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setInputText('');

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };
    dispatch(addMessage(userMessage));
    dispatch(setThinking(true));

    try {
      const response = await apiClient.post('/chat', {
        message: text,
        session_id: sessionId,
      });

      const cloneMessage: Message = {
        id: `clone-${Date.now()}`,
        text: response.data.reply || response.data.message || 'No response.',
        sender: 'clone',
        timestamp: new Date().toISOString(),
      };
      dispatch(addMessage(cloneMessage));
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch (error: any) {
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        text: 'Sorry, I couldn\'t respond right now. Please try again.',
        sender: 'clone',
        timestamp: new Date().toISOString(),
      };
      dispatch(addMessage(errorMessage));
    } finally {
      dispatch(setThinking(false));
    }
  }, [inputText, sessionId, isThinking, dispatch]);

  const handleClearSession = () => {
    Alert.alert(
      'Clear All Data',
      'This will delete your session and all messages. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete Everything',
          style: 'destructive',
          onPress: async () => {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
            try {
              await apiClient.delete(`/session/${sessionId}`);
            } catch (e) {
              // Server might already have cleared it
            }
            dispatch(clearMessages());
            dispatch(clearSession());
          },
        },
      ]
    );
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    // Re-fetch session stats
    try {
      const res = await apiClient.get(`/stats/${sessionId}`);
      // Could dispatch updated stats here
    } catch (e) {
      // Silently fail
    }
    setRefreshing(false);
  }, [sessionId]);

  // Build the data array: messages + optional thinking indicator
  const listData: (Message | { id: string; type: string })[] = [
    ...messages,
    ...(isThinking ? [{ id: 'thinking-indicator', type: 'thinking' }] : []),
  ];

  const renderItem = ({ item }: { item: Message | { id: string; type: string } }) => {
    // Thinking indicator
    if ('type' in item && item.type === 'thinking') {
      return (
        <View style={[styles.bubbleRow, styles.bubbleRowLeft]}>
          <View style={[styles.bubble, styles.cloneBubble]}>
            <ThinkingDots />
          </View>
        </View>
      );
    }

    const msg = item as Message;
    const isUser = msg.sender === 'user';

    return (
      <View style={[styles.bubbleRow, isUser ? styles.bubbleRowRight : styles.bubbleRowLeft]}>
        {isUser ? (
          <LinearGradient
            colors={[...Gradients.primary]}
            start={Gradients.primaryStart}
            end={Gradients.primaryEnd}
            style={[styles.bubble, styles.userBubble]}
          >
            <Text style={styles.bubbleText}>{msg.text}</Text>
            <Text style={[styles.timestamp, styles.timestampRight]}>
              {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
          </LinearGradient>
        ) : (
          <View style={[styles.bubble, styles.cloneBubble]}>
            <Text style={styles.bubbleText}>{msg.text}</Text>
            <Text style={[styles.timestamp, styles.timestampLeft]}>
              {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* Top Bar */}
        <View style={styles.topBar}>
          <StatsHeader userName={userName || 'User'} pairCount={pairCount} />
          <TouchableOpacity
            onPress={handleClearSession}
            style={styles.trashButton}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Feather name="trash-2" size={20} color={Colors.error} />
          </TouchableOpacity>
        </View>

        {/* Message List */}
        <View style={styles.listContainer}>
          {/* @ts-ignore */}
        <FlashList
            ref={listRef}
            data={listData}
            renderItem={renderItem}
            {...({ estimatedItemSize: 100 } as any)}
            keyExtractor={(item: any) => item.id}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            inverted={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor={Colors.primarySolid}
                colors={[Colors.primarySolid]}
              />
            }
            onContentSizeChange={() => {
              if (listData.length > 0) {
                listRef.current?.scrollToEnd({ animated: true });
              }
            }}
          />
        </View>
      </SafeAreaView>

      {/* Input Bar */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <SafeAreaView edges={['bottom']} style={styles.inputSafeArea}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              value={inputText}
              onChangeText={setInputText}
              placeholder="Type a message..."
              placeholderTextColor={Colors.textMuted}
              multiline
              maxLength={2000}
              returnKeyType="default"
            />
            <TouchableOpacity
              onPress={sendMessage}
              disabled={!inputText.trim() || isThinking}
              style={[styles.sendButton, (!inputText.trim() || isThinking) && styles.sendButtonDisabled]}
            >
              <LinearGradient
                colors={
                  !inputText.trim() || isThinking
                    ? [Colors.border, Colors.border]
                    : [...Gradients.primary]
                }
                start={Gradients.primaryStart}
                end={Gradients.primaryEnd}
                style={styles.sendGradient}
              >
                <Feather name="send" size={18} color={Colors.text} />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  safeArea: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  trashButton: {
    width: MIN_TOUCH_TARGET,
    height: MIN_TOUCH_TARGET,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContainer: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.sm,
  },
  bubbleRow: {
    marginBottom: Spacing.sm,
    flexDirection: 'row',
  },
  bubbleRowRight: {
    justifyContent: 'flex-end',
  },
  bubbleRowLeft: {
    justifyContent: 'flex-start',
  },
  bubble: {
    maxWidth: '80%',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.base,
  },
  userBubble: {
    borderTopLeftRadius: Radii.bubble,
    borderTopRightRadius: 4,
    borderBottomLeftRadius: Radii.bubble,
    borderBottomRightRadius: Radii.bubble,
  },
  cloneBubble: {
    backgroundColor: Colors.surfaceElevated,
    borderWidth: 1,
    borderColor: Colors.border,
    borderTopLeftRadius: 4,
    borderTopRightRadius: Radii.bubble,
    borderBottomLeftRadius: Radii.bubble,
    borderBottomRightRadius: Radii.bubble,
  },
  bubbleText: {
    ...Typography.bodyLarge,
    color: Colors.text,
  },
  timestamp: {
    ...Typography.small,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  timestampRight: {
    textAlign: 'right',
  },
  timestampLeft: {
    textAlign: 'left',
  },
  inputSafeArea: {
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  textInput: {
    flex: 1,
    backgroundColor: Colors.surfaceElevated,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radii.input,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    paddingRight: Spacing['3xl'] + Spacing.base, // space for send button
    color: Colors.text,
    ...Typography.bodyLarge,
    maxHeight: 120,
  },
  sendButton: {
    position: 'absolute',
    right: Spacing.lg,
    bottom: Spacing.md,
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  sendGradient: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
