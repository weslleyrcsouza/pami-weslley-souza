import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '@/constants/theme';
import { useResponsiveDimensions } from '@/hooks/use-responsive-dimensions';

export default function BrandHeader() {
  const insets = useSafeAreaInsets();
  const { width } = useResponsiveDimensions();
  return (
    <View style={[styles.header, { paddingTop: insets.top + 14 }]}>
      <View style={styles.inner}>
        <View style={styles.brand}>
          <View style={styles.mark}><Text style={styles.markText}>V</Text></View>
          <Text style={styles.name}>VEIGH<Text style={styles.studio}> / STUDIO</Text></Text>
        </View>
        {width >= 380 && <Text style={styles.edition}>STICKERSMASH</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { backgroundColor: colors.background, paddingHorizontal: 20, paddingBottom: 14, borderBottomWidth: 1, borderBottomColor: colors.border },
  inner: { width: '100%', maxWidth: 1060, alignSelf: 'center', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 9, flexShrink: 1 },
  mark: { backgroundColor: colors.accent, width: 30, height: 30, borderRadius: 7, alignItems: 'center', justifyContent: 'center' },
  markText: { color: colors.background, fontSize: 24, fontWeight: '900' },
  name: { color: colors.text, fontWeight: '900', fontSize: 19, letterSpacing: -0.6 },
  studio: { color: colors.muted, fontSize: 14, fontWeight: '500', letterSpacing: 1 },
  edition: { color: colors.muted, fontSize: 12, letterSpacing: 1.2 },
});
