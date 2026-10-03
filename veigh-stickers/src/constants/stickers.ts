import type { ImageSourcePropType } from 'react-native';

export type Sticker = { id: string; label: string; source: ImageSourcePropType };

// As mesmas seis imagens fornecidas no tutorial oficial.
export const stickers: Sticker[] = [
  { id: 'emoji1', label: 'Figurinha 1', source: require('@/assets/images/emoji1.png') },
  { id: 'emoji2', label: 'Figurinha 2', source: require('@/assets/images/emoji2.png') },
  { id: 'emoji3', label: 'Figurinha 3', source: require('@/assets/images/emoji3.png') },
  { id: 'emoji4', label: 'Figurinha 4', source: require('@/assets/images/emoji4.png') },
  { id: 'emoji5', label: 'Figurinha 5', source: require('@/assets/images/emoji5.png') },
  { id: 'emoji6', label: 'Figurinha 6', source: require('@/assets/images/emoji6.png') },
];
