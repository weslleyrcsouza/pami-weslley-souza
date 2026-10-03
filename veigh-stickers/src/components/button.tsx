import { Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors } from '@/constants/theme';

type Props = { label: string; theme?: 'primary'; onPress: () => void; disabled?: boolean };

export default function Button({ label, theme, onPress, disabled = false }: Props) {
  const primary = theme === 'primary';
  return (
    <View style={styles.wrapper}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={label}
        disabled={disabled}
        onPress={onPress}
        style={({ pressed }) => [styles.button, primary ? styles.primary : styles.secondary, (pressed || disabled) && styles.dim]}>
        {primary && <Ionicons name="image-outline" size={21} color={colors.background} />}
        <Text style={[styles.label, primary && styles.primaryLabel]}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { width: '100%' },
  button: { minHeight: 56, paddingHorizontal: 18, paddingVertical: 14, borderRadius: 12, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 10 },
  primary: { backgroundColor: colors.silver, borderWidth: 1, borderColor: colors.silver },
  secondary: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  label: { fontSize: 16, fontWeight: '600', color: colors.text },
  primaryLabel: { color: colors.background },
  dim: { opacity: 0.65 },
});
