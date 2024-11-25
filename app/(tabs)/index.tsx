import { Image, StyleSheet, Platform, Animated, Dimensions } from 'react-native';
import { useEffect, useRef } from 'react';
import { BlurView } from 'expo-blur';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#4A90E2', dark: '#1A1B4B' }}
      headerImage={
        <ThemedView style={styles.headerOverlay}>
          <Image
            source={require('@/assets/images/partial-react-logo.png')}
            style={styles.reactLogo}
          />
        </ThemedView>
      }>
      <Animated.View style={[styles.content, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title" style={styles.welcomeText}>✨ ברוכים הבאים!</ThemedText>
          <HelloWave />
        </ThemedView>

        <BlurView intensity={20} tint="light" style={styles.cardContainer}>
          <ThemedView style={styles.card}>
            <ThemedView style={styles.iconContainer}>
              <ThemedText style={styles.emoji}>🚀</ThemedText>
            </ThemedView>
            <ThemedText type="subtitle" style={styles.cardTitle}>בואו נתחיל</ThemedText>
            <ThemedText style={styles.cardText}>
              ערכו את <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> כדי לראות שינויים.
              לחצו על{' '}
              <ThemedText type="defaultSemiBold">
                {Platform.select({
                  ios: 'cmd + d',
                  android: 'cmd + m',
                  web: 'F12'
                })}
              </ThemedText>{' '}
              לפתיחת כלי המפתח.
            </ThemedText>
          </ThemedView>
        </BlurView>

        <ThemedView style={styles.card}>
          <ThemedView style={styles.iconContainer}>
            <ThemedText style={styles.emoji}>🔍</ThemedText>
          </ThemedView>
          <ThemedText type="subtitle" style={styles.cardTitle}>בואו נגלים</ThemedText>
          <ThemedText style={styles.cardText}>
            לחצו על הגלי האדום כדי ללמוד עוד על מה מכיל מסגרת ההתחלה הזו.
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.card}>
          <ThemedView style={styles.iconContainer}>
            <ThemedText style={styles.emoji}>🎯</ThemedText>
          </ThemedView>
          <ThemedText type="subtitle" style={styles.cardTitle}>בואו נתחיל מחדש</ThemedText>
          <ThemedText style={styles.cardText}>
            כשאתה מוכן, רצו את{' '}
            <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> כדי לקבל מסגרת ההתחלה החדשה{' '}
            <ThemedText type="defaultSemiBold">app</ThemedText>. זה יגריר את הספרייה הנוכחית{' '}
            <ThemedText type="defaultSemiBold">app</ThemedText> ל{' '}
            <ThemedText type="defaultSemiBold">app-example</ThemedText>.
          </ThemedText>
        </ThemedView>
      </Animated.View>
    </ParallaxScrollView>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  content: {
    padding: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 32,
    paddingTop: 12,
  },
  welcomeText: {
    fontSize: 36,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0,0,0,0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    letterSpacing: 0.5,
  },
  cardContainer: {
    borderRadius: 20,
    marginBottom: 20,
    overflow: 'hidden',
  },
  card: {
    padding: 24,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.05)',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  emoji: {
    fontSize: 24,
  },
  cardTitle: {
    fontSize: 22,
    marginBottom: 12,
    fontWeight: '700',
  },
  cardText: {
    lineHeight: 24,
    opacity: 0.9,
    fontSize: 16,
  },
  headerOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '100%',
    backgroundColor: 'rgba(74,144,226,0.2)',
  },
  reactLogo: {
    height: 178,
    width: width * 0.8,
    bottom: 0,
    left: 0,
    position: 'absolute',
    opacity: 0.9,
  },
});
