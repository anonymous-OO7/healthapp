import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { Theme } from './types';

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };
type StylesFactory<T> = (theme: Theme) => T;

export function createStyles<T extends NamedStyles<T>>(
  stylesFactory: StylesFactory<T>,
): StylesFactory<T> {
  return stylesFactory;
}

// Usage with StyleSheet.create for optimization
export function createThemedStyles<T extends NamedStyles<T>>(
  stylesFactory: StylesFactory<T>,
): (theme: Theme) => T {
  const cache = new Map<boolean, T>();

  return (theme: Theme) => {
    const cached = cache.get(theme.dark);
    if (cached) {
      return cached;
    }

    const styles = StyleSheet.create(stylesFactory(theme)) as T;
    cache.set(theme.dark, styles);
    return styles;
  };
}
