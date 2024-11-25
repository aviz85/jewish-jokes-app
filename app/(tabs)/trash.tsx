import { useState, useEffect } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { JokeCard } from '@/components/JokeCard';
import { supabase } from '@/lib/supabase';
import type { Database } from '@/types/supabase';
import { router } from 'expo-router';

type Joke = Database['public']['Tables']['jokes']['Row'];

export default function TrashScreen() {
  const [jokes, setJokes] = useState<Joke[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDeletedJokes();
  }, []);

  async function loadDeletedJokes() {
    try {
      const { data, error } = await supabase
        .from('jokes')
        .select('*')
        .eq('status', 'deleted')
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setJokes(data || []);
    } catch (error) {
      console.error('Error loading deleted jokes:', error);
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
            onRefresh={loadDeletedJokes}
            isInTrash
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        refreshing={loading}
        onRefresh={loadDeletedJokes}
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