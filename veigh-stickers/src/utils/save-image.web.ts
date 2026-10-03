import type { RefObject } from 'react';
import type { View } from 'react-native';
import domtoimage from 'dom-to-image';

export async function saveImage(imageRef: RefObject<View | null>, width: number, height: number) {
  const node = imageRef.current as unknown as HTMLElement | null;
  if (!node) throw new Error('A imagem ainda não está pronta.');
  // Aguarda também a figurinha, evitando baixar uma composição incompleta.
  await Promise.all(Array.from(node.querySelectorAll('img')).map(img => img.decode()));
  const dataUrl = await domtoimage.toJpeg(node, { quality: 0.95, width, height, bgcolor: '#09090b' });
  const encoded = dataUrl.slice(dataUrl.indexOf(',') + 1);
  const bytes = Uint8Array.from(atob(encoded), character => character.charCodeAt(0));
  const downloadUrl = URL.createObjectURL(new Blob([bytes], { type: 'image/jpeg' }));
  const link = document.createElement('a');
  link.download = 'veigh-stickers.jpeg';
  link.href = downloadUrl;
  document.body.appendChild(link);
  link.click();
  link.remove();
  // Dá tempo para o navegador concluir o download antes de liberar a URL.
  setTimeout(() => URL.revokeObjectURL(downloadUrl), 60_000);
  return 'Download da imagem iniciado.';
}
