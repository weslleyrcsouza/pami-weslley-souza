import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { colors } from '@/constants/theme';

type Props = { icon: keyof typeof MaterialIcons.glyphMap; label: string; onPress: () => void; disabled?: boolean; loading?: boolean };

export default function IconButton({ icon, label, onPress, disabled, loading }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: !!disabled, busy: !!loading }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [styles.button, (pressed || disabled) && styles.dim]}>
      {loading ? <ActivityIndicator color={colors.text} /> : <MaterialIcons name={icon} size={25} color={colors.text} />}
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { minWidth: 80, minHeight: 72, padding: 8, alignItems: 'center', justifyContent: 'center', gap: 8 },
  label: { color: colors.text, fontSize: 14 },
  dim: { opacity: 0.5 },
});
