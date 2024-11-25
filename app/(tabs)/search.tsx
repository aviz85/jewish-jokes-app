import { useState } from 'react';
import { StyleSheet, TextInput, FlatList } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { JokeCard } from '@/components/JokeCard';
import { supabase } from '@/lib/supabase';
import type { Database } from '@/types/supabase';
import { router } from 'expo-router';

type Joke = Database['public']['Tables']['jokes']['Row'];

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [jokes, setJokes] = useState<Joke[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleSearch(query: string) {
    setSearchQuery(query);
    if (query.length < 2) {
      setJokes([]);
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('jokes')
        .select('*')
        .neq('status', 'deleted')
        .ilike('original', `%${query}%`)
        .limit(20);

      if (error) throw error;
      setJokes(data || []);
    } catch (error) {
      console.error('Error searching jokes:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ThemedView style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="חפש בדיחה..."
        value={searchQuery}
        onChangeText={handleSearch}
        placeholderTextColor="#666"
      />
      <FlatList
        data={jokes}
        renderItem={({ item }) => (
          <JokeCard
            joke={item}
            onPress={() => router.push(`/joke/${item.id}`)}
            onRefresh={() => handleSearch(searchQuery)}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        refreshing={loading}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchInput: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 8,
    padding: 15,
    marginBottom: 16,
    color: '#fff',
    textAlign: 'right',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
}); 