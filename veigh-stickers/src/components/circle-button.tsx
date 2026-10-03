import { Pressable, StyleSheet, Text, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { colors } from '@/constants/theme';

export default function CircleButton({ onPress, disabled }: { onPress: () => void; disabled?: boolean }) {
  return (
    <View style={styles.container}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Adicionar figurinha"
        disabled={disabled}
        onPress={onPress}
        style={({ pressed }) => [styles.circle, (pressed || disabled) && { opacity: 0.65 }]}>
        <MaterialIcons name="add" size={36} color={colors.background} />
      </Pressable>
      <Text style={styles.label}>Figurinha</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', gap: 6 },
  circle: { width: 60, height: 60, borderRadius: 30, backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center' },
  label: { color: colors.text, fontSize: 14 },
});
