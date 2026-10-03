import type { RefObject } from 'react';
import type { View } from 'react-native';
import { captureRef, releaseCapture } from 'react-native-view-shot';
// No SDK 57, a API usada pelo tutorial fica no módulo legacy.
import * as MediaLibrary from 'expo-media-library/legacy';

export async function saveImage(imageRef: RefObject<View | null>, width: number, height: number) {
  if (!imageRef.current) throw new Error('A imagem ainda não está pronta.');
  const permission = await MediaLibrary.requestPermissionsAsync(true, ['photo']);
  if (!permission.granted) throw new Error('Permita salvar fotos nas configurações do aparelho e tente novamente.');

  const localUri = await captureRef(imageRef, { width, height, format: 'png', quality: 1, result: 'tmpfile' });
  try {
    await MediaLibrary.saveToLibraryAsync(localUri);
  } finally {
    releaseCapture(localUri);
  }
  return 'Imagem salva na galeria.';
}
