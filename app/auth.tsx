import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { AuthError } from '@supabase/supabase-js';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { supabase } from '@/lib/supabase';

const ERROR_MESSAGES: { [key: string]: string } = {
  'Invalid login credentials': 'פרטי התחברות שגויים',
  'Email not confirmed': 'המייל טרם אומת. אנא בדוק את תיבת המייל שלך',
  'Password should be at least 6 characters': 'הסיסמה חייבת להכיל לפחות 6 תווים',
  'User already registered': 'משתמש עם מייל זה כבר קיים במערכת',
  'Invalid email': 'כתובת המייל אינה תקינה',
};

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const validateForm = () => {
    setError(null);
    
    if (!email || !password) {
      setError('נא למלא את כל השדות');
      return false;
    }
    
    if (!email.includes('@')) {
      setError('כתובת המייל אינה תקינה');
      return false;
    }
    
    if (password.length < 6) {
      setError('הסיסמה חייבת להכיל לפחות 6 תווים');
      return false;
    }
    
    if (!isLogin && !username) {
      setError('נא להזין שם משתמש');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        router.replace('/(tabs)');
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              username,
            },
          },
        });
        if (error) throw error;
        
        setEmail('');
        setPassword('');
        setUsername('');
        setIsLogin(true);
        Alert.alert(
          'הרשמה הצליחה!',
          'נשלח אליך מייל אימות. אנא אמת את המייל שלך והתחבר.',
          [{ text: 'אישור' }]
        );
      }
    } catch (error) {
      const authError = error as AuthError;
      setError(ERROR_MESSAGES[authError.message] || 'אירעה שגיאה. אנא נסה שוב');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <Animated.View entering={FadeInDown.duration(1000)} style={styles.form}>
        <ThemedText type="title" style={styles.title}>
          {isLogin ? 'ברוכים השבים!' : 'הרשמה'}
        </ThemedText>
        
        {error && (
          <ThemedText style={styles.errorText}>
            {error}
          </ThemedText>
        )}
        
        <TextInput
          style={[styles.input, error && styles.inputError]}
          placeholder="אימייל"
          placeholderTextColor="#666"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setError(null);
          }}
          keyboardType="email-address"
          autoCapitalize="none"
          editable={!isLoading}
        />

        {!isLogin && (
          <TextInput
            style={[styles.input, error && styles.inputError]}
            placeholder="שם משתמש"
            placeholderTextColor="#666"
            value={username}
            onChangeText={(text) => {
              setUsername(text);
              setError(null);
            }}
            autoCapitalize="none"
            editable={!isLoading}
          />
        )}

        <TextInput
          style={[styles.input, error && styles.inputError]}
          placeholder="סיסמה"
          placeholderTextColor="#666"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setError(null);
          }}
          secureTextEntry
          editable={!isLoading}
        />

        <TouchableOpacity 
          style={[styles.button, isLoading && styles.buttonDisabled]} 
          onPress={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <ThemedText style={styles.buttonText}>
              {isLogin ? 'התחברות' : 'הרשמה'}
            </ThemedText>
          )}
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => {
            setIsLogin(!isLogin);
            setError(null);
          }} 
          disabled={isLoading}
        >
          <ThemedText style={styles.switchText}>
            {isLogin ? 'אין לך חשבון? הירשם' : 'יש לך חשבון? התחבר'}
          </ThemedText>
        </TouchableOpacity>
      </Animated.View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  form: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    color: '#fff',
    textAlign: 'right',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  button: {
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  switchText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#4A90E2',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  errorText: {
    color: '#ff4444',
    textAlign: 'center',
    marginBottom: 16,
    fontSize: 14,
  },
  inputError: {
    borderColor: '#ff4444',
  },
}); 