import { useEffect, type PropsWithChildren } from 'react';
import { Modal, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '@/constants/theme';

type Props = PropsWithChildren<{ isVisible: boolean; onClose: () => void }>;

export default function EmojiPicker({ isVisible, children, onClose }: Props) {
  const insets = useSafeAreaInsets();
  useEffect(() => {
    if (!isVisible || Platform.OS !== 'web') return;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isVisible, onClose]);

  return (
    <Modal animationType="slide" transparent visible={isVisible} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <Pressable accessibilityRole="button" accessibilityLabel="Fechar seletor de figurinhas" onPress={onClose} style={StyleSheet.absoluteFill} />
        <View accessibilityViewIsModal style={[styles.panel, { paddingBottom: Math.max(insets.bottom, 20) }]}>
          <View style={styles.handle} />
          <View style={styles.titleRow}>
            <View>
              <Text accessibilityRole="header" style={styles.title}>Escolha uma figurinha</Text>
              <Text style={styles.caption}>O toque final é seu.</Text>
            </View>
            <Pressable accessibilityRole="button" accessibilityLabel="Fechar" onPress={onClose} style={styles.close}>
              <MaterialIcons name="close" size={24} color={colors.text} />
            </Pressable>
          </View>
          {children}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: '#00000099', justifyContent: 'flex-end', alignItems: 'center' },
  panel: { backgroundColor: colors.surface, width: '100%', maxWidth: 620, borderTopLeftRadius: 24, borderTopRightRadius: 24, borderWidth: 1, borderColor: colors.border },
  handle: { width: 36, height: 4, borderRadius: 2, backgroundColor: colors.border, alignSelf: 'center', marginTop: 12 },
  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20, gap: 12 },
  title: { color: colors.text, fontSize: 20, fontWeight: '700' },
  caption: { color: colors.muted, fontSize: 14, marginTop: 5 },
  close: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.elevated, justifyContent: 'center', alignItems: 'center' },
});
