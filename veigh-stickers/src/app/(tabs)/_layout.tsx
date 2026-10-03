import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useResponsiveDimensions } from '@/hooks/use-responsive-dimensions';
import BrandHeader from '@/components/brand-header';
import { colors } from '@/constants/theme';

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const { width } = useResponsiveDimensions();
  return (
    <Tabs screenOptions={{
      header: () => <BrandHeader />,
      tabBarActiveTintColor: colors.accent,
      tabBarInactiveTintColor: colors.muted,
      tabBarStyle: { backgroundColor: colors.background, borderTopColor: colors.border, height: 64 + insets.bottom, paddingBottom: insets.bottom + 7, paddingTop: 7, paddingHorizontal: Math.max(0, (width - 420) / 2) },
      tabBarLabelStyle: { fontSize: 14, fontWeight: '600' },
      tabBarIconStyle: { marginBottom: 2 },
    }}>
      <Tabs.Screen name="index" options={{ title: 'Início', tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? 'home' : 'home-outline'} color={color} size={22} /> }} />
      <Tabs.Screen name="about" options={{ title: 'Sobre', tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? 'information-circle' : 'information-circle-outline'} color={color} size={23} /> }} />
    </Tabs>
  );
}
