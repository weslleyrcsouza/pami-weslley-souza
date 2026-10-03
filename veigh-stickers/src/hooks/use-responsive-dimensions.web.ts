import { useSyncExternalStore } from 'react';
import { Dimensions } from 'react-native';

// O primeiro render do navegador precisa coincidir com o HTML exportado.
const serverDimensions = { width: 1024, height: 768, scale: 1, fontScale: 1 };
const getSnapshot = () => Dimensions.get('window');
const getServerSnapshot = () => serverDimensions;
const subscribe = (listener: () => void) => {
  const subscription = Dimensions.addEventListener('change', listener);
  return () => subscription.remove();
};

export function useResponsiveDimensions() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
