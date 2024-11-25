import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { IconSymbol } from './ui/IconSymbol';
import { supabase } from '@/lib/supabase';
import type { Database } from '@/types/supabase';

type Joke = Database['public']['Tables']['jokes']['Row'];

interface JokeCardProps {
  joke: Joke;
  onPress: () => void;
  onRefresh: () => void;
  isInTrash?: boolean;
}

export function JokeCard({ joke, onPress, onRefresh, isInTrash }: JokeCardProps) {
  async function handleLike() {
    const { error } = await supabase
      .from('jokes')
      .update({ likes: (joke.likes || 0) + 1 })
      .eq('id', joke.id);
    
    if (!error) onRefresh();
  }

  async function handleDislike() {
    const { error } = await supabase
      .from('jokes')
      .update({ dislikes: (joke.dislikes || 0) + 1 })
      .eq('id', joke.id);
    
    if (!error) onRefresh();
  }

  async function handleDelete() {
    const { error } = await supabase
      .from('jokes')
      .update({ 
        status: isInTrash ? 'completed' : 'deleted', 
        updated_at: new Date().toISOString() 
      })
      .eq('id', joke.id);
    
    if (!error) onRefresh();
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <ThemedView style={styles.card}>
        <ThemedText numberOfLines={3} style={styles.text}>
          {joke.original}
        </ThemedText>
        <View style={styles.actions}>
          {!isInTrash && (
            <>
              <TouchableOpacity onPress={handleLike} style={styles.action}>
                <IconSymbol name="hand.thumbsup.fill" size={20} color="#4A90E2" />
                <ThemedText style={styles.actionText}>{joke.likes || 0}</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleDislike} style={styles.action}>
                <IconSymbol name="hand.thumbsdown.fill" size={20} color="#E24A4A" />
                <ThemedText style={styles.actionText}>{joke.dislikes || 0}</ThemedText>
              </TouchableOpacity>
            </>
          )}
          <TouchableOpacity onPress={handleDelete}>
            <IconSymbol 
              name={isInTrash ? "arrow.uturn.backward" : "trash.fill"} 
              size={20} 
              color="#999" 
            />
          </TouchableOpacity>
        </View>
      </ThemedView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
  },
  actions: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 16,
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionText: {
    fontSize: 14,
  },
}); 