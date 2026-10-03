import { Image } from 'expo-image';
import type { ImageSourcePropType } from 'react-native';

type Props = {
  imgSource: ImageSourcePropType;
  selectedImage?: string;
  width: number;
  height: number;
  onLoad: () => void;
  onError: () => void;
};

export default function ImageViewer({ imgSource, selectedImage, width, height, onLoad, onError }: Props) {
  return (
    <Image
      source={selectedImage ? { uri: selectedImage } : imgSource}
      style={{ width, height }}
      contentFit="cover"
      transition={0}
      accessibilityLabel={selectedImage ? 'Foto escolhida para editar' : 'Veigh na gravação do DVD EVOM — A Última Dança'}
      testID="photo-image"
      onLoad={onLoad}
      onError={onError}
    />
  );
}
