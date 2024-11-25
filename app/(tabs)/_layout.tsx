import { Tabs } from 'expo-router';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: true,
      }}>
      <Tabs.Screen
        name="browse"
        options={{
          title: 'עיון',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="book.fill" color={color} />,
          headerTitle: 'בדיחות יהודיות',
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'חיפוש',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="magnifyingglass" color={color} />,
        }}
      />
      <Tabs.Screen
        name="trash"
        options={{
          title: 'סל מחזור',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="trash.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
