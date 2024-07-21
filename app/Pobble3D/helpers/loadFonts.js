import * as Font from 'expo-font';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import segoePrintBold from '../assets/fonts/segoeprint_bold.json';

export const loadFonts = async () => {
  try {
    await Font.loadAsync({
      'Segoe-Print': require('../assets/fonts/segoeprint.ttf'),
      'Segoe-Print-Bold': require('../assets/fonts/segoeprint_bold.ttf'),
    });
    const fontLoader = new FontLoader();
    const parsedFont = fontLoader.parse(segoePrintBold);

    return parsedFont;
  } catch (e) {
    console.error('Error loading fonts', e);
    throw e;
  }
};
