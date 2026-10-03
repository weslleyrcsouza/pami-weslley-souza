import { Platform, type ImageSourcePropType } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

type Props = { imageSize: number; stickerSource: ImageSourcePropType; canvasWidth: number; canvasHeight: number };

export default function EmojiSticker({ imageSize, stickerSource, canvasWidth, canvasHeight }: Props) {
  const scaleImage = useSharedValue(imageSize);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const centerX = canvasWidth / 2;
  const centerY = canvasHeight * 0.32;

  // Mantém a figurinha inteira dentro da área que será salva.
  const constrain = (value: number, center: number, limit: number, size: number) => {
    'worklet';
    return Math.min(limit - center - size / 2, Math.max(size / 2 - center, value));
  };

  const toggleSize = () => {
    'worklet';
    const nextSize = scaleImage.value === imageSize ? imageSize * 2 : imageSize;
    scaleImage.value = nextSize;
    translateX.value = constrain(translateX.value, centerX, canvasWidth, nextSize);
    translateY.value = constrain(translateY.value, centerY, canvasHeight, nextSize);
  };

  const doubleTap = Gesture.Tap().numberOfTaps(2).onStart(toggleSize);
  const drag = Gesture.Pan().minDistance(3).onChange(event => {
    translateX.value = constrain(translateX.value + event.changeX, centerX, canvasWidth, scaleImage.value);
    translateY.value = constrain(translateY.value + event.changeY, centerY, canvasHeight, scaleImage.value);
  });

  const positionStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
  }));
  const imageStyle = useAnimatedStyle(() => ({
    width: withSpring(scaleImage.value, { overshootClamping: true }),
    height: withSpring(scaleImage.value, { overshootClamping: true }),
  }));

  const keyboardProps = Platform.OS === 'web' ? {
    onKeyDown: (event: { key: string; preventDefault: () => void }) => {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); toggleSize(); }
      const moves: Record<string, [number, number]> = { ArrowLeft: [-10, 0], ArrowRight: [10, 0], ArrowUp: [0, -10], ArrowDown: [0, 10] };
      const move = moves[event.key];
      if (move) {
        event.preventDefault();
        translateX.set(constrain(translateX.get() + move[0], centerX, canvasWidth, scaleImage.get()));
        translateY.set(constrain(translateY.get() + move[1], centerY, canvasHeight, scaleImage.get()));
      }
    },
  } : {};

  return (
    <GestureDetector gesture={Gesture.Simultaneous(drag, doubleTap)}>
      <Animated.View
        {...keyboardProps}
        testID="emoji-sticker"
        accessible
        focusable
        accessibilityRole="adjustable"
        accessibilityLabel="Figurinha na foto"
        accessibilityHint="Arraste para mover. Toque duas vezes para ampliar ou reduzir. No teclado, use as setas e Enter."
        accessibilityActions={[{ name: 'increment', label: 'Ampliar' }, { name: 'decrement', label: 'Reduzir' }]}
        onAccessibilityAction={toggleSize}
        style={[{ position: 'absolute', left: centerX - imageSize, top: centerY - imageSize, width: imageSize * 2, height: imageSize * 2, alignItems: 'center', justifyContent: 'center' }, positionStyle]}>
        <Animated.Image
          source={stickerSource}
          resizeMode="contain"
          style={imageStyle}
        />
      </Animated.View>
    </GestureDetector>
  );
}
