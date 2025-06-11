import { Platform } from 'react-native';
import { DefaultTheme } from '@react-navigation/native';

// Spacing system (in pixels)
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48
};

// Typography system
export const typography = {
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 32
  },
  weights: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700'
  },
  families: {
    heading: Platform.select({
      ios: 'System',
      android: 'Roboto',
      default: 'System-UI'
    }),
    body: Platform.select({
      ios: 'System',
      android: 'Roboto',
      default: 'System-UI'
    })
  }
};

// Border radiuses
export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  round: 999
};

// Opacity values
export const opacity = {
  pressed: 0.7,
  disabled: 0.5,
  overlay: 0.5
};

// Create the theme
const createTheme = (isDark = false) => {
  // Base colors that work well in both light and dark modes
  const accent = {
    primary: '#007AFF', // iOS blue - works great in both modes
    success: '#34C759',
    warning: '#FF9500',
    error: '#FF3B30',
    info: '#5856D6'
  };

  // Semantic colors that adapt to light/dark mode
  const semantic = {
    text: {
      primary: isDark ? '#FFFFFF' : '#000000',
      secondary: isDark ? '#ADADAD' : '#666666',
      tertiary: isDark ? '#8C8C8C' : '#999999'
    },
    background: {
      primary: isDark ? '#000000' : '#FFFFFF',
      secondary: isDark ? '#1C1C1E' : '#F2F2F7',
      tertiary: isDark ? '#2C2C2E' : '#E5E5EA'
    },
    border: isDark ? '#38383A' : '#D1D1D6'
  };

  // Extend the default theme
  return {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      // Override navigation theme colors
      primary: accent.primary,
      background: semantic.background.primary,
      card: semantic.background.secondary,
      text: semantic.text.primary,
      border: semantic.border,
      // Add our custom colors
      ...accent,
      ...semantic
    },
    // Add our custom theme properties
    spacing,
    typography,
    borderRadius,
    opacity
  };
};

export default createTheme; 