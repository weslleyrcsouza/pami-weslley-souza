import { useCallback, useRef, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Button from '@/components/button';
import CircleButton from '@/components/circle-button';
import EmojiList from '@/components/emoji-list';
import EmojiPicker from '@/components/emoji-picker';
import EmojiSticker from '@/components/emoji-sticker';
import IconButton from '@/components/icon-button';
import ImageViewer from '@/components/image-viewer';
import { stickers, type Sticker } from '@/constants/stickers';
import { colors } from '@/constants/theme';
import { useWebTools } from '@/hooks/use-web-tools';
import { useResponsiveDimensions } from '@/hooks/use-responsive-dimensions';
import { saveImage } from '@/utils/save-image';

const PlaceholderImage = require('@/assets/images/veigh.jpg');

export default function Index() {
  const [selectedImage, setSelectedImage] = useState<string>();
  const [showAppOptions, setShowAppOptions] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pickedEmoji, setPickedEmoji] = useState<Sticker>();
  const [stickerVersion, setStickerVersion] = useState(0);
  const [imageReady, setImageReady] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [notice, setNotice] = useState('');
  const imageRef = useRef<View>(null);
  const { width, height } = useResponsiveDimensions();
  const wide = width >= 850;
  const canvasWidth = Math.floor(Math.min(320, width - 40, wide ? 320 : Math.max(220, (height - 325) * 320 / 440)));
  const canvasHeight = Math.round(canvasWidth * 440 / 320);

  const pickImageAsync = async () => {
    setNotice('');
    try {
      // Chamado diretamente pelo botão para permitir o seletor também na web.
      const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], allowsEditing: true, quality: 1 });
      if (result.canceled) return;
      const image = result.assets[0];
      if (!image?.uri) throw new Error('Não foi possível abrir essa foto.');
      if (image.uri !== selectedImage) setImageReady(false);
      setSelectedImage(image.uri);
      setPickedEmoji(undefined);
      setShowAppOptions(true);
    } catch {
      setNotice('Não foi possível abrir a foto. Tente escolher uma imagem JPG ou PNG.');
    }
  };

  const onReset = () => {
    setPickedEmoji(undefined);
    setShowAppOptions(false);
    setIsModalVisible(false);
    setNotice('');
  };

  const onSelectSticker = (sticker: Sticker) => {
    setPickedEmoji(sticker);
    setStickerVersion(version => version + 1);
    setNotice('');
  };
  const onModalClose = useCallback(() => setIsModalVisible(false), []);

  const onSaveImageAsync = async () => {
    if (!imageReady || isSaving) return;
    setIsSaving(true);
    setNotice('');
    try {
      setNotice(await saveImage(imageRef, canvasWidth, canvasHeight));
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'Não foi possível salvar. Tente novamente.');
    } finally {
      setIsSaving(false);
    }
  };

  useWebTools({
    getState: () => ({ editing: showAppOptions, selectedSticker: pickedEmoji?.id ?? null, customPhoto: !!selectedImage }),
    useCurrentPhoto: () => setShowAppOptions(true),
    selectSticker: async id => {
      const sticker = stickers.find(item => item.id === id);
      if (!sticker) throw new Error('Figurinha inválida.');
      if (!showAppOptions) throw new Error('Ative a edição da foto primeiro.');
      onSelectSticker(sticker);
      await new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
    },
    reset: onReset,
  });

  return (
    <ScrollView style={styles.screen} contentContainerStyle={[styles.content, wide && styles.wideContent]}>
      <View style={[styles.workspace, wide && styles.wideWorkspace]}>
        <View style={styles.photoSection}>
          <View style={[styles.frameCaption, { width: canvasWidth }]}>
            <Text style={styles.caption}>01 / SUA FOTO</Text>
            <Text style={styles.captionAccent}>{selectedImage ? 'SEU UNIVERSO' : 'VEIGH EDITION'}</Text>
          </View>
          <View style={styles.imageFrame}>
            <View ref={imageRef} collapsable={false} testID="photo-canvas" style={{ width: canvasWidth, height: canvasHeight, borderRadius: 16, overflow: 'hidden', backgroundColor: colors.surface }}>
              <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} width={canvasWidth} height={canvasHeight} onLoad={() => setImageReady(true)} onError={() => { setImageReady(false); setNotice('A foto não carregou. Escolha outra imagem.'); }} />
              {pickedEmoji && <EmojiSticker key={`${stickerVersion}-${canvasWidth}`} imageSize={40} stickerSource={pickedEmoji.source} canvasWidth={canvasWidth} canvasHeight={canvasHeight} />}
            </View>
            {!imageReady && !notice && <View pointerEvents="none" style={styles.loading}><ActivityIndicator color={colors.accent} /></View>}
          </View>
        </View>

        <View style={[styles.controls, { width: wide ? 340 : canvasWidth }]}>
          {wide && <>
            <Text style={styles.eyebrow}>VEIGH / STICKER STUDIO</Text>
            <Text accessibilityRole="header" style={styles.title}>Sua foto.{ '\n' }Sua assinatura.</Text>
            <View style={styles.accentLine} />
          </>}
          <Text style={[styles.instruction, !wide && styles.mobileInstruction]}>
            {showAppOptions ? 'Adicione uma figurinha e deixe a foto do seu jeito.' : 'Escolha uma foto ou comece com esta.'}
          </Text>
          {showAppOptions ? (
            <>
              <View style={styles.optionsRow}>
                <IconButton icon="refresh" label="Reiniciar" onPress={onReset} disabled={isSaving} />
                <CircleButton onPress={() => setIsModalVisible(true)} disabled={isSaving} />
                <IconButton icon="save-alt" label="Salvar" onPress={onSaveImageAsync} disabled={isSaving || !imageReady} loading={isSaving} />
              </View>
              <Text style={styles.hint}>{pickedEmoji ? 'Arraste para mover. Dois toques para ampliar ou reduzir.' : 'Toque no + para escolher uma figurinha.'}</Text>
            </>
          ) : (
            <View style={styles.buttons}>
              <Button theme="primary" label="Escolher uma foto" onPress={pickImageAsync} />
              <Button label="Usar esta foto" onPress={() => { setShowAppOptions(true); setNotice(''); }} disabled={!imageReady} />
            </View>
          )}
          {!!notice && <Text accessibilityLiveRegion="polite" style={styles.notice}>{notice}</Text>}
          {wide && <Text style={styles.footer}>STICKERSMASH — VEIGH EDITION</Text>}
        </View>
      </View>
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={onSelectSticker} onCloseModal={onModalClose} />
      </EmojiPicker>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { flexGrow: 1, alignItems: 'center', paddingHorizontal: 20, paddingVertical: 18 },
  wideContent: { justifyContent: 'center', paddingVertical: 42 },
  workspace: { alignItems: 'center', gap: 16, maxWidth: 1060, width: '100%' },
  wideWorkspace: { flexDirection: 'row', justifyContent: 'center', gap: 80 },
  photoSection: { alignItems: 'center' },
  frameCaption: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 12, gap: 12 },
  caption: { color: colors.muted, fontSize: 12, letterSpacing: 1 },
  captionAccent: { color: colors.accent, fontSize: 12, letterSpacing: 1, fontWeight: '600' },
  imageFrame: { borderRadius: 18, borderColor: colors.border, borderWidth: 1, padding: 3, backgroundColor: colors.surface },
  loading: { position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, alignItems: 'center', justifyContent: 'center' },
  controls: { gap: 16 },
  eyebrow: { color: colors.accent, fontSize: 12, letterSpacing: 2, fontWeight: '700' },
  title: { color: colors.text, fontSize: 48, lineHeight: 53, fontWeight: '900', letterSpacing: -2 },
  accentLine: { height: 3, width: 40, backgroundColor: colors.accent, marginVertical: 5 },
  instruction: { color: colors.muted, fontSize: 16, lineHeight: 24 },
  mobileInstruction: { textAlign: 'center', fontSize: 14, lineHeight: 20 },
  buttons: { gap: 10 },
  optionsRow: { width: '100%', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', gap: 14 },
  hint: { color: colors.muted, fontSize: 14, lineHeight: 21, textAlign: 'center' },
  notice: { color: colors.text, fontSize: 14, lineHeight: 21, padding: 12, borderRadius: 10, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface },
  footer: { color: colors.muted, fontSize: 12, letterSpacing: 1.5, marginTop: 26 },
});
