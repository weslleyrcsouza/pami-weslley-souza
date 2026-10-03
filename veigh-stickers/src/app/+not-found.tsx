import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '@/constants/theme';

export default function NotFoundScreen() {
  return <View style={styles.screen}>
    <Stack.Screen options={{ title: 'Página não encontrada' }} />
    <Text style={styles.code}>404</Text>
    <Text accessibilityRole="header" style={styles.title}>Essa página não existe.</Text>
    <Link href="/" style={styles.link}>Voltar para o editor</Link>
  </View>;
}

const styles = StyleSheet.create({
  screen: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, backgroundColor: colors.background, gap: 20 },
  code: { color: colors.accent, fontSize: 64, fontWeight: '900' },
  title: { color: colors.text, fontSize: 22, fontWeight: '700', textAlign: 'center' },
  link: { color: colors.text, fontSize: 16, padding: 16, textDecorationLine: 'underline' },
});
