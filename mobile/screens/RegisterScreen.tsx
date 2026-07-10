import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Colors, Spacing } from '../constants/theme';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../navigation/AuthNavigator';
import { useAppDispatch } from '../store/hooks';
import { setAuthCredentials } from '../store/authSlice';
import { registerUser } from '../api/client';

type Props = NativeStackScreenProps<AuthStackParamList, 'Register'>;

export default function RegisterScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async () => {
    if (!name || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      setIsLoading(true);
      setError('');
      
      const data = await registerUser(email, password, name);
      
      if (data.success && data.token) {
        dispatch(setAuthCredentials({ token: data.token, user: data.user }));
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to connect to server.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="#111" />
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join Signet and create your AI clone.</Text>
        </View>

        {error ? (
          <View style={styles.errorBox}>
            <Feather name="alert-circle" size={16} color="#DC2626" />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="John Doe"
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email address</Text>
            <TextInput
              style={styles.input}
              placeholder="you@example.com"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity 
            style={[styles.btnPrimary, isLoading && styles.btnDisabled]} 
            onPress={handleRegister}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.btnPrimaryText}>Create account</Text>
            )}
          </TouchableOpacity>
          
          <View style={styles.loginPrompt}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}>Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F8FC',
  },
  container: {
    flex: 1,
    padding: Spacing.xl,
  },
  backBtn: {
    marginTop: 40,
    marginBottom: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#111',
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    padding: 12,
    borderRadius: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#FCA5A5',
    gap: 8,
  },
  errorText: {
    color: '#DC2626',
    fontSize: 14,
    fontWeight: '500',
  },
  form: {
    gap: 20,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: '#111',
  },
  btnPrimary: {
    backgroundColor: Colors.primarySolid,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  btnDisabled: {
    opacity: 0.7,
  },
  btnPrimaryText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 16,
  },
  loginPrompt: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginText: {
    color: Colors.textSecondary,
    fontSize: 15,
  },
  loginLink: {
    color: Colors.primarySolid,
    fontWeight: '700',
    fontSize: 15,
  }
});
