import { FlatList, Platform, Pressable, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { stickers, type Sticker } from '@/constants/stickers';
import { colors } from '@/constants/theme';

type Props = { onSelect: (sticker: Sticker) => void; onCloseModal: () => void };

export default function EmojiList({ onSelect, onCloseModal }: Props) {
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={Platform.OS === 'web'}
      data={stickers}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={item.label}
          onPress={() => { onSelect(item); onCloseModal(); }}
          style={({ pressed }) => [styles.item, pressed && { borderColor: colors.accent }]}>
          <Image source={item.source} style={styles.image} contentFit="contain" />
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: { paddingHorizontal: 20, paddingBottom: 18, gap: 12 },
  item: { width: 88, height: 96, borderRadius: 16, backgroundColor: colors.elevated, borderWidth: 1, borderColor: colors.border, justifyContent: 'center', alignItems: 'center' },
  image: { width: 66, height: 66 },
});
