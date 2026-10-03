import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors } from '@/constants/theme';

const steps = [
  ['01', 'Escolha sua foto', 'Use a imagem do Veigh ou selecione uma foto do seu aparelho.'],
  ['02', 'Dê o seu toque', 'Escolha uma figurinha no botão +. Arraste para posicionar e toque duas vezes para mudar o tamanho.'],
  ['03', 'Salve a criação', 'No navegador, a imagem é baixada. No aplicativo, ela vai para a galeria do aparelho.'],
];

export default function AboutScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.inner}>
        <Text style={styles.eyebrow}>SOBRE / STICKERSMASH</Text>
        <Text accessibilityRole="header" style={styles.title}>Um toque seu.</Text>
        <Text style={styles.intro}>Um editor de fotos e figurinhas com uma identidade visual inspirada no Veigh.</Text>
        <View style={styles.steps}>
          {steps.map(([number, title, description]) => <View style={styles.step} key={number}>
            <Text style={styles.number}>{number}</Text>
            <View style={styles.stepText}>
              <Text style={styles.stepTitle}>{title}</Text>
              <Text style={styles.description}>{description}</Text>
            </View>
          </View>)}
        </View>
        <Text style={styles.keyboard}>No computador, você também pode selecionar a figurinha com Tab, mover com as setas e mudar o tamanho com Enter.</Text>
        <View style={styles.academic}>
          <Text style={styles.academicTitle}>Projeto acadêmico</Text>
          <Text style={styles.description}>Programação Web I · Professor João Siles{ '\n' }Etec Camargo Aranha</Text>
          <Text style={styles.description}>Weslley Romã Campos de Souza</Text>
          <Pressable accessibilityRole="link" onPress={() => Linking.openURL('https://docs.expo.dev/tutorial/introduction/')}>
            <Text style={styles.link}>Baseado no tutorial oficial do Expo</Text>
          </Pressable>
        </View>
        <Text style={styles.credits}>Foto do DVD EVOM — A Última Dança: João Rocha / Moodgate. Figurinhas: assets do tutorial StickerSmash.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: 24, paddingVertical: 36, alignItems: 'center' },
  inner: { width: '100%', maxWidth: 640 },
  eyebrow: { color: colors.accent, fontSize: 12, fontWeight: '700', letterSpacing: 2 },
  title: { color: colors.text, fontSize: 38, fontWeight: '900', letterSpacing: -1.2, marginTop: 14 },
  intro: { color: colors.muted, fontSize: 16, lineHeight: 25, marginTop: 12 },
  steps: { marginTop: 28, borderTopWidth: 1, borderColor: colors.border },
  step: { flexDirection: 'row', gap: 18, paddingVertical: 22, borderBottomWidth: 1, borderColor: colors.border },
  number: { color: colors.accent, fontSize: 18, fontWeight: '800', paddingTop: 2 },
  stepText: { flex: 1, gap: 7 },
  stepTitle: { color: colors.text, fontSize: 19, fontWeight: '700' },
  description: { color: colors.muted, fontSize: 16, lineHeight: 25 },
  keyboard: { color: colors.muted, fontSize: 14, lineHeight: 22, marginTop: 20 },
  academic: { gap: 10, marginTop: 30, padding: 22, borderRadius: 14, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface },
  academicTitle: { color: colors.text, fontSize: 18, fontWeight: '700' },
  link: { color: colors.accent, fontSize: 14, lineHeight: 22, textDecorationLine: 'underline', paddingVertical: 5 },
  credits: { color: colors.muted, fontSize: 12, lineHeight: 19, marginTop: 24 },
});
