import { useState, useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { JokeCard } from '@/components/JokeCard';
import { supabase } from '@/lib/supabase';
import type { Database } from '@/types/supabase';

type Joke = Database['public']['Tables']['jokes']['Row'];

export default function BrowseScreen() {
  const [jokes, setJokes] = useState<Joke[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadJokes();
  }, []);

  async function loadJokes() {
    try {
      const { data, error } = await supabase
        .from('jokes')
        .select('*')
        .neq('status', 'deleted')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setJokes(data || []);
    } catch (error) {
      console.error('Error loading jokes:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={jokes}
        renderItem={({ item }) => (
          <JokeCard
            joke={item}
            onPress={() => router.push(`/joke/${item.id}`)}
            onRefresh={loadJokes}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        refreshing={loading}
        onRefresh={loadJokes}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
}); 